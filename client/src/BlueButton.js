import styled from 'styled-components';

const BlueButton = styled.button`
  background-color: #378ad3;
  color:#fff;
  border:0;
  border-radius: 5px;
  padding: ${props => props.size === 'sm' ? '8px 10px' : '12px 20px'};
  text-decoration: none;
  font-size: ${props => props.size === 'sm' ? '.8rem' : '1.1rem'};
`;

export default BlueButton;