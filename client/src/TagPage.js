import styled from "styled-components";
import Header1 from "./Header1";
import BlueButton from "./BlueButton";
import {Component} from 'react';
import axios from 'axios';
import QuestionRow from "./QuestionRow";
import {Helmet} from "react-helmet";

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
`;

class TagPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      following: false,
      questions: [],
    };
  }

  follow() {
    const data = {tagName: this.props.match.params.name};
    axios.post('http://localhost:3030/tags/follow', data, {withCredentials: true})
      .then(() => this.setState({following:true}));
  }

  unfollow() {
    const data = {tagName: this.props.match.params.name};
    axios.post('http://localhost:3030/tags/unfollow', data, {withCredentials: true})
      .then(() => this.setState({following:false}));
  }

  getQuestions() {
    axios.get('http://localhost:3030/questions?tagName='+this.props.match.params.name)
      .then(response => this.setState({questions:response.data}));
  }

  getFollowedTags() {
    this.setState({following:false});
    axios.get('http://localhost:3030/tags', {withCredentials:true})
      .then(response => {
        response.data.forEach(tag => {
          if (tag.name === this.props.match.params.name && tag.user_id) {
            this.setState({following:true});
          }
        });
      });
  }

  componentDidMount() {
    this.getQuestions();
    this.getFollowedTags();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.match.params.name !== this.props.match.params.name) {
     this.getQuestions();
     this.getFollowedTags();
    }
  }

  render() {
    const match = this.props.match;
    return (
      <>
        <Helmet>
          <title>StackOvercloned - {match.params.name} questions</title>
        </Helmet>
        <HeaderRow>
          <Header1>{match.params.name}</Header1>
          {this.state.following && (
            <BlueButton onClick={() => this.unfollow()}>UNFollow</BlueButton>
          )}
          {!this.state.following && (
            <BlueButton onClick={() => this.follow()}>Follow</BlueButton>
          )}
        </HeaderRow>
        <main>
          {this.state.questions && this.state.questions.length > 0 && this.state.questions.map(question => (
            <QuestionRow id={question.id} title={question.title}
                         createdAt={question.created_at}
                         tags={question.tags}
                         author={{email:question.email}} />
          ))}
        </main>
      </>
    );
  }
}

export default TagPage;