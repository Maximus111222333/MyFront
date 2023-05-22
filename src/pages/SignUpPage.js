import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const BASE_URL = `http://localhost:8000`
const url_register = BASE_URL + `/auth/register`

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

        const data = {
            "email": this.state.email,
            "password": this.state.password,
            "is_active": true,
            "is_superuser": false,
            "is_verified": false,
            "nickname": this.state.nickname
        }

        console.log(data)

        fetch(url_register, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({inputValue: data.status})
                if (data.email === this.state.email) {
                    window.location.href = '/';
                }
                console.log(data);
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
