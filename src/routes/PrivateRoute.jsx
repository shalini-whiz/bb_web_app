import React from 'react';
import { AuthService } from "../service"
import { Route, Redirect } from 'react-router-dom';
import compStyles from "../styles/compStyle"
import { withStyles } from '@material-ui/core/styles';

function renderComponent(Component, defaultProps, customProps) {
    let props = { ...defaultProps, ...customProps }
    let StyledComponent = withStyles(compStyles)(Component);
    return (<StyledComponent {...props} />)
}

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAuthenticated: false
        };
    }

    async componentDidMount() {
        let res = await AuthService.isTokenAlive();
        if (res) {
            this.setState(() => ({ isAuthenticated: true, isLoading: true }));
        }
        else {
            //localStorage.setItem("userInfo", null)
            this.setState(() => ({ isAuthenticated: false, isLoading: true }));
        }

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.path !== this.props.path) {


            let res = await AuthService.isTokenAlive();
            if (res) {
                this.setState(() => ({ isAuthenticated: true, isLoading: true }));
            }
            else {
                //localStorage.setItem("userInfo", null)
                localStorage.clear()
                this.setState(() => ({ isAuthenticated: false, isLoading: true }));
            }

        }
    }

    render() {

        let { isAuthenticated, isLoading } = this.state;
        let customProps = { ...this.props.data }

        return isLoading ? (isAuthenticated ? (<Route path={this.props.path}
            exact={this.props.exact}
            data={this.props.data}
            render={(props) => renderComponent(this.props.component, props, customProps)}

        />) :
            <Redirect to={{ pathname: '/' }} />



        ) : false;

    }

}

export default PrivateRoute;