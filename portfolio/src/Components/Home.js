import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didLoad: false
        }
    }
    onLoad = () => {
        this.setState({
            didLoad: true
        })
    }

    render() {
        const loadImg = this.state.didLoad ? {} : {visibility: 'hidden'}
        return (
            <div class="content" style={{marginTop: '1vw'}}>
                <div class="content-body home-content-body">         
                    <div class="content-body-text">            
                        <div class="content-title" style={{color:"#ea5e76",lineHeight:".8em"}}>
                            Hello!  
                        </div>
                        <div class="namedrop" style={{fontSize:'64px', fontWeight: 'bold', lineHeight:"1.5em"}}>
                        I'm Spencer. 
                        </div>
                        I'm a UCSB second year studying Computer Science. 
                        I'm interested in roles such as UI/UX Engineering, Web Development, Software Development, 
                        or anywhere that I can be involved in creating a product! {/* 
                        <br></br><br></br>
                        In my free time, I like to read fashion blogs, play soccer, drink boba, and sing! */}
                    </div>        
                    <div class="content-body-image">
                        <img onLoad={this.onLoad} style={{...loadImg, paddingLeft: '1vw'}} src={process.env.PUBLIC_URL + '/images/cutoutblur.jpg' }></img>
                    </div>
                </div>
            </div>
        )
    }
}
