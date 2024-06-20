import Facade from './facade.js';

export default class Gen extends Facade {
  /**
   * @param {typeof import('../template/template.js').default} ctor
   * @returns {void}
   */
  static register(ctor) {
    this._maker.register(ctor);
  }

  /**
   * @param {string} template
   * @param {Record<string, *>} [args]
   * @returns {Promise<void>}
   */
  static async make(template, args = {}) {
    await this._maker.execute(template, args);
  }
}
