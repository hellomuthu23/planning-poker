import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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