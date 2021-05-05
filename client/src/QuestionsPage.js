import styled from 'styled-components';
import QuestionRow from "./QuestionRow";
import Header1 from "./Header1";
import BlueButtonLink from "./BlueButtonLink";

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
`;

function QuestionsPage() {
  return (
    <main>
      <HeaderRow>
        <Header1 style={{margin:0}}>Top Questions</Header1>
        <BlueButtonLink to={'/ask'}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
    </main>
  );
}

export default QuestionsPage;