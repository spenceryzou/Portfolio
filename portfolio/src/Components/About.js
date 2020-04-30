import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div class="content">
                <div class="content-body">         
                    <div class="content-body-text">            
                        <div class="content-title">
                            About Me  
                        </div>
                        Hi, I'm Spencer. I'm a UC Santa Barbara second year pursuing Computer Science. 
                        I'd like to be involved in roles such as UI/UX Engineering, Web Development, Software Development, 
                        or anywhere that I can be involved in creating a product! 
                        <br></br><br></br>
                        In my free time, I like to read fashion blogs, play soccer, drink boba, and sing!
                    </div>        
                    <div class="content-body-image">
                        <img style={{paddingLeft: '1vw'}} src="images/cutoutblur.jpg"></img>
                    </div>
                </div>
            </div>
        )
    }
}
