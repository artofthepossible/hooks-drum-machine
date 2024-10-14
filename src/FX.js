// src/FX.js
import React, { useState, useEffect } from 'react';
import { useBufferResource } from './bufferResource';
import * as Tone from 'tone';
import Button from './Button.js';

const FX = ({ soundUrl, title }) => {
  const { data, error } = useBufferResource(soundUrl);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (data) {
      try {
        const newPlayer = new Tone.Player(data).toDestination();
        newPlayer.volume.value = -8;
        setPlayer(newPlayer);
      } catch (e) {
        console.error('Error initializing player:', e);
      }
    } else {
      console.error('Data is undefined');
    }
  }, [data]);

  const handlePlay = () => {
    try {
      if (player) {
        player.start();
      } else {
        console.error('Player is undefined');
      }
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <Button onMouseDown={handlePlay}>Play</Button>
      {error && <p>Error loading sound</p>}
    </div>
  );
};

export default FX;