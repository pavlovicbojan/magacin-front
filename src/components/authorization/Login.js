import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {login} from '../../services/auth';

class Login extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            username:"",
            password:""
        }
    }

    onChange(event){
        const value = event.target.value;
        const name = event.target.name;

        var change = {}
        change[name] = value;

        this.setState(change)
    }

    render(){
        return(
            <Row className="justify-content-center">
                <Col md={6}>
                <Form>
                    <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name = "username" onChange={(e)=>this.onChange(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={(e)=>this.onChange(e)}></Form.Control>
                    </Form.Group>
                </Form>
                <Button onClick={()=>login(this.state.username, this.state.password)}>Log in</Button>
                </Col>
            </Row>
        );
    }
}

export default Login;