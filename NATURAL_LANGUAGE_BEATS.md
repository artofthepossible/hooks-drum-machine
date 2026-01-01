# Natural Language Beat Prompt System

## Overview

The Trap Lord 9000 drum machine now features a Suno-inspired natural language prompt system that allows you to describe beats in plain English and have them automatically generated on the step sequencer.

## How to Use

### Basic Usage

1. Look for the **"Describe Your Beat"** input box at the top of the drum machine
2. Type a description of the beat you want to create
3. Click the **"Generate Beat"** button (or press Cmd/Ctrl + Enter)
4. The beat pattern and BPM will be automatically set based on your description

### Example Prompts

Try these example prompts to get started:

**Trap Beats:**
- `fast trap beat with heavy 808 kicks and rapid hi-hats`
- `slow trap with syncopated hi-hats`
- `aggressive trap at 150 bpm`

**Hip-Hop:**
- `classic boom-bap with minimal drums and snappy snare`
- `old school hip hop beat`
- `slow boom-bap at 85 bpm`

**Electronic:**
- `energetic techno four-on-the-floor`
- `fast house beat with dense drums`
- `minimal techno with sparse drums`
- `driving techno at 135 bpm`

**Other Styles:**
- `chill lo-fi beat with sparse drums`
- `aggressive breakbeat with syncopated patterns`
- `fast drum and bass with rapid hi-hats`

## How It Works

The system analyzes your prompt and extracts the following information:

### 1. Musical Style/Genre

Recognized styles include:
- **Trap** - Heavy 808s, rapid hi-hats, Atlanta-style
- **Boom-bap** - Classic hip-hop groove
- **House** - Four-on-the-floor dance beat
- **Techno** - Driving, repetitive electronic
- **Four-on-the-floor** - Steady kick pattern
- **Breakbeat** - Syncopated, energetic
- **Minimal** - Sparse, minimalist techno
- **Drum and Bass (DNB)** - Fast, complex patterns
- **Lo-fi** - Chill, relaxed beats
- **Aggressive** - Heavy, intense patterns

### 2. Tempo/BPM

You can specify tempo in two ways:

**Explicit BPM:**
- `at 140 bpm`
- `120 bpm trap beat`

**Tempo Descriptors:**
- `very slow` / `super slow` - Significantly slower
- `slow` / `downtempo` - Below average tempo
- `moderate` / `medium` - Average tempo for style
- `fast` / `uptempo` / `energetic` - Above average
- `very fast` / `super fast` / `rapid` - Significantly faster

Each style has appropriate default tempos that adjust based on descriptors:
- Trap: 120-180 BPM
- House: 115-145 BPM
- Techno: 120-155 BPM
- Boom-bap: 65-130 BPM
- Lo-fi: 60-115 BPM

### 3. Density

Control how sparse or dense the drum pattern is:

- `very sparse` / `super minimal` - 50% density
- `sparse` / `minimal` / `simple` - 70% density
- (default) - 100% density
- `dense` / `heavy` / `busy` - 130% density
- `very dense` / `super heavy` / `packed` - 150% density

### 4. Instrument Emphasis

Emphasize specific drums (uses double hits):

- `kick heavy` / `heavy kick` / `808` / `bass heavy` - Emphasizes kicks and bass
- `hi-hat heavy` / `rapid hi-hat` / `fast hi-hat` / `triple hat` - Emphasizes hi-hats
- `snare heavy` / `snappy snare` / `crisp snare` - Emphasizes snare
- `clap heavy` / `hand clap` - Emphasizes claps

## Advanced Prompting

### Combining Multiple Elements

You can combine multiple descriptors in a single prompt:

```
fast trap beat at 160 bpm with heavy 808 kicks and rapid hi-hats
```

This prompt specifies:
- Style: Trap
- Tempo: 160 BPM (explicit)
- Emphasis: Kicks/bass and hi-hats

```
slow minimal techno with sparse drums
```

This prompt specifies:
- Style: Minimal techno
- Tempo: Slow
- Density: Sparse

### Tips for Better Results

1. **Be specific** - Instead of "make a beat", try "fast trap beat with heavy kicks"
2. **Combine descriptors** - Mix style, tempo, and emphasis for unique patterns
3. **Experiment** - Try different combinations to discover new patterns
4. **Use musical terminology** - The parser understands terms like "syncopated", "four-on-the-floor", "808", etc.

## Available Instruments

The drum machine has 7 tracks:

1. **Kick** - Main kick drum
2. **Sub1** - Bass/sub-bass 1
3. **Sub2** - Bass/sub-bass 2
4. **Snare** - Snare drum
5. **Clap** - Hand clap
6. **HiHat** - Closed hi-hat
7. **OpenHiHat** - Open hi-hat

## Technical Details

### Preset Patterns

The system includes 11 preset beat patterns:
- `trap` - Standard trap beat (140 BPM)
- `trapRapid` - Trap with double-time hi-hats (145 BPM)
- `boomBap` - Hip-hop groove (90 BPM)
- `fourOnFloor` - House/techno kick (125 BPM)
- `house` - Classic house (128 BPM)
- `techno` - Driving techno (135 BPM)
- `breakbeat` - Syncopated breaks (135 BPM)
- `minimal` - Minimal techno (125 BPM)
- `dnb` - Drum and bass (170 BPM)
- `lofi` - Chill lo-fi (85 BPM)
- `aggressive` - Heavy, intense (150 BPM)

### Pattern Variations

The parser creates variations by:
- Adjusting BPM based on tempo descriptors
- Adding/removing hits based on density modifiers
- Converting normal hits to double hits for emphasized instruments

### Step Values

- `0` - Off (no sound)
- `1` - Normal hit (plays once)
- `2` - Double hit (plays 3 times with rhythmic offsets)

## Inspiration: Suno AI

This feature was inspired by Suno AI's music generation interface, which emphasizes:
- **Text prompts as the primary interface** - Natural language is the main way to create
- **Focus on specific details** - Genre, mood, instrumentation, and structure
- **Accessible design** - Anyone can create music regardless of technical knowledge
- **Quick generation** - Fast results with immediate playback

## Future Enhancements

Potential improvements for future versions:
- AI-powered prompt parsing using language models
- More preset patterns and variations
- User-saveable custom patterns
- Prompt history and favorites
- Randomization and mutation features
- Integration with external AI services for true generative beats

## Source Files

The natural language prompt system consists of:

- `src/PromptInput.js` - UI component for text input
- `src/beatParser.js` - Natural language parsing logic
- `src/beatPresets.js` - Preset beat patterns library
- `src/DrumMachine.js` - Integration with main app (modified)
- `src/useBPM.js` - BPM control hook (modified)

## Credits

Built for the Trap Lord 9000 drum machine, inspired by Suno AI's innovative approach to democratizing music creation through natural language interfaces.
