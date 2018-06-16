const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('rules_db.json')
const db = low(adapter)

db.defaults({rules: []})
  .write()

function addRule (rule) {
  db.get('rules')
    .push(rule)
    .write()
}

function getAllRules () {
  return db.get('rules')
    .value()
}

module.exports = {addRule, getAllRules}
