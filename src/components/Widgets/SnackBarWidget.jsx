import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class SnackBarWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": true
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ "open": false })
    };

    render() {

        const { classes, message, type } = this.props;

        let content = (message && message.length && (type === "success" || type === "error")) ? (<Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.state.open}
            autoHideDuration={1000}
            onClose={this.handleClose}
        >
            <SnackbarContent
                className={(type === "success") ? classes.successSnackView : classes.failureSnackView}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        {message}
                    </span>
                }

            />
        </Snackbar>) : '';

        return content

    }

}


export default SnackBarWidget;

