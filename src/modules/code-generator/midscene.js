import { eventsToRecord, headlessActions } from '@/modules/code-generator/constants'
import { defaults } from '@/modules/code-generator/base-generator'

export default class MidsceneCodeGenerator {
  constructor(options = {}) {
    this._options = Object.assign({}, defaults, options)
  }

  generate(events = []) {
    let result = ''
    if (!events || !events.length) return result

    for (let i = 0; i < events.length; i++) {
      const { action, selector, value, href, keyCode, tagName } = events[i]

      switch (action) {
        case headlessActions.GOTO:
          if (href) {
            result += `await agent.launch('${href}')\n`
          }
          break
        case eventsToRecord.CLICK:
          if (selector) {
            result += `await agent.aiTap('${selector}')\n`
          }
          break
        case eventsToRecord.CHANGE:
          if (tagName === 'SELECT' && selector) {
            result += `await agent.aiTap('${selector}')\n`
          }
          break
        case eventsToRecord.KEYDOWN:
          if (keyCode === this._options.keyCode && selector && typeof value === 'string') {
            const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
            result += `await agent.aiInput('${selector}', '${escaped}')\n`
          }
          break
        default:
          break
      }
    }

    return result
  }
}
