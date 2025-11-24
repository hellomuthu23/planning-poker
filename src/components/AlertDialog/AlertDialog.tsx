import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  children: React.ReactNode;
  title: string;
  message: string;
  onConfirm: Function;
  onCancel?: Function;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ children, title, message, onConfirm, onCancel = () => {} }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onCancel();
  };

  const handleConfirm = () => { 
    setOpenDialog(false);
    onConfirm();
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid='alert-dialog'
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-testid="alert-dialog-cancel" onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button data-testid="alert-dialog-confirm" onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}