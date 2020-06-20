import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../../../lib"
import LoginComponent from "./LoginComponent"

const LoginView = (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <LoginComponent classes={classes} props={props}/>
        </Desktop>
        <Tablet>
            <LoginComponent classes={classes} props={props}/>
        </Tablet>
        <Mobile>
            Mobile view not supported
        </Mobile>

    </div>)

}



export default LoginView