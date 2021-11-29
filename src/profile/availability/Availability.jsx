import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import { useFormik,FieldArray } from "formik";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TimeSlotPicker from './components/TimeSlotPicker';
import Chip from '@mui/material/Chip';
import { format } from "date-fns";
import { useDispatch,useSelector } from 'react-redux';

export default function Availability() {
  
  const dispach = useDispatch()
  const state = useSelector( state => state)
  let [daysOfTheWeek,setDaysOfTheWeek] = React.useState(state.availability)
  const dayStartsDefault = state.dayStartsDefault
  const dayEndsDefault = state.dayEndsDefault
  const [defaultHourAvailability,setDefaultHourAvailability] = React.useState({})
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newSlot, setNewSlot] = React.useState(false);
  const [newSlotObj,setNewSlotObj]= React.useState({starts:dayStartsDefault, ends:dayEndsDefault});
  const [selectedDay, setSelectedDay] = React.useState(daysOfTheWeek[0]);

  const createNewSlot = day =>{
    let newDay = day.hoursAvailability.push(newSlotObj)
    let newArray = daysOfTheWeek.map(day => {
      if(day.id == newDay.id){
        newDay.hoursAvailability.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return newDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})

  }

  const deleteSlot = slot => {

    let newArray = daysOfTheWeek.map(day => {
      if(day.id == selectedDay.id){
        let newSlotArraya =day.hoursAvailability.filter(function (s) {
                                return s.starts !== slot.starts && 
                                       s.ends !== slot.ends
                          });
        selectedDay.hoursAvailability = newSlotArraya
        return selectedDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})

  }

  const handleClickOpen = day => {
    
    setOpenDialog(true);
    setSelectedDay(day);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const setHourToDay = (type,value,slot) => {
    slot[type]=value;
    let newArray = daysOfTheWeek.map(day => {
      if(day.id == selectedDay.id){
        selectedDay.hoursAvailability.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return selectedDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})
  }

  

  const handleCheckboxChange = event => {

    let newArray = daysOfTheWeek.map(day => {
          if(event.target.id === day.id){
            day.selected = !day.selected;
          }
          return day
        }
      )

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})
  };


  const validation = useFormik({
    initialValues: {
      aviableDays: [],
      pricing: 0
    },
    onSubmit: (values) => {
      //Sends the data to some API      
    },
  });

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography gutterBottom fontWeight="bold">
            Custom aviability for {selectedDay.name}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body2" gutterBottom>
           You can custom you aviability by hours
          </Typography>

          <Box fixed>

          <Grid >
            <Tooltip title="Add slot">
              <IconButton 
                  color="primary" 
                  aria-label="Add Slot" 
                  component="span"
                  onClick={() => createNewSlot(selectedDay)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          {selectedDay.hoursAvailability.map((slot,index) =>
              <TimeSlotPicker key={index} slot={slot} onClick={setHourToDay} onDelete={deleteSlot} />
          )}
          </Box>

          
        </DialogContent>
        <DialogActions>
          
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Availability 
      </Typography>
      {/* <Typography variant="h5" gutterBottom>
                  <p>{JSON.stringify(state)}</p>
          </Typography> */}
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={validation.handleSubmit}
      >
        <Stack spacing={4} direction={{ xs: "column", sm: "row", md: "row" }}>
          <FormControl sx={{ width: "100%" }}>
            <Stack spacing={4} direction={{ xs: "column", sm: "row", md: "row" }}>
              <FormGroup sx={{ width: "100%" }}>
              { daysOfTheWeek.map(day=> 
              <div className="flex items-center w-full" key={day.name}>
                <FormControlLabel
                  control={
                            <Checkbox id={day.id} value={day.selected} checked={day.selected}  />
                          }
                  onChange={handleCheckboxChange}
                  label={
                    
                      <Typography fontSize="small">
                        {day.name}
                      </Typography>
                    
                  }
                />
                    <div className="float-right ">
                      <IconButton onClick={() => handleClickOpen(day)} color="primary">
                        <AccessTimeIcon />
                      </IconButton>
                    </div>
                    <div className="flex float-right flex space-x-4 ">
                    {day.hoursAvailability.map((slot,index) =>
                        <Chip  className="mx-12" key={index} label={`${format(slot.starts, "HH:mma")} - ${format(slot.ends, "HH:mma")}`} clickable onClick={() => handleClickOpen(day)} />
                        )
                      }
                    </div>
                </div>)}
                
              </FormGroup>
            </Stack>
          </FormControl>

          
        </Stack>
      </Box>
      
      
    </React.Fragment>
    </>
  );
}