import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { MovieInfo } from './components/movie-info';
import { SearchMovies } from './components/search-movies';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/:id" exact component={MovieInfo}></Route>
        </Switch>
        <SearchMovies />
      </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
