import React from 'react';
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { HomeView } from "../components/Home"
import { LoginView } from "../components/User"
import { DashboardView } from "../components/Dashboard"
import { FinanceView } from "../components/Finance"
import compStyles from "../styles/compStyle"
import { SideBar } from "../components/NavigationBar"


function renderComponent(Component, defaultProps, customProps) {
    let props = { ...defaultProps, ...customProps }
    let StyledComponent = withStyles(compStyles)(Component);
    return <StyledComponent {...props} />
}



const AppRoutes = (props) => {
    const SideBarView = withStyles(compStyles)(SideBar)
    return (
        <main>
            <Switch>
                <Route exact path="/" component={withRouter(HomeView)} />
                <Route exact path="/login"
                    render={(props) => renderComponent(LoginView, props, {})}
                />
                <PrivateRoute
                    path="/dashboard"
                    data={{
                        sideBar: <SideBar />
                    }}
                    component={DashboardView}
                />
                 <PrivateRoute
                    path="/finance"
                    data={{
                        sideBar: <SideBar />,
                        "role":"business"
                    }}
                    component={FinanceView}
                />

            </Switch>
        </main >
    )


}






export default AppRoutes 