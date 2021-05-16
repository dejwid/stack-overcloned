import styled from 'styled-components';

const StyledNotification = styled.div`
  background-color: rgba(0,255,0,.1);
  border: 1px solid green;
  padding: 20px;
  color:#fff;
  margin-bottom: 20px;
  border-radius: 5px;
`;

function Notification(props) {
  return <StyledNotification {...props} />;
}

export default Notification;