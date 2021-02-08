import React from "react";
import "./board.scss";
import Dice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import Tiles from "../Tiles/Tiles";
import styled from "styled-components";
import InfoScreen from "../InfoScreen/InfoScreen";

const Page = styled.section`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #808080;
`;
const PlayArea = styled.section`
  display: flex;
  flex: 50%;
  flex-wrap: wrap-reverse;
  flex-direction: row;
  background-color: #808080;
  margin: 1rem;
  justify-content: center;
  align-content: flex-end;
`;

const Heading = styled.h1`
  text-align: center;
`;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceRoll: 0,
      isTurn: true,
      userOne: {
        color: "#21bd5c",
        userOneCurrentPosition: 1,
        userOneRolls: [],
      },
      userTwo: {
        color: "#941100",
        userTwoCurrentPosition: 1,
        userTwoRolls: [],
      },
      ladders: [
        { startPosition: 3, endPosition: 27, color: "#efcc8f" },
        { startPosition: 17, endPosition: 51, color: "#33f4d1" },
        { startPosition: 37, endPosition: 83, color: "#efcc8f" },
      ],
      board: Array.from(Array(100)).map((e, i) => i + 1),
    };
  }

  rollDoneCallback = (num) => {
    this.setState({
      ...this.state,
      diceRoll: num,
      isTurn: !this.state.isTurn,
      userOne: {
        ...this.state.userOne,
        userOneCurrentPosition: this.state.isTurn
          ? this.state.userOne.userOneCurrentPosition + num
          : this.state.userOne.userOneCurrentPosition,
      },
      userTwo: {
        ...this.state.userTwo,
        userTwoCurrentPosition: !this.state.isTurn
          ? this.state.userTwo.userTwoCurrentPosition + num
          : this.state.userTwo.userTwoCurrentPosition,
      },
    });

    this.calculateUps();
    // this.calculateDowns();
  };

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      return this.state !== prevState;
    }
  }

  calculateUps() {
    this.state.ladders.forEach((element) => {
      if (element.startPosition === this.state.userOne.userOneCurrentPosition) {
        this.setState({
          userOne: {
            ...this.state.userOne,
            userOneCurrentPosition: element.endPosition,
          },
        });
      }
      if (element.startPosition === this.state.userTwo.userTwoCurrentPosition) {
        this.setState({
          userTwo: {
            ...this.state.userTwo,
            userTwoCurrentPosition: element.endPosition,
          },
        });
      }
    });
  }
  calculateDowns() {
    this.state.eggplantArray.forEach((element) => {
      if (element.startPosition === this.state.userOne.userOneCurrentPosition) {
        this.setState({ userOneCurrentPosition: element.endPosition });
      }
      if (element.startPosition === this.state.userOne.userTwoCurrentPosition) {
        this.setState({ userTwoCurrentPosition: element.endPosition });
      }
    });
  }
  changeColorHandler = (id, color) => {
    if (id === 1)
      this.setState({ userOne: { ...this.state.userOne, color: color } });
    if (id === 2)
      this.setState({ userTwo: { ...this.state.userTwo, color: color } });
  };

  render() {
    console.log("hi from page");
    const { board, diceRoll, userOne, userTwo, isTurn, ladders } = this.state;
    return (
      <Page>
        <Heading>Snakes and Ladders</Heading>
        <PlayArea>
          {board.map((val, i) => (
            <Tiles
              key={i}
              boardNumbers={val}
              board={board}
              userOnePosition={userOne.userOneCurrentPosition}
              userOneColor={userOne.color}
              userTwoPosition={userTwo.userTwoCurrentPosition}
              userTwoColor={userTwo.color}
              ladders={ladders}
            ></Tiles>
          ))}
        </PlayArea>
        <Dice
          numDice={1}
          rollDone={this.rollDoneCallback}
          ref={(dice) => (this.reactDice = dice)}
          outline={true}
          faceColor={"#0008080"}
          dotColor={"#FFFFFF"}
        />
        <InfoScreen
          diceRoll={diceRoll}
          isTurn={isTurn}
          userOne={userOne}
          userTwo={userTwo}
          changeColorHandler={this.changeColorHandler}
        />
      </Page>
    );
  }
}

export default Board;
