import React from 'react'
import pearOne from '../../assets/images/pear.svg'
import './userOne.scss'

class UserOne extends React.Component{
    // currentSpot = this.props.currentPos === indexOf(this.props.board);
    // currentSpot = document.querySelector
    render(){
        return (
            <img src={pearOne} className='userone'></img>
        );
    }
}
export default UserOne;