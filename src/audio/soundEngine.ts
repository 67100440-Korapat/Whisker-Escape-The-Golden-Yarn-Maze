/**
 * Synthesized Web Audio Sound Engine for Whisker Escape
 * Zero external audio file dependencies. Works across all modern browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private bgmInterval: number | null = null;
  private bgmGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
    const savedMute = localStorage.getItem('whisker_sound_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
    const savedMusicMute = localStorage.getItem('whisker_music_muted');
    if (savedMusicMute !== null) {
      this.isMusicMuted = savedMusicMute === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('whisker_sound_muted', String(this.isMuted));
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicMuted = !this.isMusicMuted;
    localStorage.setItem('whisker_music_muted', String(this.isMusicMuted));
    if (this.isMusicMuted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isMusicMuted;
  }

  public getIsMusicMuted(): boolean {
    return this.isMusicMuted;
  }

  /**
   * Cat Meow sound synthesis
   */
  public playMeow(pitchOffset: number = 0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 480 + pitchOffset * 50 + (Math.random() * 30 - 15);

    // Cute pitch contour: rises then falls
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.35, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, t + 0.45);

    // Formant filter for vocal "meee-ow" sound
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.linearRampToValueAtTime(800, t + 0.4);
    filter.Q.setValueAtTime(3.0, t);

    // Amplitude envelope
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(t);
    osc.stop(t + 0.46);
  }

  /**
   * Cat Purr sound synthesis
   */
  public playPurr() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const carrier = this.ctx.createOscillator();
    const mod = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(65, t);

    mod.type = 'sawtooth';
    mod.frequency.setValueAtTime(24, t); // purr cycle rate ~24Hz

    modGain.gain.setValueAtTime(25, t);
    mod.connect(carrier.frequency);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    carrier.connect(gain);
    gain.connect(this.masterGainNode);

    mod.start(t);
    carrier.start(t);
    mod.stop(t + 0.8);
    carrier.stop(t + 0.8);
  }

  /**
   * Sparkling Golden Yarn pickup sound
   */
  public playYarnPickup(index: number = 0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    // Pentatonic scale arpeggio notes
    const baseFreqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    const rootIndex = index % 3;
    const notes = [
      baseFreqs[rootIndex],
      baseFreqs[rootIndex + 1],
      baseFreqs[rootIndex + 2],
      baseFreqs[rootIndex + 3],
    ];

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGainNode) return;
      const noteTime = t + i * 0.055;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(noteTime);
      osc.stop(noteTime + 0.36);
    });

    // Add gentle shimmer harmonics
    const shimmer = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(2093, t + 0.12);
    shimmerGain.gain.setValueAtTime(0.001, t + 0.12);
    shimmerGain.gain.linearRampToValueAtTime(0.12, t + 0.14);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(this.masterGainNode);
    shimmer.start(t + 0.12);
    shimmer.stop(t + 0.46);
  }

  /**
   * Exit door unlocked fanfare
   */
  public playDoorUnlock() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;

    // Brass-like triumphant chord (F, A, C, E)
    const chord = [349.23, 440.0, 523.25, 659.25, 880.0];
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);

      gain.gain.setValueAtTime(0.001, t + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.18, t + idx * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(t + idx * 0.04);
      osc.stop(t + 0.95);
    });

    // Golden lock click
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(1200, t + 0.25);
    click.frequency.exponentialRampToValueAtTime(200, t + 0.3);
    clickGain.gain.setValueAtTime(0.2, t + 0.25);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    click.connect(clickGain);
    clickGain.connect(this.masterGainNode);
    click.start(t + 0.25);
    click.stop(t + 0.33);
  }

  /**
   * Cat footstep (pitter-patter)
   */
  public playStep() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const pitch = 140 + Math.random() * 30;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.04);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  /**
   * Bump wall
   */
  public playBump() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  /**
   * Door locked sound (puzzled mumble)
   */
  public playDoorLocked() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.setValueAtTime(180, t + 0.12);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  /**
   * Level cleared victory fanfare
   */
  public playVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const melody = [
      { note: 523.25, time: 0.0, dur: 0.12 }, // C5
      { note: 659.25, time: 0.12, dur: 0.12 }, // E5
      { note: 783.99, time: 0.24, dur: 0.12 }, // G5
      { note: 1046.5, time: 0.36, dur: 0.35 }, // C6
      { note: 880.0, time: 0.72, dur: 0.12 }, // A5
      { note: 1046.5, time: 0.86, dur: 0.5 }, // C6
    ];

    melody.forEach((m) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(m.note, t + m.time);

      gain.gain.setValueAtTime(0.001, t + m.time);
      gain.gain.linearRampToValueAtTime(0.25, t + m.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + m.time + m.dur);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(t + m.time);
      osc.stop(t + m.time + m.dur + 0.05);
    });
  }

  /**
   * UI Click
   */
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGainNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  /**
   * Cozy Lo-Fi ambient background music loop
   */
  public startBgm() {
    if (this.isMusicMuted || this.bgmInterval !== null) return;
    this.initCtx();
    if (!this.ctx) return;

    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C maj
      [220.0, 261.63, 329.63, 440.0],  // A min
      [174.61, 220.0, 261.63, 349.23], // F maj
      [196.0, 246.94, 293.66, 392.0],  // G maj
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (this.isMusicMuted || !this.ctx || !this.masterGainNode) return;
      const t = this.ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGainNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.15);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);

        gain.gain.setValueAtTime(0.0001, t + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.025, t + idx * 0.15 + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGainNode);

        osc.start(t + idx * 0.15);
        osc.stop(t + 2.9);
      });
    };

    playNextChord();
    this.bgmInterval = window.setInterval(playNextChord, 2800);
  }

  public stopBgm() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sounds = new SoundEngine();
