import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { Todo } from "./Todo";
import { selectTodoIds, selectFilterIds, todoAllComplete, todoClearComplete, todoAllUnComplete, selectTodoDeleteSnack, todoDeleteSnack } from "./todoSlice";
import { SnackBar } from "../../components/SnackBar";

export const TodoList = () => {
   const todoIds = useSelector(selectFilterIds);

   const [text, setText ] = useState("Mark All");
   const dispatch = useDispatch();
   const openSnack = useSelector(selectTodoDeleteSnack);
   const handleAllCompleteClick = () => {
       if( text == "Mark All") {
           dispatch(todoAllComplete());
           setText("UnMark")
       } else {
           dispatch(todoAllUnComplete());
           setText("Mark All")
       }  
   };

   const handleClearCompletedClick = () => {
       dispatch(todoClearComplete());
   };


   

   const renderTodos = () => {
    return todoIds.map(id => {
       return (
        <Grid item container >
        <Todo id = {id} key = {id}/>
        </Grid>
       )
    })
   };
   
 

        return (
           
                
                <Paper elevation={3} sx={{width:"80%", position:"relative", left:"148px", paddingTop:"20px",paddingBottom:"20px",margin:"10px",backgroundColor:"#dff5e5"}}>
                    <Grid container direction='column' rowSpacing={2} >
                        
                        <Grid item container  justifyContent="left" paddingLeft="50px">
                            
                            <Grid item xs={1} lg={1}>
                                <Button variant="contained" size='small' onClick={handleAllCompleteClick}>{text}</Button>
                            </Grid>
                            
                            <Grid item xs={1} lg={2}>
                                <Button variant="contained" size='small' onClick={handleClearCompletedClick}>Clear Completed</Button>
                            </Grid>
                        </Grid>
                        
                       
                            {renderTodos()}
                            <SnackBar
                                color="black"
                                message="Success Deleted Item"
                                open={useSelector(selectTodoDeleteSnack)}
                                autoHideDuration={4000}
                                onClose={() => dispatch(todoDeleteSnack(false))}
                                backgroundColor="green"
                            />
                        
                        
                        
                    </Grid>
                    
                </Paper>
            
        )
}