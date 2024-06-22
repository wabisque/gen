export default class Maker {
  /** @type {boolean} */
  static get initialized() {
    return Maker.#instance != null;
  }
  /** @type {Maker} */
  static #instance = null;

  /** @type {string} */
  get basePath() {
    return this.#basePath;
  }
  /** @type {string} */
  #basePath;
  /** @type {typeof import('../template/template.js').default[]} */
  #templates;

  /**
   * @param {string} basePath
   */
  constructor(basePath) {
    if(Maker.#instance != null) {
      return Maker.#instance;
    }

    this.#basePath = basePath;
    this.#templates = [];

    Maker.#instance = this;
  }

  /**
   * @param {string} template
   * @param {Record<string, *>} [args]
   * @returns {Promise<void>}
   */
  async execute(template, args = {}) {
    const ctor = this.#templates.find(ctor => ctor.tag == template);

    if(ctor == null) {
      throw new Error(`Template with tag ${template} not found.`);
    }

    const instance = new ctor(this, args);
    const message = await instance.execute();

    if(message != null) {
      console.log(message);
    }
  }

  /**
   * @param {typeof import('../template/template.js').default} ctor 
   * @returns {void}
   */
  register(ctor) {
    if(this.#templates.some(existing => existing.tag == ctor.tag)) {
      throw new Error(`Template with tag ${ctor.tag} already registered.`);
    }

    this.#templates.push(ctor);
  }
}
