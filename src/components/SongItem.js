import React from 'react'
// import "../css/SongItem.css"
class SongItem extends React.Component {

    render() {
        // const { song_id, song_name } = this.props.song;
        return (
            // <div>
            //     <div className="content">
            //         <div className="header">{this.props.songId}</div>
            //         <div className="description">
            //             <span>{this.props.songName}</span>
            //         </div>
            //     </div>
            // </div>
            <tr>
                <td>{this.props.songId}</td>
                <td>{this.props.songName.song_name}</td>
                <td>{this.props.songName.count}</td>
            </tr>
        );
    }
}

export default SongItem;