import React from 'react';
import './ImageUrl.css';
const ImageUrl = ({onInputChange, onSubmit}) => {
    return (
       <div>
           <p className="f3 tc">
               {'Put your image link, so this magic brain app can recognize face. Try It!!'}
           </p>
                <div className="center">
                    <div className='center pa4 shadow-5 br3 form'>
                    <input className='pa2 w-70 center ' placeholder='your image link' onChange={onInputChange}></input>
                    <button style={{color: 'white'}} className="link dib grow bg-light-purple pa2 w-30" 
                        onClick={onSubmit}>Detect</button>
                    </div>
                </div>
           
       </div>
    )
}

export default ImageUrl;