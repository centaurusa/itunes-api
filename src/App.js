import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Results from './Components/Results/Results';
import { Route, Switch } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import FullDetailsCard from './Components/FullDetailsCard/FullDetailsCard';
import axios from 'axios';
import './App.css';

class App extends Component {

  userId = localStorage.getItem('userId');


  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.showPrevQueries = this.showPrevQueries.bind(this);
  }

  state = {
    isLoading: false,
    results: [],
    userId: '',
    queries: [],
    showPrevQueries: false
  };

  componentDidMount() {
    if (this.userId) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { userId: this.userId }})
      .then(res => {
        this.setState({
          queries: res.data.user.queries
        });
        localStorage.setItem('userId', res.data.user._id);
      });
    }
  }

  /**
   * 
   * @param {*} query string
   * @description fetches content from Itunes API with passed query string
   */
  search(query) {

    if (!query) {
      return;
    }
    this.setState({ isLoading: true })
    const convertedQuery = query.split(' ').join('+');


    axios.get(`${process.env.REACT_APP_BASE_URL}/itunes/${convertedQuery}`, { headers: { userId: this.userId }})
      .then(res => {
        console.log('res from the server', res.data);
        const updatedState = {
          isLoading: false,
          results: res.data.searchResult.results,
          userId: res.data.user._id,
          queries: res.data.user.queries
        }
        // saves a generated user id to localstorage
        localStorage.setItem('userId', res.data.user._id);
        this.setState(prevState => (updatedState));
      })
  }
  /**
   * @returns void
   * Shows previous queries made by the user
   */
  showPrevQueries() {
    this.setState({ showPrevQueries: !this.state.showPrevQueries });
  }

  render() {
    const { isLoading } = this.state;
    let prevQueries = null;

    if (this.state.showPrevQueries && (this.state.queries && this.state.queries.length > 0)) {
      prevQueries = (
        <ul className={'QueryList'}>{this.state.queries.sort((a,b) => b.count - a.count).map((query, i) => {
          return <li key={i}>{query.text}({query.count})</li>
        })}</ul>
      );
    }

    return (
      <div className="App">
        { isLoading && <Loader />}
        <Header showPrevQueries={this.showPrevQueries} search={this.search}/>
        {prevQueries}
        <Switch>
          <Route path="/details/:id" render={(props) => <FullDetailsCard results={this.state.results} {...props} />} />
          <Route path="/" exact component={() => <Results results={this.state.results} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
