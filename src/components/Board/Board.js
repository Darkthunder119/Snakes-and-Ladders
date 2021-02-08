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

      board: Array.from(Array(100)).map((e, i) => i + 1),
    };
  }

  rollDoneCallback(num) {
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

    // this.calculateUps();
    // this.calculateDowns();
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
              <Users
                userOnePosition={userOne.userOneCurrentPosition}
                userOne
                color={userOne.color}
              />
              <Users
                userTwoPosition={userTwo.userTwoCurrentPosition}
                color={userTwo.color}
              />
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
            <p>Player 1 Color: </p>
            <input
              type="color"
              value={userOne.color}
              onChange={(e) =>
                this.setState({
                  userOne: { ...userOne, color: e.target.value },
                })
              }
            />
            <p>Player 2 Color: </p>
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
          <p>
            {isTurn === false &&
              userOne.userOneCurrentPosition !== 1 &&
              diceRoll !== 0 &&
              `Player 1 rolled a ${diceRoll} and climbed to ${userOne.userOneCurrentPosition}`}
          </p>
          <p>
            {isTurn === true &&
              userTwo.userTwoCurrentPosition !== 1 &&
              diceRoll !== 0 &&
              `Player 2 rolled a ${diceRoll} and climbed to ${userTwo.userTwoCurrentPosition}`}
          </p>
          <p>{isTurn ? "Player One's Turn..." : "Player Two's Turn..."} </p>
        </section>
      </section>
    );
  }
}

export default Board;
