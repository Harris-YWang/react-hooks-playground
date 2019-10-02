import React, { Component } from 'react';

import Summary from './Summary';

class Character extends Component {
  state = { loadedCharacter: {}, isLoading: false };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return (
      nextProps.selectedChar !== this.props.selectedChar ||
      nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
      nextState.isLoading !== this.state.isLoading
    );
  }

  componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.selectedChar !== this.props.selectedChar) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        this.props.selectedChar
    );
    this.setState({ isLoading: true });
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.selectedChar}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: this.props.selectedChar,
          name: charData.name,
          height: charData.height,
          abilities: charData.abilities,
          baseExperience: charData.base_experience
        };
        this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    console.log('Too soon...');
  }

  render() {
    let content = <p>Loading Character...</p>;

    if (!this.state.isLoading && this.state.loadedCharacter.id) {
      content = (
        <Summary
          name={this.state.loadedCharacter.name}
          gender={this.state.loadedCharacter.gender}
          height={this.state.loadedCharacter.height}
          baseExperience={this.state.loadedCharacter.baseExperience}
          abilities={this.state.loadedCharacter.abilities}

        />
      );
    } else if (!this.state.isLoading && !this.state.loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }
}

export default Character;
