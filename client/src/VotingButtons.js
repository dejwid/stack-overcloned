import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: ${props => props.size === 'sm' ? '10px' : '20px'} solid transparent;
  border-right: ${props => props.size === 'sm' ? '10px' : '20px'} solid transparent;
  border-bottom: ${props => props.size === 'sm' ? '10px' : '20px'} solid ${props => props.uservote===1 ? '#f48024' : '#888'};
`;
const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: ${props => props.size === 'sm' ? '10px' : '20px'} solid transparent;
  border-right: ${props => props.size === 'sm' ? '10px' : '20px'} solid transparent;
  border-top: ${props => props.size === 'sm' ? '10px' : '20px'} solid ${props => props.uservote===-1 ? '#f48024' : '#888'};
  padding:0;
`;
const ArrowButton = styled.button`
  border:0;
  background:none;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;
  padding:0;
`;
const Total = styled.div`
  text-align: center;
  width: ${props => props.size === 'sm' ? '20px' : '40px'};
  padding: ${props => props.size === 'sm' ? '2px 0 3px' : '7px 0 7px'};
  font-size: ${props => props.size === 'sm' ? '.8rem' : '1.4rem'};
  line-height: ${props => props.size === 'sm' ? '.6rem' : '1.4rem'};
  color: #888;
`;

function VotingButtons(props) {
  return (
    <div {...props}>
      <ArrowButton onClick={() => props.onArrowUpClick()}>
        <ArrowUp size={props.size} uservote={props.userVote} />
      </ArrowButton>
      <Total size={props.size}>{props.total}</Total>
      <ArrowButton onClick={() => props.onArrowDownClick()}>
        <ArrowBottom size={props.size} uservote={props.userVote} />
      </ArrowButton>
    </div>
  );
}

VotingButtons.propTypes = {
  total: PropTypes.number.isRequired,
  userVote: PropTypes.number.isRequired,
  onArrowUpClick: PropTypes.any,
  onArrowDownClick: PropTypes.any,
};

export default VotingButtons;