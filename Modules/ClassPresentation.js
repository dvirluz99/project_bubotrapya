import { arrayPresentations , homePageStructure, showData} from "./presentations.js";

export class Presentations{
  #araayPresentation;

  constructor() {
    // בעתיד, כאן אפשר לעשות fetch ל-API
    this.#araayPresentation = homePageStructure;
  }

  getAllProductsForHome() {
    return [...this.#araayPresentation];
  }

  getColcationfromCard(id){
    const card = homePageStructure.find((element)=> element.id === id);
    const arrCard = card.contains;
    const arrPresentation = [];
    arrCard.forEach((itemId)=>{
      arrPresentation.push(showData[itemId]);
    })
    return arrPresentation;
  }

  getProductById(id) {
    let product;
    homePageStructure.forEach((element)=>{
      if(element.id === id){
        product = element
      }
    })
    if(!product){
      product = showData[id];
    }
    
    return product;
  }

}
