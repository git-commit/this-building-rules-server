const shortid = require('shortid')
const ruledb = require('./db/rule')
const act = require('./actions')

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

const stateIds = ['inside.temperature', 'inside.humidity', 'inside.co2', 'outside.humidity', 'outside.temperature', 'inside.humans', 'assistant']
const typeNames = ['lower', 'equal', 'higher']
const actionNames = ['open_window', 'close_window', 'led_on', 'led_off']

function getConditionValue (condition, state) {
  const paths = condition.stateId.split('.')
  var value = state
  paths.forEach(p => { value = value[p] })
  return value
}

function ruleDoesApply (rule, state) {
  const validConditions = rule.conditions.filter(c => {
    const value = getConditionValue(c, state)

    if (value == null) {
      console.log('NULL')
      return false
    }

    if (c.type === 'lower') {
      return value <= c.value
    }
    if (c.type === 'equals') {
      return value === c.value
    }
    if (c.type === 'higher') {
      return c.value <= value
    }
  })

  return validConditions.length === rule.conditions.length
}

function checkRules (state) {
  ruledb.getAllRules()
    .filter(r => ruleDoesApply(r, state))
    .forEach(r => {
      console.log(r)
      r.actions.forEach(a => actions[a]())
    })
}

const actions = {
  open_window: function () {
    act.changeWindow(true)
  },
  close_window: function () {
    act.changeWindow(false)
  }
}

module.exports = {createCondition, createRule, stateIds, typeNames, actionNames, checkRules}
