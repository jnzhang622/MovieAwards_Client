import React from 'react';

class NomineeCards extends React.Component{

  handleDelete = () => {
    fetch(`http://localhost:3000/nominees/${this.props.movie.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
        .then(res => res.json())
        .then(() => this.props.handleNomineeUpdate(this.props.movie.id))
  }

  render(){
    return (
      <div className="nomineeCard">
          <h5 width="1000px" >{this.props.movie.Title} ({this.props.movie.Year})</h5>
          <a href={`https://www.imdb.com/title/${this.props.movie.imdbID}`}>
            <img src={this.props.movie.Poster} 
              width='80px'
              alt={this.props.movie.Title}/>
          </a>
          <button onClick={this.handleDelete}>Remove from Nominees</button>
      </div>
    )
  }
}

export default NomineeCards;