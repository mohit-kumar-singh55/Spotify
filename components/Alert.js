import React, { useEffect, useState } from 'react';

const Alert = () => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false);
        }, 5000)
    }, [])


    return (
        <>
            {showAlert && <div className='text-white alert'>
                Note: As per Spotify, Only premium users can play music!
            </div>}
        </>
    )
}

export default Alert;