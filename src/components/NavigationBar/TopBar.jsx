import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { appConstants } from "../../constants"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));

const TopBar = (props) => {
    const classes = useStyles();
    const userInfo = localStorage.getItem("userInfo");
    const status = (userInfo !== null && userInfo !== undefined && userInfo !== "null") ? true : false;


    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {/* {logo} */}
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        {appConstants.title}
                    </Typography>
                    {(status || props.page == "login") ? '' : <Button color="inherit" component={Link} to="/login">Login</Button>}

                </Toolbar>
            </AppBar>

        </div>
    )
}

export default TopBar;
