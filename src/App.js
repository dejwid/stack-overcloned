import { Reset } from 'styled-reset';
import {createGlobalStyle} from 'styled-components';
import Header from "./Header";
import QuestionsPage from "./QuestionsPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AskPage from "./AskPage";

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
`;

function App() {
  return (
    <div>
      <Reset />
      <GlobalStyles />

      <Router>
        <Header />
        <Switch>
          <Route path="/ask" component={AskPage} />
          <Route path="/" component={QuestionsPage} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
