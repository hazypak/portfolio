/**
 * Synthesized UI sounds (Web Audio, no audio files). The theme switch is a
 * resonant sawtooth sweep — rising into light, falling into dark — with a
 * servo-like noise click at the start and a digital blip as it lands.
 */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function envelope(
  param: AudioParam,
  t: number,
  peak: number,
  attack: number,
  release: number
) {
  param.setValueAtTime(0.0001, t);
  param.exponentialRampToValueAtTime(peak, t + attack);
  param.exponentialRampToValueAtTime(0.0001, t + attack + release);
}

export function playThemeSwitch(toLight: boolean) {
  try {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime + 0.005;

    const master = ac.createGain();
    envelope(master.gain, t, 0.12, 0.008, 0.34);
    master.connect(ac.destination);

    // Resonant sweep.
    const [from, to] = toLight ? [180, 1600] : [1600, 140];
    const sweep = ac.createOscillator();
    sweep.type = "sawtooth";
    sweep.frequency.setValueAtTime(from, t);
    sweep.frequency.exponentialRampToValueAtTime(to, t + 0.22);
    const band = ac.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 9;
    band.frequency.setValueAtTime(from * 2, t);
    band.frequency.exponentialRampToValueAtTime(to * 2, t + 0.22);
    sweep.connect(band).connect(master);

    // Servo click: a short burst of high-passed noise.
    const len = Math.floor(ac.sampleRate * 0.045);
    const buffer = ac.createBuffer(1, len, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++)
      data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const noise = ac.createBufferSource();
    noise.buffer = buffer;
    const high = ac.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 2800;
    const noiseGain = ac.createGain();
    noiseGain.gain.value = 0.6;
    noise.connect(high).connect(noiseGain).connect(master);

    // Landing blip.
    const blip = ac.createOscillator();
    blip.type = "square";
    blip.frequency.setValueAtTime(toLight ? 2093 : 1046, t + 0.18);
    const blipGain = ac.createGain();
    envelope(blipGain.gain, t + 0.18, 0.28, 0.006, 0.09);
    blip.connect(blipGain).connect(master);

    sweep.start(t);
    sweep.stop(t + 0.3);
    noise.start(t);
    blip.start(t + 0.18);
    blip.stop(t + 0.3);
  } catch {
    // Sound is decoration; never let it break the toggle.
  }
}
