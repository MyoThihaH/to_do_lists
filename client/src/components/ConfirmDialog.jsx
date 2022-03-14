import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    root: {
        '& .MuiPaper-root' : {
            position: 'absolute',
            top:'0px',
            width: '360px'
        },     
    },
    title: {
        textAlign: 'center'
    },
    subTitle: {
        textAlign: 'center'
    },
    action: {
       display: 'flex',
       justifyContent: 'center'
    }

})

export const ConfirmDialog = (props) => {
    const { open, onClose:handleClose, onOk: handleOnOk } = props;
    const classes = useStyle();

    return(
     <Dialog
        
        open={open}
        onClose={handleClose}
        className={classes.root}
      >
        <DialogTitle className={classes.title}>
          {"Are you sure to delete it?"}
        </DialogTitle>
        <DialogContent className={classes.subTitle}>
          <DialogContentText>
            It cann't get back any way!
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button autoFocus onClick={handleClose}>
            Cancle
          </Button>
          <Button onClick={handleOnOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
}