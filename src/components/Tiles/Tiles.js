import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  outline: 1px solid black;
  background-color: #363636;
  height: calc((100%) / 12);
  width: calc((100%) / 11);
  color: rgb(32, 197, 95);
  font-size: 12px;
  padding: 1px;
  position: relative;
  &:nth-child(2n) {
    background-color: #fff;
  }
`;

function Tiles(props) {
  return (
    <Tile>
      {props.boardNumbers}
      {props.children[0].props.userOnePosition === props.boardNumbers
        ? props.children[0]
        : ""}
      {props.children[1].props.userTwoPosition === props.boardNumbers
        ? props.children[1]
        : ""}
      {/* {props.children[2].props.snakes.map(val=>val.startPosition === props.boardNumbers? props.children[2] : '' )} */}
      {/* {props.children[3].props.ladders.map(val=>val.startPosition === props.boardNumbers? props.children[3] : '')     } */}
    </Tile>
  );
}

export default Tiles;
