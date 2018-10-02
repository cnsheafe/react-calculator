import pipe from '../pipe'

describe('#pipe', () => {
  it('should pipe the input through a series of functions', () => {
    const addTen = (x) => x + 10
    const multiplyTwo = (x) => x * 2
    const subtractThree = (x) => x - 3

    const result = pipe(10, addTen, multiplyTwo, subtractThree)
    expect(result).toBe(37)
  })
})