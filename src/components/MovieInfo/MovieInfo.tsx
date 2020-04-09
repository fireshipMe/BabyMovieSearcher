import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './MovieInfo.scss';

interface Props {
  id: number;
}

interface MatchParams {
  id?: string;
}
interface State {}

class MovieInfo extends React.Component<
  Props & RouteComponentProps<MatchParams>,
  State
> {
  // I promise if i will ever use ANY i will slap myself
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div className="MovieInfo">
        <MovieDescription
          description="Abdyabdya extra class film, didnt watch but recommend"
          title="Any film you like"
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
      <div className="MovieInfo__title"> {props.title} </div>
      <div className="MovieInfo__description"> {props.description} </div>
    </React.Fragment>
  );
};

export default MovieInfo;
