import React from 'react';
import { commons } from "../../../utils"

export const paymentReportColumns = [
    {
        title: 'Name', field: 'orgName', editable: 'never',
        render: rowData => (
            commons.titleCase(rowData.orgName)
        ),
        // cellStyle: {
        //     width: '35%',
        //     maxWidth: '35%',
        // },
        // headerStyle: {
        //     width: '35%',
        //     maxWidth: '35%',
        // }
    },
    {
        title: 'Due Date', field: 'dueDate',
        render: rowData => commons.toDateFormat(rowData.dueDate),
        // cellStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
        // headerStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // }
    },
    {
        title: 'Amount', field: 'amount',
        // cellStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
        // headerStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
        type: 'numeric'

    },
    {
        title: 'Mode', field: 'paymentMode',
        // cellStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
        // headerStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
    },
    {
        title: 'Paid On', field: 'transactionDate',
        render: rowData =>  commons.toDateFormat(rowData.transactionDate),
        // cellStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
        // headerStyle: {
        //     width: '15%',
        //     maxWidth: '15%',
        // },
    },

]


