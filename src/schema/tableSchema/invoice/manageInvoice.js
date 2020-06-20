import React from 'react';
import { commons } from "../../../utils"

export const genInvoiceColumns = [
    {
        title: 'Name', field: 'orgName', editable: 'never',
        render: rowData => (
            commons.titleCase(rowData.orgName)
        ),
        cellStyle: {
            width: '35%',
            maxWidth: '35%',
        },
        headerStyle: {
            width: '35%',
            maxWidth: '35%',
        }
    },
    {
        title: 'Due Date', field: 'dueDate',
        render: rowData => commons.toDateFormat(rowData.dueDate),
        cellStyle: {
            width: '25%',
            maxWidth: '25%',
        },
        headerStyle: {
            width: '25%',
            maxWidth: '25%',
        }
    },
    {
        title: 'Payment', field: 'paymentStatus', editable: 'never',
        render: rowData => {
            return rowData.paymentStatus === "due" ? <span style={{ color: "#FF0000" }}>{rowData.paymentStatus.toUpperCase()}</span> :
                rowData.paymentStatus.toUpperCase()
        },
        cellStyle: {
            width: '15%',
            maxWidth: '15%',
        },
        headerStyle: {
            width: '15%',
            maxWidth: '15%',
        }
    },
    {
        title: 'Amount', field: 'amount',
        cellStyle: {
            width: '15%',
            maxWidth: '15%',
        },
        headerStyle: {
            width: '15%',
            maxWidth: '15%',
        },
        type: 'numeric'

    },

]


