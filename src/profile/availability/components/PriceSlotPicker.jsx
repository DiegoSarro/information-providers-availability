import * as React from 'react';
import TimePicker from '@mui/lab/TimePicker';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const PriceSlotPicker = ({slot,onClick,onDelete,...props}) => {

    console.log({slot,onClick})
    
    const minTimeAvailable = 60;

    const [limitStarts,setLimitStarts] = useState(props.defaultStart || new Date(0, 0, 0, 8))
    const [limitEnds,setLimitEnds] = useState(props.defaultEnds || new Date(0, 0, 0, 20))
    
    const [starts,setStarts] = useState(slot.starts || props.defaultStart)
    const [ends,setEnds] = useState(slot.ends || props.defaultEnds)
    const [price,setPrice] = useState(slot.price || props.defaultPrice)
    const [minStartsEnd,setMinStartsEnd]= useState(props.defaultStart || new Date(0, 0, 0, 9))

    const handleStartsChange = (newValue) => {
        setStarts(newValue);
        onClick('starts',newValue,slot)
        let minEnds = new Date(newValue.getTime());
        minEnds.setTime(newValue.getTime() + (minTimeAvailable * 60 * 1000))
        setMinStartsEnd(minEnds)

    };

    const handleEndsChange = (newValue) => {
        setEnds(newValue);
        onClick('ends',newValue,slot)
    };

    const handleDelete = () => {
        onDelete(slot);
    }

    const handlePriceChange = (newValue) => {
        if(newValue.target.value && newValue.target.value>0){
            setPrice(newValue.target.value);
            onClick('price',newValue.target.value,slot)
        }
    };

    return(

    <ListItem>

        <TimePicker
            label="Starts"
            value={starts}
            minTime={limitStarts}
            maxTime={limitEnds}
            minutesStep={15}
            onChange={handleStartsChange}
            renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
            label="Ends"
            value={ends}
            minTime={minStartsEnd}
            maxTime={limitEnds}
            minutesStep={15}
            onChange={ handleEndsChange }
            renderInput={(params) => <TextField {...params} />}
        />
        <TextField
            id="price"
            label="Price"
            type="number"
            value={Number(price).toString()}
            onChange={handlePriceChange}
            />
        <DeleteIcon onClick={handleDelete} />
        
    </ListItem>)

}

export default PriceSlotPicker;
