import { Button } from "react-bootstrap";
import axios from "axios";
import React from "react";
import Matches from "../components/Matches";
import "../css/Profile.css"

const user_id = 2;
const number_of_matches = -1;
const offset = 0;
const url_0 = `http://127.0.0.1:8000/user/get_info_by_user_id?user_id=${user_id}`
const url_1 = `http://localhost:8000/matches/get_matches_by_user_id?user_id=${user_id}&number_of_matches=${number_of_matches}&offset=${offset}`
const url_logout = `http://127.0.0.1:8000/auth/jwt/logout`


class Profile extends React.Component {
    constructor(props) {
        super(props);

        axios.get(url_0).then((response) => {
            this.setState({user_data: response.data.data})
        })

        axios.get(url_1).then((response) => {
            this.setState({matches_list: response.data.data})
        })

        this.state = {
            user_data: {},
            matches_list: []
        }

    }

    render() {
        return (
        <div className="prof-page">
            <div className="personal-data">
                <div className="visual-information">
                    <div className="profile-avatar">Avatar</div>
                    <div className="stat-boxes">
                        <ul className="stats">
                            <h5>Nickname</h5>
                            <li>{this.state.user_data.nickname}</li>
                            <h5>Overall match number</h5>
                            <li>{this.state.user_data.number_matches_blitz + this.state.user_data.number_matches_rapid
                                + this.state.user_data.number_matches_classical}</li>
                            <li>{Math.round((this.state.user_data.rate_blitz + this.state.user_data.rate_rapid +
                                this.state.user_data.rate_classical) / 3.0)}</li>
                        </ul>
                    </div>
                </div>
                <div className="settings-buttons">
                    <Button>Change Nickname</Button>
                    <Button>Change Avatar</Button>
                </div>
                <div className="settings-buttons">
                    <Button>Personal account settings</Button>
                    <Button onClick={this.quitTheProfile}>Quit the account</Button>
                </div>
            </div>
            <div className="game-statistics">
                <h3>My statistics</h3>
                <table className="table-statistics">
                    <thead>
                    <tr>
                        <th>Number of games</th>
                        <th>Rate</th>
                        <th>Winrate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.user_data.number_matches_blitz}</td>
                        <td>{this.state.user_data.rate_blitz}</td>
                        <td>winrate in Blitz</td>
                    </tr>
                    <tr>
                        <td>{this.state.user_data.number_matches_rapid}</td>
                        <td>{this.state.user_data.rate_rapid}</td>
                        <td>winrate in Rapid</td>
                    </tr>
                    <tr>
                        <td>{this.state.user_data.number_matches_classical}</td>
                        <td>{this.state.user_data.rate_classical}</td>
                        <td>winrate in Classical</td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <h3 className="stat-header">Match history</h3>
                <table className="table-statistics">
                    <thead>
                    <tr>
                        <th>Result of match</th>
                        <th>Game mode</th>
                        <th>Match duration</th>
                        <th>Opponent</th>
                        <th>Rate change</th>
                    </tr>
                    </thead>
                    <Matches matches={this.state.matches_list}/>
                </table>
            </div>
        </div>
        )
    }

    quitTheProfile() {
        axios.post(url_logout)
            .then((response) => {
            console.log(response.data);
            // тут надо перенаправлять на страницу авторизации
        })
    }
}


export default Profile;
