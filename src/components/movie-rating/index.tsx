import React from 'react';

type RatingProps = {
  omdb: number;
  imdb: number;
};

export const Rating = ({ omdb, imdb }: RatingProps) => {
  return (
    <p>
      MovieDB rating is : {omdb} // IMDB rating is : {imdb}
    </p>
  );
};
