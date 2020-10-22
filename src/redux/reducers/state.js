
const INITIAL_STATE={
    page: ''
}


const reducers=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ROUTE':
            return {...state,page:action.payload}
        default:
            return state
    }
}
export default reducers;