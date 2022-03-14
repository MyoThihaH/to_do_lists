import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import SnackbarContent from '@mui/material/SnackbarContent';



function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

export const SnackBar = (props) => {
    const {color, message, backgroundColor} = props;
    return(

        <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
        {...props}
        
      >
        <SnackbarContent
          
          
          message={
            <span id="message-id2">
              <div>{message}</div>
            </span>
          }
          sx={{color:{color}, backgroundColor:{backgroundColor}}}
        />
      </Snackbar>
    )
}  