import React from "react";

const DisplayHeader = ({ friend }) => (
    <div className='display-header'>
        {
            friend ? (<h2>{friend}</h2>) : (<h2>Click on someone to start a chat.</h2>)
        }
    </div>
)

export default DisplayHeader;