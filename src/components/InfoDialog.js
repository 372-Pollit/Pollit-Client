import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export const InfoDialog = (props) => {
    const id = props.id;
    const message = props.message;
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    return (
        <Dialog aria-labelledby={id ? id : 'infoTitle'} open={isOpen}>
            <DialogTitle id={id ? id : 'infoTitle'}>Bilgilendirme</DialogTitle>
            <DialogContent>
                <DialogContentText id={'infoContent'}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};