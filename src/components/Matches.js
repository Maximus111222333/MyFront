import React from "react";

class Matches extends React.Component {

    render() {
        if (this.props.matches.length > 0) {
            return (
                <tbody>
                    {this.props.matches.map((elem) => (
                        // <Match key={elem.id} match={elem}/>
                        <tr key={elem.id}>
                            <td>Победа/поражение</td>
                            <td>{this.setMode(elem.mode_id)}</td>
                            <td>{this.setTime(elem.game_length_sec)}</td>
                            <td>Opponent</td>
                            <td>rate change</td>
                        </tr>
                    ))}
                </tbody>
            )
        } else {
            return (
                <div className="match">
                    <h3>No matches</h3>
                </div>
            )
        }
    }

    setMode(mode_id) {
        if (mode_id === 0 || mode_id === 1 || mode_id === 2) {
            return "Blitz";
        } else if (mode_id === 3 || mode_id === 4 || mode_id === 5) {
            return "Rapid";
        } else if (mode_id === 6 || mode_id === 7 || mode_id === 8) {
            return "Classical";
        }
    }

    setTime(game_length) {
        let min = ~~(game_length / 60);
        let sec = game_length % 60;
        if (min === 0) {
            return `${min} minutes, ${sec} seconds`;
        } else if (min === 1) {
            return `${min} minute, ${sec} seconds`;
        } else {
            return `${sec} seconds`;
        }
    }
}

export default Matches;