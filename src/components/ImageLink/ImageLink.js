import React from 'react'
import './ImageLink.css'

const ImageLink = ({OnInputChange, OnButtonSubmit}) => {
    return (
        <div>
            <p className = "f3">
                {'This is a magic brain it can detact faces. Give it a try ;)'}
            </p>
            <div className="center">
                <div className = "center form pa4 br3 shadow-5">
                    <input className = "f4 pa2 w-70 center" type = "text" onChange = {OnInputChange}/>
                    <button className = "w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    onClick = {OnButtonSubmit}> Detect </button>
                </div>
            </div>
        </div>

    );
}

export default ImageLink;