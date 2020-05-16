import React, { Component } from 'react'

const axios = require('axios')
const arrMovie = ['tt3783958', 'tt0080684', 'tt8637428','tt1302011','tt4633694','tt2488496','tt3501632','tt2584384']
const instance = axios.create({
    baseURL: 'https://www.omdbapi.com/',
});
const apikey = '45f2b795'

export default class Photos extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : []
        }
    }
    componentDidMount() {
        this.generateMovies()
    }
    async generateMovies(){
        var self = this;
        const promises =
        arrMovie.map(async (entry) => {
            const response = await instance.get(`/?apikey=${apikey}&i=${entry}`)
            return response.data;
        })
        const results = await Promise.all(promises)
        console.log(results)
        this.setState({ movies: this.state.movies.concat(results)})
    }
    render() {
        return (
            <div>
                <div class="content">
                    <div class="movie-container">
                        {this.state.movies.map((entry) => {
                            return(<div>
                                        <div><img id="poster" src={entry.Poster} onClick={this.props.functions.openMovieLightbox.bind(this, entry.Poster, entry.Title, entry.Director, entry.imdbRating)}></img></div>
                                    </div>)
                        })}
                    </div>
                </div>
                <div id="lightbox">
                    <div className="lightbox-img-wrapper"> 
                        <img src="" id="enlargedImg"></img>
                    </div>
                    <div className="movieDetails" id="movieTitle"></div>
                    <div className="movieDetails" id="movieDirector"></div>
                    <div className="movieDetails" id="movieRating"></div>
                </div>
            </div>
        )
    }
}