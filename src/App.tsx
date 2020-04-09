import React from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

import MovieInfo from './components/MovieInfo/MovieInfo';
import { Settings } from './config';
import './App.scss';

class Search extends React.Component<
  {},
  { value: string; assumption: Array<String>; movieIds: Array<number> }
> {
  constructor(props: any) {
    super(props);
    this.state = { value: '', assumption: [], movieIds: [] };
    this.handleChange = this.handleChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  handleChange(event: any) {
    let newValue = event.target.value;
    this.setState({ value: newValue });

    this.makeRequest(newValue);
  }

  async makeRequest(query: string) {
    if (query !== '') {
      let api_quiery =
        'https://api.themoviedb.org/3/search/movie?api_key=' +
        Settings.API_KEY +
        '&language=en-US&query=' +
        query.replace(' ', '%20');
      let resTitles: any[] = [];
      let resIds: number[] = [];
      fetch(api_quiery)
        .then((response) => response.json())
        .then((res) => {
          for (let i = 0; i < 4; i++) {
            if (res.results[i] !== undefined) {
              resTitles.push(res.results[i].title);
              resIds.push(res.results[i].id);
            } else {
              return;
            }
          }
        })
        .then(() => this.setState({ assumption: resTitles, movieIds: resIds }));
    } else {
      this.setState({ assumption: ['', '', '', ''] });
    }
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          className="main_input"
          onChange={this.handleChange}
        ></input>
        {this.state.value !== '' && (
          <AssumeBox
            assumption={this.state.assumption}
            id={this.state.movieIds}
          />
        )}
      </div>
    );
  }
}

// ***
// This worst function among of the ever written functions became a reason to first in my life issue
// I'm not this bad, really.
// ***
const Assumption = (props: any) => {
  if (props.text) {
    return (
      <React.Fragment>
        <div className="assumption">
          <Link to={'/' + props.id}>
            <p>{props.text}</p>
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

// I believe this should be somehow refactored, but have no idea how
const AssumeBox = (props: any) => {
  return (
    <div className="assume_box">
      <Assumption text={props.assumption[0]} id={props.id[0]} />
      <Assumption text={props.assumption[1]} id={props.id[1]} />
      <Assumption text={props.assumption[2]} id={props.id[2]} />
      <Assumption text={props.assumption[3]} id={props.id[3]} />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/:id" exact component={MovieInfo}></Route>
        </Switch>
        <Search />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
