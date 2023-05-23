import classes from "../../css/Game.module.css";
import King from "../pieces/King";
import Void from "../pieces/Void";
import Knight from "../pieces/Knight";
import Throne from "../pieces/Throne";
import Piece from "../pieces/Piece";
import Rook from "../pieces/Rook";
import Bishop from "../pieces/Bishop";
import Queen from "../pieces/Queen";
import Prince from "../pieces/Prince";
import Pawn from "../pieces/Pawn";
import {render} from "react-dom";
import Board from "./Board";
import FallenSoldierBlock from "./FallenSoldiersBlock";
import initialiseChessBoard from "./InitializeChessBoard";
import React from "react";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "white",
      _lw_rook: true,
      _rw_rook: true,
      _lb_rook: true,
      _rb_rook: true,
      _b_king: true,
      _w_king: true,
      _count_of_passive_moves: 0,
      _move_number: 1,
      available_moves: [],
    };
    for (let i = 0; i < 81; i++) {
      if (
        this.state.squares[i].player === 1 ||
        this.state.squares[i].player === 2
      )
        this.state.available_moves.push(this.available_move(i));
      else this.state.available_moves.push([]);
    }
    console.log(this.state.squares);
  }

  transform_x = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8 };
  transform_y = { 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0 };
  transform_back_x = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
  };
  transform_back_y = {
    8: "1",
    7: "2",
    6: "3",
    5: "4",
    4: "5",
    3: "6",
    2: "7",
    1: "8",
    0: "9",
  };

  find_king(side) {
    var squares = this.state.squares.slice();
    for (let i = 0; i < 81; i++)
      if (squares[i] instanceof King && squares[i].player === side) return i;
    return -1;
  }

  find_prince(side) {
    var squares = this.state.squares.slice();
    for (let i = 0; i < 81; i++)
      if (squares[i] instanceof Prince && squares[i].player === side) return i;
    return -1;
  }

  check_move(figure, x, y, legal_moves) {
    var squares = this.state.squares.slice();
    y = Math.floor(y);
    if (squares[x + y * 9] instanceof Void) legal_moves.push(x + y * 9);
    else if (
      figure.player != squares[x + y * 9].player &&
      squares[x + y * 9].player != 3
    ) {
      legal_moves.push(x + y * 9);
      return true;
    }
    else
      return true;
  }

  throne_is_under_controle(side) {
    var squares = this.state.squares.slice();
    var anti_side = 3 - side;
    var throne_coords = 40;
    squares[40] = new Knight(anti_side);
    for (let i = 0; i < 81; i++) {
      if (
        squares[i].player === side &&
        this.state.available_moves.includes(i)
      ) {
        squares[40] = new Throne(3);
        return true;
      }
    }
    squares[40] = new Throne(3);
    return false;
  }

  check_prince_move(figure, x, y, legal_moves, for_player) {
    var squares = this.state.squares.slice();
    var coords = this.find_king(figure.player);
    console.log(coords);
    console.log(x, y);
    if (squares[x + y * 9] instanceof Void) legal_moves.push(x + y * 9);
    else if (squares[x + y * 9].player === 3) {
      if (
        figure.player === 1 &&
        !this.throne_is_under_controle(2) &&
        coords % 9 >= 2 &&
        coords % 9 <= 6 &&
        Math.floor(coords / 9) >= 2 &&
        Math.floor(coords / 9) <= 6
      )
        legal_moves.push(x + y * 9);
    } else if (figure.player != squares[x + y * 9].player) {
      legal_moves.push(x + y * 9);
      return true;
    }
    else
      return true;
  }

  available_move(coords) {
    //var i = coords;
    var squares = this.state.squares.slice();
    var temp_figure = squares[coords];
    var legal_moves = [];

    if (temp_figure instanceof Knight) {
      var moves = [7, 11, 17, 19, -7, -11, -17, -19];
      moves.forEach((i) => {
        var new_i = coords + i;
        if (new_i >= 0 && new_i < 81)
          if (
            temp_figure.isMovePossible(coords, coords + i) &&
            temp_figure.player != squares[new_i].player &&
            temp_figure.player != 3
          ) {
            //console.log(temp_figure.player);
            legal_moves.push(new_i);
          }
      });
    } else if (temp_figure instanceof Rook) {
      for (let i = (coords % 9) - 1; i >= 0; i--) {
        if (this.check_move(temp_figure, i, coords / 9, legal_moves)) break;
      }
      for (let i = (coords % 9) + 1; i < 9; i++) {
        if (this.check_move(temp_figure, i, coords / 9, legal_moves)) break;
      }
      for (let i = coords / 9 - 1; i >= 0; i--) {
        if (this.check_move(temp_figure, coords % 9, i, legal_moves)) break;
      }
      for (let i = coords / 9 + 1; i < 9; i++) {
        if (this.check_move(temp_figure, coords % 9, i, legal_moves)) break;
      }
    } else if (temp_figure instanceof Bishop) {
      for (
        let i = (coords % 9) + 1, j = coords / 9 + 1;
        i < 9 && j < 9;
        i++, j++
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) + 1, j = coords / 9 - 1;
        i < 9 && j >= 0;
        i++, j--
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = coords / 9 + 1;
        i >= 0 && j < 9;
        i--, j++
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = coords / 9 - 1;
        i >= 0 && j >= 0;
        i--, j--
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
    } else if (temp_figure instanceof Queen) {
      for (
        let i = (coords % 9) + 1, j = coords / 9 + 1;
        i < 9 && j < 9;
        i++, j++
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) + 1, j = coords / 9 - 1;
        i < 9 && j >= 0;
        i++, j--
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = coords / 9 + 1;
        i >= 0 && j < 9;
        i--, j++
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = coords / 9 - 1;
        i >= 0 && j >= 0;
        i--, j--
      ) {
        if (this.check_move(temp_figure, i, j, legal_moves)) break;
      }
      for (let i = (coords % 9) - 1; i >= 0; i--) {
        if (this.check_move(temp_figure, i, coords / 9, legal_moves)) break;
      }
      for (let i = (coords % 9) + 1; i < 9; i++) {
        if (this.check_move(temp_figure, i, coords / 9, legal_moves)) break;
      }
      for (let i = coords / 9 - 1; i >= 0; i--) {
        if (this.check_move(temp_figure, coords % 9, i, legal_moves)) break;
      }
      for (let i = coords / 9 + 1; i < 9; i++) {
        if (this.check_move(temp_figure, coords % 9, i, legal_moves)) break;
      }
    } else if (temp_figure instanceof Prince) {
      //Move like Bishop

      for (
        let i = (coords % 9) + 1, j = Math.floor(coords / 9) + 1;
        i < Math.min(9, (coords % 9) + 3) && j < Math.min(9, Math.floor(coords / 9) + 3);
        i++, j++
      ) {
        if (this.check_prince_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) + 1, j = Math.floor(coords / 9) - 1;
        i < Math.min(9, (coords % 9) + 3) && j > Math.max(-1, Math.floor(coords / 9) - 3);
        i++, j--
      ) {
        if (this.check_prince_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = Math.floor(coords / 9) + 1;
        i > Math.max(-1, (coords % 9) - 3) && j < Math.min(9, Math.floor(coords / 9) + 3);
        i--, j++
      ) {
        if (this.check_prince_move(temp_figure, i, j, legal_moves)) break;
      }
      for (
        let i = (coords % 9) - 1, j = Math.floor(coords / 9) - 1;
        i > Math.max(-1, (coords % 9) - 3) && j > Math.max(-1, Math.floor(coords / 9) - 3);
        i--, j--
      ) {
        if (this.check_prince_move(temp_figure, i, j, legal_moves)) break;
      }

      //Move like Rook

      for (let i = (coords % 9) - 1; i > Math.max(-1, i - 3); i--) {
        if (this.check_prince_move(temp_figure, i, Math.floor(coords / 9), legal_moves))
          break;
      }
      for (let i = (coords % 9) + 1; i < Math.min(9, (coords % 9) + 3); i++) {
        if (this.check_prince_move(temp_figure, i, Math.floor(coords / 9), legal_moves))
          break;
      }
      for (let i = Math.floor(coords / 9) - 1; i > Math.max(-1, Math.floor(coords / 9) - 3); i--) {
        if (this.check_prince_move(temp_figure, coords % 9, i, legal_moves))
          break;
      }
      for (let i = Math.floor(coords / 9) + 1; i < Math.min(Math.floor(coords / 9) + 3, 9); i++) {
        if (this.check_prince_move(temp_figure, coords % 9, i, legal_moves))
          break;
      }
    } else if (squares[coords] instanceof King) {
      var moves = [10, 9, 8, 1, -1, -8, -9, -10];

      moves.forEach((i) => {
        var new_i = coords + i;

        if (new_i % 9 === 4 && new_i / 9 === 4) {
          if (new_i >= 0 && new_i < 81) {
            if (squares[i].player === 2 && !this.throne_is_under_controle(1))
              legal_moves.push(new_i);
            else if (
              squares[i].player === 1 &&
              !this.throne_is_under_controle(2)
            )
              legal_moves.push(new_i);
          }
        } else if (new_i >= 0 && new_i < 81)
          if (
            temp_figure.isMovePossible(coords, coords + i) &&
            temp_figure.player != squares[new_i].player &&
            temp_figure.player != 3
          ) {
            legal_moves.push(new_i);
          }
      });

      if(squares[coords].player === 1)
      {
        if(this.state._w_king )
        {
          if(this.state._rw_rook && squares[77] instanceof Void && squares[78] instanceof Void && squares[79] instanceof Void)
          {
            legal_moves.push(78);
            legal_moves.push(79);
          }
          if(this.state._lw_rook && squares[75] instanceof Void && squares[74] instanceof Void && squares[73] instanceof Void)
          {
            legal_moves.push(74);
            legal_moves.push(73);
          }
        }
      }
      if(squares[coords].player === 2)
      {
        if(this.state._b_king )
        {
          if(this.state._rb_rook && squares[5] instanceof Void && squares[6] instanceof Void && squares[7] instanceof Void)
          {
            legal_moves.push(6);
            legal_moves.push(7);
          }
          if(this.state._lb_rook && squares[3] instanceof Void && squares[2] instanceof Void && squares[1] instanceof Void)
          {
            legal_moves.push(3);
            legal_moves.push(2);
          }
        }
      }

    } else if (squares[coords] instanceof Pawn) {
      if (squares[coords].player === 1) {
        if (squares[coords - 9].player === 4) {
          legal_moves.push(coords - 9);
          if (Math.floor(coords / 9) === 7 && squares[coords - 18].player === 4)
            legal_moves.push(coords - 18);
        }

        if (coords % 9 !== 8 && squares[coords - 8].player === 2)
          legal_moves.push(coords - 8);
        if (coords % 9 !== 0 && squares[coords - 10].player === 2)
          legal_moves.push(coords - 10);
      } else if (squares[coords].player === 2) {
        if (squares[coords + 9].player === 4) {
          legal_moves.push(coords + 9);
          if (Math.floor(coords / 9) === 1 && squares[coords + 18].player === 4)
            legal_moves.push(coords + 18);
        }
        if (coords % 9 !== 0 && squares[coords + 8].player === 1)
          legal_moves.push(coords + 8);
        if (coords % 9 !== 8 && squares[coords + 10].player === 1)
          legal_moves.push(coords + 10);
      }
    }
    return legal_moves;
  }

  getavailablemoves(coord, for_user = false) {
    if (for_user) {
      var res = [];

      this.state.available_moves[coord].array.forEach((item) => {
        res.push(
          this.transform_back_x(item % 9) + this.transform_back_y(item / 9)
        );
      });

      return res;
    }

    return this.state.available_moves[coord];
  }

  make_move(i) {
    var squares = this.state.squares.slice();

    var src = this.state.sourceSelection;

    var color_move = this.state._move_number % 2 ? 1 : 2;

    if (color_move != squares[src].player) {
      return false;
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
              "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (squares[i]) {
          squares[i].style = {...squares[i].style, backgroundColor: ""};
          //console.log("First deletion is called");
          //delete squares[i].style.backgroundColor;
          //squares[i] = React.cloneElement(squares[i], {}, null);
          //squares[i].render
        }
        //squares[i] ? (delete squares[i].style.backgroundColor) : null;
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: "RGB(111,143,114)",
        };
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
        });
        this.state.available_moves = [];
        for (let i = 0; i < 81; i++) {
          if (
              this.state.squares[i].player === 1 ||
              this.state.squares[i].player === 2
          )
            this.state.available_moves.push(this.available_move(i));
          else this.state.available_moves.push([]);
        }
        /*this.state.available_moves[i].forEach((index) => {
          squares[index].style = {
            ...squares[index].style,
            backgroundColor: "RGB(0,0,0)"
          }
        })*/
      }
    } else if (
        this.state.sourceSelection > -1 &&
        this.state.available_moves[this.state.sourceSelection].includes(i)
    ) {
      squares[this.state.sourceSelection].style = {
        ...squares[this.state.sourceSelection].style,
        backgroundColor: "",
      };
      //delete squares[this.state.sourceSelection].style.backgroundColor;
      //squares[this.state.sourceSelection] = React.cloneElement(squares[this.state.sourceSelection], {}, null);
      //console.log("Second deletion called");
      if (squares[i] && squares[i].player === this.state.player) {
        /*for(let j = 0; j < 81; j++)
        {
          squares[j].style = { ...squares[j].style, backgroundColor: "" };
        }*/
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      } else {
        const squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        /*const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[
          this.state.sourceSelection
        ].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[
          this.state.sourceSelection
        ].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);*/

        //if (isMovePossible && isMoveLegal) {
        /*for(let j = 0; j < 81; j++)
          {
            squares[j].style = { ...squares[j].style, backgroundColor: "" };
          }*/
        if (!(squares[i] instanceof Void)) {
          if (squares[i].player === 1) {
            whiteFallenSoldiers.push(squares[i]);
          } else {
            blackFallenSoldiers.push(squares[i]);
          }
        }
        console.log("whiteFallenSoldiers", whiteFallenSoldiers);
        console.log("blackFallenSoldiers", blackFallenSoldiers);
        if(squares[this.state.sourceSelection] instanceof King)
        {
          if(squares[this.state.sourceSelection].player === 1)
            this.state._w_king = false;
          if(squares[this.state.sourceSelection].player === 2)
            this.state._b_king = false;
        }
        else if(squares[this.state.sourceSelection] instanceof Rook)
        {
          if(squares[this.state.sourceSelection].player === 1)
          {
            if(this.state.sourceSelection === 80)
              this.state._rw_rook = false;
            else if(this.state.sourceSelection === 72)
              this.state._lw_rook = false;
          }
            
          if(squares[this.state.sourceSelection].player === 2)
          {
            if(this.state.sourceSelection === 8)
              this.state._rb_rook = false;
            else if(this.state.sourceSelection === 0)
              this.state._lb_rook = false;
          }
        }
        if(squares[this.state.sourceSelection] instanceof King)
        {
          if((i%9 - this.state.sourceSelection % 9) > 1)
          {
            squares[i-1] = squares[Math.floor(i/9) * 9 + 8];
            squares[Math.floor(i/9) * 9 + 8] = new Void;
          }
          if((i%9 - this.state.sourceSelection % 9) < -1)
          {
            squares[i+1] = squares[Math.floor(i/9) * 9];
            squares[Math.floor(i/9)*9] = new Void;
          }
        }
        if(squares[i] instanceof King)
        {
          if(this.find_prince(squares[i].player) !== -1)
            squares[this.find_prince(squares[i].player)] = new King(squares[i].player);
            else
            {

            }
        }
        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = new Void();
        console.log(squares[i]);
        let player = this.state.player === 1 ? 2 : 1;
        let turn = this.state.turn === "white" ? "black" : "white";

        this.setState({
          sourceSelection: -1,
          squares: squares,
          whiteFallenSoldiers: whiteFallenSoldiers,
          blackFallenSoldiers: blackFallenSoldiers,
          player: player,
          status: "",
          turn: turn,
        });
        //}
      }
      this.state.available_moves = [];
      for (let i = 0; i < 81; i++) {
        if (
            this.state.squares[i].player === 1 ||
            this.state.squares[i].player === 2
        )
          this.state.available_moves.push(this.available_move(i));
        else this.state.available_moves.push([]);
      }
      console.log(this.state.squares);
      console.log(this.state.available_moves);
    } else {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
      console.log("before the loop");
      /*for(let j = 0; j < 81; j++)
      {
        console.log(squares[j].style);
        //squares[j].style = { ...squares[j].style, backgroundColor: "" };
      }*/
    }
  }

    isMoveLegal(srcToDestPath)
    {
      let isLegal = true;
      for (let i = 0; i < srcToDestPath.length; i++) {
        if (!(this.state.squares[srcToDestPath[i]] instanceof Void)) {
          isLegal = false;
        }
      }
    }

    render()
    {
      return (
          <div className={classes.gamepage}>
            <div className={classes.game}>
              <div className={classes.avanickrate}>
                <div>ava</div>
                <div>Nickname</div>
                <div>Rate</div>
              </div>
              <div className="fallen-soldier-block">
                <FallenSoldierBlock
                    whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                />
              </div>
              <div className="game-board">
                <Board
                    squares={this.state.squares}
                    onClick={(i) => this.handleClick(i)}
                />
              </div>
              <div className="fallen-soldier-block">
                {
                  <FallenSoldierBlock
                      blackFallenSoldiers={this.state.blackFallenSoldiers}
                  />
                }
              </div>
              <div className={classes.avanickrate}>
                <div>ava</div>
                <div>Nickname</div>
                <div>Rate</div>
              </div>
            </div>
            <div className={classes.game_info}>
              <h2>Current game info</h2>
              <div className={classes.turntimebox}>
                <div>
                  <h3>Turn:</h3>
                  <div
                      id="player-turn-box"
                      style={{backgroundColor: this.state.turn}}
                  ></div>
                </div>
                <div className="game-status">{this.state.status}</div>
                <div className={classes.timer}>Timer</div>
              </div>
              <div className={classes.tablewrapper}>
                <table className={classes.movetable}>
                  <tr>
                    <th>Move number</th>
                    <th>White's turn</th>
                    <th>Black's turn</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>e4</td>
                    <td>e5</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
      );
    }

}
