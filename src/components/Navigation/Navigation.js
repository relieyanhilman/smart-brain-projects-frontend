import React from 'react';
const Navigation = ({signedOutAfterClick, isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='link dim black pa3 pointer underline' onClick={() => signedOutAfterClick('signin')}>SignOut</p>
            </nav>
        )
    }else{
        return (
            <div>
                <div className='flex justify-end'>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='link dim black pa3 pointer underline' onClick={() => signedOutAfterClick('signin')}>SignIn</p>
                </nav>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='link dim black pa3 pointer underline' onClick={() => signedOutAfterClick('register')}>Register</p>
                </nav>
                </div>
             </div>
        )
    }
    
}

export default Navigation;