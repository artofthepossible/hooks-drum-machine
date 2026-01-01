# Ai Drummer 9000 🥁

A modern, browser-based drum machine and step sequencer built with React Hooks and Tone.js. Features an innovative natural language prompt system inspired by Suno AI that lets you describe beats in plain English and have them automatically generated.

## What It Does

Ai Drummer 9000 is a fully functional 16-step drum sequencer with:

- **7 Drum Tracks**: Kick, Sub Bass 1, Sub Bass 2, Snare, Clap, Hi-Hat, and Open Hi-Hat
- **16-Step Sequencer**: Create patterns with 16th-note resolution
- **Natural Language Beat Generation**: Describe beats in plain English (e.g., "fast trap beat with heavy 808 kicks")
- **BPM Control**: Adjustable tempo from 60-180 BPM
- **Double Hit Feature**: Add rapid-fire hits for more complex patterns
- **Real-Time Playback**: Powered by Tone.js Web Audio engine
- **4 FX Sound Buttons**: One-shot samples for live performance

## Features

### 🎹 Step Sequencer
- Click steps to toggle them on/off
- Shift+click for double hits (rapid-fire triggers)
- Visual playhead indicator shows current position
- Color-coded steps for easy navigation

### 🤖 Natural Language Prompts
Describe your beat and let AI Drummer generate it automatically:

```
"fast trap beat with heavy 808 kicks and rapid hi-hats"
"slow boom-bap with minimal drums and snappy snare"
"energetic techno four-on-the-floor at 135 bpm"
```

Supports 11+ musical styles: trap, boom-bap, house, techno, breakbeat, drum & bass, lo-fi, and more!

### 🎚️ Transport Controls
- Play/Stop button
- BPM selector (60-180)
- Real-time tempo synchronization

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Ai Drummer 9000                         │
│                   (DrumMachine Component)                   │
└─────────────────────────────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────┐      ┌────────────┐    ┌──────────────┐
    │Transport │      │PromptInput │    │StepSequencer │
    │          │      │            │    │              │
    │ • Logo   │      │ • TextArea │    │ • 7 Tracks   │
    │ • BPM    │      │ • Generate │    │ • 16 Steps   │
    │ • Play   │      │   Button   │    │ • Playhead   │
    └──────────┘      └────────────┘    └──────────────┘
                             │
                             ▼
                      ┌─────────────┐
                      │ beatParser  │
                      │             │
                      │ • Style     │
                      │ • Tempo     │
                      │ • Density   │
                      │ • Emphasis  │
                      └─────────────┘
                             │
                             ▼
                      ┌─────────────┐
                      │beatPresets  │
                      │             │
                      │ • 11 Styles │
                      │ • Patterns  │
                      │ • Variations│
                      └─────────────┘

┌────────────────────────────────────────────────────────────┐
│                    Audio Engine Layer                      │
│                                                            │
│  StepContext → Tone.Transport → Tone.Players → Speakers   │
│  (State)       (Scheduler)      (Audio)       (Output)    │
└────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
DrumMachine
├── Transport
│   ├── Logo
│   ├── BPM Selector (useBPM hook)
│   └── Play/Stop Button (useStart hook)
├── PromptInput
│   └── Generate Button → beatParser → beatPresets
├── StepSequencer
│   ├── StepIndicator (playhead)
│   └── Track[] (7 instruments)
│       ├── Track Label
│       └── Steps[] (16-step pattern)
│           └── Step (toggle button)
└── FX Buttons (4 one-shot samples)
```

### State Management

- **React Context API**: Global step state shared across all components
- **Refs**: Prevent stale closures in Tone.js scheduled callbacks
- **Custom Hooks**:
  - `useBPM()` - BPM state and UI control
  - `useStart()` - Play/stop state and button
  - `useBufferResource()` - Async audio sample loading

### Audio Architecture

```
User Input → StepContext → Tone.Transport.scheduleRepeat()
                              │
                              ▼
                    Check step value (0/1/2)
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                    ▼         ▼         ▼
                  [0]       [1]       [2]
                  Off     Normal   Double Hit
                          │         │
                          ▼         ▼
                   Tone.Player  3x Rapid Triggers
                          │         │
                          └────┬────┘
                               ▼
                         Tone.Destination
                               │
                               ▼
                          🔊 Speakers
```

## How to Use

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## User Guide

### Creating Beats Manually

1. **Click on steps** to activate/deactivate them (they'll light up when active)
2. **Shift+click** to create double hits (rapid-fire effect with flashing animation)
3. **Adjust BPM** using the number input (60-180)
4. **Press Play** to start the sequencer

### Creating Beats with Natural Language

1. **Type a description** in the "Describe Your Beat" text area
2. **Click "Generate Beat"** (or press Cmd/Ctrl + Enter)
3. **Watch the pattern populate** automatically
4. **Press Play** to hear your beat
5. **Manually adjust** any steps to fine-tune

### Example Prompts

**Trap:**
- `fast trap beat with heavy 808 kicks and rapid hi-hats`
- `slow trap with syncopated hi-hats`

**Hip-Hop:**
- `classic boom-bap with minimal drums`
- `old school hip hop at 90 bpm`

**Electronic:**
- `energetic techno four-on-the-floor`
- `minimal techno with sparse drums at 125 bpm`
- `fast house beat with dense drums`

**Other:**
- `chill lo-fi beat`
- `aggressive breakbeat with syncopated patterns`
- `fast drum and bass with rapid hi-hats at 170 bpm`

### Using FX Buttons

Click the FX buttons at the bottom to trigger one-shot samples:
- **Turn Up (F)** - Loop sample in F
- **SQUAD (Am)** - Loop sample in Am
- **Hey** - Vocal sample
- **Yeah** - Vocal sample

## Technology Stack

- **React 18.3.1** - UI framework with Hooks
- **Tone.js 15.0.4** - Web Audio API wrapper for synthesis and scheduling
- **Styled Components 6.1.13** - CSS-in-JS styling
- **React Scripts 5.0.1** - Build tooling and dev server

## Project Structure

```
hooks-drum-machine/
├── public/
│   ├── sounds/              # Audio samples (.wav)
│   └── index.html           # HTML template
├── src/
│   ├── DrumMachine.js       # Main app container
│   ├── PromptInput.js       # Natural language input UI
│   ├── beatParser.js        # NLP parsing engine
│   ├── beatPresets.js       # Preset pattern library
│   ├── StepSequencer.js     # Grid layout component
│   ├── Track.js             # Individual instrument row
│   ├── Steps.js             # Step pattern container
│   ├── Step.js              # Single step button
│   ├── Transport.js         # Layout wrapper for controls
│   ├── FX.js                # One-shot sample button
│   ├── useBPM.js            # BPM hook
│   ├── useStart.js          # Play/stop hook
│   ├── bufferResource.js    # Audio loading hook
│   ├── StepContext.js       # React Context for state
│   └── index.css            # Global styles
├── package.json             # Dependencies
└── README.md                # This file
```

## How It Works

### Step Sequencer Logic

The sequencer uses Tone.js's `Transport.scheduleRepeat()` to trigger sounds on every 16th note:

```javascript
Tone.Transport.scheduleRepeat(function(time) {
  // For each track, check the current step value
  if (stepValue === 1) {
    // Play sound once
    buffer.start(time);
  } else if (stepValue === 2) {
    // Play 3 rapid hits (double-time effect)
    buffer.start();
    buffer.start('+64n');
    buffer.start('+32n');
  }
  // Advance to next step
}, '16n');
```

### Natural Language Parser

The beat parser analyzes prompts to extract:

1. **Style/Genre** - Matches keywords to 11 preset patterns
2. **Tempo** - Detects explicit BPM or descriptive terms (fast/slow)
3. **Density** - Adjusts pattern sparseness (minimal/dense/heavy)
4. **Emphasis** - Highlights specific instruments with double hits

The parser then creates a variation of the base pattern by:
- Setting appropriate BPM
- Adding/removing hits based on density
- Converting normal hits to double hits for emphasized instruments

## Advanced Features

### Step Values

Each step can have one of three values:
- `0` - Off (no sound)
- `1` - Normal hit (plays once)
- `2` - Double hit (plays 3 times with rhythmic offsets)

### Preset Patterns

11 built-in beat styles with authentic patterns:
- Trap (standard + rapid variant)
- Boom-bap
- Four-on-the-floor
- House
- Techno
- Breakbeat
- Minimal
- Drum and Bass
- Lo-fi
- Aggressive

## Documentation

See [NATURAL_LANGUAGE_BEATS.md](NATURAL_LANGUAGE_BEATS.md) for complete documentation on the natural language prompt system, including:
- Detailed prompt syntax
- All supported keywords and modifiers
- Technical implementation details
- Future enhancement ideas

## Performance Notes

- Uses refs to prevent stale closures in audio callbacks
- Memoization for optimal re-render performance
- Web Audio API provides low-latency, sample-accurate timing
- All audio processing runs on a separate audio thread

## Browser Compatibility

Works in all modern browsers that support:
- Web Audio API
- ES6+ JavaScript
- React 18

Tested on Chrome, Firefox, Safari, and Edge.

## License

MIT

## Credits

Built with React Hooks and Tone.js. Natural language prompt system inspired by [Suno AI](https://suno.com/)'s innovative approach to democratizing music creation.

---

**How to skrrt:**
- Run `npm start`
- Be dope 🎵
