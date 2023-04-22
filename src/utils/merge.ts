const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
const mergeDeep = (
  target: { [x: string]: any; h1?: {}; h2?: {}; h3?: {}; h4?: {}; h5?: {}; h6?: {}; text?: {} },
  source: { [x: string]: any }
) => {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export default mergeDeep;
