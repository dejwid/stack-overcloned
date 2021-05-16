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
import TagPage from "./TagPage";
import UserPage from "./UserPage";

function App() {
  const [user,setUser] = useState(null);

  function checkAuth() {
    return new Promise(((resolve, reject) => {
      axios.get('http://localhost:3030/profile', {withCredentials:true})
        .then(response => {
          setUser({
            email:response.data.email,
            name: response.data.name,
            id: response.data.id,
          });
          resolve(response.data);
        })
        .catch(() => {
          setUser(null);
          reject(null);
        });
    }));

  }

  function editUser(userProps) {
    let newUserInfo = user;
    for (let key in userProps) {
      newUserInfo[key] = userProps[key];
      console.log(key, userProps[key], newUserInfo);
    }
    setUser(newUserInfo);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Reset />
      <GlobalStyles />
      <Router>
        <UserContext.Provider value={{user, checkAuth, editUser}}>
          <Header />
          <Switch>
            <Route path="/ask" component={AskPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/questions/:id" component={QuestionPage} />
            <Route path="/tag/:name" component={TagPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="/" component={QuestionsPage} />
          </Switch>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
