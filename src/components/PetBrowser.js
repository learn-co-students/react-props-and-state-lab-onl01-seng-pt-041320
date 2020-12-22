import React from 'react'

import Pet from './Pet'

const PetBrowser = (props) => {
    const petcards = props.pets.map(element => <Pet pet={element} onAdoptPet={props.onAdoptPet}/>);

    return <div className="ui cards">{petcards}</div>
}

export default PetBrowser
