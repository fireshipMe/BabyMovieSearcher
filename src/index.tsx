import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MovieInfo } from './components/movie-info';
import { SearchMovies } from './components/search-movies';
import Favorites from './components/favorites';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/favorites" component={Favorites}></Route>
            <Route path="/:id" exact component={MovieInfo}></Route>
          </Switch>
          <SearchMovies />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
