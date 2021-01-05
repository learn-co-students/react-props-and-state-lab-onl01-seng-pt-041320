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

  handleChangeType = petType => {
    this.setState({
      filters: {
        type: petType
      }
    })
  }

  handleFindPets = () => {
    let url = "/api/pets"
    if (this.state.filters.type !== "all"){
      url += `?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({ pets: pets}))
  }

  handleAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters}
              onChangeType={this.handleChangeType}
              onFindPetsClick={this.handleFindPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} 
              onAdoptPet={this.handleAdoptPet}
              adoptedPets={this.state.isAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
