import styled from 'styled-components';
import BlueButton from "./BlueButton";
import {useState} from 'react';

const StyledTextarea = styled.textarea`
  background:none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width:100%;
  box-sizing: border-box;
  padding: 8px;
  line-height: 1.3rem;
  margin-bottom: 20px;
  color:#fff;
  font-family: inherit;
`;
const CommentFooter = styled.div`
  text-align: right;
`;

function CommentForm(props) {
  const [content, setContent] = useState('');
  function addComment(ev) {
    ev.preventDefault();
    props.onAddCommentClick(content);
    setContent('');
  }
  return (
    <form onSubmit={ev => addComment(ev)}>
      <StyledTextarea rows={3}
                      value={content}
                      onChange={ev => setContent(ev.target.value)}
                      style={{marginBottom:'10px'}}
                      placeholder={'Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.'} />
      <CommentFooter>
        <BlueButton
          type={'submit'}
          size={'sm'}>Add comment</BlueButton>
      </CommentFooter>
    </form>
  );
}

export default CommentForm;