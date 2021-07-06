import {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import Header1 from "./Header1";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Tag from "./Tag";
import WhoAndWhen from "./WhoAndWhen";
import UserLink from "./UserLink";
import VotingButtons from "./VotingButtons";
import Comments from "./Comments";
import Header2 from "./Header2";
import PostBodyTextarea from "./PostBodyTextarea";
import BlueButton from "./BlueButton";
import When from "./When";
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 30px 20px;
`;
const QuestionMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const QuestionTitle = styled(Header1)`
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding-bottom: 10px;
`;
const PostBody = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;
  margin-bottom: 20px;
`;

function QuestionPage({match}) {
  const [question,setQuestion] = useState(false);
  const [answerBody,setAnswerBody] = useState('');
  const [tags,setTags] = useState([]);
  const [userVote,setUserVote] = useState(0);
  const [voteCount,setVoteCount] = useState(0);
  const [questionComments,setQuestionComments] = useState([]);
  const [answersComments,setAnswersComments] = useState([]);
  const [answers,setAnswers] = useState([]);

  const getQuestion = useCallback(() => {
    axios.get('http://localhost:3030/questions/'+match.params.id, {withCredentials:true})
      .then(response => {
        setQuestion(response.data.question);
        const voteSum = response.data.question.vote_sum;
        setVoteCount(voteSum === null ? 0 : voteSum);
        setUserVote(response.data.question.user_vote);
        setTags(response.data.tags);
      });
  }, [match.params.id]);
  const getQuestionComments = useCallback(() => {
    axios.get('http://localhost:3030/posts/comments/'+match.params.id, {withCredentials:true})
      .then(response => {
        setQuestionComments(response.data);
      });
  }, [match.params.id]);
  function getAnswersComments(answers) {
    const ids = answers.map(answer => answer.id).join(',');
    axios.get('http://localhost:3030/posts/comments/'+(ids), {withCredentials:true})
      .then(response => {
        setAnswersComments(response.data);
      });
  }
  const getAnswers = useCallback(() => {
    axios.get('http://localhost:3030/posts/answers/'+match.params.id, {withCredentials:true})
      .then(response => {
        setAnswers(response.data);
        getAnswersComments(response.data);
      });
  }, [match.params.id]);
  function postAnswer(ev) {
    ev.preventDefault();
    const data = {postId: question.id, content: answerBody, type:'answer'};
    axios.post('http://localhost:3030/posts', data, {withCredentials:true})
      .then(response => {
        setAnswerBody('');
        setAnswers(response.data);
      });
  }
  useEffect(() => {
    getQuestion();
    getAnswers();
    getQuestionComments();
  }, [getQuestion, getAnswers, getQuestionComments]);
  return (
    <>
      <Container>
        {question && (
          <>
            <Helmet>
              <title>{question.title} - StackOvercloned</title>
            </Helmet>
            <QuestionTitle>{question.title}</QuestionTitle>
            <PostBody>
              <VotingButtons style={{marginTop:'10px'}}
                             initialTotal={voteCount}
                             initialUserVote={userVote}
                             postId={question.id} />
              <div>
                <ReactMarkdown plugins={[gfm]} children={question.content} />
                <QuestionMeta>
                  <div>
                    {tags.map(tag => (
                      <Tag key={'tag'+tag.id} name={tag.name} />
                    ))}
                  </div>
                  <WhoAndWhen><When>{question.created_at}</When> <UserLink>{question.name || question.email}</UserLink></WhoAndWhen>
                </QuestionMeta>
              </div>
            </PostBody>
          </>
        )}

        {questionComments && (
          <Comments initialComments={questionComments} postId={question.id} />
        )}


        {answers.map(answer => (
          <div>
            <hr/>
            <PostBody>
              <VotingButtons style={{marginTop:'10px'}}
                             initialTotal={answer.votes_sum}
                             initialUserVote={answer.user_vote}
                             postId={answer.id} />
              <div>
                <ReactMarkdown plugins={[gfm]} children={answer.content} />
                <WhoAndWhen style={{float:'none',width:'100%'}}>
                  <When>{answer.created_at}</When>&nbsp;
                  <UserLink id={answer.author_id}>{answer.user_name || answer.email}</UserLink>
                </WhoAndWhen>
              </div>
            </PostBody>
            <Comments
              initialComments={answersComments.filter(comment => comment.parent_id === answer.id)}
              postId={answer.id} />
          </div>
        ))}

        <hr/>
        <Header2 style={{margin:'30px 0 20px'}}>Your Answer</Header2>
        <PostBodyTextarea
          value={answerBody}
          placeholder={'Your answer goes here. You can use markdown'}
          handlePostBodyChange={value => setAnswerBody(value)} />
        <BlueButton onClick={ev => postAnswer(ev)}>Post your answer</BlueButton>
      </Container>
    </>
  );
}

export default QuestionPage;