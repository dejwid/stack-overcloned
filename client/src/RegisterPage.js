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

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      redirectToTheHomePage: false,
      error: false,
    }
  }

  register(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/register', {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }, {withCredentials: true})
      .then(() => {
        this.context.checkAuth()
          .then(() => this.setState({error:false,redirectToTheHomePage:true}));
      })
      .catch(error => {
        this.setState({error:error.response.data});
      });
  }
  render() {
    return (<>
      <Helmet>
        <title>StackOvercloned - register</title>
      </Helmet>
      {this.state.redirectToTheHomePage && (
        <Redirect to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Register</Header1>
        {this.state.error && (
          <ErrorBox>{this.state.error}</ErrorBox>
        )}
        <form onSubmit={ev => this.register(ev)}>
          <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <Input placeholder={'your name'} type="text" value={this.state.name}
                 onChange={ev => this.setState({name:ev.target.value})} />
          <Input placeholder={'password'} type="password" value={this.state.password}
                 autocomplete={'new-password'}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <BlueButton type={'submit'}>Register</BlueButton>
        </form>
      </Container>
    </>);
  }

}

RegisterPage.contextType = UserContext;

export default RegisterPage;