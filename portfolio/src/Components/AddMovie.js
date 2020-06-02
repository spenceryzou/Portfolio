import React, { Component } from 'react'
import config from '../config.js'
const firebase = require('firebase')

const axios = require('axios')
const arrMovie = ['tt3783958', 'tt0080684', 'tt8637428','tt1302011','tt4633694','tt2488496','tt3501632','tt2584384']
const instance = axios.create({
    baseURL: 'https://www.omdbapi.com/',
});
const apikey = '45f2b795'

export default class AddMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            imdbID: '',
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
            firebase.database().ref('lists').child('All').child(this.state.imdbID).set(this.state.movie)
            this.setState({submitted: ' Successfully submitted!'})
        }
    }
    async handleError(){
        let errors = "";
        if(!this.state.imdbID){
            errors += "Please enter an imdbID\n"
        }
        console.log(errors)
        this.setState({errorMessages: errors})
        if(errors != "")
            return true;
        var response = await instance.get(`/?apikey=${apikey}&i=${this.state.imdbID}`)
        console.log(response.data.Response)
        if(response.data.Response == "False"){
            errors +="imdbID is invalid\n"
        }else{
            this.setState({movie: response.data})
        }
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
                        Add a New Movie
                        </div>
                        Movie ID:
                        <div style={{whiteSpace: "pre-wrap"}} class="addmovie-form">
                        <form onSubmit={this.handleSubmit}>
                            Please give the exact imdbID: <br></br>
                            <input
                                type='text'
                                name='imdbID'
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