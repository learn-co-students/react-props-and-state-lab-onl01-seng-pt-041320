import React from 'react'

class Pet extends React.Component {

  gender = () => {
    if(this.props.pet.gender === 'male'){
      return '♂'
    } else {
      return '♀'
    }
  }

  handleClick = (event) => {
    this.props.onAdoptPet(this.props.pet.id);
  }
  
  render() {
    if(this.props.pet.isAdopted){
          return (
          <div className="card">
            <div className="content">
              <a className="header">
                {/*'♀' OR '♂' */}
                Pet Name:{this.props.pet.name}
              </a>
              <div className="meta">
                <span className="date">Pet Type:{this.props.pet.type}</span>
              </div>
              <div className="description">
                <p>Age: {this.props.pet.age}</p>
                <p>Weight: {this.props.pet.weight}</p>
                <p>Gender: {this.gender()}</p>
              </div>
            </div>
            <div className="extra content">
              <button className="ui disabled button">Already adopted</button>
            </div>
          </div>
        )
    } else {
      return (
        <div className="card">
          <div className="content">
            <a className="header">
              {/*'♀' OR '♂' */}
              Pet Name:{this.props.pet.name}
            </a>
            <div className="meta">
              <span className="date">Pet Type:{this.props.pet.type}</span>
            </div>
            <div className="description">
              <p>Age: {this.props.pet.age}</p>
              <p>Weight: {this.props.pet.weight}</p>
              <p>Gender: {this.gender()}</p>
            </div>
          </div>
          <div className="extra content">
            <button className="ui primary button" onClick={this.handleClick}>Adopt pet</button>
          </div>
        </div>
      )
    }
  }
}

export default Pet
