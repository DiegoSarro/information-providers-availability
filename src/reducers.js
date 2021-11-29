import initialState from './state'

const reducers=(prevState = initialState , action)=>{


    switch(action.type){
        case 'set':
            //prevState.availability = action.payload
            return {...prevState,
                    availability: action.payload}
        default:
            return prevState
    }
   
}
export default reducers