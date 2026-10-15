import { Mesh, Points, Texture, type Material, type Object3D } from 'three'

function disposeMaterial(material: Material) {
  for (const value of Object.values(material)) {
    if (!(value instanceof Texture)) continue
    value.dispose()
    // GLTFLoader decodifica las texturas como ImageBitmap; close() libera la memoria de CPU al momento.
    if (value.image instanceof ImageBitmap) value.image.close()
  }
  material.dispose()
}

/** Libera geometrías, materiales y texturas de un grafo que three.js no gestiona por sí solo (p. ej. un GLTF). */
export function disposeObject(root: Object3D) {
  root.traverse((object) => {
    if (!(object instanceof Mesh || object instanceof Points)) return
    object.geometry.dispose()
    const materials: Material[] = Array.isArray(object.material) ? object.material : [object.material]
    materials.forEach(disposeMaterial)
  })
}
