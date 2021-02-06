import React from "react";
import "./board.scss";
import Dice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import Users from "../Users/Users";
import Tiles from "../Tiles/Tiles";
// import Ladders from "../Ladders/Ladders";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
    // this.myRef = React.createRef();
    this.state = {
      diceRoll: 0,
      isTurn: true,
      userOne: { color: "#000", userOneCurrentPosition: 1, userOneRolls: [] },
      userTwo: {
        color: "#0008080",
        userTwoCurrentPosition: 1,
        userTwoRolls: [],
      },

      board: Array.from(Array(100)).map((e, i) => i + 1),
    };
  }

  rollDoneCallback(num) {
    if (this.state.isTurn) {
      this.setState({
        diceRoll: num,
        userOneCurrentPosition: this.state.userOne.userOneCurrentPosition + num,
        isTurn: false,
      });
    } else {
      this.setState({
        diceRoll: num,
        userTwoCurrentPosition: this.state.userTwo.userTwoCurrentPosition + num,
        isTurn: true,
      });
    }
    this.calculateUps();
    this.calculateDowns();
  }

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      return this.state !== prevState;
    }
  }

  calculateUps() {
    this.state.cucumberArray.forEach((element) => {
      if (element.startPosition === this.state.userOne.userOneCurrentPosition) {
        this.setState({ userOneCurrentPosition: element.endPosition });
        //   this.myRef.current.value = `You ate a cucumber and went up to ${element.endPosition}`;
      }
      if (element.startPosition === this.state.userTwo.userTwoCurrentPosition) {
        this.setState({ userTwoCurrentPosition: element.endPosition });
        // this.myRef.current.value = `You ate a cucumber and went up to ${element.endPosition}`;
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

  render() {
    const { board, diceRoll, userOne, userTwo, isTurn } = this.state;
    return (
      <section className="Page">
        <section className="Board">
          {board.map((val, i) => (
            <Tiles key={i} boardNumbers={val} board={board}>
              <Users userOnePosition={userOne.userOneCurrentPosition} />
              <Users userTwoPosition={userTwo.userTwoCurrentPosition} />
            </Tiles>
          ))}
        </section>
        <section className="playerArea">
          <h1 className="playerArea__heading">Snakes and Ladders</h1>
          <Dice
            numDice={1}
            rollDone={this.rollDoneCallback}
            ref={(dice) => (this.reactDice = dice)}
            outline={true}
            faceColor={"#0008080"}
            dotColor={"#FFFFFF"}
          />

          <div className="playerArea__colors">
            <p>User 1 Color: </p>
            <input
              type="color"
              value={userOne.color}
              onChange={(e) =>
                this.setState({
                  userOne: { ...userOne, color: e.target.value },
                })
              }
            />
            <p>User 2 Color: </p>
            <input
              type="color"
              value={userTwo.color}
              onChange={(e) =>
                this.setState({
                  userTwo: { ...userTwo, color: e.target.value },
                })
              }
            />
          </div>
          <p>{diceRoll !== 0 && `Rolled a ${diceRoll}!`}</p>
          <p>
            {isTurn === false &&
              userOne.userOneCurrentPosition !== 1 &&
              `User One Climbed to ${userOne.userOneCurrentPosition}`}
          </p>
          <p>
            {isTurn === true &&
              userTwo.userTwoCurrentPosition !== 1 &&
              `User Two Climbed to ${userTwo.userTwoCurrentPosition}`}
          </p>
          <p>{isTurn ? "User One's Turn..." : "User Two's Turn..."} </p>
          <p ref={this.myRef}></p>
        </section>
      </section>
    );
  }
}

export default Board;
