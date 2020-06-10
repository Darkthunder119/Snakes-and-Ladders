import React from "react";
import "./board.scss";
import Dice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import UserOne from "../UserOne/UserOne";
import Tiles from '../Tiles/Tiles'
import UserTwo from '../UserTwo/UserTwo'
import Ladders from '../Ladders/Ladders'
import Snakes from '../Snakes/Snakes'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
    // this.myRef = React.createRef();
    this.state = {
    
      diceRoll: 0,
      isTurn: true,
      userOneCurrentPosition: 1,

      userTwoCurrentPosition: 1,
    
      cucumberArray: [
        {
          startPosition: 5,
          endPosition: 27
        },
        {
          startPosition: 10,
          endPosition: 39
        },
        {
            startPosition: 33,
            endPosition: 91
        },
        {
            startPosition: 43,
            endPosition: 72 
        },{
            startPosition: 47,
            endPosition: 83
        },
        {
            startPosition: 61,
            endPosition: 71
        }
      ],

      eggplantArray: [
        {
          startPosition: 45,
          endPosition: 6
        },
        {
          startPosition: 70,
          endPosition: 2
        },
        {
            startPosition: 41,
            endPosition: 11
          },{
            startPosition: 95,
            endPosition: 3
          },
          {
            startPosition: 99,
            endPosition: 1
          },
          {
            startPosition: 81,
            endPosition: 23
          },
          {
              startPosition: 92,
              endPosition: 13
          },
          {
            startPosition: 59,
            endPosition: 2
        },
        {
            startPosition: 86,
            endPosition: 11
        },
        {
            startPosition: 94,
            endPosition: 1
        },{
            startPosition: 96,
            endPosition: 1
        },
        {
            startPosition: 97,
            endPosition: 1
        },
        {   startPosition: 98,
            endPosition: 1
        }
      ],
      board: Array.from(Array(100)).map((e,i)=>i+1)
    };
  }

  rollDoneCallback(num) {
    if(this.state.isTurn){
    this.setState({diceRoll : num, userOneCurrentPosition : this.state.userOneCurrentPosition + num, isTurn : false });
    }
    else {

    this.setState({diceRoll : num, userTwoCurrentPosition : this.state.userTwoCurrentPosition + num, isTurn : true });
    }
    this.calculateUps();
    this.calculateDowns();

  }

  componentDidUpdate(_,prevState){

    if (this.state !== prevState){
        return this.state !== prevState
    }
    }
     
  calculateUps(){
      this.state.cucumberArray.forEach(element => {
          if(element.startPosition === this.state.userOneCurrentPosition) {
              this.setState({userOneCurrentPosition : element.endPosition});
            //   this.myRef.current.value = `You ate a cucumber and went up to ${element.endPosition}`;
          }
          if(element.startPosition === this.state.userTwoCurrentPosition){
            this.setState({userTwoCurrentPosition : element.endPosition});
            // this.myRef.current.value = `You ate a cucumber and went up to ${element.endPosition}`;
        }
        
      });
  }
  calculateDowns(){
      this.state.eggplantArray.forEach(element => {
          if(element.startPosition === this.state.userOneCurrentPosition){
              this.setState({userOneCurrentPosition : element.endPosition});
          }
          if(element.startPosition === this.state.userTwoCurrentPosition){
              this.setState({userTwoCurrentPosition : element.endPosition});
          }
      });
  }

  render() {
    return (
      <section className="Page">
        <section className="Board">
          {
            this.state.board.map((val,i)=><Tiles key={i} boardNumbers={val} board={this.state.board}>

            <UserOne userOnePosition={this.state.userOneCurrentPosition}/>
            <UserTwo userTwoPosition={this.state.userTwoCurrentPosition}/>
            <Snakes snakes={this.state.eggplantArray}/>
            <Ladders ladders={this.state.cucumberArray}/>

            </Tiles>)
          }
        </section>
        <section className="playerArea">
          <h1 className="playerArea__heading">Eggplants and Cucumbers</h1>
          <Dice
            numDice={1}
            rollDone={this.rollDoneCallback}
            ref={dice => (this.reactDice = dice)}
            outline={true}
            faceColor={"#0008080"}
            dotColor={"#FFFFFF"}
          />
          
          <p>{this.state.diceRoll !== 0 ? `Rolled a ${this.state.diceRoll}!` : ""}</p>
            <p>{(this.state.isTurn === false && this.state.userOneCurrentPosition !== 1) ? `User One Climbed to ${this.state.userOneCurrentPosition}`: '' }</p>
        <p>{(this.state.isTurn === true && this.state.userTwoCurrentPosition !==1)?`User Two Climbed to ${this.state.userTwoCurrentPosition}`:''}</p>
        <p>{this.state.isTurn ? 'User One\'s Turn...' : 'User Two\'s Turn...'} </p>
        {/* <p ref = {this.myRef}></p> */}
        <iframe className="music-player" width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/113188401&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        </section>
        
      </section>
    );
  }
}

export default Board;
