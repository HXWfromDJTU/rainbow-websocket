

export class InterceptorManager {
  protected handlers: Array<{
    fulfilled: Function,
    rejected: Function
  }>

  constructor () {
    this.handlers = []
    return this
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  }

  forEach (fn) {
    this.handlers.forEach(fn)
  }
}
