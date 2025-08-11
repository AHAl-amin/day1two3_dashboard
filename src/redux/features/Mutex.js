// src/mutex.js
export class Mutex {
  constructor() {
    this._promise = Promise.resolve();
  }

  isLocked() {
    return this._promise !== Promise.resolve();
  }

  acquire() {
    let release;
    const nextPromise = new Promise((resolve) => {
      release = () => resolve();
    });
    const currentPromise = this._promise;
    this._promise = nextPromise;
    return currentPromise.then(() => release);
  }

  waitForUnlock() {
    return this._promise;
  }
}

export const mutex = new Mutex();