import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AuthService, APIService } from '../../../service';
import { TopBar } from "../../NavigationBar";
import { Link } from "react-router-dom";
import { fetchFormByType } from "../../../schema"
import { util, commons } from "../../../utils"
import { FormGenerator } from '../../../lib';







class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            loginFormData: [],
            message: '',
            status: false,
            showPassword: false,
        }
        this.login = this.login.bind(this);
    }


    async componentDidMount() {
        let { props } = this.props
        let loginForm = await fetchFormByType("loginForm")
        this.setState({ "loginFormData": loginForm })
        if (AuthService.getUserInfo() != null) {
            props.history.push('/dashboard');
        }
    }



    login = async (e) => {
        e.preventDefault();
        let { props } = this.props

        let formInputData = [...this.state.loginFormData];
        let formInputDataValid = await util.validateFormData(formInputData);

        let result = formInputDataValid.find((item) => {
            if (item.error.length) return item;
        })

        this.setState({ "loginFormData": formInputDataValid })


        if (result === undefined) {
            if (AuthService.getUserInfo() === null) {
                let apiData = await util.filterFormData(this.state.loginFormData);

                APIService.apiCall("POST", apiData, "login")
                    .then(res => res.json())
                    .then(res => {
                        if (res.message) this.setState({ "message": res.message })
                        if (res.status === "success" && res.data && res.data.token) {
                            localStorage.setItem("userInfo", JSON.stringify(res.data))
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("login", true);
                            this.setState({ "status": true })
                            props.history.push('/dashboard');
                        }
                    }).catch(error => {
                        commons.errorLog(error)
                    });


            }
        }

    };


    onChange = (e) => {

        let formDataInput = [...this.state.loginFormData];
        formDataInput.find((item) => {
            if (item && item.key === e.target.name) {
                (item.type === "number") ? item.value = parseInt(e.target.value) : item.value = e.target.value;
                item.error = "";
            }
        })

        this.setState({ loginFormData: formDataInput });
    }




    render() {
        const { status, message, showPassword, loginFormData } = this.state;
        const { classes } = this.props;


        return (

            <div>
                <TopBar page="login" />
                <Container maxWidth="xs">
                    <Typography variant="h4">Login</Typography>
                    <form>
                        <FormGenerator formList={loginFormData}
                            onChange={this.onChange} />

                        <Button
                            variant="contained" color="primary" fullWidth
                            onClick={this.login}>Login</Button>



                        {status ? <span className={classes.success}>{message}</span> : <span className={classes.error}>{message}</span>}
                    </form>
                </Container>




            </div>
        )
    }

}


export default (LoginComponent);