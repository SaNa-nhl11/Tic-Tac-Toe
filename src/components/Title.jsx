import React from 'react';

function Header(){
    return <h1>Tic-Tac-Toe</h1>
}

function Foot(){
    const reloadPage = ()=>{window.location.reload()}
    return <button className='btn' onClick={reloadPage}>Restart</button>
}

export {Header,Foot};