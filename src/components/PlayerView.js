import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactPlayer from 'react-player'

class PlayerView extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.audiofile === nextProps.audiofile && this.props.youtubeUrl === nextProps.youtubeUrl) {
            return false;
          } else {
            return true;
          } 
      }

    render() {
        console.log(this.props.audiofile);
        console.log(this.props.youtubeUrl);
        
        var audiourl = '';
        let player;
        if(this.props.audiofile !== ''){
            audiourl = URL.createObjectURL(this.props.audiofile)
            player = <AudioPlayer
            autoPlay
            src={audiourl}
            onPlay={e => console.log("onPlay")}
            onListen={e => this.props.highlightFingerprint(e.target.currentTime)}
        // other props here
        />
        }else if(this.props.youtubeUrl !== ''){
            player =<ReactPlayer 
            // url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            url={this.props.youtubeUrl}
            playing 
            controls
            onSeek={(e) => console.log(e)}
            onProgress={(e) => this.props.highlightFingerprint(e.playedSeconds)}
            />
        }else {
            player = <div/>;
        }
        return (<div>{player}
            {/* <AudioPlayer
                autoPlay
                src={audiourl}
                onPlay={e => console.log("onPlay")}
                onListen={e => this.props.highlightFingerprint(e.target.currentTime)}
            // other props here
            />
            <ReactPlayer 
            // url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            url={this.props.youtubeUrl}
            playing 
            controls
            onSeek={(e) => console.log(e)}
            onProgress={(e) => this.props.highlightFingerprint(e.playedSeconds)}
            /> */}
        </div>);
    }
}

export default PlayerView;