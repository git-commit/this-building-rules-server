const shortid = require('shortid')
const ruledb = require('./db/rule')

function createRule (conditions, actions) {
  return {
    id: shortid.generate(),
    conditions: conditions,
    actions: actions
  }
}

// A condition on a value from Lightelligence
function createCondition (stateId, type, value) {
  return {
    stateId: stateId,
    type: type,
    value: value
  }
}

const stateIds = ['inside.temperature', 'inside.humidity', 'inside.co2', 'outside.humidity', 'outside.temperature']
const conditionNames = ['temperature']
const typeNames = ['lower', 'equal', 'higher']
const actionNames = ['open_window', 'close_window']

function getConditionValue (condition, state) {
  const paths = condition.stateId.split('.')
  var value = state
  paths.forEach(p => { value = value[p] })
  return value
}

function ruleApplies (rule, state) {
  rule.conditions.filter(c => {
    const value = getConditionValue(c, state)

    if (c.type === 'lower') {
      return value < c.value
    }
    if (c.type === 'equals') {
      return value === c.value
    }
    if (c.type === 'higher') {
      return value > c.value
    }
  })
}

function checkRules (state) {
  ruledb.getAllRules()
    .filter(r => !ruleApplies(r, state))
    .forEach(r => r.actions.forEach(a => actions[a]()))
}

const actions = {
  open_window: function () {
    console.log('works')
  }
}

module.exports = {createCondition, createRule, stateIds, conditionNames, typeNames, actionNames, checkRules}
