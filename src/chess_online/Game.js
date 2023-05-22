import React from "react";
import classes from "../css/Game.module.css";
import Timer from "./Timer";
import Board from "./Board";
import initialiseChessBoard from "./InitializeBoard";
import FallenSoldierBlock from "../components/chess/FallenSoldiersBlock";
import {json} from "react-router-dom";


export default class Game extends React.Component {
    constructor(props) {
        super(props);

        const socket = this.props.websocket

        this.state = {
            squares: initialiseChessBoard(),
            whiteFallenSoldiers: [],
            blackFallenSoldiers: [],
            player: 1,
            sourceSelection: -1,
            status: "",
            turn: "white",
        };

    }
    async sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            await new Promise((resolve) => {
                this.socket.onopen = resolve;
            });
            this.socket.send(message);
        }
    }

    async receiveData() {
        return new Promise((resolve) => {
            this.socket.onmessage = (event) => {
                const message = event.data;
                const jsonData = JSON.parse(message);
                console.log("Received JSON data:", jsonData);
                resolve(jsonData);
            };
        });
    }

    // socket.onmessage = (event) => {
    //     const message = event.data;
    //     const jsonData = JSON.parse(message);
    //     console.log("Received JSON data:", jsonData);
    // };

    // async example() {
    //     await this.sendMessage("Hello, server!");
    //     const response = await this.receiveMessage();
    //     console.log("Received response:", response);
    // }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.player) {

                this.receiveData()
                    .then((response) => {
                    return response;
                }).then((data) => {
                    console.log(data);
                })

                this.setState({
                    status:
                        "Wrong selection. Choose player " + this.state.player + " pieces.",
                });

                if (squares[i]) {
                    squares[i].style = {...squares[i].style, backgroundColor:""};

                }

            } else {
                squares[i].style = {
                    ...squares[i].style,
                    backgroundColor: "RGB(111,143,114)",
                };
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i,
                });
            }
        } else if (this.state.sourceSelection > -1) {
            squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor:""};
            if (squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            } else {
                const squares = this.state.squares.slice();
                const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
                const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
                const isDestEnemyOccupied = squares[i] ? true : false;
                const isMovePossible = squares[
                    this.state.sourceSelection
                    ].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[
                    this.state.sourceSelection
                    ].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if (isMovePossible && isMoveLegal) {
                    if (squares[i] !== null) {
                        if (squares[i].player === 1) {
                            whiteFallenSoldiers.push(squares[i]);
                        } else {
                            blackFallenSoldiers.push(squares[i]);
                        }
                    }
                    console.log("whiteFallenSoldiers", whiteFallenSoldiers);
                    console.log("blackFallenSoldiers", blackFallenSoldiers);
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;
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
                } else {
                    this.setState({
                        status:
                            "Wrong selection. Choose valid source and destination again.",
                        sourceSelection: -1,
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className={classes.gamepage}>
                <div className={classes.game}>
                    <div className={classes.avanickrate}>
                        <div>ava</div>
                        <div>Nickname</div>
                        <div>Rate</div>
                    </div>
                    {/*<div className="fallen-soldier-block">*/}
                        {/*<FallenSoldierBlock whiteFallenSoldiers={this.state.whiteFallenSoldiers} />*/}
                    {/*</div>*/}
                    <div className="game-board">
                        {/*<Board*/}
                        {/*    squares={this.state.squares}*/}
                        {/*    onClick={(i) => this.handleClick(i)}*/}
                        {/*/>*/}
                        <Board
                            squares={this.state.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    {/*<div className="fallen-soldier-block">*/}
                    {/*    {*/}
                    {/*        // <FallenSoldierBlock*/}
                    {/*        //*/}
                    {/*        //     blackFallenSoldiers={this.state.blackFallenSoldiers}*/}
                    {/*        // />*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <div className={classes.avanickrate}><div>ava</div><div>Nickname</div><div>Rate</div></div>
                </div>
                <div className={classes.game_info}>
                    <h2>Current game info</h2>
                    <div className={classes.turntimebox}>
                        <div>
                            <h3>Turn:</h3>
                            <div
                                id="player-turn-box"
                                style={{ backgroundColor: this.state.turn }}
                            ></div>
                        </div>
                        <div className="game-status">{this.state.status}</div>
                        <div className={classes.timer}>
                            <Timer/>
                        </div>
                    </div>
                    <div className={classes.tablewrapper}>
                        <table className={classes.movetable}>
                            <thead>
                            <tr>
                                <th>Move number</th>
                                <th>White's turn</th>
                                <th>Black's turn</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            <tr>
                                <td>1</td><td>e4</td><td>e5</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}