import {Component, useContext} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import Input from "./Input";
import BlueButton from "./BlueButton";
import axios from 'axios';
import UserContext from "./UserContext";

const Container = styled.div`
  padding: 30px 20px;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  login() {
    axios.post('http://localhost:3030/login', {
      email: this.state.email,
      password: this.state.password,
    }, {withCredentials: true})
      .then(() => {
        this.context.checkAuth();
      });
  }
  render() {
    return (<>
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Login</Header1>
        <Input placeholder={'email'} type="email" value={this.state.email}
               onChange={ev => this.setState({email:ev.target.value})} />
        <Input placeholder={'password'} type="password" value={this.state.password}
               onChange={ev => this.setState({password:ev.target.value})} />
        <BlueButton onClick={() => this.login()}>Login</BlueButton>
      </Container>
    </>);
  }

}

LoginPage.contextType = UserContext;

export default LoginPage;