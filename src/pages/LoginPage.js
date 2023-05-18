import React, { useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from "axios";

const url_login = `http://127.0.0.1:8000/auth/jwt/login`

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = new URLSearchParams();
        data.append('username', this.state.email);
        data.append('password', this.state.password);
        data.append('grant_type', '');
        data.append('scope', '');
        data.append('client_id', '');
        data.append('client_secret', '');

        axios.post(url_login, data).then((response) => {
            console.log(response.data);
        });
    };


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <div className="justify-content-center d-flex mt-5">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button className="w-100 mt-4" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className="w-100 text-center mt-2">
                    Dont have an account?{" "}
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Sign Up</a>
                </div>
            </div>
        );
    }
}


export default Login;
