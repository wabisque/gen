import Maker from '../maker/maker.js';

export default class Facade {
  /** @type {Maker} */
  static get _maker() {
    if(!Maker.initialized) {
      throw new Error('Maker is not initialized');
    }

    return new Maker();
  }
}
