
import React from 'react';
import { APIService, AuthService } from "../../service";
import { SnackBarWidget } from "../Widgets";

import { Typography, Button, Paper, Checkbox, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core"
// import { ROOT_ID } from '../../constants/urlConstants';
import { commons } from "../../utils";
import MaterialTable from 'material-table';
import ReceiptIcon from '@material-ui/icons/Receipt';

let columns = [
    { title: 'Name', field: 'orgName', render: rowData => commons.titleCase(rowData.orgName), editable: 'never' },
    { title: 'Due Date', field: 'dueDate', render: rowData => commons.toDateFormat(rowData.dueDate) },
    { title: 'Amount', field: 'invoiceAmt' },

]
class InvoiceView extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            "memberList": [],
            "selectedRows": [],
            "selectedIDs": [],
            "status": false,
            "message": ""
        }

    }

    componentDidMount() {
        this.refreshComponent()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.city !== this.props.city || prevProps.role !== this.props.role) {
            this.refreshComponent()
        }
    }

    refreshComponent() {
        let { city, role } = this.props
        this.setState({ "message": "", "status": false, "memberList": [] })
        let params = {
            "city": city,
            "role": role
        }

        if (AuthService.getUserRole() === "supplier") {
            params["connectorId"] = AuthService.getUserId()
            params["connectionType"] = "b2s"
        }


        APIService.apiCall("POST", params, "getDefaultInvoices")
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



    generateInvoice = () => {
        const { selectedRows } = this.state;

        let params = {};
        const ids = [];
        selectedRows.map((item) => {
            ids.push({ "userId": item.userId, "dueDate": item.dueDate, "amount": item.invoiceAmt, "type": "default", "senderId": AuthService.getUserId() });
        })
        params["invoiceData"] = ids;
        APIService.apiCall("POST", params, "generateInvoice")
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let status = (res.status && res.status == "success") ? true : false
                    let message = (status) ? "Invoice generated" : 'Invoice Error'
                    this.setState({ "status": status, "message": message });

                }

            }).catch(error => {
                commons.errorLog(error)
            });


    }

    render() {
        const { classes } = this.props
        const { memberList, selectedIDs, rowsPerPage, page, status, message } = this.state;
        console.log(message + " ... 456... " + status)


        return (<div className={classes.pageContent}>
            <Paper elevation={3} square variant="outlined">
                <br />


                <MaterialTable
                    title=""
                    columns={columns}
                    data={memberList}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...this.state.memberList];
                                    const index = oldData.tableData.id;
                                    console.log(newData)
                                    //if(newData.dueDate)

                                    if (commons.isValidDate(newData.dueDate) && parseInt(newData.invoiceAmt) && parseInt(newData.invoiceAmt) > 0) {
                                        newData.invoiceAmt = parseInt(newData.invoiceAmt)
                                        dataUpdate[index] = newData;
                                        this.setState({ "memberList": [...dataUpdate] })
                                        resolve();
                                    }
                                    else {
                                        if (!commons.isValidDate(newData.dueDate)) alert("Invalid Date")
                                        if (!parseInt(newData.invoiceAmt) || parseInt(newData.invoiceAmt) < 0) alert("Invalid Invoice Amount")

                                        resolve();

                                    }

                                }, 1000)
                            }),
                    }}
                    options={{
                        selection: true,
                        rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? '#C0C0C0' : '' }),
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        paging: false,
                        actionsColumnIndex: -1

                    }}
                    actions={[
                        {
                            tooltip: 'Generate Invoice',
                            icon: 'receipt',
                            onClick: (evt, data) => { console.log(JSON.stringify(data)); }
                        }
                    ]}
                    onSelectionChange={(rows) => {
                        this.setState({ selectedRows: rows })
                    }


                    }

                />

                <Button
                    size="small"
                    variant="contained" align="right" color="primary"
                    style={{ float: 'right', marginLeft: 'auto', margin: '10px' }}
                    onClick={(e) => this.generateInvoice(e)}
                >Generate Invoice</Button>




                {status ? (<SnackBarWidget classes={classes} message={message}
                    type="success" />) : <SnackBarWidget classes={classes} message={message}
                        type="error" />}
            </Paper>
        </div>)
    }
}

export default InvoiceView;
