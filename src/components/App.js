import React from 'react'
import SearchBar from './SearchBar'
import PlayerView from './PlayerView';
import FingerprintList from './FingerprintList'
import ApiService from '../api/ApiService'
import io from 'socket.io-client';

class App extends React.Component {

    state = { fingerprints: [], audiofile: '', currentRuntime: 0,fetchInProgress: false }


    onSearchSubmit = (files) => {
        // console.log('onSearchSumbit')
        // console.log(files)
        this.setState({ fingerprints: [], audiofile: '', currentRuntime: 0,fetchInProgress: true });
        if (files.length > 0) {
            console.log(files[0]);
            const formData = new FormData();
            formData.append('file', files[0]);
            ApiService.upload(formData)
                .then(res => {
                    console.log(res.data);
                    console.log("File uploaded successfully.");
                    // this.setState({ fingerprints: res.data, audiofile: files[0],fetchInProgress: false  })
                    // this.setState({audiofile: files[0],fetchInProgress: false  })
                    var socket = io('http://localhost:5002');
                    console.log(socket.id);
                    // messages = document.createElement('ul');
                    socket.on('connect', function () {
                        socket.emit('test', {
                            data: 'I\'m connected!',
                            audiofile: res.data
                        });
                    });
                    // Add a connect listener
                    socket.on('my response', function (data) {
                        console.log('Received a message from the server!', data);
                        console.log(socket.id);
                    });
                    socket.on('newnumber', data => this.appendFingerprint(data, files[0]));


                    
                }).catch(err => {
                    console.log("Error during file upload", err);
                    this.setState({ fingerprints: [], audiofile: files[0],fetchInProgress: false  })
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

    appendFingerprint = (data, file) => {
        console.log(data);
        // console.log(socket.id);
        this.setState({ fingerprints: [...this.state.fingerprints, JSON.parse(data)],audiofile: file,fetchInProgress: false })
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <div><PlayerView audiofile={this.state.audiofile} highlightFingerprint={this.highlightFingerprint} /></div>
                <div>
                    <FingerprintList
                        fetchInProgress={this.state.fetchInProgress} 
                        fingerprintList={this.state.fingerprints}
                        currentRuntime={this.state.currentRuntime}
                        seekPlayerToTime={this.props.seekPlayerToTime} />
                </div>
            </div>

        );
    }
}

export default App;