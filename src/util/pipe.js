/**
 * Extremely simple and naive piping function
 * @param {*} input 
 * @param  {...functions} fns 
 */
const pipe = (input, ...fns) => (
  fns.reduce((acc, fn) => fn(acc), input)
)

export default pipe