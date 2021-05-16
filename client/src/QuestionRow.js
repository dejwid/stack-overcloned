import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Tag from './Tag';
import When from "./When";
import UserLink from "./UserLink";

const QuestionStat = styled.div`
  text-align: center;
  display: inline-block;
  font-size: 1.2rem;
  color:#aaa;
  margin-top:7px;
  span{
    font-size:.7rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;
const QuestionTitleArea = styled.div`
  padding: 0 30px;
`;
const QuestionLink = styled(Link)`
  text-decoration: none;
  color:#3ca4ff;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
`;
const StyledQuestionRow = styled.div`
  background-color: rgba(255,255,255,.05);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 50px) 1fr;
  border-top: 1px solid #555;
`;
const WhoAndWhen = styled.div`
  display: inline-block;
  color:#aaa;
  font-size: .8rem;
  float:right;
  padding: 10px 0;
`;

function QuestionRow({title,id,tags,author,createdAt}) {
  return (
    <StyledQuestionRow>
      <QuestionStat>0<span>votes</span></QuestionStat>
      <QuestionStat>1<span>answers</span></QuestionStat>
      <QuestionStat>6<span>views</span></QuestionStat>
      <QuestionTitleArea>
        <QuestionLink to={'/questions/'+id}>{title}</QuestionLink>
        <WhoAndWhen>
          <When>{createdAt}</When> <UserLink id={author.id}>{author.name || author.email}</UserLink>
        </WhoAndWhen>
        {tags && tags.split(',').map(tag => (
          <Tag name={tag} />
        ))}
      </QuestionTitleArea>
    </StyledQuestionRow>
  );
}

QuestionRow.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string,
  author: PropTypes.object,
};

export default QuestionRow;