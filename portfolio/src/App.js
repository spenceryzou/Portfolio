import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom";
import './App.css'
import TabList from './Components/TabList'
import Body from './Components/Body'
import Home from './Components/Home'
import About from './Components/About'
import Works from './Components/Works'
import Photos from './Components/Photos'
import Fun from './Components/Fun'
import Guestbook from './Components/Guestbook'
import Movies from './Components/Movies'
import AddMovie from './Components/AddMovie'
import CreateList from './Components/CreateList'
import config from './config.js'
const firebase = require('firebase')

export class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      activeTab: 1,
      data: {},
      lightboxID:""
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
    this.handleScroll = () => {
      if((document.documentElement.scrollTop/document.documentElement.scrollHeight > .25) || (document.body.scrollTop/document.body.scrollHeight > .25)){
          document.getElementById("topBtn").style.display = "block";
      }
      else{
          document.getElementById("topBtn").style.display = "none";
      }
    }
    this.toTop = () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
    this.openLightbox = (src) => {
        var enlargedImg = document.getElementById("enlargedImg");
        enlargedImg.src = src;
        enlargedImg.parentElement.style.display = "block";
        document.getElementById("lightbox").style.display = "block";
        window.addEventListener("click", function handler(e) {
            if(e.target.tagName != "IMG"){
                document.getElementById("lightbox").style.display = "none";
                this.removeEventListener('click', handler)
            }
        })
    }
  //   this.openMovieLightbox = (src, title, director, imbd, imdbid) => {
  //     document.body.style.overflow='hidden';
  //     var enlargedImg = document.getElementById("enlargedImg");
  //     enlargedImg.src = src;
  //     enlargedImg.parentElement.style.display = "flex";
  //     var lightboxWrapper = document.getElementById("lightbox-wrapper");
  //     // lightboxWrapper.innerHTML = lightboxWrapper.innerHTML + '<span>' + title + director + imbd + '</span>';
  //     // var c = lightboxWrapper.childNodes;
  //     var movieTitle = document.getElementById("movieTitle");
  //     movieTitle.textContent = title;
  //     var movieDirector = document.getElementById("movieDirector");
  //     movieDirector.textContent = director;
  //     var movieimbd = document.getElementById("movieRating");
  //     movieimbd.textContent = imbd;
  //     document.getElementById("lightbox").style.display = "block";
  //     window.addEventListener("click", function handler(e) {
  //         if(e.target.tagName != "IMG"){
  //             // c[1].textContent = "";
  //             document.body.style.overflow='auto';
  //             document.getElementById("lightbox").style.display = "none";
  //             this.removeEventListener('click', handler)
  //         }
  //     })

  // }
  }
  // componentDidMount(){
  //     firebase.initializeApp(config)
  //     let ref = firebase.ref('data')
  //     ref.on('value', snapshot => {
  //       const data = snapshot.val()
  //       this.setState({data: data})
  //     })
  // }

  // componentDidUpdate(prevProps, prevState, snapshot){
	//   //only call set state here if it is wrapped in a condition
	//   //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
	//   if(this.state.shouldUpdate != prevState.shouldUpdate){
	// 	//same code as above to retrieve the data 
	//   }
  // }
  
  render() {
    const functions = {
      openLightbox: this.openLightbox,
      toTop: this.toTop,
      handleScroll: this.handleScroll,
      //openMovieLightbox: this.openMovieLightbox
    }
    const tabs = [
      {
        id: 1,
        title: 'home'
      },
      {
        id: 2,
        title: 'about'
      },
      {
        id: 3,
        title: 'works'
      },
      {
        id: 4,
        title: 'photos'
      },
      {
        id: 5,
        title: 'fun'
      },
      {
        id: 6,
        title: 'guestbook'
      },
      {
        id: 7,
        title: 'movies'
      },
      {
        id: 8,
        title: 'addmovie'
      },
      {
        id: 9,
        title: 'createlist'
      }
    ]
    return (
      <div>
        <head>
          <title>Spencer Zou</title>
          <link rel="stylesheet" href="https://use.typekit.net/rlz2ltd.css"></link>
        </head>
        <div className="body">
          <div class="header">     
            <h1 class="site-title left-nav">
            <Link to="/home" onClick={this.changeTab.bind(this, 1)}>Spencer Zou</Link></h1>
            <div class="right-nav">            
                <TabList tabs={tabs} activeTab={this.state.activeTab} changeTab={this.changeTab}/>
                {/* <a class="current-tab tab" href="index.html">home</a>
                <a class="tab" href="about.html">about</a>
                <a class="tab" href="works.html">works</a>
                <a class="tab" href="photos.html">photos</a>
                <a class="tab" href="fun.html">fun</a> */}
            </div>
          </div>
          <div className="main-body">
              <Route exact path="/" render={(props) => <Home {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route exact path="/portfolio" render={(props) => <Home {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/home" render={(props) => <Home {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/about" render={(props) => <About {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/works" render={(props) => <Works {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/photos" render={(props) => <Photos {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/fun" render={(props) => <Fun {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/guestbook" render={(props) => <Guestbook {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/movies" render={(props) => <Movies {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/addmovie" render={(props) => <AddMovie {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              <Route path="/createlist" render={(props) => <CreateList {...props} activeTab={this.state.activeTab} functions={functions}/>}/>
              {/* <Body activeTab={this.state.activeTab} functions={functions}/> */}
          </div>
        </div>
      </div>
    )
  }
}
export default App;
