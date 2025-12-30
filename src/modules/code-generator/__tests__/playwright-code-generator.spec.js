import PlaywrightCodeGenerator from '../playwright'

describe('PlaywrightCodeGenerator', () => {
  test('it should generate nothing when there are no events', () => {
    const events = []
    const codeGenerator = new PlaywrightCodeGenerator()
    expect(codeGenerator._parseEvents(events)).toBeFalsy()
  })

  test('it generates a page.selectOption() only for select dropdowns', () => {
    const events = [
      {
        action: 'change',
        selector: 'select#animals',
        tagName: 'SELECT',
        value: 'hamster',
      },
    ]
    const codeGenerator = new PlaywrightCodeGenerator()
    expect(codeGenerator._parseEvents(events)).toContain(
      `await page.selectOption('${events[0].selector}', '${events[0].value}')`
    )
  })

  test('it generates input on Enter key', () => {
    const events = [
      { action: 'keydown', keyCode: 13, selector: 'input.name', value: 'Alice' },
    ]
    const codeGenerator = new PlaywrightCodeGenerator()
    const result = codeGenerator._parseEvents(events)
    expect(result).toContain("await page.type('input.name', 'Alice')")
  })

  test('it generates input on focusout', () => {
    const events = [
      { action: 'focusout', selector: 'input.email', value: 'test@example.com' },
    ]
    const codeGenerator = new PlaywrightCodeGenerator()
    const result = codeGenerator._parseEvents(events)
    expect(result).toContain("await page.type('input.email', 'test@example.com')")
  })

  test('it dedupes Enter+focusout for same field', () => {
    const events = [
      { action: 'keydown', keyCode: 13, selector: 'input.city', value: 'Paris' },
      { action: 'focusout', selector: 'input.city', value: 'Paris' },
    ]
    const codeGenerator = new PlaywrightCodeGenerator()
    const result = codeGenerator._parseEvents(events)
    const lines = result.split('\n').filter(Boolean)
    const typeLines = lines.filter(l => l.includes("await page.type('input.city', 'Paris')"))
    expect(typeLines.length).toBe(1)
  })
})
