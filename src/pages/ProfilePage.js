import { Button } from "react-bootstrap";
import React from "react";
import Matches from "../components/Matches";
import "../css/Profile.css"
import ChangeNickname from "../services/ChangeNickname";


const BASE_URL = `http://localhost:8000`
const url_get_info = BASE_URL + `/user/get_info_of_current_user`;
const url_logout = BASE_URL + `/auth/jwt/logout`;

class Profile extends React.Component {
    constructor(props) {
        super(props);

        fetch(url_get_info, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                return response.json();
            })
            .then(data_res => {
                console.log(data_res);
                this.setState({user_data: data_res.data})
            });


        this.state = {
            user_data: {},
            matches_list: [],
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
                            <h5>Average rate</h5>
                            <li>{Math.round((this.state.user_data.rate_blitz + this.state.user_data.rate_rapid +
                                this.state.user_data.rate_classical) / 3.0)}</li>
                        </ul>
                    </div>
                </div>
                <ChangeNickname/>
                <div className="settings-buttons">
                    {/*<Button>Personal account settings</Button>*/}
                    {/*<Link onClick={this.quitTheProfile} to={"/"}>Quit the account</Link>*/}
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


    changeNickname() {
        fetch('/change_curr_user_nickname', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ new_nickname: 'Новый никнейм' })
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });

    }

    quitTheProfile() {

        fetch(url_logout, {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })

        window.location.href = '/';
    }
}


export default Profile;
