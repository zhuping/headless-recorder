import PuppeteerCodeGenerator from '@/modules/code-generator/puppeteer'
import PlaywrightCodeGenerator from '@/modules/code-generator/playwright'
import MidsceneCodeGenerator from '@/modules/code-generator/midscene'

export default class CodeGenerator {
  constructor(options = {}) {
    this.puppeteerGenerator = new PuppeteerCodeGenerator(options)
    this.playwrightGenerator = new PlaywrightCodeGenerator(options)
    this.midsceneGenerator = new MidsceneCodeGenerator(options)
  }

  generate(recording) {
    return {
      puppeteer: this.puppeteerGenerator.generate(recording),
      playwright: this.playwrightGenerator.generate(recording),
      midscene: this.midsceneGenerator.generate(recording),
    }
  }
}
