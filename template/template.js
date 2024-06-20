import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

export default class Template {
  /** @type {string} */
  static get tag() {
    throw new Error('Not implemented');
  }

  /** @type {Record<string, *>} */
  _args;
  /** @type {import('../maker/maker.js').default} */
  get _maker() {
    return this.#maker;
  }
  /** @type {import('../maker/maker.js').default} */
  #maker;

  /**
   * @param {import('../maker/maker.js').default} maker
   * @param {Record<string, *>} [args]
   */
  constructor(maker, args = {}) {
    this.#maker = maker;
    this._args = args;
  }

  /**
   * @returns {Promise<string?>}
   */
  async execute() {
    await this._validate();

    const content = await this._render();
    const filePath = await this._target();

    if(existsSync(filePath)) {
      throw new Error(`File [${filePath}] already exists.`);
    }

    await writeFile(filePath, this.#parse(content));

    return this._message(filePath);
  }

  /**
   * @param {string} filePath
   * @returns {string}
   */
  _message(filePath) {
    return `File [${filePath}] created successfully.`;
  }

  /**
   * @returns {Promise<string>}
   */
  async _render() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<string>}
   */
  async _target() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<void>}
   */
  async _validate() {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} content
   * @returns {string}
   */
  #parse(content) {
    for(const key in this._args) {
      content = content.replace(
        new RegExp(`#\\{\\{\\s*${key}\\s*\\}\\}`, 'g'),
        this._args[key]
      );
    }

    return content;
  }
}
