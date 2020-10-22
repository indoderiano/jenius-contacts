import React, { Component } from 'react'
import Axios from 'axios'
import { Card, Icon, Image, Button, Header, Modal, Input, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Routing, GetContacts } from '../redux/actions'

class Contacts extends Component {
    state = { 
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
     }

    componentDidMount=()=>{

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
            this.setState({errordelete:err.response.data.message,isDeleting:false})
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
            
            Axios.post(`https://simple-contact-crud.herokuapp.com/contact`,contact)
            .then((res)=>{
                console.log(res.data.message)
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

    cardLoading=()=>{
        return (
            <Card style={{margin:'0 1em 1em 0', display: 'inline-block'}}>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                <Image src='https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg' wrapped ui={false} />
                <Card.Content>
                <Card.Header>Name</Card.Header>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    Age ? years old
                </a>
                </Card.Content>
            </Card>
        )
    }


    renderContacts=()=>{
        return this.props.Contacts.contacts.map((person,index)=>{
            return (
                <Card key={person.id} style={{margin:'0 1em 1em 0', display: 'inline-block'}}>
                    <Image 
                        src={person.photo!=='N/A' ? person.photo: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'} 
                        wrapped 
                        ui={false} 
                    />
                    <Card.Content>
                    <Card.Header>{person.firstName+' '+person.lastName}</Card.Header>
                    {/* <Card.Meta>
                        <span className='date'>{person.age} years old</span>
                    </Card.Meta> */}
                    {/* <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description> */}
                    </Card.Content>
                    <Card.Content>
                    <span>
                        <Icon name='user' />
                        Age {person.age} years old
                    </span>
                    </Card.Content>

                    {
                        this.state.indexdelete==index?
                        <Card.Content extra>
                            <Button basic color='red'
                                style={{position:'relative'}}
                                onClick={()=>{
                                    this.DeleteContact(person.id)
                                }}
                            >
                                Confirm
                                <Dimmer active={this.state.isDeleting} inverted>
                                    <Loader inverted size='small'></Loader>
                                </Dimmer>    
                            </Button>
                            <Button basic
                                onClick={()=>{
                                    this.clearData()
                                }}
                            >Cancel</Button>
                        </Card.Content>
                        :
                        <Card.Content extra>
                            <Button basic color='teal'
                                onClick={()=>{
                                    console.log('loh kok')
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
                            <Button basic color='red'
                                onClick={()=>{
                                    this.setState({indexdelete: index})
                                }}
                            >
                                Delete
                            </Button>
                        </Card.Content>
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

    render() { 
        return ( 
            <div style={{
                    // textAlign:'center', 
                    
                }}
            >
                <div
                    style={{
                        padding:'2em'
                    }}
                >
                    <div>
                        <h1 style={{marginBottom:'2em'}}>List Of Contacts</h1>
                    </div>

                    {
                        this.props.Contacts.isLoading?
                        this.cardLoading()
                        :
                        this.renderContacts()
                    }
                </div>
                <div
                    style={{
                        marginTop:'3em',
                        marginBottom:'3em',
                        textAlign:'center'
                    }}
                >
                    <Modal
                        style={{width:'400px'}}
                        onClose={() => this.clearData()}
                        onOpen={() => this.setState({modalOpen:true})}
                        open={this.state.modalOpen}
                        trigger={<Button color='orange' size='big'>Add Contact</Button>}
                        >
                        <Modal.Header>Input New Contact</Modal.Header>
                        <Modal.Content style={{textAlign:'center'}}>
                            <Grid style={{textAlign:'left'}}>
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        <span style={{verticalAlign:'-7px'}}>Photo Image Url</span>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Input focus placeholder='url'
                                            onChange={(e)=>{
                                                this.setState({newPhoto:e.target.value})
                                            }}
                                            value={this.state.newPhoto}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        <span style={{verticalAlign:'-7px'}}>First Name</span>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Input focus placeholder='first name'
                                            onChange={(e)=>{
                                                this.setState({newFirstName:e.target.value})
                                            }}
                                            value={this.state.newFirstName}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        <span style={{verticalAlign:'-7px'}}>Last Name</span>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Input focus placeholder='last name'
                                            onChange={(e)=>{
                                                this.setState({newLastName:e.target.value})
                                            }}
                                            value={this.state.newLastName}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        <span style={{verticalAlign:'-7px'}}>Age</span>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Input focus placeholder='age'
                                            onChange={(e)=>{
                                                this.setState({newAge:e.target.value})
                                            }}
                                            value={this.state.newAge}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            {
                                this.state.newPhoto?
                                <Image src={this.state.newPhoto} style={{marginTop:'2em', width:'70%',display:'inline-block'}}/>
                                : null
                            }
                            {
                                this.state.errorMessage?
                                <p style={{color:'red', marginTop:'2em'}}>{this.state.errorMessage}</p>
                                : null
                            }
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => this.clearData()}>
                                Cancel
                            </Button>

                            {
                                this.state.editmode?
                                <Button
                                    color='orange'
                                    style={{position:'relative'}}
                                    onClick={this.EditContact}
                                >
                                    Save
                                    <Dimmer active={this.state.isUploading} inverted>
                                        <Loader inverted size='small'></Loader>
                                    </Dimmer>
                                </Button>
                                :
                                <Button
                                    color='orange'
                                    style={{position:'relative'}}
                                    // labelPosition='right'
                                    // icon='checkmark'
                                    onClick={this.AddContact}
                                    // positive
                                >
                                    Submit
                                    <Dimmer active={this.state.isUploading} inverted>
                                        <Loader inverted size='small'></Loader>
                                    </Dimmer>
                                </Button>
                            }
                        </Modal.Actions>
                    </Modal>
                </div>
            
            </div>
         );
    }
}

const MapstatetoProps=(state)=>{
    return {
        Contacts: state.Contacts
    }
}


export default connect(MapstatetoProps,{Routing,GetContacts}) (Contacts);