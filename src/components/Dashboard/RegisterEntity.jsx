import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { fetchFormByType } from "../../schema";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { MenuItem, Typography } from '@material-ui/core';
import { AuthService, APIService } from "../../service";
//import { SnackBarInfo } from "../../views"
import { util, commons } from '../../utils';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { SnackBarWidget } from "../Widgets";



export default class RegisterEntity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            activeStep: 0,
            "stepContent": [],
            "memberFormData": [],
            "addMemberFormData": [],
            "status": false,
            "message": "",
            maxUsers: 0,
            maxConUsers: 0,
            maxCust: 0

        };
        this.getSteps = this.getSteps.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDropDown = this.showDropDown.bind(this);


    }



    componentDidMount() {
        let { data } = this.props;

        console.log("data ... "+JSON.stringify(data))
        let addMemberFormData = []
        if (!data)
            addMemberFormData = fetchFormByType("registerBusiness");
        else if (data && data.role === "business")
            addMemberFormData = fetchFormByType("registerBusiness");
        else if (data && data.role === "supplier")
            addMemberFormData = fetchFormByType("registerSupplier");
        this.reloadComponent();
        this.setState({ "addMemberFormData": addMemberFormData }, function () {
            let defaultFormData = this.state.addMemberFormData.find(item => item.step === 0);
            this.setState({ "stepContent": defaultFormData.formData });

        });



    }

    componentDidUpdate(prevProps) {
    }



    reloadComponent() {


    }

    async resetForm() {
        this.setState({
            activeStep: 0,
            "stepContent": [],
            "memberFormData": [],

        });
        await this.reloadComponent();
        let { data } = this.props;

        let addMemberFormData = []
        if (!data)
            addMemberFormData = fetchFormByType("registerBusiness");
        else if (data.role === "business")
            addMemberFormData = fetchFormByType("registerBusiness");
        else if (data.role === "supplier")
            addMemberFormData = fetchFormByType("registerSupplier");

        this.setState({ "addMemberFormData": addMemberFormData })
        addMemberFormData.map(item => {
            item.formData.map(nestedItem => {
                if (!nestedItem.disabled) nestedItem.value = "";
                if (nestedItem.defaultValue) nestedItem.value = nestedItem.defaultValue
            })
        })
        let defaultFormData = addMemberFormData.find(item => item.step === 0);
        this.setState({
            "stepContent": defaultFormData.formData, "status": false,
            "message": ""
        });

    }

    getNumberOfSteps() {
        let { addMemberFormData } = this.state;
        return addMemberFormData.length;
    }

    showDropDown(nestedItem) {
        const dropDownOptions = nestedItem.options.map((option, index) => {
            return (<MenuItem key={index} value={option.value} >
                {option.key}
            </MenuItem>)
        })
        return dropDownOptions
    }
    getSteps = () => {
        let { addMemberFormData } = this.state;

        const stepHeader = addMemberFormData.map(item => {
            return (<Step key={item.step}>
                <StepLabel>{item.title}</StepLabel>
            </Step>)
        })
        return stepHeader
    }

    handleChange = (e) => {
        let formDataInput = [...this.state.stepContent];
        var foundIndex = formDataInput.findIndex(item => item.key === e.target.name);
        let foundItem = formDataInput.find((item) => { return item.key === e.target.name })

        if (foundItem) {
            foundItem.value = e.target.value
        }
        formDataInput[foundIndex] = foundItem;
        console.log(e.target.name + " ... " + foundIndex + " .. " + e.target.value)
        console.log("formDataInput ... " + JSON.stringify(formDataInput))
        this.setState({ stepContent: formDataInput });
    }


    getStepContent(step) {
        let { addMemberFormData } = this.state;

        let stepContent = addMemberFormData.find(item => item.step === step);
        if (stepContent && stepContent.formData) {
            let sortResult = util.sortArr(stepContent.formData, "order");
            let chunk_size = 2;
            let groups = util.chunkArray(chunk_size, sortResult);

            return (groups.map((item, index) => {
                return (
                    <Grid container spacing={1} alignItems="flex-end" key={index}>{item.map((nestedItem, nestedIndex) => {

                        const styleObj = {};
                        if (nestedItem.hidden) styleObj["display"] = "none";
                        let inputProps = {}

                        let txtField = <TextField id="component-simple"
                            fullWidth
                            label={nestedItem.hidden ? '' : nestedItem.displayName}
                            name={nestedItem.key}
                            value={nestedItem.value}
                            onChange={this.handleChange}
                            required={nestedItem.required}
                            multiline={nestedItem.multiline}
                            rowsMax={nestedItem.rowsMax ? nestedItem.rowsMax : ''}
                            disabled={nestedItem.disabled}
                            rows={nestedItem.rows}
                            type={nestedItem.type !== "select" ? nestedItem.type : ''}
                            select={nestedItem.select}
                            error={nestedItem.error.length ? true : false}
                            helperText={nestedItem.error}
                            hidden={nestedItem.hidden ? true : false}
                            autoComplete="off"
                            style={styleObj}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: inputProps
                            }}

                        >
                            {(nestedItem.select && nestedItem.options) ? (
                                this.showDropDown(nestedItem)
                            ) : ''}

                        </TextField>

                        let checkboxField = <FormControlLabel
                            control={<Checkbox
                                checked={nestedItem.value}
                                onChange={this.handleChange}
                                name="checkedA" />}
                            label={nestedItem.displayName}
                        />

                        let fieldView = (nestedItem.type === "checkbox") ? checkboxField : txtField
                        return (<Grid item xs={12} md={6} key={nestedIndex}
                            style={{ display: (nestedItem.hidden ? 'flex' : '') }}>

                            {fieldView}

                        </Grid >)



                    })}</Grid>
                )
            })



            )
        }
    }

    handleNext = async (e) => {
        try {
            const { activeStep } = this.state;
            let { addMemberFormData } = this.state;

            let formInputData = [...this.state.stepContent];
            let formInputDataValid = await util.validateFormData(formInputData);
            console.log("formInputDataValid .. " + JSON.stringify(formInputDataValid))

            this.setState({ "stepContent": formInputDataValid })

            let result = formInputDataValid.find((item) => {
                if (item.error.length) return item;
            })


            if (result === undefined) {
                if (activeStep === (this.getNumberOfSteps() - 1)) {
                    let { data } = this.props;

                    let memberFormData = [...this.state.memberFormData];
                    memberFormData = [...this.state.memberFormData, ...this.state.stepContent]
                    this.setState({ "memberFormData": memberFormData, "status": false, "message": "" })

                    let apiData = await util.filterFormData(this.state.memberFormData);
                    let otherRoleDetails = []
                    if (apiData.sales)
                        otherRoleDetails.push({ "role": "sales" })
                    if (apiData.purchase)
                        otherRoleDetails.push({ "role": "purchase" })
                    apiData.otherRoleDetails = otherRoleDetails
                    console.log("apiData .. " + JSON.stringify(apiData))
                    apiData["isRoot"] = false;
                    apiData["pId"] = "root"
                    apiData["rootId"] = "5ec28dd9b3ef9e0017b7a6b5";
                    apiData["pRole"] = "rootorganization";

                    console.log("data props ... "+JSON.stringify(data))
                    if (AuthService.getUserRole() === "supplier") {
                        apiData["vendorId"] = AuthService.getUserId()
                        apiData["vendorRole"] = AuthService.getUserRole()
                        if (data && data.role == "business") apiData["connectionType"] = "b2s"
                    }

                    let url = (data && data.role === "supplier") ? "createSupplier" : "createBusiness";



                    APIService.apiCall("POST", apiData, url)
                        .then(res => res.json())
                        .then(res => {

                            if (res) {
                                let status = (res.status && res.status == "success") ? true : false
                                let message = (status) ? "The entity " + apiData.orgName + " has been registered successfully." : 'Registration Error'
                                this.setState({ "status": status, "message": message });


                                setTimeout(function () {

                                    if (this.state.status) {
                                        this.resetForm()
                                    }
                                }.bind(this), 1000)


                            }



                        }).catch(error => {
                            commons.errorLog(error)
                        });



                }
                else {
                    let nextStep = activeStep + 1;
                    let stepContent = addMemberFormData.find(item => item.step === nextStep);
                    if (stepContent && stepContent.formData) {
                        let memberFormData = []

                        memberFormData = [...this.state.memberFormData, ...this.state.stepContent]


                        this.setState({ "stepContent": stepContent.formData, "activeStep": nextStep, "memberFormData": memberFormData })

                    }
                }
            }
        } catch (e) {
            commons.errorLog(e)
        }
    }


    // Similar for back and reset buttons
    handleBack = () => {
        const { activeStep, addMemberFormData } = this.state;
        let backStep = activeStep - 1;
        let stepContent = addMemberFormData.find(item => item.step === backStep);
        if (stepContent && stepContent.formData) {
            this.setState({ "stepContent": stepContent.formData, "activeStep": backStep })

        }


    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes, data } = this.props;
        const { activeStep, status, message } = this.state;

        return (<div>
            <Card className={classes.card} style={{ margin: '10px' }}>
                <CardHeader
                    title={(data && data.title) ? data.title : 'Register Bussiness'}
                    style={{ textAlign: 'center' }}
                />
                <CardContent>

                    {this.state.showForm ? (<div>
                        <Stepper activeStep={activeStep} connector={<StepConnector />}>
                            {this.getSteps()}
                        </Stepper>

                        <div>
                            {activeStep === this.getNumberOfSteps() ? (
                                <div>
                                    <Typography className={classes.instructions}>
                                        All steps completed - you&quot;re finished
                  </Typography>
                                    <Button onClick={this.handleReset} className={classes.button}>
                                        Reset
                  </Button>
                                </div>
                            ) : (
                                    <div>
                                        {this.getStepContent(activeStep)}

                                        <br /><br />
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="contained" color="primary" size="small"
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                    </Button>
                                            <Button
                                                variant="contained" color="primary" size="small"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === this.getNumberOfSteps() - 1 ? 'Submit' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                        </div>

                    </div>) : (<Typography
                        color="error" variant="subtitle2" style={{ margin: '5px', width: '500px', overflowWrap: 'break-word' }}>Registered organization limit exceeded, please contact administrator</Typography>)}

                </CardContent>
                <CardActions style={{
                    justifyContent: 'flex-end'
                }}>

                </CardActions>

            </Card>
            {message.length > 0 ?

                (status ? <SnackBarWidget classes={classes} message={message}
                    type="success" /> : <SnackBarWidget classes={classes} message={message}
                        type="error" />) : ''
            }


        </div>)
    }
}