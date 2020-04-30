import React, { Component } from 'react'
import './App.css'
import TabList from './Components/TabList'
import Body from './Components/Body'

export class App extends Component {
  constructor(){
    super();
    this.state ={
      activeTab: 1
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
  }
  
  render() {
    const functions = {
      openLightbox: this.openLightbox,
      toTop: this.toTop,
      handleScroll: this.handleScroll
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
            <h1 class="site-title left-nav"><a href="index.html">Spencer Zou</a></h1>
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
            <Body activeTab={this.state.activeTab} functions={functions}/>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
