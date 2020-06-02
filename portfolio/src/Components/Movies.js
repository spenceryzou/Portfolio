import React, { Component } from 'react'
import config from '../config.js'
const firebase = require('firebase')

const axios = require('axios')
const instance = axios.create({
    baseURL: 'https://www.omdbapi.com/',
});
const apikey = '45f2b795'

export default class Photos extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            lightboxID: "",
            shown: 1
        }
    }
    componentDidMount() {
        this.getDatabaseMovies()
    }
    openMovieLightbox = (src, title, director, imbd, imdbid) => {
        this.setState({lightboxID: imdbid})
        document.body.style.overflow='hidden';
        var enlargedImg = document.getElementById("enlargedImg");
        enlargedImg.src = src;
        enlargedImg.parentElement.style.display = "flex";
        var lightboxContainer = document.getElementById("lightbox-wrapper");
        // lightboxWrapper.innerHTML = lightboxWrapper.innerHTML + '<span>' + title + director + imbd + '</span>';
        // var c = lightboxWrapper.childNodes;
        var movieTitle = document.getElementById("movieTitle");
        movieTitle.textContent = title;
        var movieDirector = document.getElementById("movieDirector");
        movieDirector.textContent = director;
        var movieimbd = document.getElementById("movieRating");
        movieimbd.textContent = imbd;
        document.getElementById("lightbox").style.display = "block";
        // window.addEventListener("click", function handler(e) {
        //     //if(e.target.tagName != "IMG"){
        //     if(e.target.tagName != "IMG"){
        //         // c[1].textContent = "";
        //         document.body.style.overflow='auto';
        //         document.getElementById("lightbox").style.display = "none";
        //         this.removeEventListener('click', handler)
        //     }
        // })
        if (lightboxContainer) {
            lightboxContainer.addEventListener("click", e=>{
                if(e.target !== e.currentTarget)
                    return;
                document.body.style.overflow='auto';
                document.getElementById("lightbox").style.display = "none";
            })
        }
        console.log(this.state.lightboxID)
    }
    deleteMovie = () =>{
        firebase.database().ref(`lists/All/${this.state.lightboxID}`).remove();
        document.body.style.overflow='auto';
        document.getElementById("lightbox").style.display = "none";
    }
    addToList = async (e) =>{
        console.log(e.target.value)
        var selected = e.target.value
        var response = await instance.get(`/?apikey=${apikey}&i=${this.state.lightboxID}`)
        firebase.database().ref('lists').child(selected).child(`${this.state.lightboxID}`).set(response.data)
        this.forceUpdate();
    }
    getLists = () =>{
        console.log("getListsCalled")
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('lists')
        var lists = [];
        ref.on('value', snapshot =>{
            // const entries = snapshot.val()
            // for(let index in entries){
            //     lists.push(entries[index].key);
            // }
            snapshot.forEach(entry => {
                lists.push(entry.key)
            })
            console.log(lists);
        })
        var listsNotIn = [];
        for(var i = 0; i < lists.length; i++){
            console.log();
            firebase.database().ref(`lists/${lists[i]}/${this.state.lightboxID}`)
            .once('value', snapshot => {
                if(!snapshot.exists()){
                    listsNotIn.push(<option value={lists[i]}>{lists[i]}</option>);
                }
            })
        }
        console.log(listsNotIn);
        return(
            listsNotIn
        );
    }
    async getDatabaseMovies(){
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('lists').child('All')
        ref.on('value', async snapshot => {
          const movie = snapshot.val()
          let entries = [];
          for(let index in movie){
              let entry = {
                imdbID: (movie[index].imdbID),
                Title: (movie[index].Title),
                Poster: (movie[index].Poster),
                Director: (movie[index].Director),
                imdbRating: (movie[index].imdbRating)
              }
              entries.push(entry)
          }
        //   const promises =
        //     entries.map(async (entry) => {
        //     const response = await instance.get(`/?apikey=${apikey}&i=${entry}`)
        //     return response.data;
        //     })
        // const results = await Promise.all(promises)
        // console.log(results)
        this.setState({movies: entries})
        console.log(this.state.movies)
        })
    }
    handleList = (e) => {
        console.log(e.target.value);
        var selected = e.target.value;
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('lists').child(selected)
        ref.on('value', async snapshot => {
          const movie = snapshot.val()
          let entries = [];
          for(let index in movie){
              let entry = {
                imdbID: (movie[index].imdbID),
                Title: (movie[index].Title),
                Poster: (movie[index].Poster),
                Director: (movie[index].Director),
                imdbRating: (movie[index].imdbRating)
              }
              entries.push(entry)
          }
        //   const promises =
        //     entries.map(async (entry) => {
        //     const response = await instance.get(`/?apikey=${apikey}&i=${entry}`)
        //     return response.data;
        //     })
        // const results = await Promise.all(promises)
        // console.log(results)
        this.setState({movies: entries})
        console.log(this.state.movies)
        })
    }
    handleChange = (e) =>{
        var search = e.target.value;
        let ref = firebase.database().ref('lists').child('All')
        ref.on('value', async snapshot => {
          const movie = snapshot.val()
          let entries = [];
          for(let index in movie){
            if(movie[index].Title.toLowerCase() == search.toLowerCase()){
                let entry = {
                    imdbID: (movie[index].imdbID),
                    Title: (movie[index].Title),
                    Poster: (movie[index].Poster),
                    Director: (movie[index].Director),
                    imdbRating: (movie[index].imdbRating)
                  }
                  entries.push(entry)
            }
          }
        this.setState({movies: entries})
        console.log(this.state.movies)
        })
    }
    

    render() {
        var showUpTo = this.state.shown * 8;
        const shownMovies = this.state.movies.slice(0, showUpTo);
        var more;

        if(showUpTo < this.state.movies.length){
            more = <button style={{position: "fixed",
                bottom: "2.5vh",
                right: "15vw",
                zIndex: "1",
                cursor: "pointer"}} onClick={() => this.setState({shown: this.state.shown + 1})}>More</button>
        }
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('lists')
        var lists = [];
        ref.on('value', snapshot =>{
            // const entries = snapshot.val()
            // for(let index in entries){
            //     lists.push(entries[index].key);
            // }
            snapshot.forEach(entry => {
                lists.push(entry.key)
            })
        })
        var selectList = lists.map((i) => {
            return(
                <option value={i}>{i}</option>
            )
        })
        return (
            <div>
                <div class="content">
                    <div className="select-container">
                    <select id="lists" onChange={this.handleList}>
                        {selectList}
                    </select>
                    <form onSubmit={this.handleSubmit}>
                            Search Movie: <br></br>
                            <input
                                type='text'
                                name='search'
                                cols="40"
                                onChange={this.handleChange}
                            /><br></br>
                            <input value="Reset" type='submit'/>
                    </form>
                    </div>
                    <div class="movie-container">
                        {shownMovies.map((entry) => {
                            return(<div>
                                        <img id="poster" src={entry.Poster} onClick={()=>this.openMovieLightbox(entry.Poster, entry.Title, entry.Director, entry.imdbRating, entry.imdbID)}></img>
                                    </div>)
                        })}
                    </div>
                    <div>{more}</div>
                </div>
                <div id="lightbox">
                    <div id="lightbox-wrapper" className="lightbox-img-wrapper">
                        <div id="lightbox-container" className="lightbox-container">
                            <img src="" id="enlargedImg"></img>
                            <div className="movieDetails" id="movieTitle"></div>
                            <div className="movieDetails" id="movieDirector"></div>
                            <div className="movieDetails" id="movieRating"></div>
                            <button onClick={this.deleteMovie}>Delete Movie</button>
                            <select id="otherLists" onChange={this.addToList}>
                                <option default></option>
                                {this.getLists()}
                            </select>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}