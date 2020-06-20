import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { fetchFormByType } from "../../schema";
import { AuthService, APIService } from "../../service"
import { Paper, useForkRef } from '@material-ui/core';
import { SnackBarWidget } from "../Widgets";
import { MenuItem } from '@material-ui/core';
import { FormGenerator } from "../../lib";
import { util, commons } from '../../utils';



export default class PaymentOffline extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            "paymentForm": [],
            "editMode": true,
            "status": false,
            "message": ""
        }

    }

    componentDidMount() {
        let paymentOffline = fetchFormByType("paymentOffline")
        this.setState({ "paymentForm": paymentOffline }, function () {
        });
    }


    handleChange = (e) => {
        let formDataInput = [...this.state.paymentForm];
        formDataInput.find((item) => {
            if (item.key === e.target.name) {
                if (item.type === "number") item.value = parseInt(e.target.value)
                else if (item.type == "date" && item.key === "transactionDate") {
                    let dateValid = commons.checkIfPastDate(e.target.value);
                    console.log("dateValid ... " + dateValid)
                    if (!dateValid) item.error = "Future date allowed"
                    else item.error = ""
                }

                item.value = e.target.value;

            }
        })
        this.setState({ paymentForm: formDataInput });
    }

    setPaymentDetails = async (e) => {
        console.log("set payment here ")
        let paymentData = [...this.state.paymentForm];
        let paymentFormData = await util.validateFormData(paymentData);
        this.setState({ "paymentForm": paymentFormData })
        let result = paymentFormData.find((item) => {
            if (item.error.length) return item;
        });
        paymentFormData.find(item => {
            if (item.key === "transactionDate") {
                let dateValid = commons.checkIfPastDate(item.value);
                if (!dateValid) item.error = "Future date allowed"
                else item.error = ""
            }
        });


        this.setState({ "paymentForm": paymentFormData })
        result = paymentFormData.find((item) => {
            if (item.error.length) return item;
        });

        if (!result) {
            let formData = await util.filterFormData(paymentFormData);

            console.log("formData .. " + JSON.stringify(formData))
            let params = Object.assign({
                "transactionBy": AuthService.getUserId(),
                "_id": this.props.invoiceData._id
            }, formData);
            console.log("params .. " + JSON.stringify(params))

            APIService.apiCall("POST", params, "setOfflinePayment")
                .then(res => res.json())
                .then(res => {

                    let status = (res.status && res.status == "success") ? true : false;
                    let message = (status) ? "Payment details modified successfully" : 'Payment Details  Error'
                    this.setState({ "status": status, "message": message });

                    setTimeout(function () {

                        if (this.state.status) {
                            this.setState({ "status": false });
                            this.props.cancelDialog();
                            this.props.reloadPage();
                        }
                    }.bind(this), 1000)

                }).catch(error => {
                    commons.errorLog(error)
                });


        }

    }


    render() {
        const { classes } = this.props;
        const { editMode, status, message, paymentForm } = this.state;



        let payment_groups = util.chunkArray(2, paymentForm)
        return (

            <div>
                <Card className={classes.card} style={{ margin: '10px' }}>
                    <CardHeader
                        title="Payment Details"

                    />
                    <CardContent>
                        <FormGenerator groups={payment_groups} groupBy={1}
                            onChange={this.handleChange} editMode={true} />

                    </CardContent>
                    <CardActions style={{
                        justifyContent: 'flex-end'
                    }}>
                        <Button variant="contained" color="primary" size="small" onClick={this.setPaymentDetails}>Save</Button>
                        <Button variant="contained" color="primary" size="small" onClick={this.props.cancelDialog}>Cancel</Button>
                    </CardActions>

                </Card>



                {message.length ?
                    (status ? (<SnackBarWidget classes={classes} message={message}
                        type="success" />) : <SnackBarWidget classes={classes} message={message}
                            type="error" />) : <div></div>}
            </div>
        )
    }








}