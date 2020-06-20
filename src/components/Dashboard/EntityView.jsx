import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { fetchFormByType } from "../../schema";
import { AuthService, APIService } from "../../service"
import { Paper } from '@material-ui/core';
import { SnackBarWidget } from "../Widgets";
import { MenuItem } from '@material-ui/core';
import { FormGenerator } from "../../lib";
import { util, commons } from '../../utils';



export default class EntityView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            "accountProfile": [],
            "invoiceProfile": [],
            "entityProfile": [],
            "editMode": false,
            "status": false,
            "message": ""
        }

    }

    componentDidMount() {
        let entityProfile = fetchFormByType("entityProfile")
        console.log("entityProfile .. " + JSON.stringify(entityProfile))
        this.setState({ "entityProfile": entityProfile }, function () {
            this.getProfile()
        });
    }

    getProfile() {
        let { data } = this.props
        let params = {
            "userId": this.props.userId,
        }
        if (data.role)
            params["role"] = data.role;

        APIService.apiCall("POST", params, "getDetails")
            .then(res => res.json())
            .then(res => {
                if (res.status === "success" && res.data) {

                    let profile = res.data;
                    let role = this.props.data.role
                    let accountProfile = [];
                    let invoiceProfile = [];
                    let roleWiseProfile = commons.fetchEntityRoleProfile(profile, role)
                    console.log("roleWise .. " + JSON.stringify(roleWiseProfile))
                    let formDataInput = [...this.state.entityProfile];
                    formDataInput.map((item, index) => {
                        item["value"] = profile[item.key] ? profile[item.key] : (roleWiseProfile[item.key] ? roleWiseProfile[item.key] : '')

                        if (item.key === "email") {
                            item["value"] = profile.uName["email"]
                            accountProfile.push(item)

                        }
                        if (item.key === "phoneNo") {
                            item["value"] = profile.uName["phoneNo"]
                            accountProfile.push(item)
                        }

                        if (item.key === "invoiceDay" || item.key === "invoiceAmt")
                            invoiceProfile.push(item)

                    })
                    const filteredData = formDataInput.filter((item) =>
                    (item.key != "email" && item.key != "phoneNo" && item.key != "invoiceAmt" && item.key != "invoiceDay") );

                    this.setState({ "entityProfile": filteredData, "accountProfile": accountProfile, "invoiceProfile": invoiceProfile })
                }

            }).catch(error => {
                commons.errorLog(error)
            });


    }

    editModeHandler = (e) => {
        let { editMode } = this.state;
        this.setState({ "editMode": !editMode });
    }


    showDropDown(nestedItem) {
        const { classes } = this.props;
        const dropDownOptions = nestedItem.options.map(option => {
            return (<MenuItem key={option} value={option} >
                {option}
            </MenuItem>)
        })
        return dropDownOptions
    }

    handleChange = (e) => {
        let formDataInput = [...this.state.entityProfile];
        formDataInput.find((item) => {
            if (item.key === e.target.name) {
                (item.type === "number") ? item.value = parseInt(e.target.value) : item.value = e.target.value;
                if (item.type == "date") {
                    //  let formatDate = moment(e.target.value).format('DD-MM-YYYY');
                    //  item.value = formatDate

                }

            }
        })
        this.setState({ profileData: formDataInput });
    }

    sumbitUserProfile = async (e) => {
        let profileData = [...this.state.userProfile];


    }


    render() {
        const { classes } = this.props;
        const { editMode, status, message, entityProfile, accountProfile, invoiceProfile } = this.state;


        let sortResult = util.sortArr(entityProfile, "order");
        let chunk_size = 2;
        let groups = util.chunkArray(chunk_size, sortResult)

        let acc_groups = util.chunkArray(2, accountProfile)
        let invoice_groups = util.chunkArray(2, invoiceProfile)
        return (

            <div>
                <Card className={classes.card} style={{ margin: '10px' }}>
                    <CardHeader
                        title="Account Details"

                    />
                    <CardContent>
                        <FormGenerator groups={acc_groups} groupBy={2}
                            onChange={this.handleChange} />

                    </CardContent>
                </Card>

                <Card className={classes.card} style={{ margin: '10px' }}>
                    <CardHeader
                        title="Contact Details"

                    // action={
                    //     this.props.status == "active" ? (<EditIcon onClick={this.editModeHandler} />) : (false)
                    // }
                    />
                    <CardContent>
                        <FormGenerator groups={groups} groupBy={2} editMode={editMode}
                            onChange={this.handleChange} />

                    </CardContent>
                    {editMode ? (<CardActions style={{
                        justifyContent: 'flex-end'
                    }}>
                        <Button variant="contained" color="primary" size="small" onClick={this.sumbitUserProfile}>Save</Button>
                        <Button variant="contained" color="primary" size="small" onClick={this.editModeHandler}>Cancel</Button>
                    </CardActions>) : <div></div>}

                </Card >

                <Card className={classes.card} style={{ margin: '10px' }}>
                    <CardHeader
                        title="Invoice Details"

                    />
                    <CardContent>
                        <FormGenerator groups={invoice_groups} groupBy={2}
                             />

                    </CardContent>
                </Card>

                {message.length ?
                    (status ? (<SnackBarWidget classes={classes} message={message}
                        type="success" />) : <SnackBarWidget classes={classes} message={message}
                            type="error" />) : <div></div>}
            </div>
        )
    }








}