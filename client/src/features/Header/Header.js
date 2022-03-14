import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";

import { generateId, selectById } from "../Todo/todoSlice";
import { todoAdd } from "../Todo/todoSlice";
import { Footer } from "../Footer/footer";
import { posturl } from "../../api/api";

const useStyle = makeStyles({
  root: {
    position:"relative",
    left:"158px"
  },
  textField: {
    width:"50%"
  },
  typo: {
    position: "relative",
    left: "400px"
  }
})

export const Header = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    
    const [text, setText] = useState('');
    const id = useSelector(generateId);

   

   
    
    const changeHandler = (e) => {
        setText(e.target.value);
    }
    
    // const handleRemoveCompletedClick = () => {
    //   dispatch(todoClearComplete());
    // }


  

    

    // const handleAllCompleteClick = () => {
    //   dispatch(todoAllComplete())
    // }





    const handleKeyDown =  (e) => {
        // If the user pressed the Enter key:
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
          // Dispatch add action creator function 
          dispatch(todoAdd(text));
          // And clear out the text input
          setText('')
          
        }
      }


      
    return(
    <div className={classes.root}>
        <br/>
        <Typography className={classes.typo} variant="h3" color="#1376bd">To Do Lists</Typography>
    
        <TextField className={classes.textField} id="standard-basic" label="Please enter you want to do..." variant="standard" value={text} onChange={changeHandler} onKeyDown={handleKeyDown} />
          
        
        <Typography style={{overflowWrap: 'break-word', width:"50%"}}>{text}</Typography>
        
        
    </div>
    )
}

