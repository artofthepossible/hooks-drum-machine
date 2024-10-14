import React, { useState, useEffect } from 'react';
import { useBufferResource } from './bufferResource'; // Correct import
import * as Tone from 'tone';
import Button from './Button.js'; // Correct import

const FX = ({ soundUrl, title }) => {
  const { data, error } = useBufferResource(soundUrl);
  const [player, setPlayer] = useState(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (data) {
      const newPlayer = new Tone.Player(data).toDestination();
      newPlayer.volume.value = -8;
      setPlayer(newPlayer);
    } else {
      console.error('Data is undefined');
    }
  }, [data]);

  const handlePlay = () => {
    if (player) {
      player.start();
    } else {
      console.error('Player is undefined');
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handlePlay}>Play</Button>
      {error && <p>Error loading sound</p>}
    </div>
  );
};

export default FX;