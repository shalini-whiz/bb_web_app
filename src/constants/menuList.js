import { RegisterEntity, EntityList } from "../components/Dashboard"
import { InvoiceView, ManageInvoice, FinanceSettings } from "../components/Finance"


let registerEntityMenu = [

    {
        title: "Register Business",
        value: 0,
        "role": "business",
        component: RegisterEntity

    },
    {
        title: "Business List",
        value: 1,
        component: EntityList

    },
    // {
    //     title: "Register Supplier",
    //     value: 1,
    //     role: "supplier",
    //     component: RegisterEntity
    // },
]


let invoiceMenu = [
    {
        title: "Manage",
        value: 0,
        component: ManageInvoice,
        //"data":{"role":"business"}
    },
    {
        title: "Invoices",
        value: 1,
        component: InvoiceView,
        // "data":{"role":"business"}

    },
    {
        title: "Settings",
        value: 2,
        component: FinanceSettings,
        // "data":{"role":"business"}

    }

]

export const fetchMenu = (type) => {
    if (type == "registerEntity") return registerEntityMenu
    else if (type == "financeInvoices") return invoiceMenu
}

