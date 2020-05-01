import React from 'react'
import SearchBar from './SearchBar'
import PlayerView from './PlayerView';
import FingerprintList from './FingerprintList'
import ApiService from '../api/ApiService'

class App extends React.Component {

    state = { fingerprints: [], audiofile: '', currentRuntime: 0 }


    onSearchSubmit = (files) => {
        // console.log('onSearchSumbit')
        // console.log(files)
        if (files.length > 0) {
            console.log(files[0]);
            const formData = new FormData();
            formData.append('file', files[0]);
            ApiService.upload(formData)
                .then(res => {
                    // console.log(res.data);
                    console.log("File uploaded successfully.");
                    this.setState({ fingerprints: res.data, audiofile: files[0] })
                }).catch(err => {
                    console.log("Error during file upload", err);
                    this.setState({ fingerprints: [], audiofile: files[0] })
                })
        }
    };

    highlightFingerprint = (time) => {
        console.log(time);
        this.setState(
            { currentRuntime: time }
        );
    }

    seekPlayerToTime = (time) => {
        console.log(time);
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <div><PlayerView audiofile={this.state.audiofile} highlightFingerprint={this.highlightFingerprint} /></div>
                <div>
                    <FingerprintList
                        fingerprintList={this.state.fingerprints}
                        currentRuntime={this.state.currentRuntime}
                        seekPlayerToTime={this.props.seekPlayerToTime} />
                </div>
            </div>

        );
    }
}

export default App;