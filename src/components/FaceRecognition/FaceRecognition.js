import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({ImageUrl, box}) => {
    return (
        <div className = "center ma">
            <div className = "absolute mt2">
                <img id = 'inputImage' alt = '' src={ImageUrl} width= '500p' height= 'auto'/>
                <div className='boundingbox' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;