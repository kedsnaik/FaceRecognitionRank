import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl}) => {
    return(
        <div className = 'center na'>
            <div className ='absolute mt2'>
                <img id = "inputimage" alt = "face pic" src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
    )
}
export default FaceRecognition;