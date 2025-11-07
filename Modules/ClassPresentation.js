import { arrayPresentations } from "./presentations.js";

export class Presentations{
  #araayPresentation;

  constructor() {
    // בעתיד, כאן אפשר לעשות fetch ל-API
    this.#araayPresentation = arrayPresentations;
  }

  getAllProducts() {
    return [...this.#araayPresentation];
  }

  getProductById(id) {
    return this.#araayPresentation.find((item) => item.id === id);
  }

}
