
import React from 'react';
import { APIService, AuthService } from "../../service";
import { SnackBarWidget, DialogWidget } from "../Widgets";

import { Typography, Button, Paper, Checkbox, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core"
// import { ROOT_ID } from '../../constants/urlConstants';
import { commons } from "../../utils";
import { statusList, genInvoiceColumns, paymentReportColumns } from "../../schema"
import MaterialTable from 'material-table';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Link from '@material-ui/core/Link';
import { EntityView } from "../Dashboard";
import PaymentOffline from "./PaymentOffline";
import { Document, Page, pdfjs } from 'react-pdf';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

let buttonList = [
    // { label: "View active", actionName: "invoiceReport", "data": { "status": "active" } },
    // { label: "View disabled", actionName: "invoiceReport", "data": { "status": "inactive" } },
    //{ label: "Payment report", actionName: "invoiceReport", "data": { "paymentStatus": "paid" } },

]
class ManageInvoice extends React.Component {

    constructor(props) {
        super(props)
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        this.state = {
            "memberList": [],
            "selectedRows": [],
            "selectedIDs": [],
            "status": false,
            "message": "",
            "showDialog": false,
            "showUserDialog": false,
            "showPaymentDialog": false,
            "invoiceData": undefined,
            "userId": undefined,
            "dialogTitle": "",
            "okTitle": "",
            "okDialog": undefined,
            "selectedItem": undefined,
            "downloadPdf": false,
            "pdfData": "",
            numPages: null,
            pageNumber: 1,
            invoiceStatus: "all"
        }
        genInvoiceColumns.find(item => {
            if (item.field == "orgName") {
                item.render = rowData => (
                    <Typography component="div">
                        <Link
                            onClick={(e) =>
                                this.handleUserDialog(e, rowData.userId)
                            }
                        >
                            {commons.titleCase(rowData.orgName)}
                        </Link>
                    </Typography>
                )
            }
        })

        this.refreshComponent = this.refreshComponent.bind(this)


    }

    componentDidMount() {
        this.refreshComponent()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.city !== this.props.city || prevProps.role !== this.props.role) {
            this.refreshComponent()
        }
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    refreshComponent() {
        let { city, role } = this.props
        this.setState({ "message": "", "status": false, "memberList": [] })
        let params = {
            "city": city,
            "role": role
        }

        APIService.apiCall("POST", params, "getInvoices")
            .then(res => res.json())
            .then(res => {

                if (res && res.status == "success" && res.data) {
                    const userList = res.data.map((item, index) => {
                        let json = item.roles[0];
                        item.indDet = json;
                        item.orgName = json.profile.orgName
                        return item;
                    })
                    this.setState({ "memberList": userList })
                }
            }).catch(error => {
                commons.errorLog(error)
            });
    }

    handleFilter = (filter, item) => {
        this.setState({ invoiceStatus: filter }, function () {
            console.log("filter " + filter)
            console.log("item " + JSON.stringify(item))

            if (filter === "all")
                this.refreshComponent()
            else {
                this.invoiceReport(item.data)
            }

        });
    }
    handlePaymentDialog = (e, invoice) => {
        //showPaymentDialog
        console.log("payment ... " + JSON.stringify(invoice))
        this.setState({ showPaymentDialog: true, invoiceData: invoice })
    }

    downloadReceipt = (e, invoice) => {
        console.log("payment ... " + JSON.stringify(invoice))
        let titleTxt = "Download Receipt";
        this.setState({
            "showDialog": (!this.state.showDialog),
            "selectedItem": invoice,
            "dialogTitle": titleTxt,
            "okTitle": "OK",
            okDialog: this.downloadReceiptPdf
        })
    }

    downloadReceiptPdf = () => {
        const { selectedItem } = this.state;
        console.log("selectedItem .. " + JSON.stringify(selectedItem));
        let params = {}
        params["_id"] = selectedItem._id;

        APIService.apiCall("POST", params, "invoiceReceipt")
            .then(res => res.json())
            .then(res => {
                this.setState({"showDialog":false,selectedItem:undefined,"dialogTitle":"","okTitle":"",okDialog:undefined})
                if (res.status && res.status === "success" && res.data) {
                    const byteCharacters = atob(res.data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    // this.state.pdf = new Blob([byteArray], { type: 'application/pdf' });


                    this.setState({ downloadPdf: true, pdfData: res.data })
                    window.open(`data: application / pdf; base64, ${res.data}`)

                    //this.setState({ downloadPdf: true, pdfData: new Blob([byteArray], { type: 'application/pdf' }) })

                }
            }).catch(error => {
                commons.errorLog(error)
            });


    }
    handleUserDialog = (e, userId) => {
        this.setState({ "showUserDialog": true, "userId": userId })
    }

    closeDialog = () => {
        this.setState({ showDialog: false, showUserDialog: false, showPaymentDialog: false })
    }
    setInvoiceStatus = () => {
        const { selectedItem } = this.state;
        console.log("selectedItem .. " + JSON.stringify(selectedItem));

        let params = {}
        params["_id"] = selectedItem._id;
        params["status"] = (selectedItem.status === "active") ? 'inactive' : 'active';
        //setInvoice
        APIService.apiCall("POST", params, "setInvoice")
            .then(res => res.json())
            .then(res => {

                let status = (res.status && res.status == "success") ? true : false;
                let successTxt = commons.titleCase(selectedItem.orgName) + " ";
                successTxt += (selectedItem.status === "active") ? "disabled" : "enabled";
                successTxt += " successfully";

                let message = (status) ? successTxt : 'Invoice Error'
                this.setState({ "status": status, "message": message });


                setTimeout(function () {

                    if (this.state.status) {
                        this.setState({ "showDialog": false, "dialogTitle": "", selectedItem: undefined });
                        this.refreshComponent()
                    }
                }.bind(this), 1000)



            }).catch(error => {
                commons.errorLog(error)
            });

    }

    invoiceReport = (data, status) => {
        console.log(JSON.stringify(data))
        console.log(this.props.city)
        if (data && data.paymentStatus == "paid") {
            this.setState({ invoiceStatus: "paid" })
        }

        let params = Object.assign(data, { "city": this.props.city })
        APIService.apiCall("POST", params, "getInvoices")
            .then(res => res.json())
            .then(res => {

                if (res && res.status == "success" && res.data) {
                    const userList = res.data.map((item, index) => {
                        let json = item.roles[0];
                        item.indDet = json;
                        item.orgName = json.profile.orgName
                        return item;
                    })
                    this.setState({ "memberList": userList })
                }
                else {
                    this.setState({ "memberList": [] })
                }
            }).catch(error => {
                commons.errorLog(error)
            });
    }

    render() {
        const { classes } = this.props
        const { memberList, status, message, showDialog, selectedItem,
            dialogTitle, okTitle, okDialog, downloadPdf, pdfData,
            showUserDialog, showPaymentDialog, pageNumber, numPages, invoiceStatus
        } = this.state;


        console.log("invoiceStatus .." + invoiceStatus)



        const statusSelection = statusList.map((item, index) => {
            return (<FormControlLabel key={index}
                control={
                    <Checkbox
                        checked={this.state.invoiceStatus == item.value}
                        onChange={() => this.handleFilter(item.value, item)}
                        value={item.label}
                        color="primary"
                    />
                }
                label={item.label}
            />)
        })



        return (<div className={classes.pageContent}>
            <Paper elevation={3} square variant="outlined">
                <FormGroup row style={{padding:'10px'}}>
                    {statusSelection}
                </FormGroup>


                

                {invoiceStatus != "paid" ? <MaterialTable
                    title=""
                    columns={genInvoiceColumns}
                    data={memberList}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...this.state.memberList];
                                    const index = oldData.tableData.id;

                                    if (commons.isValidDate(newData.dueDate) && parseInt(newData.amount) && parseInt(newData.amount) > 0) {
                                        newData.amount = parseInt(newData.amount)
                                        dataUpdate[index] = newData;
                                        this.setState({ "memberList": [...dataUpdate] })
                                        resolve();
                                    }
                                    else {
                                        if (!commons.isValidDate(newData.dueDate)) alert("Invalid Date")
                                        if (!parseInt(newData.amount) || parseInt(newData.amount) < 0) alert("Invalid Invoice Amount")

                                        resolve();

                                    }

                                }, 1000)
                            }),
                    }}
                    options={{
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },

                        paging: false,
                        actionsColumnIndex: -1,

                    }}
                    actions={[
                        rowData => (
                            invoiceStatus != "paid" ?
                                {
                                    icon: render => (<Button
                                        color="primary"
                                        variant="contained"
                                        style={{ textTransform: 'none' }}
                                        size="small"
                                    >
                                        {rowData.status === "active" ? 'Disable' : 'Enable'}
                                    </Button>),
                                    tooltip: 'Invoice',
                                    onClick: (event, rowData) => {
                                        console.log("invoiceStatus ... " + invoiceStatus)
                                        let titleTxt = (rowData.status === "active") ? "Disable " : "Enable ";
                                        titleTxt += commons.titleCase(rowData.orgName) + " Invoice ";
                                        this.setState({
                                            "showDialog": (!this.state.showDialog),
                                            "selectedItem": rowData,
                                            "dialogTitle": titleTxt,
                                            "okTitle": "Confirm",
                                            "okDialog": this.setInvoiceStatus
                                        })

                                    }


                                } : {

                                }
                        ),
                        ,
                        rowData => (
                            rowData.paymentStatus == "due" ? {
                                icon: 'payment',
                                title: 'payment',
                                onClick: (event, rowData) => { this.handlePaymentDialog(event, rowData) }
                            } : {
                                    icon: 'receipt',
                                    title: 'receipt',
                                    onClick: (event, rowData) => { this.downloadReceipt(event, rowData) }
                                }
                        ),
                    ]}
                /> : <MaterialTable
                title=""
                columns={paymentReportColumns}
                data={memberList}
                
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },

                    paging: false,
                    actionsColumnIndex: -1,

                }}
                actions={[
                    rowData => (
                        rowData.paymentStatus == "due" ? {
                            icon: 'payment',
                            title: 'payment',
                            onClick: (event, rowData) => { this.handlePaymentDialog(event, rowData) }
                        } : {
                                icon: 'receipt',
                                title: 'receipt',
                                onClick: (event, rowData) => { this.downloadReceipt(event, rowData) }
                            }
                    ),
                ]}
            />}

                < br /> <br />

                <Grid container justify="flex-end" spacing={4} style={{"align":"flex-end"}}>
                    {buttonList.map(item => {
                        return (
                            <Grid item md={4}>
                                <Button
                                    size="small"
                                    variant="contained" color="primary"
                                    onClick={(e) => this[item.actionName](item.data, "paid")}
                                >{item.label}</Button>
                            </Grid>
                        )
                    })}
                </Grid>

                {
                    showDialog ? <DialogWidget
                        closeDialog={this.closeDialog}
                        dialogTitle={dialogTitle}
                        okTitle={okTitle}
                        okDialog={okDialog}
                    >


                    </DialogWidget> : ''}

                {showUserDialog ? (<DialogWidget
                    dialogTitle="Profile"
                    dialogContent={<EntityView
                        classes={classes}
                        userId={this.state.userId}
                        data={this.props.data}
                    />}

                    closeDialog={this.closeDialog}
                />) : ('')}

                {showPaymentDialog ? (<DialogWidget
                    dialogTitle="Invoice Payment"
                    dialogContent={<PaymentOffline
                        classes={classes}
                        userId={this.state.userId}
                        data={this.props.data}
                        invoiceData={this.state.invoiceData}
                        cancelDialog={this.closeDialog}
                        reloadPage={this.refreshComponent}
                        city={this.props.city}
                        role={this.props.role}

                    />}

                    closeDialog={this.closeDialog}
                />) : ('')}

                {/* {downloadPdf ? <Document file={`data:application/pdf;base64,${pdfData}`}>
  <Page pageNumber={1} />
</Document> : ''} */}

                {status ? (<SnackBarWidget classes={classes} message={message}
                    type="success" />) : <SnackBarWidget classes={classes} message={message}
                        type="error" />}
            </Paper>
        </div >)
    }
}

export default ManageInvoice;
