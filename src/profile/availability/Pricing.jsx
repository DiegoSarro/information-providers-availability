import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  Button,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/system";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Chip from '@mui/material/Chip';
import { format } from "date-fns";
import { useFormik } from 'formik';
import PriceSlotPicker from '../components/PriceSlotPicker';
import { useDispatch,useSelector } from 'react-redux';


export default function BasicDataForm() {

  const dispach = useDispatch()
  const state = useSelector( state => state)
  let [daysOfTheWeek,setDaysOfTheWeek] = React.useState(state.availability)
  console.log("daysOfTheWeek status:",daysOfTheWeek)
  const dayStartsDefault = state.dayStartsDefault
  const dayEndsDefault = state.dayEndsDefault

  const [defaultPrice,setDefaultPrice] = React.useState(100)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(daysOfTheWeek[0] || {});
  
  const setPriceToDay = (type,value,slot) => {
    console.log(type,value)
    slot[type]=value;
    console.log("Selected day:"+ JSON.stringify(selectedDay))
    console.log("All days:"+ JSON.stringify(daysOfTheWeek))

    let newArray = daysOfTheWeek.map(day => {

      console.log("Day iterator:"+day)
      if(day.id == selectedDay.id){
        selectedDay.hoursPricing.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return selectedDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)

  }

  const createNewSlot = day =>{
    let newDay = day.hoursPricing.push({starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice})
    let newArray = daysOfTheWeek.map(day => {
      if(day.id == newDay.id){
        newDay.hoursPricing.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return newDay
      }
      else return day
    })
    setDaysOfTheWeek(newArray)

  }

  const deleteSlot = slot => {

    let newArray = daysOfTheWeek.map(day => {

      if(day.id == selectedDay.id){
        let newSlotArraya =day.hoursPricing.filter(function (s) {
                                return s.starts !== slot.starts && 
                                       s.ends !== slot.ends
                          });
        selectedDay.hoursPricing = newSlotArraya
        return selectedDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)

  }

  const handleDefaultPriceChange = (newValue) => {
    if(newValue.target.value && newValue.target.value>0){
        setDefaultPrice(newValue.target.value);
    }
};

  const handleClickOpen = day => {
    setOpenDialog(true);
    setSelectedDay(day);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
            Custom pricing for {selectedDay.name}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body2" gutterBottom>
           Custom you pricing by hours
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
          {selectedDay.hoursPricing.map((slot,index) =>
              <PriceSlotPicker key={index} slot={slot} onClick={setPriceToDay} onDelete={deleteSlot}  defaultPrice={defaultPrice}/>
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
        Pricing 
      </Typography>
      <Grid container spacing={3} className="mb-10">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="defaultPrice"
            label="Default price"
            type="number"
            value={Number(defaultPrice).toString()}
            onChange={handleDefaultPriceChange}
            label="Default hourly price"
            fullWidth
            variant="standard"
          />
        </Grid>
        
      </Grid>

      <Grid container spacing={3} className="mt-10">
        <Grid item xs={12} sm={6}>
        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "column" }}>
              
            { 
              daysOfTheWeek.map(day=> 
                {if(day.selected)
                  return(<Box className="flex items-center w-full" key={day.name}>
                    <Typography fontSize="small">
                            {day.name}
                          </Typography>
                        <Box className="float-right ">
                          <IconButton onClick={() => handleClickOpen(day)} color="primary">
                            <AttachMoneyIcon />
                          </IconButton>
                        </Box>
                        <Box className="flex float-right flex space-x-4 ">
                        {day.hoursPricing.map((slot,index) =>
                            <Chip  
                                className="mx-12" 
                                key={index} 
                                label={`${format(slot.starts, "HH:mma")} - ${format(slot.ends, "HH:mma")} -  ${slot.price} USD`} 
                                clickable onClick={() => handleClickOpen(day)} />
                            )
                          }
                        </Box>
                      
                    </Box>)})}
          
        </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  </>
  );
}