/**
 * Sacred Ambient Audio Engine using Web Audio API
 * Generates an ethereal, warm, meditative harmonic drone (Sa-Pa drone & acoustic resonance)
 * Zero external audio file download, 100% reliable, pristine 48kHz audio.
 */

class SacredAmbientEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.lfo = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    const t = this.ctx.currentTime;
    
    // Fundamental note: C#3 ~ 138.59 Hz (traditional meditative tonic)
    // Sacred harmonic series: Root (138.59), Fifth (207.65), Octave (277.18), Major Third (174.61)
    const freqs = [
      { f: 138.59, gain: 0.18, type: 'sine' },       // Root Sa
      { f: 207.65, gain: 0.12, type: 'triangle' },   // Fifth Pa
      { f: 277.18, gain: 0.08, type: 'sine' },       // Higher Sa
      { f: 174.61, gain: 0.07, type: 'sine' },       // Shuddha Ga
      { f: 69.30,  gain: 0.15, type: 'sine' }        // Deep Sub-Sa for warmth
    ];

    // Filter to warm up the sound (soft lowpass)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, t);
    filter.Q.setValueAtTime(2.0, t);

    // Subtle LFO to simulate breathing light/air
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, t); // Slow 12-second cycle
    lfoGain.gain.setValueAtTime(90, t);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.lfo = lfo;

    this.oscillators = freqs.map(({ f, gain, type }) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(f, t);

      // Micro-detuning for acoustic richness
      const detune = (Math.random() - 0.5) * 4;
      osc.detune.setValueAtTime(detune, t);

      oscGain.gain.setValueAtTime(gain, t);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(this.masterGain);

    // Gentle fade-in over 2.5 seconds
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(0, t);
    this.masterGain.gain.linearRampToValueAtTime(0.32, t + 2.5);

    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Gentle fade-out over 1.5 seconds
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.linearRampToValueAtTime(0, t + 1.5);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      if (this.lfo) {
        try { this.lfo.stop(); this.lfo.disconnect(); } catch (e) {}
      }
      this.oscillators = [];
      this.isPlaying = false;
    }, 1600);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  getEnergy() {
    if (!this.analyser || !this.isPlaying) return 0;
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];
    return sum / (data.length * 255);
  }
}

export const ambientAudio = new SacredAmbientEngine();
