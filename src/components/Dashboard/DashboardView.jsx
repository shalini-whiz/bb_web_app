import React from 'react';
import { AuthService, APIService } from "../../service";
import { commons } from "../../utils";
import { TopBar } from "../NavigationBar"
import { withStyles } from '@material-ui/core/styles';
import { HomeTopBar } from "../NavigationBar"
import { Dashboard } from '@material-ui/icons';
import { fetchMenu } from "../../constants"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegisterEntity from "./RegisterEntity"
import Grid from '@material-ui/core/Grid';

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



class DashboardView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            "tabList": [],
            tabValue: 0,
            tabItem: undefined,
            TabComponent: RegisterEntity
        }
    }

    async componentDidMount() {
        let tabs = await fetchMenu("registerEntity")
        this.setState({ tabList: tabs })
    }

    tabHandleChange = (e, item) => {
        this.setState({ "tabValue": item.value, "TabComponent": item.component, tabItem: item })
    }
    render() {
        const { classes, sideBar } = this.props;
        const { tabList, tabValue, TabComponent, tabItem } = this.state
        console.log(TabComponent)
        return (
            <React.Fragment>
                <div>
                    <HomeTopBar />
                    <div className={classes.root} >
                        {sideBar}
                        <div style={{ width: '100%' }}>
                            <Grid container spacing={3}>
                                <Grid item md={2}>
                                    <Tabs
                                        orientation="vertical"
                                        value={tabValue}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        //onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"

                                        aria-label="scrollable auto tabs example"
                                    >
                                        {tabList.map((item, index) => {
                                            return (<Tab label={item.title} onClick={(e) => this.tabHandleChange(e, item)} />)
                                        })}
                                    </Tabs>
                                </Grid>
                                <Grid item md={10}>
                                    {TabComponent ? <TabComponent classes={classes} data={tabItem} /> : 'No view'}

                                </Grid>

                            </Grid>




                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}


export default withStyles(useStyles)(DashboardView);
