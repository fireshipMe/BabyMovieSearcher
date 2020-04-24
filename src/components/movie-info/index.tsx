import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createRequest } from '../../lib/api';
import _ from 'lodash';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '../movie-rating/index';
type Props = RouteComponentProps<{ id?: string }>;

type FavProps = {
  id: string;
  title: string;
};

type State = {
  id: string;
  title: string;
  overview: string;
  vote_average: number;
};

const defaultState = {
  id: 'loading...',
  title: 'loading...',
  overview: 'loading...',
  vote_average: 0,
};

export const MovieInfo = ({ match }: Props) => {
  const [state, handleChange] = React.useState<State>(defaultState);
  const [imdbRating, setimdbRating] = React.useState(0);
  const { id } = match.params;

  React.useEffect(() => {
    // handleChange(defaultState);

    createRequest(`https://api.themoviedb.org/3/movie/${id}`)
      .then((response) => response.json())
      .then(({ id, title, overview, vote_average }) => {
        handleChange({ id, title, overview, vote_average });
        // get second rating
        createRequest(
          'http://www.omdbapi.com/?',
          {
            t: title,
          },
          true
        )
          .then((response) => response.json())
          .then(({ imdbRating }) => setimdbRating(imdbRating));
      });
  }, [id]);

  return (
    <div className={styles.movieInfo}>
      <h2 className={styles.title}>{state.title}</h2>
      <HandleFavorites id={state.id} title={state.title} />
      <Rating omdb={state.vote_average} imdb={imdbRating} />
      <p className={styles.description}>{state.overview}</p>
    </div>
  );
};

type RootState = {
  favorites: any;
};

const HandleFavorites = ({ id, title }: FavProps) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch({
      type: 'ADD_FAVORITE',
      id: id,
      title: title,
    });
  };

  const handleRemFavorite = () => {
    dispatch({
      type: 'REM_FAVORITE',
      id: id,
    });
  };

  // Check if we alredy have it marked favorite
  const favorites = useSelector((state: RootState) => state.favorites);
  if (_.find(favorites, { id: id })) {
    return (
      <p className={styles.handleFavorites} onClick={() => handleRemFavorite()}>
        Unmark as favorite
      </p>
    );
  }

  return (
    <p className={styles.handleFavorites} onClick={() => handleAddFavorite()}>
      Mark as favorite
    </p>
  );
};
