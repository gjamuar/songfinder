import React from 'react'
import FingerprintItem from './FingerprintItem'
import '../css/FingerprintList.css'

class FingerprintList extends React.Component {

    render() {
        console.log(this.props.fingerprintList);
        console.log(this.props.currentRuntime)
        const str = '';
        var isHighlighted = false;

        const fingerprints = this.props.fingerprintList.map(fp => {
            isHighlighted = false;
            if (fp.size === 0) {
                return <div />
            }
            if (fp.start_time <= this.props.currentRuntime && fp.start_time + 4 > this.props.currentRuntime) {
                isHighlighted = true;
                console.log('highlighting :' + fp.segment_id);
            }
            return <FingerprintItem 
            key={str.concat(fp.song_id, '_', fp.segment_id)} 
            fingerprint={fp} isHighlighted={isHighlighted} 
            seekPlayerToTime={() => this.props.seekPlayerToTime} 
            />

        });
        return (
            <div className="ui inverted segment fingerprint-list fingerprints">
                <div className="ui inverted relaxed divided list">
                    {fingerprints}
                </div>
            </div>
        );
    }
}

export default FingerprintList;