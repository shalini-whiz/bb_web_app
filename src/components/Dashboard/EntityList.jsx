
import React from 'react';
import { APIService, AuthService } from "../../service";
import { SnackBarWidget, DialogWidget } from "../Widgets";

import { Typography, Button, Paper, Checkbox, Grid, Select } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core"
// import { ROOT_ID } from '../../constants/urlConstants';
import { commons } from "../../utils";
import { menuData, invoiceDayList } from "../../constants"
import MaterialTable from 'material-table';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Link from '@material-ui/core/Link';
import EntityView from "./EntityView";

let columns = [
    {
        title: 'Name', field: 'orgName',
        render: rowData => commons.titleCase(rowData.orgName), editable: 'never'
    },
    { title: 'Abbreviation', field: 'dueDate', render: rowData => rowData.code.toUpperCase(), editable: 'never' },
    { "title": "Phone No", field: "phoneNo", editable: 'never' },
    { "title": "Email", field: "email", editable: 'never' },
    {
        "title": "Invoice Day", field: "invoiceDay",
        editComponent: rowData => (
            <select
                type="text"
                value={rowData.value}
                onChange={e => rowData.onChange(e.target.value)}
            >
                {invoiceDayList.map(item => {
                    return (<option>{item.value}</option>)
                })}
            </select>
        )
        //editComponent: rowData => {
        //     console.log(rowData.invoiceDay)
        //     return (
        //         <Select
        //             id="invoiceDay"
        //             // className={classes.formControlTopMarginAdjustment}
        //             onChange={(e) => {
        //                 // console.log(rowData);
        //                 // console.log(e.target.value)
        //             }}
        //             value={rowData.invoiceDay}
        //         >
        //             {invoiceDayList.map(item => {
        //                 return (<option>{item.value}</option>)
        //             })}
        //         </Select>
        //     )
        // },
    },
    { title: 'Amount', field: 'invoiceAmt' },

]
class EntityList extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            "memberList": [],
            "showUserDialog": false,
            "showDialog": false,
            "userId": "",
            "dialogTitle": "",
            "okTitle": "",
            "okDialog": undefined,
            "status": false,
            "message": ""
        }
        columns.find(item => {
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
    }

    componentDidMount() {
        this.refreshComponent()
    }

    refreshComponent() {

        let roleItem = menuData.find((item) => {
            return (item.role.toLowerCase() === AuthService.getUserRole())
        })
        console.log("roleItem .. " + JSON.stringify(roleItem))

        let role = "";
        if (roleItem)
            role = roleItem.descendantRole;




        this.setState({
            "status": false, "memberList": [],
            "message": "",
            "showDialog": false,
            "showUserDialog": false,
            "userId": "", "dialogTitle": "", "okTitle": "", "okDialog": undefined
        })



        let params = {
            "role": role
        }
        if (AuthService.getUserRole() === "supplier") {
            params["connectorId"] = AuthService.getUserId()
            params["connectionType"] = "b2s"
        }

        APIService.apiCall("POST", params, "getEntityDetails")
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

    handleUserDialog = (e, userId) => {
        this.setState({ "showUserDialog": true, "userId": userId, showDialog: false })
    }

    closeDialog = () => {
        this.setState({ showUserDialog: false, "userId": "", showDialog: false })
    }

    setDefaultInvoice = (entityData) => {
        console.log("entityData ... " + JSON.stringify(entityData));
        let params = {}
        params["userId"] = entityData.userId;
        params["invoiceDay"] = parseInt(entityData.invoiceDay)
        params["invoiceAmt"] = parseInt(entityData.invoiceAmt);

        APIService.apiCall("POST", params, "setDefInvoice")
            .then(res => res.json())
            .then(res => {

                let status = (res.status && res.status == "success") ? true : false;
                let successTxt = commons.titleCase(entityData.orgName) + " ";
                successTxt += " invoice defaults updated successfully";
                let message = (status) ? successTxt : 'Error'
                this.setState({ "status": status, "message": message });
                setTimeout(function () {
                    if (this.state.status) {
                        this.refreshComponent()
                        return true;
                    }
                }.bind(this), 1000)



            }).catch(error => {
                commons.errorLog(error)
            });

    }
    setInvoiceStatus = () => {
        const { selectedItem } = this.state;
        console.log("selectedItem .. " + JSON.stringify(selectedItem));

        let params = {}
        params["userId"] = selectedItem.userId;
        params["status"] = (selectedItem.invoiceStatus === "active") ? "inactive" : "active";

        if (AuthService.getUserRole() === "supplier") {
            params["connectorId"] = AuthService.getUserId()
            params["type"] = "b2s"
        }
        //setInvoice
        APIService.apiCall("POST", params, "disableInvoice")
            .then(res => res.json())
            .then(res => {

                let status = (res.status && res.status == "success") ? true : false;
                let successTxt = commons.titleCase(selectedItem.orgName) + " ";
                successTxt += (selectedItem.invoiceStatus === "active") ? "disabled" : "enabled";
                successTxt += " successfully";

                let message = (status) ? successTxt : 'Error'
                this.setState({ "status": status, "message": message });


                setTimeout(function () {

                    if (this.state.status) {
                        this.refreshComponent()
                    }
                }.bind(this), 1000)



            }).catch(error => {
                commons.errorLog(error)
            });

    }

    render() {
        const { classes } = this.props
        const { memberList, rowsPerPage, page, status, message,
            showUserDialog, showDialog, dialogTitle, okDialog, okTitle } = this.state;
        console.log(message + " ... 456... " + status)


        let roleItem = menuData.find((item) => {
            return (item.role.toLowerCase() === AuthService.getUserRole())
        })
        console.log("roleItem .. " + JSON.stringify(roleItem))

        let role = "";
        if (roleItem)
            role = roleItem.descendantRole;

        let data = { "role": role }


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

                                    if (parseInt(newData.invoiceAmt) && parseInt(newData.invoiceAmt) > 0 && parseInt(newData.invoiceDay) && parseInt(newData.invoiceDay) > 0 && parseInt(newData.invoiceDay) < 31) {
                                        newData.invoiceAmt = parseInt(newData.invoiceAmt)
                                        dataUpdate[index] = newData;
                                        let res = this.setDefaultInvoice(newData);
                                        console.log("res .. " + res)
                                        if (res) {
                                            this.setState({ "memberList": [...dataUpdate] })

                                        }
                                        resolve();
                                    }
                                    else {
                                        if (!parseInt(newData.invoiceAmt) || parseInt(newData.invoiceAmt) < 0) alert("Invalid Invoice Amount")
                                        if (!parseInt(newData.invoiceDay) || parseInt(newData.invoiceDay) < 0 || parseInt(newData.invoiceDay) > 31) alert("Invalid Invoice Day")

                                        resolve();

                                    }

                                }, 1000)
                            }),
                    }}
                    options={{
                        rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? '#C0C0C0' : '' }),
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        paging: false,
                        actionsColumnIndex: -1

                    }}
                    actions={[
                        rowData => (
                            true ?
                                {
                                    icon: render => (<Button
                                        color="primary"
                                        variant="contained"
                                        style={{ textTransform: 'none' }}
                                        size="small"
                                    >
                                        {rowData.invoiceStatus === "active" ? 'Disable' : 'Enable'}
                                    </Button>),
                                    tooltip: '',
                                    onClick: (event, rowData) => {
                                        let titleTxt = (rowData.invoiceStatus === "active") ? "Disable " : "Enable ";
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

                    ]}


                />


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
                        data={data}
                    />}

                    closeDialog={this.closeDialog}
                />) : ('')}

                {message.length ?
                    (status ? (<SnackBarWidget classes={classes} message={message}
                        type="success" />) : <SnackBarWidget classes={classes} message={message}
                            type="error" />) : <div></div>}


            </Paper>
        </div>)
    }
}

export default EntityList;
