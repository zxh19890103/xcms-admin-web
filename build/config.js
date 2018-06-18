const BABEL_PRESET_ENV_OPTIONS = { targets: { browsers: ["last 2 versions", "safari >= 7"] } }
const BABEL_PLUGINS =  [
  "transform-runtime",
  "transform-class-properties"
]

module.exports = {
  BABEL_PRESET_ENV_OPTIONS,
  BABEL_PLUGINS
}
