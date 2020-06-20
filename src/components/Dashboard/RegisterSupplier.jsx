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



let addMemberFormData = fetchFormByType("registerSupplier");



export default class RegisterSupplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            activeStep: 0,
            "stepContent": [],
            "memberFormData": [],
            "status": false,
            "message": "",
            maxUsers: 0,
            maxConUsers: 0,
            maxCust: 0

        };
        this.getSteps = this.getSteps.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
        this.presetValue = this.presetValue.bind(this);


    }



    componentDidMount() {

        this.reloadComponent();
        let defaultFormData = addMemberFormData.find(item => item.step === 0);
        this.setState({ "stepContent": defaultFormData.formData });


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
        addMemberFormData = fetchFormByType("registerSupplier");
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
        this.setState({ stepContent: formDataInput });
    }

    presetValue = (e) => {
        if (e.key === "rootId" || e.key === "pId" || e.key == "role") {
            let formDataInput = [...this.state.stepContent];

            // if (e.key === "rootId") {

            //     formDataInput.find((item) => {
            //         if (item && item.key === e.key) {
            //             item.value = this.props.rootId;

            //         }
            //     })
            // }
            // else if (e.key === "pId") {

            //     formDataInput.find((item) => {
            //         if (item && item.key === e.key) {
            //             item.value = this.props.pId;
            //         }
            //     })
            // }
            // else if (e.key == "role" && this.props.menuItem && this.props.menuItem.role) {
            //     formDataInput.find((item) => {
            //         if (item && item.key === e.key) {
            //             item.value = this.props.menuItem.role;
            //         }
            //     })
            // }




        }

    }
    getStepContent(step) {

        let stepContent = addMemberFormData.find(item => item.step === step);
        if (stepContent && stepContent.formData) {
            let sortResult = util.sortArr(stepContent.formData, "order");
            let chunk_size = 2;
            let groups = util.chunkArray(chunk_size, sortResult);

            return (groups.map((item, index) => {
                return (
                    <Grid container spacing={1} alignItems="flex-end" key={index}>{item.map((nestedItem, nestedIndex) => {

                        if (nestedItem.presetValue) this.presetValue(nestedItem)
                        const styleObj = {};
                        if (nestedItem.hidden) styleObj["display"] = "none";
                        let inputProps = {}


                        return (<Grid item xs={12} md={6} key={nestedIndex}
                            style={{ display: (nestedItem.hidden ? 'flex' : '') }}>

                            <TextField id="component-simple"

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


                        </Grid >)



                    })}</Grid>
                )
            })



            )
        }
    }

    handleNext = async (e) => {
        const { activeStep, handleChildUpdate } = this.state;
        let formInputData = [...this.state.stepContent];
        let formInputDataValid = await util.validateFormData(formInputData);

        //  commons.compareDate(affIdStDt,affIdClsDt);

        formInputDataValid = commons.affValiations(formInputDataValid);


        this.setState({ "stepContent": formInputDataValid })

        let result = formInputDataValid.find((item) => {
            if (item.error.length) return item;
        })

        if (result === undefined) {
            this.setState({ "status": false });
            if (activeStep == (this.getNumberOfSteps() - 1)) {
                this.setState({ "status": false, "message": "" })

                let memberFormData = [...this.state.memberFormData];
                memberFormData = [...this.state.memberFormData, ...this.state.stepContent]
                this.setState({ "memberFormData": memberFormData })
                let apiData = await util.filterFormData(this.state.memberFormData);
                //service call here


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
    }


    // Similar for back and reset buttons
    handleBack = () => {
        const { activeStep } = this.state;
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
                    title={(data && data.title) ? data.title : 'Register Supplier'}
                    style={{ textAlign: 'center' }}
                />
                <CardContent>

                    {this.state.showForm ? (<div>
                        <Stepper activeStep={activeStep}>
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


                                        <div>
                                            <Button
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
            {/* {message.length > 0 ?

                (status ? <SnackBarInfo classes={classes} message={message}
                    type="success" /> : <SnackBarInfo classes={classes} message={message}
                        type="error" />) : ''
            } */}


        </div>)
    }
}