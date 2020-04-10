import React from 'react';
import _ from 'lodash';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Settings } from '../../config';

import './MovieInfo.scss';
interface Props {
  id: number;
}

interface MatchParams {
  id?: string;
}
interface State {
  title: string;
  description: string;
}

class MovieInfo extends React.Component<
  Props & RouteComponentProps<MatchParams>,
  State
> {
  // I promise if i will ever use ANY i will slap myself
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'loading...',
      description: 'loading...',
    };
  }

  // Not sure if this should look like this
  componentDidMount() {
    this.makeRequest();
  }

  componentDidUpdate() {
    _.debounce(() => this.makeRequest(), 2000);
  }

  makeRequest() {
    let prevState = this.state;
    let api_quiery =
      'https://api.themoviedb.org/3/movie/' +
      this.props.match.params.id +
      '?api_key=' +
      Settings.API_KEY;

    fetch(api_quiery)
      .then((response) => response.json())
      .then((response) => {
        if (prevState.title !== response.title) {
          this.setState({
            title: response.title,
            description: response.overview,
          });
        }
      });
  }

  render() {
    return (
      <div className="MovieInfo">
        <MovieDescription
          description={this.state.description}
          title={this.state.title}
        />
      </div>
    );
  }
}

// Ok, to stop using ANY read this when refactor :
// https://www.pluralsight.com/guides/how-to-statically-type-react-components-with-typescript
const MovieDescription = (props: any) => {
  return (
    <React.Fragment>
      <div className="MovieInfo__title">
        <h2>{props.title}</h2>
      </div>
      <div className="MovieInfo__description"> {props.description} </div>
    </React.Fragment>
  );
};

export default MovieInfo;
