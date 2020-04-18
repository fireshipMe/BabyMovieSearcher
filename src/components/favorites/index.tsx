import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type FavoriteProps = {
  id: string;
  title: string;
};

type State = {
  favorites: any;
};

export const Favorites = () => {
  const favorites = useSelector((state: State) => state.favorites);
  return (
    <div className={styles.favorites}>
      <ul>{favorites.map(Favorite)}</ul>
    </div>
  );
};

const Favorite = ({ id, title }: FavoriteProps) => {
  return (
    <li key={id}>
      <Link to={'/' + id}>{title}</Link>
    </li>
  );
};

export default Favorites;
