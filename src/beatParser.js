import { beatPresets, createVariation } from './beatPresets';

// Natural language beat parser
export const parseBeatPrompt = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();

  // Extract style/genre
  const style = detectStyle(lowerPrompt);

  // Extract tempo/BPM
  const bpm = detectBPM(lowerPrompt, style);

  // Extract density
  const density = detectDensity(lowerPrompt);

  // Extract emphasized instruments
  const emphasize = detectEmphasis(lowerPrompt);

  // Get base pattern from detected style
  let basePattern = beatPresets[style] || beatPresets.trap;

  // Create variation based on modifiers
  const modifications = {
    bpm: bpm || basePattern.bpm,
    density,
    emphasize,
  };

  const finalPattern = createVariation(basePattern, modifications);

  return {
    bpm: finalPattern.bpm,
    pattern: finalPattern.pattern,
    detectedStyle: style,
    detectedModifiers: {
      density,
      emphasize,
      tempoDescriptor: getTempoDescriptor(lowerPrompt),
    },
  };
};

// Detect musical style/genre from prompt
const detectStyle = (prompt) => {
  const styleKeywords = {
    trap: ['trap', '808', 'triplet', 'atlanta'],
    trapRapid: ['rapid trap', 'fast trap', 'double time trap', 'triple hat'],
    boomBap: ['boom bap', 'boom-bap', 'boombap', 'hip hop', 'hip-hop', 'old school'],
    fourOnFloor: ['four on the floor', '4 on the floor', 'four-on-the-floor'],
    house: ['house', 'deep house', 'progressive house', 'tech house'],
    techno: ['techno', 'detroit', 'industrial techno', 'driving'],
    breakbeat: ['breakbeat', 'break beat', 'breaks', 'syncopated'],
    minimal: ['minimal', 'minimalist', 'sparse', 'simple', 'stripped'],
    dnb: ['drum and bass', 'dnb', 'd&b', 'jungle', 'neurofunk'],
    lofi: ['lo-fi', 'lofi', 'lo fi', 'chill', 'relaxed', 'laid back'],
    aggressive: ['aggressive', 'heavy', 'hard', 'intense', 'brutal'],
  };

  // Check for style keywords
  for (const [style, keywords] of Object.entries(styleKeywords)) {
    for (const keyword of keywords) {
      if (prompt.includes(keyword)) {
        return style;
      }
    }
  }

  // Default to trap if no style detected
  return 'trap';
};

// Detect BPM from tempo descriptors or explicit numbers
const detectBPM = (prompt, detectedStyle) => {
  // Check for explicit BPM numbers
  const bpmMatch = prompt.match(/(\d{2,3})\s*bpm/);
  if (bpmMatch) {
    const bpm = parseInt(bpmMatch[1]);
    if (bpm >= 60 && bpm <= 200) {
      return bpm;
    }
  }

  // Check for tempo descriptors
  const tempoKeywords = {
    slow: { trap: 120, house: 115, techno: 120, boomBap: 75, lofi: 70 },
    moderate: { trap: 140, house: 125, techno: 130, boomBap: 90, lofi: 85 },
    fast: { trap: 160, house: 135, techno: 145, boomBap: 110, lofi: 100 },
    verySlow: { trap: 100, house: 110, techno: 115, boomBap: 65, lofi: 60 },
    veryFast: { trap: 180, house: 145, techno: 155, boomBap: 130, lofi: 115 },
  };

  if (prompt.includes('very slow') || prompt.includes('super slow')) {
    return tempoKeywords.verySlow[detectedStyle] || 80;
  }
  if (prompt.includes('very fast') || prompt.includes('super fast') || prompt.includes('rapid')) {
    return tempoKeywords.veryFast[detectedStyle] || 160;
  }
  if (prompt.includes('slow') || prompt.includes('downtempo')) {
    return tempoKeywords.slow[detectedStyle] || 90;
  }
  if (prompt.includes('fast') || prompt.includes('uptempo') || prompt.includes('energetic')) {
    return tempoKeywords.fast[detectedStyle] || 140;
  }
  if (prompt.includes('moderate') || prompt.includes('medium')) {
    return tempoKeywords.moderate[detectedStyle] || 120;
  }

  // Return null to use default from style
  return null;
};

// Detect density modifier
const detectDensity = (prompt) => {
  if (prompt.includes('very sparse') || prompt.includes('super minimal')) {
    return 0.5;
  }
  if (prompt.includes('sparse') || prompt.includes('minimal') || prompt.includes('simple')) {
    return 0.7;
  }
  if (prompt.includes('very dense') || prompt.includes('super heavy') || prompt.includes('packed')) {
    return 1.5;
  }
  if (prompt.includes('dense') || prompt.includes('heavy') || prompt.includes('busy')) {
    return 1.3;
  }

  return 1.0; // Normal density
};

// Detect which instruments to emphasize
const detectEmphasis = (prompt) => {
  const emphasized = [];

  // Kick emphasis
  if (prompt.includes('kick heavy') ||
      prompt.includes('heavy kick') ||
      prompt.includes('808') ||
      prompt.includes('bass heavy')) {
    emphasized.push('Kick', 'Sub1', 'Sub2');
  }

  // Hi-hat emphasis
  if (prompt.includes('hi-hat heavy') ||
      prompt.includes('hihat heavy') ||
      prompt.includes('rapid hi-hat') ||
      prompt.includes('fast hi-hat') ||
      prompt.includes('triple hat')) {
    emphasized.push('HiHat');
  }

  // Snare emphasis
  if (prompt.includes('snare heavy') ||
      prompt.includes('snappy snare') ||
      prompt.includes('crisp snare')) {
    emphasized.push('Snare');
  }

  // Clap emphasis
  if (prompt.includes('clap heavy') ||
      prompt.includes('hand clap')) {
    emphasized.push('Clap');
  }

  return emphasized;
};

// Get tempo descriptor for display
const getTempoDescriptor = (prompt) => {
  if (prompt.includes('very slow') || prompt.includes('super slow')) {
    return 'very slow';
  }
  if (prompt.includes('very fast') || prompt.includes('super fast') || prompt.includes('rapid')) {
    return 'very fast';
  }
  if (prompt.includes('slow') || prompt.includes('downtempo')) {
    return 'slow';
  }
  if (prompt.includes('fast') || prompt.includes('uptempo') || prompt.includes('energetic')) {
    return 'fast';
  }
  if (prompt.includes('moderate') || prompt.includes('medium')) {
    return 'moderate';
  }
  return 'default';
};

// Generate a human-readable description of what was parsed
export const generateDescription = (parseResult) => {
  const { detectedStyle, detectedModifiers, bpm } = parseResult;

  let description = `Generated a ${detectedStyle} beat`;

  if (detectedModifiers.tempoDescriptor !== 'default') {
    description += ` at ${detectedModifiers.tempoDescriptor} tempo`;
  }

  description += ` (${bpm} BPM)`;

  if (detectedModifiers.density !== 1.0) {
    if (detectedModifiers.density < 1.0) {
      description += ` with sparse drums`;
    } else {
      description += ` with dense drums`;
    }
  }

  if (detectedModifiers.emphasize.length > 0) {
    description += ` emphasizing ${detectedModifiers.emphasize.join(', ')}`;
  }

  return description;
};
