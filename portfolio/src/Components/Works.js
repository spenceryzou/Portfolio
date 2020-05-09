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

export default class Works extends Component {
    render() {
        return (
            <div class="content">
                <div class="content-body">
                    <div class="content-body-text works-text">
                        <div class="content-title">
                            <a href="https://spotifynd-friends.herokuapp.com/">Spotifynd Friends</a>
                        </div>
                        Spotifynd Friends is a web app that utilizes the Spotify Web API to
                        analyze and generate compatibility ratings between user's playlists using track
                        audio features.
                        Using this web app, users can find others who have similar music tastes! <a href={process.env.PUBLIC_URL + "/Documentation.pdf"} target="_blank">Documentation</a><br></br>
                    </div>
                    <FadeInSection>
                    <div class="photo content-body-image">
                        <a href="https://spotifynd-friends.herokuapp.com/">
                            <img id="card" src={process.env.PUBLIC_URL + "/images/project.jpg"}></img>
                        </a>
                    </div>
                    </FadeInSection>
                </div>
            </div>
        )
    }
}
