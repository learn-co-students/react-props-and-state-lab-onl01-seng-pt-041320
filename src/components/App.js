import React from 'react';

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
     // this.onChangeType = this.onChangeType.bind(this)
  }
    
 // The arrow function binds the "this" keyword.
    onChangeType = (event) => {
      this.setState({
        filters: {
          type: event.target.value
      }
    })
  }

  //bind function in constructor
   // The arrow function binds the "this" keyword.
   onFindPetsClick = () => {
    //  console.log("clicked")

      let url = '/api/pets'

      if(this.state.filters.type !== 'all') {
        url += `?type=${this.state.filters.type}`;
      }

      fetch(url)
        .then(resp => resp.json())
          .then(pets => {
              this.setState({ pets: pets
            })
         })
       }
    
     onAdoptPet = (id) => {
       
      //  const pet = {...this.state.pets.find(p => p.id === id)}

      //   pet.isAdopted = pet.isAdopted ? true : false
      //   const index = this.state.pets.indexOf(pet)
      //   this.setState({
      //     pets: [...this.state.pets.slice(0, index), pet, ...this.state.pets(index, this.state.pets.length)]
      //   })

      // const pet = this.state.pets.find(p => p.id === id)
        let newPetArray = [...this.state.pets]
        let individualPet = newPetArray.find(p => p.id === id)
        individualPet.isAdopted = true
        this.setState({
          pets: newPetArray
        })
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
              <Filters onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
               />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
