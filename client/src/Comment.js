import VotingButtons from "./VotingButtons";
import WhoAndWhen from "./WhoAndWhen";
import UserLink from "./UserLink";
import styled from "styled-components";
import When from "./When";

const CommentBox = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 15px;
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding: 10px 0;
  font-size: .8rem;
  line-height: 1.0rem;
  color:#ddd;
`;

function Comment(props) {
  return (
    <CommentBox>
      <VotingButtons size={'sm'}
                     postId={props.comment.id}
                     initialTotal={props.comment.votes_sum===null ? 0 : props.comment.votes_sum}
                     initialUserVote={props.comment.user_vote} />
      <div>
        {props.comment.content}
        <WhoAndWhen style={{padding:0,float:'none'}}>
          &nbsp;–&nbsp;
          <UserLink id={props.comment.author_id}>{props.comment.user_name || props.comment.email}</UserLink>
          &nbsp;<When>{props.comment.created_at}</When>
        </WhoAndWhen>
      </div>

    </CommentBox>
  );
}

export default Comment;