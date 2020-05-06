import React, { Component } from 'react'

export default class About extends Component {
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
                <div class="about-content-body">                    
                    <div id="aboutImg" class="content-body-image about-image">
                        <img onLoad={this.onLoad} style={{loadImg}} src={process.env.PUBLIC_URL + "/images/lobster2.png"}></img>
                    </div>         
                    <div class="content-body-text about-text">            
                        <div class="content-title" style={{color:"#ea5e76"}}>
                            About Me  
                        </div>
                        Hi there, I'm Spencer! I'm a second year UC Santa Barbara Computer Science student from the Bay Area.
                        I'm interested in Human-Computer Interaction, particulary developing media, interfaces, and graphics that serve
                        to change a user's perception and intuition through design cues. I'm currently searching for
                        internships for Summer 2020! If you or someone you know is interested, check out this fancy sheet of paper: <a style={{fontStyle: "italic"}} target="_blank" href="https://drive.google.com/file/d/1cBK1KNmMv8Ypru8Uj5dLXweS0iUCLxeY/view?usp=sharing">résumé</a>
                        <br></br><br></br>
                        In my free time, I like to read fashion blogs, play soccer (big Manchester City fan), drink boba, and sing!

                        {/*I'm a UCSB second year pursuing Computer Science. 
                        I'm interested in roles such as UI/UX Engineering, Web Development, Software Development, 
                        or anywhere that I can be involved in creating a product! { 
                        <br></br><br></br>
                        In my free time, I like to read fashion blogs, play soccer, drink boba, and sing! */}
                    </div>        

                </div>
            </div>
        )
    }
}
