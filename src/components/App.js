import React from 'react'
import SearchBar from './SearchBar'
import PlayerView from './PlayerView';
import FingerprintList from './FingerprintList'
import ApiService from '../api/ApiService'
import io from 'socket.io-client';
import SongList from './SongList';

class App extends React.Component {

    state = { fingerprints: [], audiofile: '', currentRuntime: 0,fetchInProgress: false, youtubeUrl:'', songlist:{} }
    onYoutubeSubmit = (youtubeUrl)=>{
        console.log('onYoutubeSubmit')
        console.log(youtubeUrl)
        this.setState({ fingerprints: [], audiofile: '', currentRuntime: 0,fetchInProgress: true, youtubeUrl:'' });
        if (youtubeUrl!=='') {
            var idAry = youtubeUrl.split('=');
            console.log(idAry[1]);
            
            ApiService.youtube(idAry[1])
            .then(res => {
                console.log(res.data);
                console.log("youtube url processed successfully.");
                this.getFingerprintBySocketIo(res.data, '', youtubeUrl);
            }).catch(err => {
                console.log("Error during youtube processing", err);
                this.setState({ fingerprints: [], audiofile: '',fetchInProgress: false, youtubeUrl:''  })
            });

        }
    };

    onSearchSubmit = (files) => {
        // console.log('onSearchSumbit')
        // console.log(files)
        this.setState({ fingerprints: [], audiofile: '', currentRuntime: 0,fetchInProgress: true,youtubeUrl:'' });
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
                    this.getFingerprintBySocketIo(res.data, files[0]);
                    // var socket = io('http://localhost:5002');
                    // console.log(socket.id);
                    // socket.on('connect', function () {
                    //     socket.emit('test', {
                    //         data: 'I\'m connected!',
                    //         audiofile: res.data
                    //     });
                    // });
                    // // Add a connect listener
                    // socket.on('my response', function (data) {
                    //     console.log('Received a message from the server!', data);
                    //     console.log(socket.id);
                    // });
                    // socket.on('newnumber', data => this.appendFingerprint(data, files[0]));


                    
                }).catch(err => {
                    console.log("Error during file upload", err);
                    this.setState({ fingerprints: [], audiofile: files[0],fetchInProgress: false,youtubeUrl:''  })
                })
        }
    };

    getFingerprintBySocketIo = (filename, fileUrl, youtubeUrl) => {
        var socket = io('http://localhost:5002');
        console.log(socket.id);
        // messages = document.createElement('ul');
        socket.on('connect', function () {
            socket.emit('test', {
                data: 'I\'m connected!',
                audiofile: filename
            });
        });
        // Add a connect listener
        socket.on('my response', function (data) {
            console.log('Received a message from the server!', data);
            console.log(socket.id);
        });
        socket.on('newnumber', data => this.appendFingerprint(data, fileUrl, youtubeUrl));
    }

    highlightFingerprint = (time) => {
        console.log(time);
        this.setState(
            { currentRuntime: time }
        );
    }

    seekPlayerToTime = (time) => {
        console.log(time);
    }

    appendFingerprint = (data, file,yurl) => {
        console.log(data);
        // console.log(socket.id);
        let copySonglist = {...this.state.songlist}
        let song_data = JSON.parse(data);
        console.log(song_data.song_id);
        if(song_data.song_id){
        if (! (song_data.song_id in this.state.songlist)){    
            copySonglist[song_data.song_id] = {"song_name":song_data.song_name, "count":1};
        }else{
            copySonglist[song_data.song_id].count +=1;
        }
        }
        console.log('songlist:'+ JSON.stringify(copySonglist))
        this.setState({ fingerprints: [...this.state.fingerprints, song_data],audiofile: file,fetchInProgress: false ,youtubeUrl: yurl, songlist: copySonglist})
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <SearchBar onSubmit={this.onSearchSubmit} onYoutubeSubmit={this.onYoutubeSubmit} />
                <div><PlayerView audiofile={this.state.audiofile} highlightFingerprint={this.highlightFingerprint} youtubeUrl={this.state.youtubeUrl}/></div>
                <div className="ui raised secondary inverted segment">
                <div className="ui two column doubling stackable grid container">
                <div className="column">
                    <FingerprintList
                        fetchInProgress={this.state.fetchInProgress} 
                        fingerprintList={this.state.fingerprints}
                        currentRuntime={this.state.currentRuntime}
                        seekPlayerToTime={this.props.seekPlayerToTime} />
                </div>
                <div className="column">
                    <SongList 
                        songList={this.state.songlist}
                    />
                </div>
                </div>
                </div>
            </div>

        );
    }
}

export default App;