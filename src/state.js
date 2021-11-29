const dayStartsDefault = new Date("2015-11-15T08:00:00.00");
const dayEndsDefault = new Date("2015-11-15T20:00:00.00");
const defaultPrice = 100

const initialState={
    dayStartsDefault:dayStartsDefault,
    dayEndsDefault:dayEndsDefault,
    defaultPrice: defaultPrice,
    availability:[{ id: "Sunday", name: "Sunday" ,selected:false,order:1,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Monday", name: "Monday" ,selected:false,order:2,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Wednesday", name: "Wednesday",selected:false ,order:3,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Thursday", name: "Thursday",selected:false ,order:4,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Friday", name: "Friday",selected:false ,order:5,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Saturday", name: "Saturday" ,selected:false ,order:6,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]}]
}

export default initialState
