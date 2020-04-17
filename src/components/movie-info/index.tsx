import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { createRequest } from '../../lib/api'

import styles from './styles.module.scss'

type Props = RouteComponentProps<{ id?: string }>

type State = {
  title: string,
  overview: string,
}

const defaultState = { title: 'loading...', overview: 'loading...' }

export const MovieInfo = ({ match }: Props) => {
  const [state, handleChange] = React.useState<State>(defaultState)
  const { id } = match.params
  
  React.useEffect(() => {
    handleChange(defaultState)
    
    createRequest(`https://api.themoviedb.org/3/movie/${id}`)
      .then((response) => response.json())
      .then(({ title, overview }) => handleChange({ title, overview }))
  }, [id])

  return (
    <div className={styles.movieInfo}>
      <h2 className={styles.title}>{state.title}</h2>
      <p className={styles.description}>{state.overview}</p>
    </div>
  )
}
