
import { useDispatch, useSelector } from "react-redux"
import '@fontsource/roboto/400.css';
import { Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';



import { selectById } from "./todoSlice"
import { todoComplete, todoSelect, todoDelete, selectTodoDeleteSnack, todoDeleteSnack } from "./todoSlice";
import { capatalize, colors } from "../Filter/filterSlice";
import { ConfirmDialog } from "../../components/ConfirmDialog"; 

import { useEffect, useState } from "react";


export const Todo = (props) => {
const dispatch = useDispatch();
const TodoId = props.id;
const {_id, completed, description, color} = useSelector((state) => selectById(state,TodoId));
const [open, setOpen] = useState(false);
const [snackBarOpen, setSnackBarOpen] = useState(false);


const handleCheckOnChange = () => {

    dispatch(todoComplete({_id:_id, changes:{completed: !completed}}));
    
  }

const colorOptions = (colors) => {
    const arr = colors.map((c) => {
        if(c != color) {
            return <option value={c}>{capatalize(c)}</option>
        }
    })
    if(color != ""){
        arr.push(<option value={""}></option>);
    }
    return arr;
}


const handleDeleteClick = () => {
    setOpen(true);
    
  }

const handleOnOk = () => {
    dispatch(todoDelete(_id));
   
}

const handleColorOnChange = (e) => {
    dispatch(todoSelect({_id: _id, changes: {color: e.target.value}}))


  }
    return (
        <Grid container direction="column">
        <Grid item container alignItems="center" wrap='nowrap' justifyContent="center">
            
            <Grid item xs={1} lg={1}>
            <Tooltip title="Complete">
            <Checkbox
            checked={completed}
            onChange={handleCheckOnChange}
            inputProps={{ 'aria-label': 'controlled' }}
            size='small'
            />
            </Tooltip>
            </Grid>
            <Grid item xs={8} lg={7} zeroMinWidth >
            <Typography fontSize={25} style={{overflowWrap: 'break-word'}}>{description}</Typography>
           
            </Grid>
            <Grid item xs={2} lg={1} >
            <FormControl >
                
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                    name: 'colors',
                    id: 'uncontrolled-native',
                    }} 
                    onChange={handleColorOnChange}
                    size='20'
                >
                    <option>{capatalize(color)}</option>
                    {colorOptions(colors)}
                </NativeSelect>
            </FormControl>
            </Grid>
            <Grid item xs={1} lg={1}>
            <Tooltip title="Delete">
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon color="primary"/>
                </IconButton>
            </Tooltip>
            </Grid>
            
            <Grid item lg={1}>
                <ConfirmDialog 
                    open={open} 
                    onClose={() => setOpen(false)} 
                    onOk = {handleOnOk}
                />
                
            </Grid>
        </Grid>
        <Grid item>
            <Divider variant="inset" />
        </Grid>
        </Grid> 
    
    )
}