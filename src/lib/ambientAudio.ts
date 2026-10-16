/**
 * Ambiente generado con Web Audio, sin archivos: viento grave (ruido marrón con un paso bajo que
 * respira) y chasquidos de brasas. Los buffers se generan una vez y suenan en bucle; no hay timers.
 * Para usar una pista propia, sustituye las fuentes por un MediaElementAudioSourceNode.
 */

/** Volumen final del ambiente (0–1). */
const VOLUME = 0.35
const FADE_SECONDS = 1.2

function brownNoise(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

function crackles(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  const pops = seconds * 9
  for (let p = 0; p < pops; p++) {
    const start = Math.floor(Math.random() * data.length)
    const length = Math.floor(ctx.sampleRate * (0.002 + Math.random() * 0.012))
    const gain = 0.2 + Math.random() * 0.8
    for (let i = 0; i < length && start + i < data.length; i++) {
      data[start + i] += (Math.random() * 2 - 1) * gain * Math.exp((-6 * i) / length)
    }
  }
  return buffer
}

export interface AmbientAudio {
  /** Sube o baja el volumen con un fundido; al apagar, suspende el contexto cuando termina. */
  setEnabled(enabled: boolean): void
  /** Pausa sin fundido (pestaña oculta) o reanuda si estaba encendido. */
  setPaused(paused: boolean): void
  dispose(): void
}

/** Debe llamarse dentro del gesto del usuario (clic): los navegadores bloquean el audio sin él. */
export function createAmbientAudio(): AmbientAudio {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const wind = ctx.createBufferSource()
  wind.buffer = brownNoise(ctx, 8)
  wind.loop = true
  const windFilter = ctx.createBiquadFilter()
  windFilter.type = 'lowpass'
  windFilter.frequency.value = 380
  const windGain = ctx.createGain()
  windGain.gain.value = 0.7
  // Una LFO muy lenta abre y cierra el filtro: ráfagas de viento.
  const gust = ctx.createOscillator()
  gust.frequency.value = 0.08
  const gustDepth = ctx.createGain()
  gustDepth.gain.value = 160
  gust.connect(gustDepth).connect(windFilter.frequency)
  wind.connect(windFilter).connect(windGain).connect(master)

  const embers = ctx.createBufferSource()
  embers.buffer = crackles(ctx, 7)
  embers.loop = true
  const embersFilter = ctx.createBiquadFilter()
  embersFilter.type = 'highpass'
  embersFilter.frequency.value = 900
  const embersGain = ctx.createGain()
  embersGain.gain.value = 0.18
  embers.connect(embersFilter).connect(embersGain).connect(master)

  wind.start()
  embers.start()
  gust.start()

  let enabled = false
  let suspendTimer: number | undefined

  return {
    setEnabled(next) {
      enabled = next
      window.clearTimeout(suspendTimer)
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      if (next) {
        void ctx.resume()
        master.gain.linearRampToValueAtTime(VOLUME, now + FADE_SECONDS)
      } else {
        master.gain.linearRampToValueAtTime(0, now + FADE_SECONDS / 2)
        suspendTimer = window.setTimeout(() => void ctx.suspend(), (FADE_SECONDS / 2) * 1000 + 50)
      }
    },
    setPaused(paused) {
      if (paused) void ctx.suspend()
      else if (enabled) void ctx.resume()
    },
    dispose() {
      window.clearTimeout(suspendTimer)
      void ctx.close()
    },
  }
}
