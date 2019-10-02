import React, { useState, useEffect } from 'react';
import Summary from './Summary';

const Character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  // const shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.selectedChar}`)
      .then(res=>res.json()) 
      .then(charData => {
        console.log('[charData]', charData);
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          baseExperience: charData.base_experience,
          abilities: charData.abilities
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(()=> {
    fetchData();
    return ()=> {
      console.log('clean up');
    }
  }, [props.selectedChar]);

  let content = <p>Loading Character...</p>;
  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        height={loadedCharacter.height}
        baseExperience={loadedCharacter.baseExperience}
        abilities={loadedCharacter.abilities}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default Character;
