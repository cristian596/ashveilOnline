// Comprueba que los colores de src/components/three/palette.ts (copia para three.js) coinciden con
// los tokens --color-* de @theme en src/index.css. Convención: la clave `ember300` es `--color-ember-300`.
// Sale con código 1 si alguno difiere o no existe.
import { readFileSync } from 'node:fs'

const CSS_PATH = 'src/index.css'
const SITE_PATH = 'src/config/site.ts'
const PALETTE_PATH = 'src/components/three/palette.ts'

const css = readFileSync(CSS_PATH, 'utf8')
const palette = readFileSync(PALETTE_PATH, 'utf8')

const themeColors = new Map()
for (const [, name, value] of css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  themeColors.set(name, value.toLowerCase())
}

const toTokenName = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase()

const entries = [...palette.matchAll(/^\s*(\w+):\s*'(#[0-9a-fA-F]{3,8})'/gm)]
const errors = []

// meta.themeColor (barra del navegador) debe ser el color de fondo de la marca.
const themeColor = readFileSync(SITE_PATH, 'utf8').match(/themeColor:\s*'(#[0-9a-fA-F]{3,8})'/)?.[1]
const canvas = themeColors.get('canvas')
if (themeColor === undefined) errors.push(`No se encontró meta.themeColor en ${SITE_PATH}.`)
else if (themeColor.toLowerCase() !== canvas)
  errors.push(`meta.themeColor es ${themeColor} pero --color-canvas vale ${canvas}.`)

if (entries.length === 0) errors.push(`No se encontró ningún color en ${PALETTE_PATH}.`)

for (const [, key, value] of entries) {
  const token = toTokenName(key)
  const expected = themeColors.get(token)
  if (expected === undefined) {
    errors.push(`${key}: no existe --color-${token} en ${CSS_PATH}.`)
  } else if (expected !== value.toLowerCase()) {
    errors.push(`${key}: palette.ts tiene ${value} pero --color-${token} vale ${expected}.`)
  }
}

if (errors.length > 0) {
  console.error(`Los tokens de color no coinciden:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`Tokens de color sincronizados (${entries.length} colores comprobados).`)
