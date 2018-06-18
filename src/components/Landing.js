import React from 'react';

const hStyle = {
    textAlign: "center"
}

const Landing = () => (
    <section className="landing" style={hStyle}>
        <h2 className="hero-title">Bloc Jams BETA has arrived - Turn the music up!</h2>

        <section className="selling-points">
            <div className="point">
                <h3 className="point-title">You got the invite - Now choose your music</h3>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
            <div className="point">
                <h3 className="point-title">Unlimited, streaming, ad-free</h3>
                <p className="point-description">No arbitrary limits. No distractions. Listen to the same album under TWO different names as many times as you want!</p>
            </div>
            <div className="point">
                <h3 className="point-title">Mobile enabled</h3>
                <p className="point-description">Listen to your music on the go! This streaming service is available on all mobile platforms.</p>
            </div>
        </section>
    </section>
);

export default Landing;