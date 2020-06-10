import React from 'react'

function Tiles(props){
    return (
    <div className="tile" >{props.boardNumbers}
    {props.children[0].props.userOnePosition === props.boardNumbers? props.children[0] : '' }
    {props.children[1].props.userTwoPosition === props.boardNumbers? props.children[1] : '' }
    {props.children[2].props.snakes.map(val=>val.startPosition === props.boardNumbers? props.children[2] : '' )}
    {props.children[3].props.ladders.map(val=>val.startPosition === props.boardNumbers? props.children[3] : '')     }</div>
    );
}

export default Tiles;