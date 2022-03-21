import React, { useEffect, useState } from 'react';

const Alert = ({ alert }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false);
        }, 5000)
    }, [])


    return (
        <>
            {showAlert && <div className='text-white alert text-center'>
                {alert}
            </div>}
        </>
    )
}

export default Alert;