import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300,400;700&display=swap');
  body{
    background: #2d2d2d;
    color:#fff;
    font-family: Roboto, sans-serif;
  }
  b,strong{
    font-weight: 700;
  }
  a{
    color:#fff;
  }
  p{
    margin: 10px 0;
    line-height: 1.5rem;
  }
  h1,h2{
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h1{
    font-size: 1.8rem;
  }
  h2{
    font-size: 1.6rem;
  }
  blockquote{
    background-color: rgba(0,0,0,.1);
    padding: 15px;
    border-radius: 4px;
  }
  hr{
    margin: 20px 0;
    border-color:rgba(255,255,255,.1);
  }
  
  // tags
  .react-tags{
    margin-bottom: 20px;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 15px;
  }
  .react-tags__selected{
    display: inline-block;
  }
  .react-tags__selected-tag{
    border:0;
    display: inline-block;
    margin-right: 5px;
    background-color: #3e4a52;
    color: #9cc3db;
    padding: 7px;
    border-radius: 4px;
    font-size: .9rem;
  }
  .react-tags__search{
    display: inline-block;
  }
  input.react-tags__search-input,
  input.react-tags__search-input:focus
  {
    outline: none;
    background: none;
    border: none;
    display: block;
    width: 100%;
    min-width: 300px;
    box-sizing: border-box;
    padding: 10px;
    color: #fff;
  }
  .react-tags__suggestions{
    position: absolute;
  }
`;

export default GlobalStyles;