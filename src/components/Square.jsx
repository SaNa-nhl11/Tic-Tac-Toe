import React from 'react';

function Square(props){  //created this component function so when we change the state only one square get changed//

    function handle(){
        props.OnSquareClick();  //when we click a square we are calling the function from app.jsx//
    }

   return <td className='square' onClick={handle}>{props.value}</td> //props value being the Board items//
}

export default Square;