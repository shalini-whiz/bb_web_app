import { red, green } from "@material-ui/core/colors";

const drawerWidth = 20;

const compStyles = (theme) => ({



    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,


    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    drawer: {
        // [theme.breakpoints.up('sm')]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        // },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%"
        },
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        // width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "white",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        //height: "100vh"

    },
    pageContent: {
        margin: theme.spacing(1)
    },

    subContent: {
        margin: theme.spacing(1)
    },

    paperContent: {
        padding: theme.spacing(3, 2),

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#ff0000',
    },
    error: {
        color: 'red'
    },
    success: {
        color: 'green'
    },
    sideBar: {
        marginTop: 64
    },
    list: {
        // backgroundColor: '#202020',

    },
    divider: {
        //  backgroundColor: '#ffffff'
    },
    listItem: {
        //  color: '#ffffff',
        "&:hover": {
            opacity: 0.5
        }

    },
    links: {
        textDecoration: "none"
    },
    menuHeader: {
        paddingLeft: "15px",
        // color: '#000000'
    },
    formTitle: {
        //  color: "#ffffff",
        //   backgroundColor: red[400],e
    },
    successSnackView: {
        backgroundColor: green[600],
        // color:"#ffffff"
    },
    failureSnackView: {
        backgroundColor: red[600],
        // color:"#ffffff"
    },
    

});


export default compStyles;