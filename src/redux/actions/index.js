import Axios from 'axios'

export const Routing=(page)=>{
    // console.log('routing')
    return {
        type: 'ROUTE', 
        payload: page
    }
}

const apiurl='https://simple-contact-crud.herokuapp.com'

export const GetContacts=()=>{

    return (dispatch)=>{
        dispatch({type: 'LOADING'})
        Axios.get(`${apiurl}/contact`)
        .then((res)=>{
            // console.log(res.data.data)
            dispatch({type: 'LOAD_CONTACTS',payload: {contacts:res.data.data}})
        }).catch((err)=>{
            console.log(err)
        })
    }

}

// export const SubmitContact=(contactData)=>{
//     return (dispatch)=>{
//         Axios.post(`${apiurl}/contact`,contactData)
//         .then((res)=>{
//             dispatch(GetContacts())
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }
// }