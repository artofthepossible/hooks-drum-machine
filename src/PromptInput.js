import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  border-radius: 12px;
  border: 1px solid rgba(37, 204, 247, 0.2);
`;

const Title = styled.h3`
  color: #25CCF7;
  font-size: 16px;
  margin: 0 0 12px 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: #0a0a0a;
  border: 1px solid rgba(37, 204, 247, 0.3);
  border-radius: 8px;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #25CCF7;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const GenerateButton = styled.button`
  margin-top: 12px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #25CCF7 0%, #1a9dc7 100%);
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 204, 247, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 204, 247, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ExampleText = styled.p`
  margin: 8px 0 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

const PromptInput = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <Container>
      <Title>🎵 Describe Your Beat</Title>
      <TextArea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Describe your beat in natural language... Try: 'fast trap beat with heavy 808 kicks and rapid hi-hats' or 'slow boom-bap with minimal drums and snappy snare'"
      />
      <GenerateButton
        onClick={handleGenerate}
        disabled={!prompt.trim()}
      >
        Generate Beat
      </GenerateButton>
      <ExampleText>
        Examples: "energetic techno four-on-the-floor" • "chill lo-fi beat with sparse drums" • "aggressive trap with syncopated hi-hats"
      </ExampleText>
    </Container>
  );
};

export default PromptInput;
