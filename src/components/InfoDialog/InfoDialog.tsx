import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface InfoDialogProps {
  children: React.ReactNode;
  title: string;
  message?: React.ReactNode;
  onOpen?: () => React.ReactNode;
  onOk?: () => void;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({ children, title, message = (): React.ReactNode => null, onOpen = (): React.ReactNode => null, onOk = () => {} }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState(message)

  const handleClickOpen = () => {
    const onOpenMessage: React.ReactNode = onOpen();
    if (onOpenMessage) {
      setDialogMessage(onOpenMessage);
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onOk();
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
        data-testid='info-dialog'
      >
        <DialogTitle id="info-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="info-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-testid="info-dialog-ok" onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}