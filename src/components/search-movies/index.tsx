import React from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import { createRequest } from '../../lib/api';
import styles from './styles.module.scss';

type MovieProps = {
  title: string;
  id: string;
};

type MoviesProps = {
  list: MovieProps[];
};

type ResponseData = {
  results: MovieProps[];
};

export const SearchMovies = () => {
  const [value, onChange] = React.useState('');
  const [data, onSuccess] = React.useState<ResponseData | null>(null);
  const formattedList =
    data?.results?.map(({ id, title }) => ({ id: `/${id}`, title })) || [];

  React.useEffect(() => {
    value && searchMoviesFn(value, onSuccess);
  }, [value]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.mainInput}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
      <Link to="/favorites">
        <p>Favorites</p>
      </Link>
      <Movies list={formattedList} />
    </div>
  );
};

const Movies = ({ list }: MoviesProps) =>
  list.length > 0 ? <ul className={styles.movies}>{list.map(Movie)}</ul> : null;

const Movie = ({ title, id }: MovieProps) => (
  <li key={id}>
    <Link className={styles.movie} to={id}>
      {title}
    </Link>
  </li>
);

const searchMoviesFn = debounce(
  (query: string, fn: any) =>
    createRequest('https://api.themoviedb.org/3/search/movie', {
      language: 'en-US',
      query,
    })
      .then((response) => response.json())
      .then(fn),
  500,
  { maxWait: 1000 }
);
