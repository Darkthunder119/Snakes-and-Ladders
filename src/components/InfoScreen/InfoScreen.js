import styled from "styled-components";
import React from "react";

const InfoBox = styled.section`
  padding: 8px;
  flex: 50%;
  background-color: gray;
  text-align: center;
`;
const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const InfoScreen = (props) => {
  const onChangeHandler = (e) => {
    if (e.target.id === "1") props.changeColorHandler(1, e.target.value);
    if (e.target.id === "2") props.changeColorHandler(2, e.target.value);
  };
  console.log("hi from infoscreen");
  return (
    <InfoBox>
      <ColorsContainer>
        <p>Player 1 Color: </p>
        <input
          type="color"
          value={props.userOne.color}
          onChange={onChangeHandler}
          id="1"
        />
        <p>Player 2 Color: </p>
        <input
          type="color"
          value={props.userTwo.color}
          onChange={onChangeHandler}
          id="2"
        />
      </ColorsContainer>
      <p>
        {props.isTurn === false &&
          props.userOne.userOneCurrentPosition !== 1 &&
          props.diceRoll !== 0 &&
          `Player 1 rolled a ${props.diceRoll} and climbed to ${props.userOne.userOneCurrentPosition}`}
      </p>
      <p>
        {props.isTurn === true &&
          props.userTwo.userTwoCurrentPosition !== 1 &&
          props.diceRoll !== 0 &&
          `Player 2 rolled a ${props.diceRoll} and climbed to ${props.userTwo.userTwoCurrentPosition}`}
      </p>
      <p>{props.isTurn ? "Player One's Turn..." : "Player Two's Turn..."} </p>
    </InfoBox>
  );
};
export default InfoScreen;
