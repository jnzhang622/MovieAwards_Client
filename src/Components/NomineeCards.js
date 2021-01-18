import React from 'react';

class NomineeCards extends React.Component{

  handleDelete = () => { //deletes nominee from the backend
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
      <div>
        <a>{this.props.movie.Title} ({this.props.movie.Year})</a>
        <div className="nomineeCard">
            <a href={`https://www.imdb.com/title/${this.props.movie.imdbID}`}>
              <img src={this.props.movie.Poster} 
                width='80px'
                alt={this.props.movie.Title}/>
            </a>
            <button className="removeNomineeButton" onClick={this.handleDelete}>
              Remove from Nominees</button>
        </div>
      </div>
    )
  }
}

export default NomineeCards;