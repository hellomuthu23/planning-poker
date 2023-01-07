import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
          <Button data-testid="alert-dialog-cancel" onClick={handleClose} color="secondary">
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