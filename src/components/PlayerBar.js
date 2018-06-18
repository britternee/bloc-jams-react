import React, { Component } from 'react';

const volSlider = {
    width: '400px',
    float: 'right',
}

const timeSlider = {
    width: '400px',
    float: 'left',
}

const bStyle = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
}


class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                <div style={bStyle}>
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-md-skip-backward"></span>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <span className="ion-md-skip-forward"></span>
                    </button>
                </div>
                </section>
                <section id="time-control" style={timeSlider}>
                    <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                    <input
                        type="range"
                        className="mdl-slider mdl-js-slider"
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                </section>
                <p>
                <section id="volume-control" style={volSlider}>
                    <div className="icon ion-md-volume-low"></div>
                    <input
                        className="mdl-slider mdl-js-slider"
                        type="range"
                        value={this.props.volume}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-md-volume-high"></div>
                </section>
                </p>
            </section>
        );
    }
}

export default PlayerBar;