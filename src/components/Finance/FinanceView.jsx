import React from 'react';
import { AuthService, APIService } from "../../service";
import { commons } from "../../utils";
import { TopBar } from "../NavigationBar"
import { withStyles } from '@material-ui/core/styles';
import { HomeTopBar } from "../NavigationBar"
import { Dashboard } from '@material-ui/icons';
import { fetchMenu, domainList, cityList, menuData } from "../../constants"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MenuItem, Paper, Typography, Menu } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import { AutoSelectWidget } from "../Widgets"

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



class FinanceView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            "tabList": [],
            tabValue: 0,
            tabItem: undefined,
            TabComponent: undefined,
            city: ""
        }
    }

    async componentDidMount() {
        const { classes, sideBar, role } = this.props;

        //fetch city role

        let tabs = await fetchMenu("financeInvoices")
        if (tabs.length) {
            let item = tabs[0]
            this.setState({ "tabValue": item.value, "TabComponent": item.component, "tabItem": item })
        }
        this.setState({ tabList: tabs })
    }

    cityHandleChange = (e, item) => {
        console.log("item city .. " + JSON.stringify(item))
        this.setState({ "city": item.city })
    }
    tabHandleChange = (e, item) => {
        console.log(item)
        this.setState({ "tabValue": item.value, "TabComponent": item.component, tabItem: item })
    }
    render() {
        const { classes, sideBar } = this.props;
        console.log("menuData .. "+JSON.stringify(menuData))
        let roleItem = menuData.find((item) => {
            return (item.role.toLowerCase() === AuthService.getUserRole())
        })
        console.log("roleItem .. "+JSON.stringify(roleItem))

        let role = "";
        if (roleItem)
            role = roleItem.descendantRole;

        const { tabList, tabValue, TabComponent, tabItem, city } = this.state
        console.log(TabComponent)
        return (
            <React.Fragment>
                <div>
                    <HomeTopBar />
                    <div className={classes.root} >
                        {sideBar}
                        <div style={{ width: '100%' }}>
                            <Grid container spacing={3}>

                                <Grid item md={2} sm={2}>
                                    <List
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                CITY
        </ListSubheader>
                                        }
                                        style={{
                                            border: '1px solid grey', position: 'relative',
                                            overflow: 'auto',
                                            maxHeight: 450,
                                        }}
                                    //className={classes.root}
                                    >
                                        {cityList.map((item, index) => {
                                            let styleObj = {};
                                            styleObj["background"] = "white"
                                            if (this.state.city == item.city)
                                                styleObj["background"] = 'grey';
                                            return (<div style={styleObj}> <ListItem button key={index}
                                                selected={(city === item.city) ? true : false}
                                                onClick={(e) => this.cityHandleChange(e, item)}
                                                className={classes.listItem}
                                            >
                                                <Typography noWrap
                                                    component="p"
                                                    paragraph={true}
                                                    noWrap
                                                >
                                                    {item.city}
                                                </Typography>
                                            </ListItem>
                                                <Divider className={classes.divider} />
                                            </div>
                                            )
                                        })}
                                    </List>


                                </Grid>
                                <Grid item md={10} sm={10}>
                                    <Tabs
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
                                    {TabComponent ? <TabComponent classes={classes} data={tabItem} city={city} role={role} /> : 'No view'}



                                </Grid>




                            </Grid>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}


export default withStyles(useStyles)(FinanceView);
