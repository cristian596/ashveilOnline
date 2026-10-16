// Genera release/ashveil-online-template.zip con la plantilla lista para entregar.
// Sin dependencias: usa `zip` si existe y, si no, `tar` de Windows/macOS (bsdtar), que sabe escribir .zip.
// Excluye node_modules, dist, .git, cachés y temporales; incluye source-assets/.
import { spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const OUT_DIR = 'release'
const OUT_FILE = `${OUT_DIR}/ashveil-online-template.zip`

const EXCLUDED_DIRS = new Set(['node_modules', 'dist', 'dist-ssr', '.git', '.claude', '.idea', OUT_DIR])
const EXCLUDED_FILES = [/\.log$/, /\.local$/, /\.tmp$/, /\.tsbuildinfo$/, /\.zip$/, /^\.DS_Store$/, /^Thumbs\.db$/i, /^\.env(\..*)?$/]

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir || '.', { withFileTypes: true })) {
    const path = dir ? `${dir}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) walk(path)
    } else if (entry.isFile() && !EXCLUDED_FILES.some((re) => re.test(entry.name))) {
      files.push(path)
    }
  }
}
walk('')
files.sort()

const run = (cmd, args, options = {}) => spawnSync(cmd, args, { encoding: 'utf8', ...options })

const bsdtar = process.platform === 'win32' ? `${process.env.SystemRoot ?? 'C:/Windows'}/System32/tar.exe` : 'tar'
const hasZip = run('zip', ['-v']).status === 0
const hasBsdtar = !hasZip && /bsdtar/.test(run(bsdtar, ['--version']).stdout ?? '')

if (!hasZip && !hasBsdtar) {
  console.error('No se encontró `zip` ni un `tar` capaz de crear .zip (bsdtar). Instala zip: ver docs/instalacion.md.')
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })
rmSync(OUT_FILE, { force: true })

let result
if (hasZip) {
  result = run('zip', ['-q', OUT_FILE, '-@'], { input: files.join('\n') })
} else {
  const listFile = join(tmpdir(), `ashveil-package-${process.pid}.txt`)
  writeFileSync(listFile, files.join('\n'))
  try {
    result = run(bsdtar, ['-a', '-c', '-f', OUT_FILE, '-T', listFile])
  } finally {
    rmSync(listFile, { force: true })
  }
}
if (result.status !== 0) {
  console.error(result.stderr || 'Falló la creación del .zip.')
  process.exit(1)
}

const kb = (statSync(OUT_FILE).size / 1024).toFixed(0)
console.log(`${OUT_FILE}: ${files.length} archivos, ${kb} KB (con ${hasZip ? 'zip' : 'tar/bsdtar'}).`)
