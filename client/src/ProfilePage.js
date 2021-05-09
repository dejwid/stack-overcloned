import {useState,useContext} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import BlueButton from "./BlueButton";
import axios from "axios";
import {Redirect} from "react-router-dom";
import UserContext from "./UserContext";

const Container = styled.div`
  padding: 30px 20px;
`;

function ProfilePage() {
  const {checkAuth,user} = useContext(UserContext);
  const [redirectToTheHomePage,setRedirectToTheHomePage] = useState(false);
  function logout() {
    axios.post('http://localhost:3030/logout', {}, {withCredentials: true})
      .then(() => {
        checkAuth().catch(() => setRedirectToTheHomePage(true));
      });
  }
  return (
    <>
      {redirectToTheHomePage && (
        <Redirect to={'/'} />
      )}
      <Container>
        <Header1>Profile</Header1>
        {user && (
          <>
            <p>Hello {user.email}</p>
            <BlueButton onClick={() => logout()}>Logout</BlueButton>
          </>

        )}
        {!user && (
          <p>You are not logged in</p>
        )}
      </Container>
    </>
  );
}

export default ProfilePage;