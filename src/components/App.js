import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  petStatus = (petid) => {
    const pet_arr = this.state.pets.filter(pet => pet.id !== petid);
    const foundpet = this.state.pets.find(pet => pet.id === petid);
    const adoptedpet = {...foundpet, isAdopted: true};
    this.setState({
      ...this.state,
      pets: [adoptedpet, ...pet_arr ] 
    });
  }

  changePetState = (data) => {
    this.setState({
      pets: data
    })
  }

  changePetType = (event) => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  fetchPets = () => {
    let endpoint = ''; 
    if(this.state.filters.type === 'all'){
      endpoint = `/api/pets`
    } else {
      endpoint = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(endpoint).then(res => res.json()).then((data) => this.changePetState(data))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changePetType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet={this.petStatus}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
