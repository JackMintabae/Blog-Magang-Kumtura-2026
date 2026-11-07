// Sound Manager: Hybrid Audio Engine (Physical WAV/MP3 Files + Web Audio API Synthesis Fallback)
class SoundManager {
  private isMuted: boolean = false;
  private ctx: AudioContext | null = null;
  private lastPopTime: number = 0;
  private lastChimeTime: number = 0;
  private activeChime: HTMLAudioElement | null = null;

  // Preloaded audio pools for physical files
  private popAudio: HTMLAudioElement | null = null;
  private typePool: HTMLAudioElement[] = [];
  private typePoolIdx: number = 0;
  private clickAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound-muted');
      this.isMuted = saved === 'true';

      // Preload audio elements
      try {
        this.popAudio = new Audio('/sounds/pop.wav');
        this.popAudio.preload = 'auto';
        this.popAudio.volume = 0.8;

        this.clickAudio = new Audio('/sounds/click.wav');
        this.clickAudio.preload = 'auto';
        this.clickAudio.volume = 0.6;

        for (let i = 0; i < 6; i++) {
          const typeAudio = new Audio('/sounds/type.wav');
          typeAudio.preload = 'auto';
          typeAudio.volume = 0.7;
          this.typePool.push(typeAudio);
        }
      } catch (e) {
        console.warn('Preload audio error:', e);
      }

      // Seamless User-Gesture Audio Unlocker across all interaction types
      const unlock = () => {
        const audioCtx = this.getAudioContext();
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }

        // Silent touch to prime HTML5 Audio elements
        if (this.clickAudio) {
          this.clickAudio.volume = 0.0001;
          this.clickAudio.play().then(() => {
            this.clickAudio?.pause();
            if (this.clickAudio) this.clickAudio.volume = 0.6;
          }).catch(() => {});
        }

        ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
          window.removeEventListener(evt, unlock);
        });
      };

      ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
        window.addEventListener(evt, unlock, { once: true, passive: true });
      });
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-muted', String(this.isMuted));
      window.dispatchEvent(new CustomEvent('sound-mute-changed', { detail: { isMuted: this.isMuted } }));
    }
    return this.isMuted;
  }

  // 1. Suara Bubble Pop (Avatar & Email Modal Pop-up)
  public playPop() {
    if (this.isMuted || typeof window === 'undefined') return;

    const now = Date.now();
    if (now - this.lastPopTime < 180) return;
    this.lastPopTime = now;

    // Coba putar file fisik pop.wav
    let played = false;
    try {
      if (this.popAudio) {
        this.popAudio.currentTime = 0;
        this.popAudio.play().then(() => {
          played = true;
        }).catch(() => {
          // Fallback synthesizer instan jika browser memblokir audio file
          this.synthPop();
        });
      } else {
        this.synthPop();
      }
    } catch {
      this.synthPop();
    }
  }

  // Web Audio Synth Fallback untuk Bubble Pop
  private synthPop() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(780, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.09);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    } catch {}
  }

  // 2. Suara Ketikan Keyboard Mekanikal (Typewriter Clack)
  public playTypingClick() {
    if (this.isMuted || typeof window === 'undefined') return;

    // Gunakan audio pool berputar agar suara tuts keyboard tidak tumpang tindih / macet
    try {
      if (this.typePool.length > 0) {
        const item = this.typePool[this.typePoolIdx];
        this.typePoolIdx = (this.typePoolIdx + 1) % this.typePool.length;
        item.currentTime = 0;
        item.play().catch(() => {
          this.synthTyping();
        });
      } else {
        this.synthTyping();
      }
    } catch {
      this.synthTyping();
    }
  }

  // Web Audio Synth Fallback untuk Ketikan Tuts Mekanikal
  private synthTyping() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      // Variasi pitch alami acak per ketukan (650Hz - 900Hz)
      const freq = 650 + Math.random() * 250;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.025);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch {}
  }

  // 3. Suara Chime (Hover kata "Bali")
  public playChime() {
    if (this.isMuted || typeof window === 'undefined') return;

    const now = Date.now();
    if (now - this.lastChimeTime < 700) return;
    this.lastChimeTime = now;

    try {
      if (!this.activeChime) {
        this.activeChime = new Audio('/sounds/chime.mp3');
        this.activeChime.volume = 0.7;
      } else {
        this.activeChime.pause();
        this.activeChime.currentTime = 0;
      }
      this.activeChime.play().catch(() => {
        this.synthChime();
      });
    } catch {
      this.synthChime();
    }
  }

  // Web Audio Synth Fallback untuk Chime
  private synthChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      const baseTime = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const t = baseTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.75);
      });
    } catch {}
  }

  // 4. Suara Klik Tombol
  public playClick() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      if (this.clickAudio) {
        this.clickAudio.currentTime = 0;
        this.clickAudio.play().catch(() => {});
      }
    } catch {}
  }

  // 5. Suara Soundboard
  public playSoundboard() {
    this.playPop();
  }

  // 6. Suara Not Nada Grid Hijau GitHub (Ascending Kalimba / Bell Glissando)
  public playGridNote(index: number) {
    if (this.isMuted || typeof window === 'undefined') return;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Skala Pentatonik Harmonis (G4 -> D7)
      const scale = [
        392.00,  // G4
        440.00,  // A4
        523.25,  // C5
        587.33,  // D5
        659.25,  // E5
        783.99,  // G5
        880.00,  // A5
        1046.50, // C6
        1174.66, // D6
        1318.51, // E6
        1567.98, // G6
        1760.00, // A6
        2093.00, // C7
        2349.32  // D7
      ];

      const freq = scale[index % scale.length] || 523.25;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Volume lembut dan renyah
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch {}
  }

  // 7. Suara Khusus LinkedIn (Harmonic Ping-Chime Chord yang Elegan)
  public playLinkedIn() {
    if (this.isMuted || typeof window === 'undefined') return;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      // 2 nada harmonis cerah bertingkat: F5 (698.46 Hz) & C6 (1046.50 Hz)
      const notes = [698.46, 1046.50];

      notes.forEach((freq, idx) => {
        const noteTime = t + idx * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.55);
      });
    } catch {}
  }
}

export const sound = new SoundManager();
