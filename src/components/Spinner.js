import React from 'react'

export default function Spinnner() {
    return (
        <div className="ui segment">
            <p></p>
            <div className="ui active dimmer">
                <div className="ui loader"></div>
            </div>
        </div>
    );
}

