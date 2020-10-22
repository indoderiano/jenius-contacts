
const INITIAL_STATE={
    contacts: [],
    isLoading: false,
}


const reducers=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOADING':
            return {...state,isLoading: true}
        case 'LOAD_CONTACTS':
            return {...state,...action.payload,isLoading: false}
        default:
            return state
    }
}
export default reducers;