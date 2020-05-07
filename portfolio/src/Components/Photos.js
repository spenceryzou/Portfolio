import React, { Component } from 'react'

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
                    <img src={process.env.PUBLIC_URL + "/images/uparrow.png"} onClick={this.toTop}></img>
                </div>
                <div class="content">
                    <div class="gallery-container">
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/IMG_5504_1200.jpg"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/IMG_5504_1200.jpg")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/sagrada_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/sagrada_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/market_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/market_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/casamila_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/casamila_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/lakedad_1200.jpg"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/lakedad_1200.jpg")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/boats_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/boats_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/cityscape_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/cityscape_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/stain_1200.JPG"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/stain_1200.JPG")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/lake_1200.jpg"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/lake_1200.jpg")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/IMG_5604_1200.jpg"} alt="" id="box" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/IMG_5604_1200.jpg")}></img></div>
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/IMG_6211_1200.jpg"} alt="" id="boxPortrait" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/IMG_6211_1200.jpg")}></img></div> 
                        </FadeInSection>
                        <FadeInSection>
                        <div class="photo"><img src={process.env.PUBLIC_URL + "/images/street_1200.JPG"} alt="" id="boxPortrait" onClick={this.props.functions.openLightbox.bind(this, process.env.PUBLIC_URL + "/images/street_1200.JPG")}></img></div>
                        </FadeInSection>
                    </div>
                </div>
                <div id="lightbox">
                    <img src="" id="enlargedImg"></img>
                </div>
            </div>
        )
    }
}
