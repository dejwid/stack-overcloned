import styled from "styled-components";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const StyledTag = styled(Link)`
  display: inline-block;
  margin-right: 5px;
  background-color: #3e4a52;
  color:#9cc3db;
  padding: 7px;
  border-radius: 4px;
  font-size: .9rem;
  text-decoration: none;
  transition: all .2s ease;
  &:hover{
    background-color: #5e6a72;
    color:#bce3fb;
  }
`;

function Tag({name}) {
  return (<StyledTag to={'/tag/'+name}>{name}</StyledTag>);
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tag;