import styled from 'styled-components';
import {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/fontawesome-free-brands';
import {Link} from 'react-router-dom';
import UserContext from "./UserContext";

const StyledHeader = styled.header`
  background-color: #393939;
  box-shadow: 0 3px 3px rgba(0,0,0,.2);
  display:grid;
  grid-template-columns: 220px 1fr 200px;
  grid-column-gap: 20px;
`;

const LogoLink = styled(Link)`
  color:#fff;
  text-decoration: none;
  display: inline-block;
  height: 50px;
  line-height: 30px;
  padding: 0px 15px;
  svg{
    margin-top: 7px;
    display: inline-block;
    float:left;
  }
  span{
    display: inline-block;
    padding-left:5px;
    padding-top: 10px;
    font-size:1.2rem;
    font-weight: 300;
  }
  b{
    font-weight: normal;
    display: inline-block;
    margin-left:2px;
  }
`;

const SearchInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  width:100%;
  border-radius: 3px;
  border:1px solid #777;
  background:rgba(0,0,0,.1);
  padding: 8px 10px;
  margin-top: 9px;
`;

const ProfileLink = styled(Link)`
  color:#fff;
  padding: 0 10px;
  text-decoration: none;
  line-height: 50px;
`;

function Header() {
  const {user} = useContext(UserContext);
  return (
    <StyledHeader>
      <LogoLink to={'/'} className="logo">
        <FontAwesomeIcon icon={faStackOverflow} size="2x" />
        <span>stack<b>overcloned</b></span>
      </LogoLink>
      <form action="" className="search">
        <SearchInput type="text" placeholder="Search..."/>
      </form>
      {user && (
        <ProfileLink to={'/profile'} className="profile">{user.email}</ProfileLink>
      )}
      {!user && (
        <div>
          <ProfileLink to={'/login'} className="profile">Log in</ProfileLink>
          <ProfileLink to={'/register'} className="profile">Register</ProfileLink>
        </div>

      )}
    </StyledHeader>
  );
}

export default Header;