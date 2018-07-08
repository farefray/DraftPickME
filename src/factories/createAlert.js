let id = 0;

export function createAlert(options) {
  return {
    ...options,
    id: id++,
    animationClass: 'fadeInDown'
  }
}
