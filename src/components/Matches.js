import React from "react";
import "../css/Profile.css"

const number_of_matches = -1;
const offset = 0;
const BASE_URL = `http://localhost:8000`;
const url_get_matches = BASE_URL + `/matches/get_matches_of_current_user`;

class Matches extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list_matches: []
        }

        fetch(url_get_matches + `?number_of_matches=${number_of_matches}&offset=${offset}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                return response.json();
            })
            .then(data_res => {
                this.setState({list_matches: data_res.data})
            });

    }

    render() {
        if (this.state.list_matches.length > 0) {
            console.log(this.state.list_matches.length)
            return (
                <tbody className="list-matches">
                    {this.state.list_matches.map((elem) => (
                        <tr key={elem.id}>
                            <td className="match-item">Победа/поражение</td>
                            <td>{this.setMode(elem.mode_id)}</td>
                            <td>{this.setTime(elem.game_length_sec)}</td>
                            <td>Opponent</td>
                            <td>Rate change</td>
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
        console.log("mode id " + mode_id.toString())
        if (mode_id === 0 || mode_id === 1 || mode_id === 2) {
            return "Blitz";
        } else if (mode_id === 3 || mode_id === 4 || mode_id === 5) {
            return "Rapid";
        } else if (mode_id === 6 || mode_id === 7 || mode_id === 8) {
            return "Classical";
        }
    }

    setTime(game_length) {
        let min = Math.floor(game_length / 60);
        let sec = game_length % 60;

        // console.log("game_length = " + game_length.toString()
        if (min > 0) {
            return `${min} minutes, ${sec} seconds`;
        } else if (min === 1) {
            return `${min} minute, ${sec} seconds`;
        } else {
            return `${sec} seconds`;
        }
    }
}

export default Matches;