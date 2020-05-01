import React, { Component } from 'react'

export default class Works extends Component {
    render() {
        return (
            <div class="content">
                <div class="content-body">
                    <div class="content-body-text">
                        <div class="content-title">
                            <a href="https://spotifynd-friends.herokuapp.com/">Spotifynd Friends</a>
                        </div>
                        Spotifynd Friends is a web app that utilizes the Spotify Web API to
                        analyze and generate compatibility ratings between user's playlists using track
                        audio features.
                        Using this web app, users can find others who have similar music tastes! <a href={process.env.PUBLIC_URL + "/Documentation.pdf"} target="_blank">Documentation</a><br></br>
                    </div>
                    <div class="content-body-image">
                        <a href="https://spotifynd-friends.herokuapp.com/">
                            <img src={process.env.PUBLIC_URL + "/images/project.jpg"}></img>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
