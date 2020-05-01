import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

class PlayerView extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.audiofile === nextProps.audiofile) {
            return false;
          } else {
            return true;
          } 
      }

    render() {
        console.log(this.props.audiofile);
        
        var audiourl = '';
        if(this.props.audiofile !== ''){
            audiourl = URL.createObjectURL(this.props.audiofile)
        }
        return (<div>
            <AudioPlayer
                autoPlay
                src={audiourl}
                onPlay={e => console.log("onPlay")}
                onListen={e => this.props.highlightFingerprint(e.target.currentTime)}
            // other props here
            />
        </div>);
    }
}

export default PlayerView;