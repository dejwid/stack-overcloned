import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import React from "react";
import PropTypes from 'prop-types';

const BodyTextarea = styled.textarea`
  background:none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width:100%;
  box-sizing: border-box;
  padding: 10px;
  min-height: 200px;
  margin-bottom: 20px;
  color:#fff;
  font-family: inherit;
`;
const PreviewArea = styled.div`
  padding: 10px 20px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 20px;
`;


function PostBodyTextarea(props) {
  return (
    <>
      <BodyTextarea
        onChange={e => props.handlePostBodyChange(e.target.value)}
        placeholder={props.placeholder} value={props.value}/>
      {!!props.value && props.value.length > 0 && (
        <PreviewArea>
          <ReactMarkdown plugins={[gfm]} children={props.value} />
        </PreviewArea>
      )}
    </>
  );
}

PostBodyTextarea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handlePostBodyChange: PropTypes.any,
};

export default PostBodyTextarea;