import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createRequest } from '../../lib/api';

import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';

type Props = RouteComponentProps<{ id?: string }>;

type State = {
  id: string;
  title: string;
  overview: string;
};

const defaultState = {
  id: 'loading...',
  title: 'loading...',
  overview: 'loading...',
};

export const MovieInfo = ({ match }: Props) => {
  const [state, handleChange] = React.useState<State>(defaultState);
  const { id } = match.params;

  React.useEffect(() => {
    handleChange(defaultState);

    createRequest(`https://api.themoviedb.org/3/movie/${id}`)
      .then((response) => response.json())
      .then(({ id, title, overview }) => handleChange({ id, title, overview }));
  }, [id]);

  return (
    <div className={styles.movieInfo}>
      <h2 className={styles.title}>{state.title}</h2>
      <AddToFavorites id={state.id} title={state.title} />
      <p className={styles.description}>{state.overview}</p>
    </div>
  );
};

type FavProps = {
  id: string;
  title: string;
};

const AddToFavorites = ({ id, title }: FavProps) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch({
      type: 'ADD_FAVORITE',
      id: id,
      title: title,
    });
  };

  return (
    <p className={styles.addToFavorites} onClick={() => handleAddFavorite()}>
      Mark as favorite
    </p>
  );
};
