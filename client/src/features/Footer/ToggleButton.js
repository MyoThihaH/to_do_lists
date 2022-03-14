import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { status, statusChange } from "../Filter/filterSlice";


export const StatusToggleButton = () => {
  const [alignment, setAlignment] = useState('All');
  
  const statusArray = Object.values(status);
 
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    dispatch(statusChange(event.target.value));
  };

  const renderButton = (arr) => {
    return arr.map((status) =>{
       
         return <ToggleButton value={status}>{status}</ToggleButton>
        
    } 
    )
 } 


  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      {renderButton(statusArray)}
    </ToggleButtonGroup>
  );
}
