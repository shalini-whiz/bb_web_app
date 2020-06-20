import React from 'react';
import { AuthService, APIService } from "../../service";
import { commons } from "../../utils";
import { TopBar } from "../NavigationBar"
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({

    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },

});



class HomeView extends React.Component {
    state = {
        userInfo: false,
        tokenStatus: false
    };


    componentDidMount() {
        //localStorage.clear();
        if (AuthService.checkToken().status === false) {
            APIService.apiCall("POST", {}, "guestToken")
                .then(res => res.json())
                .then(res => {

                    if (res["set-cookie"]) localStorage.setItem("set-cookie", [res["set-cookie"]])
                    if (res.status === "success" && res.data && res.data.token) {
                        localStorage.setItem("token", res.data.token);
                    }
                })
                .catch(error => {
                    commons.errorLog(error)

                })
        }
        else if (AuthService.getUserInfo() != null && AuthService.getUserInfo() != undefined) {
            this.props.history.push('/dashboard');
        }



        const tokenStatus = AuthService.checkToken().status ? true : false;
        const userInfo = AuthService.getUserInfo() ? AuthService.getUserInfo() : false;
        this.setState({ "userInfo": userInfo, "tokenStatus": tokenStatus });


    }

    render() {
        const { classes, sideBar } = this.props;
        const { tokenStatus, userInfo } = this.state;

        return (
            <React.Fragment>
                <div className={classes.root}>

                    {(tokenStatus && userInfo) ? '' : <TopBar />}

                </div>
            </React.Fragment>
        )
    }

}


export default withStyles(useStyles)(HomeView);
