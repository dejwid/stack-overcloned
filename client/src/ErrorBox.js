import styled from 'styled-components';

const StyledErrorBox = styled.div`
  background-color: rgba(255,0,0,.1);
  border: 1px solid red;
  padding: 20px;
  color:#fff;
  margin-bottom: 20px;
  border-radius: 5px;
`;

function ErrorBox(props) {
  return <StyledErrorBox {...props} />;
}

export default ErrorBox;