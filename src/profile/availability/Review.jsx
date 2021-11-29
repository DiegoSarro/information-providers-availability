import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch,useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { format } from "date-fns";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';


const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          08:00AM - 20:00PM
        </TableCell>
        <TableCell component="th" scope="row">
          100 USD - 250 USD
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Availability Slots
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Starts</TableCell>
                    <TableCell>Ends</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow key="1">
                </TableRow>
                <TableRow key="2">
                </TableRow>
                  {row.hoursAvailability.map((slot) => (
                    <TableRow key={slot.starts}>
                      <TableCell component="th" scope="row">
                        {format(slot.starts, "HH:mma")}
                      </TableCell>
                      <TableCell>
                        {format(slot.ends, "HH:mma")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pricing Slots
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Starts</TableCell>
                    <TableCell>Ends</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow key="1">
                </TableRow>
                <TableRow key="2">
                </TableRow>
                  {row.hoursPricing.map((slot) => (
                    <TableRow key={slot.starts}>
                      <TableCell component="th" scope="row">
                        {format(slot.starts, "HH:mma")}
                      </TableCell>
                      <TableCell>
                        {format(slot.ends, "HH:mma")}
                      </TableCell>
                      <TableCell>
                        {slot.price} USD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


function CollapsibleTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Day of the week</TableCell>
            <TableCell>Hours range</TableCell>
            <TableCell>Price range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function Review() {

  const dispach = useDispatch()
  const state = useSelector( state => state)
  let [daysOfTheWeek,setDaysOfTheWeek] = React.useState(state.availability)
  let [defaultPrice,setDefaultPrice] = React.useState(state.defaultPrice)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <List disablePadding>
      <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Default Price" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {defaultPrice}
          </Typography>
        </ListItem>

        <CollapsibleTable  rows={daysOfTheWeek.filter( day =>{  if (day.selected) return day; } )}/>


      
      </List>
    </React.Fragment>
  );
}