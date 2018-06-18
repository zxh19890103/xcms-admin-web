const isPromise = (val) => {
  return typeof val.then === 'function'
}

const toggleValueInArray = (val, array) => {
  const i = array.indexOf(val)
  if (i > -1) array.splice(i, 1)
  else array.push(val)
  return array
}

export {
  toggleValueInArray,
  isPromise
}
