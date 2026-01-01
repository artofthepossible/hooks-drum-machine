import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';

import Steps from './Steps';
import { useBufferResource } from './bufferResource';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Info = styled.div`
  flex: 0 0 155px;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
`;

const Name = styled.h2`
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
`;

export default function Track({ sampleUrl, name, setBuffers }) {
  const { buffer, error } = useBufferResource(sampleUrl);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (buffer) {
      try {
        const newPlayer = new Tone.Player(buffer).toDestination();
        setPlayer(newPlayer);
      } catch (e) {
        console.error('Error initializing player:', e);
      }
    }
  }, [buffer]);

  useEffect(() => {
    if (player) {
      setBuffers(buffers => ({
        ...buffers,
        [name]: player,
      }));
    }
  }, [player, name, setBuffers]);

  return (
    <Wrapper>
      <Info>
        <Name>{name}</Name>
      </Info>
      <Steps name={name} />
    </Wrapper>
  );
}
