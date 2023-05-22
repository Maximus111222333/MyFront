import React from "react";
import classes from "../css/Game.module.css";
import Timer from "./Timer";
// import FallenSoldierBlock from "../components/chess/FallenSoldiersBlock";
// import Board from "../components/chess/Board";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            turn: "white",

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