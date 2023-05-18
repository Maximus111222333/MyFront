import { Button } from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";


const user_id = 4;
const url_0 = `http://127.0.0.1:8000/user/get_info_by_user_id?user_id=${user_id}`
const url_1 = "http://127.0.0.1:8000/user/get_info_of_current_user"


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        axios.get(url_0).then((response) => {
            this.setState({user_data: response.data.data})
        })

        this.state = {
            user_data: {}
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
                            <li>{this.state.user_data.nickname}</li>
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
                    <Button>Quit the account</Button>
                </div>
            </div>
            <div className="game-statistics">
                <h3>My statistics</h3>
                <table>
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
                <h3 className="stat-header">Match history</h3>
                <table className="match-history">
                    <tr>
                        <th>Outcome</th>
                        <th>Opponent</th>
                        <th>Rate change</th>
                        <th>Mode</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </table>
            </div>
        </div>
        )
    }

    set

    // setNumberOfMatches(number) {
    //     if (number === 0) {
    //         return 1;
    //     } else {
    //         return number;
    //     }
    // }
}


// function ProfilePage() {
//
//     const [data, setData] = useState([])
//
//     useEffect(() => {
//         axios
//             .get(url_0)
//             .then((response) => {
//                     setData(response.data.data)
//                     // console.log(response.data.data);
//                 }
//             )}, []);
//     return (
//
//     );
// }

export default ProfilePage;
