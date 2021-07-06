import {Component} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import BlueButton from "./BlueButton";
import axios from "axios";
import {Redirect} from "react-router-dom";
import UserContext from "./UserContext";
import Input from "./Input";
import Notification from "./Notifications";
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 30px 20px;
`;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      redirectToTheHomePage: false,
      username: '',
    };
  }
  componentDidMount() {
    this.setState({
      username: this.context.user ? this.context.user.name : '',
    });
  }

  logout() {
    axios.post('http://localhost:3030/logout', {}, {withCredentials: true})
      .then(() => {
        this.context.checkAuth().catch(() => this.setState({redirectToTheHomePage:true}));
      });
  }
  update(ev) {
    ev.preventDefault();
    const data = {name:this.context.user.name};
    axios.post('http://localhost:3030/profile', data, {withCredentials:true})
      .then(() => this.setState({showNotification:true}));
  }
  handleOnNameChange(ev) {
    this.setState({username:ev.target.value});
    this.context.editUser({name:ev.target.value});
  }

  render () {
    return (
      <>
        <Helmet>
          <title>StackOvercloned - your profile</title>
        </Helmet>
        {this.state.redirectToTheHomePage && (
          <Redirect to={'/'} />
        )}
        <Container>
          <Header1>Profile</Header1>
          {this.state.showConfirmation && (
            <Notification>Your profile has been updated!</Notification>
          )}
          <UserContext>{({user}) => {
            if (user) {
              return (
                <>
                  <form onSubmit={ev => this.update(ev)}>
                    <Input placeholder={'Your name'} value={this.state.username}
                           onChange={ev => this.handleOnNameChange(ev)} />
                    <BlueButton>Update profile</BlueButton>
                  </form>
                  <hr />
                  <BlueButton onClick={() => this.logout()}>Logout</BlueButton>
                </>
              );
            } else {
              return (<p>You are not logged in</p>);
            }
          }}</UserContext>
        </Container>
      </>
    );
  }


}

ProfilePage.contextType = UserContext;

export default ProfilePage;