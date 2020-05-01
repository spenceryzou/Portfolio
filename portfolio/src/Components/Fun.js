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

export default class Fun extends Component {
    render() {
        return (
        <div class="content">
            <div class="content-body">         
                <div class="covers-text content-body-text">        
                    <div class="content-title"style={{textAlign:"center"}} >
                        Covers
                    </div>
                    Nothing by Bruno Major
                </div>        
                <div class="covers-video content-body-image">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fyyVU6P9A1Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="covers-text content-body-text">        
                    <div class="content-title"style={{textAlign:"center"}}>
                    Graphics
                    </div>
                    Photoshop Work<br></br><br></br>
                </div>
            </div>
            <div class="content-body-grid4">
                <FadeInSection>
                <div class="content-body-image">
                    <img src="images/IMG_4588.jpeg"></img>
                </div>
                </FadeInSection>
                <FadeInSection>
                <div class="content-body-image">
                    <img src="images/photoshopmagic1.png"></img>
                </div>  
                </FadeInSection>
                <FadeInSection>   
                <div class="content-body-image">
                    <img src="images/IMG_5952.JPG"></img>
                </div>
                </FadeInSection>
                <FadeInSection>
                <div class="content-body-image">
                    <img src="images/photoshopmagic2.jpg"></img>
                </div>
                </FadeInSection>         
            </div>
        </div>
        )
    }
}
