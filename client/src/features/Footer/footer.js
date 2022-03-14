import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";


import { todoAllComplete, todoAllUnComplete, todoClearComplete, selectUnComplete } from "../Todo/todoSlice";
import { FilterColors } from "./FilterColors";
import { StatusButtons } from "./FilterStatus";

const useStyle = makeStyles({
    root: {
        position: "relative",
        left:"158px",
        width:"80%",
        paddingTop: "40px",
        paddingBottom: "40px",
        backgroundColor:"#dff5e5 !important"
    }
})

export const Footer = () => {
    const classes = useStyle();
    const totoalUncomplete = useSelector(selectUnComplete).length;

    return(
        <Paper className={classes.root}>
        <Grid item container sx={{backgroundColor:"#dff5e5"}}>
            
            <Grid item lg={1}/>
            <Grid item lg={4}>
                <StatusButtons/>
            </Grid>
            
           <Grid item lg={3}>
                <h3>Total Uncomplete</h3>
                <label>{totoalUncomplete}</label>
           </Grid>
            
           <Grid item lg={2}>
                <FilterColors/>
           </Grid>
        </Grid>
        </Paper>
        
    )
}