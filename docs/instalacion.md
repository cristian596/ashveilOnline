# Instalación

## Requisitos

- **Node.js** 20.19 o superior (o 22.12 o superior). Recomendado: la versión LTS actual. Descarga: <https://nodejs.org>.
- **npm** 10 o superior (viene con Node).
- Un navegador con WebGL para ver la escena 3D.

Comprueba las versiones:

```bash
node -v
npm -v
```

## Instalar

Descomprime el `.zip` en una carpeta y, dentro de ella:

```bash
npm install
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente (<http://localhost:5173>). |
| `npm run build` | Comprueba tipos y genera el sitio de producción en `dist/`. |
| `npm run lint` | `oxlint` + `check:tokens`. |
| `npm run check:tokens` | Falla si los colores de `src/index.css` y `src/components/three/palette.ts` no coinciden, si `meta.themeColor` no es `--color-canvas` o si el contraste de texto es menor que 4,5:1. |
| `npm run preview` | Sirve `dist/` para probar el build (ejecuta antes `npm run build`). |
| `npm run optimize:model` | Regenera `public/models/ashveil-hero.glb` desde `source-assets/`. |
| `npm run package` | Genera `release/ashveil-online-template.zip` para entregar (ver abajo). |

## Verificar que todo funciona

1. `npm run build` termina sin errores y crea `dist/`.
2. `npm run lint` termina sin avisos y acaba con «Tokens de color sincronizados».
3. `npm run dev` y abre la URL que indica la terminal: debe cargar la página con el hero.
4. Opcional: `npm run build` y `npm run preview` para ver la versión de producción.

## Generar el paquete de entrega (`npm run package`)

Crea `release/ashveil-online-template.zip` con todo el proyecto, **incluida** `source-assets/` y **excluidos** `node_modules`, `dist`, `.git`, `release`, cachés y temporales. No añade dependencias: usa una herramienta del sistema.

- Si existe `zip`, lo usa.
- Si no, usa `tar` de Windows (`C:\Windows\System32\tar.exe`, incluido desde Windows 10) o el de macOS, que son bsdtar y escriben `.zip` con `tar -a -c -f archivo.zip`. El `tar` de GNU (Linux, Git Bash) no escribe `.zip`.
- Si no hay ninguna, el script falla con un aviso. Instala `zip`:
  - Debian/Ubuntu: `sudo apt install zip`
  - Fedora: `sudo dnf install zip`
  - macOS: viene incluido; si no, `brew install zip`
  - Windows: no hace falta, basta el `tar` incluido.

Para descomprimir en una carpeta limpia: con el explorador, «Extraer todo»; o `tar -xf ashveil-online-template.zip -C carpeta` (la carpeta debe existir) en Windows/macOS, o `unzip ashveil-online-template.zip -d carpeta` en Linux.

## Problemas frecuentes

- **Error de Vite al arrancar o `Unsupported engine`**: tu Node es anterior a 20.19. Actualízalo.
- **La escena 3D no aparece**: sin WebGL, en gama baja o con reduced motion se muestra el póster; es el comportamiento previsto.
- **`check:tokens` falla**: lee el mensaje; indica el color que difiere. Ver [personalizacion.md](personalizacion.md).
