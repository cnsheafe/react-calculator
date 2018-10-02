const bem = (blockName) => {
  return {
    b: mod => mod ? `${blockName}--${mod}` : blockName,
    e: elementName => `${blockName}__${elementName}`,
  }
}

export default bem