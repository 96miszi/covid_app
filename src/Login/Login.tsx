import React, {useState} from 'react';
import '../App.css';
import './LoginApp.scss';
import {Col, Container, Row} from "react-bootstrap";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Visibility, VisibilityOff, Done} from "@material-ui/icons";
import {USERS} from "./InMemoryUsers";
import {IUser} from "./IUser";
import {useHistory} from "react-router-dom";

type UserProps = {
    setUser: (username:IUser) => void
}

const Login = ({setUser}: UserProps) => {
    let history = useHistory();
    const [values, setValues] = useState({
        username: "",
        password: "",
        showPassword: false,
        loginError: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const user: IUser | undefined = USERS.find((user: IUser) => user.credentials.login === values.username && user.credentials.password === values.password);
        if (user) {
            alert(`Logged as: ${user.credentials.login}`);
            setValues({...values, loginError: false});
            setUser(user);
            history.push("/");
        } else {
            setValues({...values, loginError: true});
        }
    }


    return (<div>
        <Container className="login-container col-md-5">
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h1>Login</h1>
                    <hr/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <FormControl>
                        <InputLabel>Username</InputLabel>
                        <Input
                            error={values.loginError}
                            id="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                    </FormControl>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input
                            error={values.loginError}
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col sm={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        endIcon={<Done>login</Done>}
                        onClick={handleLogin}
                    >
                        Send
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>);

}

export default Login;