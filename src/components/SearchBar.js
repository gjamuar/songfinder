import React from 'react'

class SearchBar extends React.Component {

    state = {files:[]}

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.files);
        this.props.onSubmit(this.state.files);

    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Upload Song File</label>
                        <input 
                        type='file' 
                        files={this.state.files}
                        onChange={e=> this.setState({files: e.target.files}) }/>
                    </div>
                    <button className="ui button" type='submit'>Submit</button>

                </form>
            </div>
        );
    }
}

export default SearchBar;