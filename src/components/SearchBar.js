import React from 'react'

class SearchBar extends React.Component {

    state = { files: [], youtubeUrl: '' }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.files);
        console.log(this.state.youtubeUrl);
        if(this.state.youtubeUrl!== ""){
            this.props.onYoutubeSubmit(this.state.youtubeUrl);
        }else if(this.state.files.length > 0){
            this.props.onSubmit(this.state.files);
        }
    }

    render() {
        return (
            <div className="ui segment" style={{   backgroundColor:'rgba(0,0,0,.15)' }}>
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Youtube URL</label>
                        <input type="url"
                          value={this.state.youtubeUrl}
                          placeholder="Enter Youtube URL https://www.youtube.com/watch?v=<YoutubeId>"
                          pattern="https://www.youtube.com/watch.*"
                          onChange={e => this.setState({ youtubeUrl: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Upload Song File</label>
                        <input
                            type='file'
                            files={this.state.files}
                            onChange={e => this.setState({ files: e.target.files })} />
                    </div>
                    <button className="ui button" type='submit'>Submit</button>

                </form>
            </div>
        );
    }
}

export default SearchBar;