import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Settings } from '../../config'

import './MovieInfo.scss'

type Props = RouteComponentProps<{ id?: string }>

type State = {
  title: string,
  overview: string,
}

export class MovieInfo extends React.Component<Props, State> {
  state = {
    title: 'loading...',
    overview: 'loading...',
  }

  componentDidMount() {
    this.makeRequest(this.props.match.params.id)
  }

  componentDidUpdate(prevProps: Props) {
    const { id } = this.props.match.params
    const { id: prevId } = prevProps.match.params
    
    if (id && id !== prevId) {
      this.makeRequest(id)
    }
  }

  render() {
    const { title, overview } = this.state

    return (
      <div className="movieInfo">
        <h2 className="movieInfo__title">{title}</h2>
        <p className="movieInfo__description">{overview}</p>
      </div>
    )
  }

  makeRequest = (id: string | void) => {
    if (!id) {
      console.warn('id should not be empty')
      return
    }

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${Settings.API_KEY}`)
      .then((response) => response.json())
      .then(this.success)
  }

  success = ({ title, overview }: { title: string, overview: string}) => this.setState({ title, overview })
}
