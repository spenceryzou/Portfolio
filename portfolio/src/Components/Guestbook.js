import React, { Component } from 'react'
import config from '../config.js'
const firebase = require('firebase')

function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            // Not possible to set it back to false like this:
            setVisible(true);
            // No need to keep observing:
            observer.unobserve(domRef.current);
          }
      });
      observer.observe(domRef.current);
      return () => observer.unobserve(domRef.current);
    }, []);
    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
}

export default class Guestbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            message: '',
            public: false,
            email: '',
            entries: [],
            data: ["hi","hello"],
            errorMessages: '',
            submitted: ''
        }
    }
    componentDidMount(){
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('data')
        ref.orderByChild('date').on('value', snapshot => {
          const data = snapshot.val()
          let entries = [];
          for(let index in data){
              entries.push({
                  name: data[index].name,
                  description: data[index].description,
                  message: data[index].message,
                  public: data[index].public,
                  email: data[index].email,
                  date: data[index].date
              })
          }
          this.setState({entries: entries});
        })
    }
    handleChange = (e) =>{
        if(e.target.id == "public"){
            this.setState({public: true})
        }
        else if(e.target.id == "private"){
            this.setState({public: false})
        } else
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let error = await this.handleError();
        console.log(error)
        if(error){
            this.setState({submitted: ''})
            return null;
        }
        else{
            let submission = {
                name: this.state.name,
                description: this.state.description,
                message: this.state.message,
                email: this.state.email,
                public: this.state.public,
                date: new Date().toLocaleString(),
            }
            firebase.database().ref('data').push().set(submission)
            this.setState({submitted: ' Successfully submitted!'})
        }
    }
    handleError(){
        let errors = "";
        if(this.state.name.length <= 5){
            errors += "Name must be longer than 5 characters\n"
        }
        if(this.state.name.length >= 20){
            errors += "Name must be longer than 20 characters\n"
        }
        if(!this.state.description){
            errors += "Description is required\n"
        }
        if(this.state.description.length >= 100){
            errors += "Description must be less than 100 characters\n"
        }
        if(this.state.message.length <= 15){
            errors += "Message must be longer than 15 characters\n"
        }
        if(this.state.message.length >= 500){
            errors += "Message must be less than 500 characters\n"
        }
        if(!this.state.email){
            errors += "Email address is required\n"
        }
        console.log(errors)
        this.setState({errorMessages: errors})
        if(errors != "")
            return true;
        return false;
    }
  
    render() {
        return (
            <div class="content">
                <div class="content-body">
                    <div style={{whiteSpace: "pre-wrap"}} class="content-body-text guestbook-form">
                        <div class="content-title">
                            Guestbook
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            Name: <br></br>
                            <input
                                type='text'
                                name='name'
                                cols="40"
                                onChange={this.handleChange}
                            /><br></br>
                            *Enter a description of yourself: <br></br>
                            <textarea
                                type='text'
                                name='description'
                                cols="40"
                                onChange={this.handleChange}
                            /><br></br>
                            Message:<br></br>
                            <textarea
                                rows="4"
                                cols="40"
                                name='message'
                                onChange={this.handleChange}
                            /><br></br>
                            *Display message publicly:<br></br>
                                <input type="radio" id="public" name="public" value={this.state.public} onChange={this.handleChange} required/>
                                <label for="public">Yes</label><br/>
                                <input type="radio" id="private" name="public" value={this.state.public} onChange={this.handleChange} />
                                <label for="private">No</label><br/>
                            *Email Address: <br></br>
                            <input
                                type='text'
                                name='email'
                                onChange={this.handleChange}
                            /><br></br>
                            <input type='submit'/>
                            {this.state.submitted}
                        </form>
                        <span class="errors">
                            {this.state.errorMessages}
                        </span>
                    </div>
                    
                    <div class="guestbook-entries">
                        {this.state.entries.map((entry,index) => {
                            if(!entry.public){
                                return null;
                            }
                            return(
                                <FadeInSection>
                                <div id={index} class="entry">
                                    <div class="entry-title">
                                        <span style={{whiteSpace: 'nowrap'}}>{entry.name}</span>
                                        <span style={{marginLeft: '14px'}} class="entry-description">{entry.description}</span>
                                    </div>
                                    <div class="entry-date">{entry.date}</div>
                                    <div class="entry-message">{entry.message}</div><br></br>
                                </div>
                                </FadeInSection>
                            )
                        })}
                    </div>
                    
                </div>
            </div>
        )
    }
}
