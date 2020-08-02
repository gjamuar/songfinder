import React from 'react'
import SongItem from './SongItem'
// import '../css/SongList.css'

class SongList extends React.Component {

    render() {
        console.log(this.props.songList);
        // const str = '';

        let songlist;
        // for (const sl of Object.entries(this.props.songList)){
        //     songlist += <SongItem 
        //     key={sl.song_id} 
        //     song={sl}  
        //     />
        // }
        
        songlist = Object.entries(this.props.songList).map(([key, value]) => {
                return <SongItem 
                key={key} 
                songId={key}
                songName={value}  
                />
    
            });
       
         
        return (
            // <div className="ui inverted segment song-list">
            //     <div className="ui inverted relaxed divided list">
            //         {songlist}
            //     </div>
            // </div>
          <table className="ui inverted celled table">
            <thead>
                <tr>
                    <th>Song ID</th>
                    <th>Song Name</th>
                    <th>Count</th>
                </tr>
            </thead>
        <tbody>
            {songlist}
        </tbody>
        </table>
        );
    }
}

export default SongList;