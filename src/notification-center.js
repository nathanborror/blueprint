class NotificationCenter {
  constructor() {
    this._observers = []
    this._promises = []
  }

  addObserver(type, callback) {
    this._observers.push({type: type, callback: callback})
    return this._observers.length - 1 // index
  }

  post(type, payload) {
    // First create array of promises for callbacks to reference.
    var resolves = []
    var rejects = []

    this._promises = this._observers.map((obj, i) => {
      if (type === obj.type) {
        return new Promise((resolve, reject) => {
          resolves[i] = resolve
          rejects[i] = reject
        })
      }
    })

    // Notify callbacks and resolve/reject promises.
    this._observers.forEach((obj, i) => {
      // Callback can return an obj, to resolve, or a promise, to chain.
      // See waitFor() for why this might be useful.

      if (type === obj.type) {
        Promise.resolve(obj.callback(payload)).then(function() {
          resolves[i](payload)
        }, () => {rejects[i](new Error('Dispatcher callback unsuccessful'))})
      }
    })

    this._promises = []
  }
}
