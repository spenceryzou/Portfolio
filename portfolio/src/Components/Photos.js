import React, { Component } from 'react'

export default class Photos extends Component {
    constructor(props){
        super(props);
        this.handleScroll = this.props.functions.handleScroll.bind(this);
        this.toTop = this.props.functions.toTop.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    render() {
        return (
            <div>
                <div id="topBtn">
                    <img src="images/uparrow.png" onClick={this.toTop}></img>
                </div>
                <div class="content">
                    <div class="gallery-container">
                        <div class="photo"><img src="images/IMG_5504.jpg" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/IMG_5504.jpg")}></img></div>
                        <div class="photo"><img src="images/barca/sagrada.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/sagrada.JPG")}></img></div>
                        <div class="photo"><img src="images/barca/market.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/market.JPG")}></img></div>
                        <div class="photo"><img src="images/barca/casamila.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/casamila.JPG")}></img></div>
                        <div class="photo"><img src="images/lakedad.jpg" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/lakedad.jpg")}></img></div>
                        <div class="photo"><img src="images/barca/boats.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/boats.JPG")}></img></div>
                        <div class="photo"><img src="images/barca/cityscape.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/cityscape.JPG")}></img></div>
                        <div class="photo"><img src="images/barca/stain.JPG" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/barca/stain.JPG")}></img></div>
                        <div class="photo"><img src="images/lake.jpg" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/lake.jpg")}></img></div>
                        <div class="photo"><img src="images/IMG_5604.jpg" alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, "images/IMG_5604.jpg")}></img></div>
                        <div class="photo"><img src="images/IMG_6211.jpg" alt="" id="boxPortrait" onClick={this.props.functions.openLightbox.bind(this, "images/IMG_6211.jpg")}></img></div> 
                        <div class="photo"><img src="images/street.JPG" alt="" id="boxPortrait" onClick={this.props.functions.openLightbox.bind(this, "images/street.JPG")}></img></div>
                    </div>
                </div>
                <div id="lightbox">
                    <img src="" id="enlargedImg"></img>
                </div>
            </div>
        )
    }
}
