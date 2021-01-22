import React from 'react';
import noImage from './w13911i0.jpg'

class MovieCard extends React.Component{

  handleSubmit = (e) => { //adds new nominee to backend
    e.preventDefault()
    fetch(`http://localhost:3000/nominees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Poster: this.props.movie.Poster,
            Title: this.props.movie.Title,
            Type: this.props.movie.Type,
            Year: this.props.movie.Year,
            imdbID: this.props.movie.imdbID
        })
    })
        .then(resp => resp.json())
        .then(data => {this.props.handleNewNominee(data)})
  }
  render() {
    console.log(this.props.movie.Poster)
    return (
      <div className="searchCard">
          <h5>{this.props.movie.Title} ({this.props.movie.Year})</h5>
          <a href={`https://www.imdb.com/title/${this.props.movie.imdbID}`}>
            <img src={(this.props.movie.Poster !== "N/A") ?
              this.props.movie.Poster : noImage
            }
              width="200px" 
              href={`https://www.imdb.com/title/${this.props.movie.imdbID}`}
              alt={this.props.movie.Title}/>
          </a>
          <button onClick={this.handleSubmit}>Add to Nominees</button>
      </div>
    )
  }
}
export default MovieCard;