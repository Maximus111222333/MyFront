import React from "react";

class Matches extends React.Component {

    render() {
        if (this.props.matches.length > 0) {
            return (
                <div>
                    {this.props.matches.map((el) => (
                        <Match onDelete={this.props.onDelete} key={el.id} user={el}/>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="match">
                    <h3>No matches</h3>
                </div>
            )
        }
    }
}

export default Matches;