import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Paper, Switch, Box, Button } from '@material-ui/core';
import { title } from "../../constants/appConstants"
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { APIService, AuthService } from "../../service"
import { Grid } from "@material-ui/core"
import compStyles from '../../styles/compStyle';
import logo from "../../assets/whizdatalogo.svg";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { commons } from '../../utils';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,

    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        flexGrow: 1,
        marginLeft: drawerWidth
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            // width: `calc(100% - ${drawerWidth}px)`,
            // marginLeft: drawerWidth,
        },
    },
}));

const HomeTopBar = (props) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [logoutOpen, setLogoutOpen] = React.useState(false);

    const userInfo = localStorage.getItem("userInfo");
    const status = (userInfo != null) ? true : false;

    const custName = (AuthService.getUserRole() === undefined || AuthService.getUserRole() === "rootorganization") ? false : true

    const titleName = "Admin Dashboard";


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const handleLogoutClose = (event) => {
        setLogoutOpen(false);

    }
    const toggleLogout = (event) => {
        setLogoutOpen(true);

    }

    const handleLogout = (event) => {

        setLogoutOpen(true);

        APIService.apiCall("POST", {}, "logout")
            .then(res => res.json())
            .then(res => {

                localStorage.setItem("login", false);
                localStorage.clear();
                window.location.href = '/';
            })
            .catch(error => commons.errorLog(error))
    }


    return (

        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar className={classes.toolbar}>

                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >

                        <Grid item md={1}>
                            {status ? <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit" aria-label="menu"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton> : ''}

                        </Grid>
                       
                        <Grid item md={10}
                        >
                            <Typography
                                gutterBottom
                                component="h2"
                                className={classes.title}
                                variant="h6"
                            >
                                {titleName}
                            </Typography>
                        </Grid>
                        

                        <Grid item md={1} >

                            {status ? (<IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleLogout}>
                                <ExitToAppIcon id="themeId" />
                            </IconButton>) : ''}
                        </Grid>

                    </Grid>

                </Toolbar>
            </AppBar>
            {status ? <SideBar open={mobileOpen} close={handleDrawerToggle} />
                : ''}



            <Dialog
                open={logoutOpen}
                onClose={handleLogoutClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutClose} color="primary">
                        Cancel
              </Button>
                    <Button color="primary" autoFocus onClick={handleLogout}>
                        OK
              </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}


export default HomeTopBar;


