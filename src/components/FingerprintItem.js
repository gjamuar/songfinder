import React from 'react'
import "../css/FingerprintItem.css"
class FingerprintItem extends React.Component {

    seekPlayerToTime = (start_time)=>{
        this.props.seekPlayerToTime(start_time)
        // this.el.className === "item active" ? this.el.className = "item": this.el.className = "item active"
    }

    componentDidUpdate() {
        // only scroll into view if the active item changed last render
        if (this.el.className === "item active") {
        //   this.ensureActiveItemVisible();
          this.el.scrollIntoView({behavior: "smooth", block: "center"});
        }
      }

    render() {
        const { song_id, song_name, confidence, start_time } = this.props.fingerprint;
        // const active = this.props.active;

        return (
            // <div className={this.props.isHighlighted?"item active":"item"}
            //  ref={el => this.el = el}
            //  onClick={this.seekPlayerToTime(start_time)}>
            //     <div className="content">
            //         <div className="header">{song_name}</div>
            //         <div className="description">
            //         <span>Start time: {start_time}</span>
            //             <span className="right floated content">Confidence: {confidence}</span>
            //         </div>
            //     </div>
            // </div>
            <tr className={this.props.isHighlighted?"item active":"item"}
            ref={el => this.el = el}
            onClick={this.seekPlayerToTime(start_time)}>
                <td>{song_id}</td>
                <td>{song_name}</td>
                <td>{start_time}</td>
                <td>{confidence}</td>
            </tr>
        );
    }
}

export default FingerprintItem;