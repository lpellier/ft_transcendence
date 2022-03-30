import React from 'react';
import '../styles/Banner.css'

function Banner() {
    return (
        <div className='banner'>
            <img className="logo" src="https://media.istockphoto.com/vectors/minimal-cat-drawing-vector-id671786264?k=20&m=671786264&s=612x612&w=0&h=3PdcGzJGmzoe8T80LCUrTFMTDJf1r8M15kB_JRPa8H0=" alt='logo'/>
            <h1 className = "title">Cat Chat</h1>
        </div>
    )
}

export default Banner