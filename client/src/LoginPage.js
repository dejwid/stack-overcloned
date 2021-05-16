import {Component} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import Input from "./Input";
import BlueButton from "./BlueButton";
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from 'react-router-dom';
import ErrorBox from "./ErrorBox";
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 30px 20px;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToHomePage: false,
      error: false,
    }
  }

  login(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/login', {
      email: this.state.email,
      password: this.state.password,
    }, {withCredentials: true})
      .then(() => {
        this.context.checkAuth().then(() => {
          this.setState({error:false,redirectToHomePage: true});
        });
      })
      .catch(() => this.setState({error:true}));
  }
  render() {
    return (<>
      <Helmet>
        <title>StackOvercloned - login</title>
      </Helmet>
      {this.state.redirectToHomePage && (
        <Redirect to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Login</Header1>
        {this.state.error && (
          <ErrorBox>Login failed</ErrorBox>
        )}
        <form onSubmit={ev => this.login(ev)}>
          <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <Input placeholder={'password'} type="password" value={this.state.password}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <BlueButton type={'submit'}>Login</BlueButton>
        </form>
      </Container>
    </>);
  }

}

LoginPage.contextType = UserContext;

export default LoginPage;