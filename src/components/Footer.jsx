import React,{ Component } from 'react'

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div style={{
                    padding:'2em 100px',
                    backgroundColor: 'rgba(0,0,0,.85)',
                    // textAlign: 'right',
                    color: 'white'
                }}>
                    <div
                        style={{
                            display: 'inline-block',
                            // float: 'right'
                            textAlign: 'left',
                            marginRight: '100px',
                            fontWeight: '100',
                            fontStyle: 'italic'
                        }}
                    >
                        <div style={{
                            fontWeight: '500',
                            marginBottom: '.5em'
                        }}>
                            Author
                        </div>
                        <div style={{
                            opacity: '.7'
                        }}>
                            <div
                                style={{
                                    // fontSize: '13px',
                                }}
                            >
                                Indo Halim
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'inline-block',
                            fontWeight: '100',
                            fontStyle: 'italic'
                        }}
                    >
                        <div style={{
                            fontWeight: '500',
                            marginBottom: '.5em'
                        }}>
                            Visit My Personal Website
                        </div>
                        <div style={{
                            opacity: '.7'
                        }}>
                            <a
                                href='https://indo-halim.web.app/'
                                target='_blank'
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    // fontSize: '13px',
                                }}
                                className='link'
                            >
                                https://indo-halim.web.app/
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        // height: '30px',
                        backgroundColor: 'rgba(0,0,0,.9)'
                    }}
                />

            </div>
         );
    }
}
 
export default Footer;