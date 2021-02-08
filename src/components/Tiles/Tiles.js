import React from "react";
import styled from "styled-components";
import Users from "../Users/Users";
import Ladders from "../Ladders/Ladders";

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
      {props.boardNumbers === props.userOnePosition && (
        <Users userOne color={props.userOneColor} />
      )}
      {props.boardNumbers === props.userTwoPosition && (
        <Users color={props.userTwoColor} />
      )}
      {console.log("hi from Tiles")}
      {/* {
        props.ladders.map(
          (val) =>
            (val.startPosition === props.boardNumbers ||
              val.endPosition === props.boardNumbers) && <Ladders />
        )} */}
    </Tile>
  );
}

export default Tiles;
