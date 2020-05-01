import React, { Component } from 'react'

export default class Home extends Component {
    render() {
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
                        <img style={{paddingLeft: '1vw'}} src="images/cutoutblur.jpg"></img>
                    </div>
                </div>
            </div>
        )
    }
}
