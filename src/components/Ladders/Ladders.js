import React from "react";
import styled from "styled-components";

const Ladder = styled.div`
  color: ${(props) => props.color};
  font-weight: 1000;
  top: 25%;
  left: 33%;
  position: absolute;
`;

function Ladders(props) {
  return <Ladder color={props.ladders[0].color}>/-/</Ladder>;
}
export default Ladders;
