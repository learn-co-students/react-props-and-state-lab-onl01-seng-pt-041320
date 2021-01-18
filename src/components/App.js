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

  changeType = (value) => {
    this.setState({
      filters: {
        type: value
      }
    })
  }

  adoptPet = (id) => {
    const newPets = this.state.pets.slice()
    let newArray = newPets.filter((pet) => pet.id !== id)
    let pet = newPets.filter((pet) => pet.id === id)
    pet[0].isAdopted = true
    newArray.push(pet[0])
    this.setState({
      pets: newArray
    })
  }

  fetchPets = () => {
    if (this.state.filters.type === 'all') {
    fetch("/api/pets")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          pets: result.pets
        });
      })
    }
    else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          pets: result.pets
        });
      })
    }
  }

  componentDidMount() {
    this.fetchPets()
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
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.changeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
