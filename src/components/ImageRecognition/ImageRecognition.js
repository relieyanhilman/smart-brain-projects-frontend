import React from 'react';
import './ImageRecognition.css';

const ImageRecognition= ({imageUrl, faceBox}) => {
    return(
        <div className='center mt4'>
            <div className='relative'>
                <img id="imageID" className="image" src={imageUrl} alt="pict"/>
                <div className='faceBox' style={{top: faceBox.topRow, left: faceBox.leftCol, bottom: faceBox.bottomRow, right: faceBox.rightCol}} />
            </div>
        </div>
    )
}

export default ImageRecognition;