export default {
  trackEvent({ event, options }) {
    if (options && options.extension && options.extension.telemetry) {
      if (window && window._gaq && typeof window._gaq.push === 'function') {
        window._gaq.push(['_trackEvent', event, 'clicked'])
      }
    }
  },

  trackPageView(options) {
    if (options && options.extension && options.extension.telemetry) {
      if (window && window._gaq && typeof window._gaq.push === 'function') {
        window._gaq.push(['_trackPageview'])
      }
    }
  },
}
