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
import EditIcon from '@material-ui/icons/Edit';



export default class FinancialSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            "accountProfile": [],
            "editMode": false,
            "status": false,
            "message": ""
        }

    }

    componentDidMount() {
        let accountProfile = fetchFormByType("financialAccProfile")
        this.setState({ "accountProfile": accountProfile }, function () {
            this.getAccData()
        });
    }

    getAccData() {
        let params = {
            "userId": AuthService.getUserId(),
        }


        APIService.apiCall("POST", params, "getSettings")
            .then(res => res.json())
            .then(res => {
                if (res.status === "success" && res.data) {
                    let profile = res.data;

                    let formDataInput = [...this.state.accountProfile];
                    formDataInput.map((item, index) => {
                        item["value"] = profile[item.key] ? profile[item.key] : ''
                    })

                    this.setState({ "accountProfile": formDataInput })
                }

            }).catch(error => {
                commons.errorLog(error)
            });


    }

    editModeHandler = (e) => {
        let { editMode } = this.state;
        this.setState({ "editMode": !editMode });
    }



    handleChange = (e) => {
        let formDataInput = [...this.state.accountProfile];
        formDataInput.find((item) => {

            if (item.key === e.target.name) {
                if (item.step && item.type === "number")
                    item.value = parseFloat(e.target.value)
                else if (item.type === "number") item.value = parseInt(e.target.value)
                else if (item.type == "date") {
                    //  let formatDate = moment(e.target.value).format('DD-MM-YYYY');
                    //  item.value = formatDate

                }
                else if(item.type === "checkbox")
                {
                    item.value = e.target.checked;
                }
                else {
                    item.value = e.target.value;

                }

            }
        })

        console.log("formDataInput ... "+JSON.stringify(formDataInput))
        this.setState({ accountProfile: formDataInput });
    }

    setAccDetails = async (e) => {
        let profileData = [...this.state.accountProfile];

        let profileFormData = await util.validateFormData(profileData);
        this.setState({ "subOrgProfile": profileFormData })
        let result = profileFormData.find((item) => {
            if (item.error.length) return item;
        });
        if (!result) {

            let params = await util.filterFormData(profileFormData);
            params["userId"] = AuthService.getUserId();


            APIService.apiCall("POST", params, "setSettings")
                .then(res => res.json())
                .then(res => {

                    if (res) {
                        let status = (res.status && res.status == "success") ? true : false
                        let message = (status) ? "Settings updated successfully." : 'Error'
                        this.setState({ "status": status, "message": message});
                        if(status)
                            this.setState({editMode:false})
                    }



                }).catch(error => {
                    commons.errorLog(error)
                });


        }


    }


    render() {
        const { classes } = this.props;
        const { editMode, status, message, accountProfile } = this.state;


        let acc_groups = util.chunkArray(2, accountProfile)
        return (
            <div>
                <Card className={classes.card} style={{ margin: '10px' }}>
                    <CardHeader
                        //title="Contact Details"

                        action={
                            <EditIcon onClick={this.editModeHandler} />
                        }
                    />
                    <CardContent>
                        <FormGenerator groups={acc_groups} groupBy={2} editMode={editMode}
                            onChange={this.handleChange} />

                    </CardContent>
                    {editMode ? (<CardActions style={{
                        justifyContent: 'flex-end'
                    }}>
                        <Button variant="contained" color="primary" size="small" onClick={this.setAccDetails}>Save</Button>
                        <Button variant="contained" color="primary" size="small" onClick={this.editModeHandler}>Cancel</Button>
                    </CardActions>) : <div></div>}

                </Card >


                {message.length ?
                    (status ? (<SnackBarWidget classes={classes} message={message}
                        type="success" />) : <SnackBarWidget classes={classes} message={message}
                            type="error" />) : <div></div>}
            </div>
        )
    }








}