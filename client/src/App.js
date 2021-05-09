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
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import QuestionPage from "./QuestionPage";

function App() {
  const [user,setUser] = useState(null);

  function checkAuth() {
    return new Promise(((resolve, reject) => {
      axios.get('http://localhost:3030/profile', {withCredentials:true})
        .then(response => {
          setUser({email:response.data});
          resolve(response.data);
        })
        .catch(() => {
          setUser(null);
          reject(null);
        });
    }));

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
            <Route path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/questions/:id" component={QuestionPage} />
            <Route path="/" component={QuestionsPage} />
          </Switch>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
