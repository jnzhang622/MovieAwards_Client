import React from "react";
import MovieContainer from "./Components/MovieContainer";
import NomineesContainer from "./Components/NomineesContainer";
import './App.css';

class App extends React.Component {

  state={
    nominees: [],
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    searchTerm: "",
    currentSearch: "",
    searchCategory: "",
    page: 1,
    searchResults: []
  }

  componentDidMount(){ //fetches from rails backend
    fetch("http://localhost:3000/nominees")
        .then(resp => resp.json())
        .then(data => this.setState({nominees: data}))
  }
  
  searchIMDB = (e) => { //uses inputed search term to search omdb
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=${this.state.apiKey}${this.state.searchCategory}&s=${this.state.searchTerm}&page=${this.state.page}`)
        .then(resp => resp.json())
        .then(data => this.setState({ 
          searchResults: data,
          currentSearch: this.state.searchTerm
      }))
  }

  handleChange = (e) => { //handles the text change in the searchbox
    this.setState({searchTerm: e.target.value})}
  
  handleNewNominee = (newNominee) => { //adds new nominee to nominees state without reloading
    this.setState({nominees: [...this.state.nominees, newNominee]})
  }

  handleNomineeUpdate = (e) => { //removes nominee from nominees state without reloading
    // console.log(e)
    let updatedNominees = this.state.nominees.filter((nominee) => {
      if (nominee.id === e){
        return false
      } 
      return true
    })
    this.setState({nominees: updatedNominees})
  }

  changeSearchCategory = (e) => { //change filter
    this.setState({searchCategory: e.target.value})
  }

  render(){
    console.log(this.state.searchCategory)
    return (
      <div className="defaultCenter">
        <div className="imdbFormDiv">
            <form onSubmit={this.searchIMDB} className="imdbForm">
              <input className="imdbFormInput"
                placeholder="Search Movie..." 
                onChange={this.handleChange}
                />
            </form>
          <div className="filterDiv">
            <h4>Filter:</h4>
            <select className="filterDropdown" onChange={this.changeSearchCategory}>
              <option value={""}>None</option>
              <option value={"&type=movie"}>Movie</option>
              <option value={"&type=series"}>Series</option>
              <option value={"&type=episode"}>Episode</option>
            </select>
          </div>
        </div>
        <div className="mainCont">
          <div className="searchSubCont">
            {
              this.state.searchResults.Search ? 
                <div >
                  <h3>Results for {this.state.currentSearch}...</h3>
                  <MovieContainer movies={this.state.searchResults} 
                    handleNewNominee={this.handleNewNominee}/>
                </div>
              : <div>Please use the searchbar to search for Movie Title</div>
            }
          </div>
          <div className="nomineeCont">
            <h3>Nominees</h3>
            <NomineesContainer 
              nominees={this.state.nominees} 
              handleNomineeUpdate={this.handleNomineeUpdate}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
