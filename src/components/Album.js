import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

const tableStyle = {
    margin: "auto"
}

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0,
            isPlaying: false,
            isHovering: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

        componentDidMount() {
            this.eventListeners = {
                timeupdate: e => {
                    this.setState({ currentTime: this.audioElement.currentTime });
                },
                durationchange: e => {
                    this.setState({ duration: this.audioElement.duration });
                }
            };
            this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
            this.audioElement.addEventListener('duration', this.eventListeners.durationchange);
        }

        componentWillUnmount() {
            this.audioElement.src = null;
            this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
            this.audioElement.removeEventListener('duration', this.eventListeners.durationchange);
        }

        play() {
            this.audioElement.play();
            this.setState({ isPlaying: true });
        }

        pause() {
            this.audioElement.pause();
            this.setState({ isPlaying: false });
        }

        setSong(song) {
            this.audioElement.src = song.audioSrc;
            this.setState({ currentSong: song });
        }

        handleSongClick(song) {
            const isSameSong = this.state.currentSong === song;
            if (this.state.isPlaying && isSameSong) {
                this.pause();
            } else {
                if (!isSameSong) { this.setSong(song); }
                this.play();
            }
        }

        handlePrevClick() {
            const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
            const newIndex = Math.max(0, currentIndex - 1);
            const newSong = this.state.album.songs[newIndex];
            this.setSong(newSong);
            this.play();
        }

        handleNextClick() {
            const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
            const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
            const newSong = this.state.album.songs[newIndex];
            this.setSong(newSong);
            this.play();
        }

        handleTimeChange(e) {
            const newTime = this.audioElement.duration * e.target.value;
            this.audioElement.currentTime = newTime;
            this.setState({ currentTime: newTime });
        }

        handleVolumeChange(e) {
            const newVolume = e.target.value;
            this.audioElement.volume = newVolume;
            this.setState({ volume: newVolume });
            this.audioElement.volume = newVolume;
        }

        formatTime(time) {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            if (sec < 10) {
                return min + ":" + 0 + sec;
            } else if (sec >= 10) {
                return min + ":" + sec;
            } else if (isNaN(time)) {
                return "-:--";
            }
    }

    render () {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list" className="mdl-data-table mdl-js-data-table" style={tableStyle}>
                    <thead id="song-list-header">
                        <tr id="song-list-colnames">
                            <th>Number</th>
                            <th className="mdl-data-table__cell--non-numeric">Title</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map( (song, index ) =>
                        <tr className="song" key={index}
                            onClick={() => this.handleSongClick(song)}
                            onMouseLeave={() => this.setState({ isHovering: false })}
                            onMouseEnter={() => this.setState({ isHovering: index + 1})}>
                            { (this.state.currentSong.title === song.title) ? this.state.isPlaying ? <td className="ion-md-pause"></td> : <td className="ion-md-play"></td>
                            : (this.state.isHovering === index + 1) ? <td className="ion-md-play"></td> : <td className="song-number">{index+1}</td>}
                            <td id="song-title" className="mdl-data-table__cell--non-numeric">{song.title}</td>
                            <td id="song-duration">{this.formatTime(song.duration)}</td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
                <PlayerBar
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                duration={this.audioElement.duration}
                volume={this.audioElement.volume}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                formatTime={(time) => this.formatTime(time)}
                />
            </section>
        );
    }
}

export default Album;