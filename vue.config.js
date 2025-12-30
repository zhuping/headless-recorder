module.exports = {
  pages: {
    popup: {
      entry: 'src/popup/main.js',
      template: 'public/browser-extension.html',
      filename: 'popup.html'
    },
    options: {
      entry: 'src/options/main.js',
      template: 'public/browser-extension.html',
      filename: 'options.html'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background/index.js'
        },
        contentScripts: {
          entries: {
            'content-script': 'src/content-scripts/index.js'
          }
        }
      },
      manifestTransformer: (manifest) => {
        if (manifest && manifest.manifest_version === 3) {
          manifest.content_security_policy = {
            extension_pages: "script-src 'self'; object-src 'self'"
          }
        }
        return manifest
      }
    }
  }
}
