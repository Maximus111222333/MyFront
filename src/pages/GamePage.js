import React from "react";
import Game from "../chess_online/Game";

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        const urlParams = new URLSearchParams(window.location.search);
        const serializedProps = urlParams.get('props');

        const data_url = JSON.parse(decodeURIComponent(serializedProps));
        console.log(data_url)

        this.setState({curr_user_id: data_url.curr_user_id,
            opponent_id: data_url.opponent_id, websocket: data_url.websocket})


        this.state = {
            curr_user_id: 0,
            opponent_id: 0,
            websocket: null
        }
    }

    render() {
        return (
            <Game opponent_id={this.state.opponent_id}
                  curr_user_id={this.state.curr_user_id}
                  websocket={this.state.websocket}/>
        )
    }
}

export default GamePage;
