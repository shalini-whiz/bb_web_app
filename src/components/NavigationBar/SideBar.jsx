import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { dashboardMenu } from "../../constants"
import { Link } from "react-router-dom";
import logo from "../../assets/whizdatalogo.svg";
import compStyles from "../../styles/compStyle"
import { withStyles } from '@material-ui/core';






class SideBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
       



        const menuList = dashboardMenu.map((item, index) => (
            <ListItem key={index} component={Link} to={item.path} 
            // className={classes.listItem}
            style={{"color":"white"}}
            >
                <ListItemIcon 
                // className={classes.listItem}
                style={{"color":"white"}}

                >{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>
        ))

        const drawer = () => {
            return (
                <div className={classes.list}>
                    <List>
                        {menuList}
                    </List>
                </div>
            )
        }


        return (<Drawer
            variant="temporary"
            open={this.props.open}
            onClose={this.props.close}
            ModalProps={{
                keepMounted: true
            }}
        >
            <div className={classes.toolbar} style={{ textAlign: 'center', marginTop: '10px' }}>
                <img src={logo} width='100px' height='' alt="logo" />
            </div>
            {drawer()}

        </Drawer>)
    }
}

//export default (SideBar)
export default withStyles(compStyles)(SideBar)