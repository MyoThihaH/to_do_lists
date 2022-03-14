import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

import { colorChange, colors, capatalize } from "../Filter/filterSlice"


const useStyle = makeStyles({
    ul: {
        listStyle: "none"
    }
})

export const FilterColors = () => {

const classes = useStyle();
const dispatch = useDispatch();

    const renderColors = (colorArray) => {
        const handleOnChanage = (e) => {
            dispatch(colorChange(e.target.value))
        }
       return (
       colorArray.map((color) => {
         return  ( 
        
         <li key={color}> 
             <label>
            <input type="checkbox" onChange={handleOnChanage} value={color}/>
            {capatalize(color)}
            </label>
         </li>
        
            )
        })
       )
    }
        
        
    
    return(
        <ul className={classes.ul}>
            <h3>Status By Colors</h3>
            {renderColors(colors)}
        </ul>
    )
}