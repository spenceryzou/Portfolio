import React, { Component } from 'react'
import config from '../config.js'
const firebase = require('firebase')

const axios = require('axios')
const arrMovie = ['tt3783958', 'tt0080684', 'tt8637428','tt1302011','tt4633694','tt2488496','tt3501632','tt2584384']
const instance = axios.create({
    baseURL: 'https://www.omdbapi.com/',
});
const apikey = '45f2b795'

export default class CreateList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: '',
            errorMessages: '',
            submitted: ''
        }
    }
    componentDidMount() {
        if(!firebase.apps.length)
            firebase.initializeApp(config)
    }
    handleChange = (e) =>{
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
            firebase.database().ref('lists').child(this.state.list).set("")
            this.setState({submitted: ' Successfully submitted!'})
        }
    }
    async handleError(){
        let errors = "";
        if(!this.state.list){
            errors += "Please enter a list\n"
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
                    <div class="covers-text content-body-text">
                        <div class="content-title"style={{textAlign:"center"}} >
                        Add a New List
                        </div>
                        <div style={{whiteSpace: "pre-wrap"}} class="addmovie-form">
                        <form onSubmit={this.handleSubmit}>
                            Please give a list name: <br></br>
                            <input
                                type='text'
                                name='list'
                                cols="40"
                                onChange={this.handleChange}
                            /><br></br>
                            <input type='submit'/>
                            {this.state.submitted}
                        </form>
                        <span class="errors">
                            {this.state.errorMessages}
                        </span>
                    </div>
                    </div>  
                </div>  
            </div>
        )
    }
}