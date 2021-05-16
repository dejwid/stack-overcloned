import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from "axios";
import {useState} from 'react';

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
  const [currentTotal,setCurrentTotal] = useState(0);
  const [currentUserVote,setCurrentUserVote] = useState(null);
  function handleVoteClick(direction) {
    if (direction === currentUserVote) {
      setCurrentUserVote(null);
      setCurrentTotal( direction===1 ? total-1 : total+1 );
    } else {
      setCurrentUserVote(direction);
      setCurrentTotal(total + direction - currentUserVote);
    }
    const directionName = direction === 1 ? 'up' : 'down';
    axios.post('http://localhost:3030/vote/'+directionName+'/'+props.postId, {}, {withCredentials:true})
      .then(response => {
        setCurrentTotal(response.data);
      });
  }
  const total = currentTotal || props.initialTotal || 0;
  const userVote = currentUserVote === null ? props.initialUserVote : currentUserVote;
  return (
    <div {...props}>
      <ArrowButton onClick={() => handleVoteClick(1)}>
        <ArrowUp size={props.size} uservote={userVote} />
      </ArrowButton>
      <Total size={props.size}>{total}</Total>
      <ArrowButton onClick={() => handleVoteClick(-1)}>
        <ArrowBottom size={props.size} uservote={userVote} />
      </ArrowButton>
    </div>
  );
}

VotingButtons.propTypes = {
  initialTotal: PropTypes.number.isRequired,
  initialUserVote: PropTypes.number,
  postId: PropTypes.number.isRequired,
};

export default VotingButtons;