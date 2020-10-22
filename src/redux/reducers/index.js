import { combineReducers } from 'redux'
import ContactsReducer from './contacts' 
import PageReducer from './state'


export default combineReducers({
    Contacts: ContactsReducer,
    Page: PageReducer
})