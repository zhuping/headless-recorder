const DEFAULT_COLOR = '#45C8F1'
const RECORDING_COLOR = '#FF0000'

const DEFAULT_LOGO = './images/logo.png'
const RECORDING_LOGO = './images/logo-red.png'
const PAUSE_LOGO = './images/logo-yellow.png'

export default {
  stop(text) {
    const path = (p => {
      try {
        return chrome && chrome.runtime && typeof chrome.runtime.getURL === 'function'
          ? chrome.runtime.getURL(p)
          : p
      } catch (e) {
        return p
      }
    })
    chrome.action.setIcon({ path: path(DEFAULT_LOGO) })
    chrome.action.setBadgeBackgroundColor({ color: DEFAULT_COLOR })
    this.setText(text)
  },

  reset() {
    this.setText('')
  },

  setText(text) {
    chrome.action.setBadgeText({ text })
  },

  pause() {
    const path = (p => {
      try {
        return chrome && chrome.runtime && typeof chrome.runtime.getURL === 'function'
          ? chrome.runtime.getURL(p)
          : p
      } catch (e) {
        return p
      }
    })
    chrome.action.setIcon({ path: path(PAUSE_LOGO) })
  },

  start() {
    const path = (p => {
      try {
        return chrome && chrome.runtime && typeof chrome.runtime.getURL === 'function'
          ? chrome.runtime.getURL(p)
          : p
      } catch (e) {
        return p
      }
    })
    chrome.action.setIcon({ path: path(RECORDING_LOGO) })
  },

  wait() {
    chrome.action.setBadgeBackgroundColor({ color: RECORDING_COLOR })
    this.setText('wait')
  },
}
