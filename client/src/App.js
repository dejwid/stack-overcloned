import {useState, useEffect} from 'react';
import { Reset } from 'styled-reset';
import Header from "./Header";
import QuestionsPage from "./QuestionsPage";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AskPage from "./AskPage";
import GlobalStyles from "./GlobalStyles";
import UserContext from "./UserContext";
import LoginPage from "./LoginPage";
import axios from "axios";

function App() {
  const [user,setUser] = useState(null);

  function checkAuth() {
    axios.get('http://localhost:3030/profile', {withCredentials:true})
      .then(response => {
        setUser({email:response.data});
      })
      .catch(() => {
        setUser(null);
      });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Reset />
      <GlobalStyles />
      <Router>
        <UserContext.Provider value={{user, checkAuth}}>
          <Header />
          <Switch>
            <Route path="/ask" component={AskPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={QuestionsPage} />
          </Switch>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
