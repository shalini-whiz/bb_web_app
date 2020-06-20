import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function DialogWidget(props) {

    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}>
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                {props.dialogContent}
            </DialogContent>
            <DialogActions>
                {props.okDialog ? <Button onClick={props.okDialog} color="primary" autoFocus>
                    {props.okTitle ? props.okTitle : 'OK'}
                </Button> : ''}
                <Button onClick={props.closeDialog} color="primary" autoFocus>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>

    )

}


export default DialogWidget;

