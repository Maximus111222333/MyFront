import React, { useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from "axios";

const url_register = `http://127.0.0.1:8000/auth/register`

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            email: "",
            password: "",
            passwordConfirm: ""
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password,
            is_active: false,
            is_superuser: false,
            is_verified: false,
            nickname: this.state.nickname
        };

        axios.post(url_register, data).then((response) => {
            console.log(response.data)
        })
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
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group id="nick">
                                    <Form.Label>Nickname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nickname"
                                        value={this.state.nickname}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>
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
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwordConfirm"
                                        value={this.state.passwordConfirm}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button className="w-100 mt-4" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className="w-100 text-center mt-2">
                    Already have an account?{" "}
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Log In</a>
                </div>
            </div>
        );
    }
}


export default SignUp;