
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, status, statusChange } from "../Filter/filterSlice";

import { StatusToggleButton } from './ToggleButton'

const statusArray = Object.values(status);
    


export const StatusButtons = () => {

    

    return(
        <ul>
            <h3>Status By Filters</h3>
            
            <StatusToggleButton/>
        </ul>
    )

}