// Config para `gltf-transform --config`. Reemplaza la lista de extensiones que la CLI registra:
// las que no estén aquí se descartan al leer el modelo (la CLI avisa "Missing optional extension").
// - FB_ngon_encoding: la CLI no la implementa, así que se descarta siempre.
// - KHR_materials_volume: la CLI sí la implementa; la excluimos a mano. El material es OPAQUE y sin
//   transmission, así que volume no tenía efecto visual.
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'

const DROPPED = new Set(['KHR_materials_volume', 'FB_ngon_encoding'])

export default {
  extensions: ALL_EXTENSIONS.filter((extension) => !DROPPED.has(extension.EXTENSION_NAME)),
}
