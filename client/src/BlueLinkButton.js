import styled from "styled-components";

const StyledLink = styled.button`
  color: #3ca4ff;
  background:none;
  border:0;
  cursor: pointer;
  padding:0;
  &:hover{
    color: #1c84df;
  }
`;

function BlueLinkButton(props) {
  return (<StyledLink {...props} />);
}

export default BlueLinkButton;