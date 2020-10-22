import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {GetContacts} from '../redux/actions'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActionArea, 
    CardMedia, 
    CardActions,
    CardContent, 
    Typography, 
    Button,
    Modal,
    TextField,
    CircularProgress,

    LinearProgress
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const style = theme => ({
    root: {
        maxWidth: 345,
        display: 'inline-block',
        margin: '1em',
        textAlign: 'left',
        // position: 'relative',
        '& .MuiCardMedia-img': {
            objectFit: 'contain',
        }
    },
    rootTextfield: {
        minWidth: 300
    },
    rootLoader: {
        position: 'absolute',
        width: 27,
        height: 27,
    }
})


class Contacts extends Component {
    state = { 
        modalOpen: false,
        newPhoto: '',
        newFirstName: '',
        newLastName: '',
        newAge: '',

        errorMessage: '',
        isUploading: true,

        indexdelete: -1,
        isDeleting: false,

        editmode: false,
        editid: -1,

        errordelete: ''
    }

    componentDidMount=()=>{
        this.props.GetContacts()
    }

    clearData=()=>{
        this.setState({
            modalOpen: false,
            newPhoto: '',
            newFirstName: '',
            newLastName: '',
            newAge: '',

            errorMessage: '',
            isUploading: false, 

            indexdelete: -1,
            isDeleting: false,

            editmode: false,
            editid: -1,

            errordelete: ''
        })
    }

    EditContact=()=>{
        if(!this.state.newPhoto || !this.state.newFirstName || !this.state.newLastName || !this.state.newAge){
            this.setState({errorMessage: 'All Column Must Be Filled'})
        }else{

            this.setState({isUploading:true})

            var contact={
                firstName: this.state.newFirstName,
                lastName: this.state.newLastName,
                age: this.state.newAge,
                photo: this.state.newPhoto
            }
            
            Axios.put(`https://simple-contact-crud.herokuapp.com/contact/${this.state.editid}`,contact)
            .then((res)=>{
                // console.log(res.data.message)
                this.setState({modalOpen:false,isUploading:false})
                this.props.GetContacts()
            }).catch((err)=>{
                console.log(err)
                this.setState({errorMessage: 'Upload Data Error',isUploading:false})
            }).finally(()=>{
                this.clearData()
            })
        }
    }

    DeleteContact=(id)=>{
        this.setState({isDeleting:true})
        console.log(id)
        Axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        .then((res)=>{
            this.GetContacts()
            this.clearData()
        }).catch((err)=>{
            // this.clearData()
            // console.log(err.response.data.message)
            this.setState({errordelete:err.response.data?.message,isDeleting:false})
        })
    }

    AddContact=()=>{
        if(!this.state.newPhoto || !this.state.newFirstName || !this.state.newLastName || !this.state.newAge){
            this.setState({errorMessage: 'All Column Must Be Filled'})
        }else{

            this.setState({isUploading:true})

            var contact={
                firstName: this.state.newFirstName,
                lastName: this.state.newLastName,
                age: this.state.newAge,
                photo: this.state.newPhoto
            }
            console.log(contact)
            
            Axios.post(`https://simple-contact-crud.herokuapp.com/contact`,contact)
            .then((res)=>{
                console.log(res.data.message)
                this.setState({modalOpen:false,isUploading:false})
                this.props.GetContacts()
                this.clearData()
            }).catch((err)=>{
                console.log(err)
                this.setState({errorMessage: err.response.data?.message,isUploading:false})
            })
        }
    }

    cardLoading=()=>{
        const {classes}=this.props
        return (
            <Card 
                style={{position:'relative'}}
                className={classes.root}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt='foto profile'
                        height="140"
                        image='https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'
                        title="Contemplative Reptile"
                        style={{
                            width: '280px'
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Loading...
                        </Typography>
                    </CardContent>
                
                </CardActionArea>

                <CardActions>
                    <Button >
                        Edit
                    </Button>
                    <Button>
                        Delete
                    </Button>
                </CardActions>

                <div
                    style={{
                        position:'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width:'100%',
                        height:'100%',
                        backgroundColor: 'rgba(0,0,0,.3)'
                    }}
                >
                    <div
                        style={{
                            position:'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width:'27px',
                            height:'27px'
                        }}
                    >
                        <CircularProgress 
                            color='inherit' 
                            style={{
                                width:'27px',
                                height: '27px',
                            }}
                            className={classes.rootLoader}
                        />
                    </div>
                </div>
                    

            </Card>
        )
    }

    renderContacts=()=>{
        const {classes} = this.props
        return this.props.Contacts.contacts.map((person,index)=>{
            // console.log(person)
            return (

                <Card 
                    key={person.id}
                    // style={{maxWidth:'345px', display:'inline-block'}}
                    className={classes.root}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={person.firstName+' foto profile'}
                            height="140"
                            image={person.photo!=='N/A' ? person.photo: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'}
                            title="Contemplative Reptile"
                            style={{
                                width: '280px'
                            }}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {person.firstName+' '+person.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '15px'}}>
                            Age {person.age}
                        </Typography>
                        </CardContent>
                    </CardActionArea>


                    {
                        this.state.indexdelete==index?
                        <CardActions>
                            {
                                <Button size='small' color='secondary'
                                    style={{position:'relative'}}
                                    onClick={()=>{
                                        this.DeleteContact(person.id)
                                    }}
                                >
                                    <span
                                        style={{
                                            opacity: this.state.isDeleting?'0':'1',
                                        }}
                                    >
                                        Confirm
                                    </span>
                                    {
                                        this.state.isDeleting?
                                        <CircularProgress 
                                            color='inherit' 
                                            style={{
                                                width:'27px',
                                                height: '27px',
                                            }}
                                            className={classes.rootLoader}
                                        />
                                        :
                                        null
                                    }
                                </Button>
                            }
                            <Button 
                                size='small'
                                onClick={()=>{
                                    this.clearData()
                                }}
                            >Cancel</Button>
                        </CardActions>
                        :
                        <CardActions>
                            <Button 
                                size='small' 
                                // color='primary'
                                startIcon={<EditIcon/>}
                                onClick={()=>{
                                    this.setState({
                                        editmode: true,
                                        modalOpen: true,
                                        editid:person.id,

                                        newFirstName: person.firstName,
                                        newLastName: person.lastName,
                                        newAge: person.age,
                                        newPhoto: person.photo,


                                    })
                                }}
                            >
                                Edit
                            </Button>
                            <Button size='small' color='secondary'
                                onClick={()=>{
                                    this.clearData()
                                    this.setState({indexdelete: index})
                                }}
                                startIcon={<DeleteIcon/>}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    }
                    {
                        this.state.errordelete&&this.state.indexdelete==index?
                        <div style={{textAlign:'center'}}>
                            <span style={{color:'red'}}>{this.state.errordelete}</span>
                        </div>
                        : null
                    }

                </Card>
            )
        })
    }

    renderModal=()=>{
        // console.log('is uploading', this.state.isUploading)
        const {classes} = this.props
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '5em',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    // width: '100%',
                    left:'50%',
                    transform: 'translate(-50%,0)',
                    padding:'3em',
                    marginBottom: '3em',
                    outline: 'none',
                    boxShadow: '0px 4px 7px 0px rgba(0,0,0,0.75)'
                }}
            >

                <h1
                    style={{
                        color: 'orange'
                    }}
                >
                    Add Contact
                </h1>

                {/* Photo Url */}
                <div>
                    <div>

                        <form noValidate autoComplete="off" style={{display:'inline-block',margin:'1em'}}>
                            <TextField id="standard-basic" label="Image Url" className={classes.rootTextfield}
                                onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({newPhoto:e.target.value})
                                }}
                                value={this.state.newPhoto}
                            />
                        </form>
                        
                    </div>
                </div>

                {/* First Name */}
                <div>
                    <div>

                        <form noValidate autoComplete="off" style={{display:'inline-block',margin:'1em'}}>
                            <TextField id="standard-basic" label="First Name" className={classes.rootTextfield}
                                onChange={(e)=>{
                                    this.setState({newFirstName:e.target.value})
                                }}
                                value={this.state.newFirstName}
                            />
                        </form>
                        
                    </div>
                </div>

                {/* Last Name */}
                <div>
                    <div>

                        <form noValidate autoComplete="off" style={{display:'inline-block',margin:'1em'}}>
                            <TextField id="standard-basic" label="Last Name" className={classes.rootTextfield}
                                onChange={(e)=>{
                                    this.setState({newLastName:e.target.value})
                                }}
                                value={this.state.newLastName}
                            />
                        </form>
                        
                    </div>
                </div>

                {/* Age */}
                <div>
                    <div>

                        <form noValidate autoComplete="off" style={{display:'inline-block',margin:'1em'}}>
                            <TextField id="standard-basic" label="Age" className={classes.rootTextfield}
                                onChange={(e)=>{
                                    this.setState({newAge:e.target.value})
                                }}
                                value={this.state.newAge}
                            />
                        </form>
                        
                    </div>
                </div>

                <div style={{marginTop:'1em'}}>
                {
                    this.state.newPhoto?
                    <img src={this.state.newPhoto} style={{marginTop:'2em', width:'70%',display:'inline-block'}}/>
                    : null
                }
                {
                    this.state.errorMessage?
                    <p style={{color:'red', marginTop:'2em'}}>{this.state.errorMessage}</p>
                    : null
                }
                </div>

                <div style={{marginTop:'2em'}}>
                    <Button variant='contained' onClick={() => this.clearData()}>
                        Cancel
                    </Button>

                    {
                        this.state.editmode?
                        <Button
                            variant='contained'
                            color='primary'
                            style={{position:'relative',margin:'0 1em'}}
                            onClick={this.EditContact}
                        >
                            <span
                                style={{
                                    opacity: this.state.isUploading?'0':'1',
                                }}
                            >
                                Save
                            </span>
                            {
                                this.state.isUploading?
                                <CircularProgress 
                                    color='inherit' 
                                    style={{
                                        width:'27px',
                                        height: '27px',
                                    }}
                                    className={classes.rootLoader}
                                />
                                :
                                null
                            }
                        </Button>
                        :
                        <Button
                            variant='contained'
                            color='primary'
                            style={{position:'relative',margin:'0 1em'}}
                            // labelPosition='right'
                            // icon='checkmark'
                            onClick={this.AddContact}
                            // positive
                        >
                            <span
                                style={{
                                    opacity: this.state.isUploading?'0':'1',
                                }}
                            >
                                Submit
                            </span>
                            
                            {
                                this.state.isUploading?
                                <CircularProgress 
                                    color='inherit' 
                                    style={{
                                        width:'27px',
                                        height: '27px',
                                    }}
                                    className={classes.rootLoader}
                                />
                                :
                                null
                            }
                        </Button>
                    }
                </div>

            </div>
        )
    }

    
    render() { 
        return ( 
            <div 
                style={{
                    minHeight: '100vh',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'orange',
                        padding: '0 30px',
                        margin: '0',
                        overflow: 'hidden',
                        color: 'white'
                    }}
                >
                    <h1 style={{fontFamily:"'Krona One', sans-serif", fontSize: '36px',color:'rgba(0,0,0,.8)'}}>Contacts</h1>
                </div>
                <div style={{textAlign:'center', padding:'2em 1em'}}>
                    {
                        this.props.Contacts.isLoading?
                        this.cardLoading()
                        :
                        this.renderContacts()
                    }
                </div>

                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    style={{
                        position: 'fixed',
                        bottom: '3em',
                        right: '3em',
                    }}
                    onClick={()=>{
                        this.clearData()
                        this.setState({modalOpen:true})
                    }}
                >
                    Add Contact
                </Button>

                <Modal
                    open={this.state.modalOpen}
                    onClose={()=>{
                        this.setState({modalOpen:false})
                    }}
                    style={{
                        // overflow: 'scroll'
                        overflowY: 'scroll'
                    }}
                >
                    {
                        this.renderModal()
                    }

                </Modal>

            </div>
         );
    }
}
 
const MapstatetoProps=(state)=>{
    return {
        Contacts: state.Contacts
    }
}


// export default connect(MapstatetoProps,{GetContacts}) (Contacts);

export default compose(
    connect(MapstatetoProps,{GetContacts}),
    withStyles(style),
) (Contacts);