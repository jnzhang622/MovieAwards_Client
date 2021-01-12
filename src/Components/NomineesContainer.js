import React from 'react';
import NomineeCards from "./NomineeCards";

function NomineesContainer(props) {
  return (
    <div >
        {
          (props.nominees)? 
          props.nominees.map(movie => {
            return (
                <div>
                    <NomineeCards 
                      key={movie.index} 
                      movie={movie}
                      handleNomineeUpdate={props.handleNomineeUpdate}/>
                </div>
                )
            }) : null
        }
    </div>
  )
}

export default NomineesContainer;