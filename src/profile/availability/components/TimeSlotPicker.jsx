import * as React from 'react';
import TimePicker from '@mui/lab/TimePicker';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const TimeSlotPicker = ({slot,onClick,onDelete,...props}) => {

    const [limitStarts,setLimitStarts] = useState(props.defaultStart || new Date(0, 0, 0, 8))
    const [limitEnds,setLimitEnds] = useState(props.defaultEnds || new Date(0, 0, 0, 20))
    const [minStartsEnd,setMinStartsEnd]= useState(props.defaultStart || new Date(0, 0, 0, 9))

    const minTimeAvailable = 60;
    const [starts,setStarts] = useState(slot.starts || props.defaultStart)
    const [ends,setEnds] = useState(slot.ends || props.defaultEnds)

    const handleStartsChange = (newValue) => {
        /*The minimum duration for which an expert can be available is 1 hour (i.e. a consumer 
        will be charged a minimum of 1 hour time of an expert should they decide to avail an
        expert’s services).*/
        let diff = diffDaysInHours(newValue,ends)
        let minEnds = new Date(newValue.getTime());
        minEnds.setTime(newValue.getTime() + (minTimeAvailable * 60 * 1000))
        if(ends===null || diff<minTimeAvailable || (ends<newValue)){
            setEnds(minEnds)
            onClick('ends',minEnds,slot)
        }
        setMinStartsEnd(minEnds)
        setStarts(newValue);
        onClick('starts',newValue,slot)
    };

    const diffDaysInHours = (date, otherDate) => {
        let diff = Math.abs(otherDate - date);
        return Math.floor((diff/1000)/60);
    }
  
    const handleEndsChange = (newValue) => {
        setEnds(newValue);
        onClick('ends',newValue,slot)
    };

    const handleDelete = () => {
        onDelete(slot);
    }

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
        <DeleteIcon onClick={handleDelete} />
        
    </ListItem>)

}

export default TimeSlotPicker;
