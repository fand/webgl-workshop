var path = require('path')
var fs   = require('fs')

module.exports = envifyFiles

/**
 * Takes a "template" and "target" directory pair,
 * creating missing files in the target and returning
 * the envify transform configuration required to
 * inline them.
 *
 * Environment keys will be prefixed with "file_" and have
 * dots replaced with underscores, e.g. such that:
 *
 * - index.js  => process.env.file_index_js
 * - test.frag => process.env.file_test_frag
 *
 * Currently only works for files one-level down,
 * nested directories might be supported later.
 *
 * @param {String} template – the template directory, e.g. "submission" in the
 *                            sample exercise.
 * @param {String} target   - the target directory, i.e. where the student
 *                            submits their answers.
 */
function envifyFiles(template, target) {
  var envify = ['-t', '[', require.resolve('envify')]

  fs.readdirSync(template).forEach(function(name) {
    var orig = path.resolve(template, name)
    var goal = path.resolve(target, name)
    var base = name.replace(/\./g, '_')

    if (!fs.statSync(orig).isFile()) return

    envify.push('--file_'+base, goal)

    if (!fs.existsSync(goal))
      fs.createReadStream(abs)
        .pipe(fs.createWriteStream(goal))
  })

  envify.push(']')

  return envify
}
