// import { CardPresentation } from "./CardPresentation.js";
import { Presentations } from "./ClassPresentation.js";
import { Ui } from "./Ui.js";
import { ClassesName } from "./Constans.js";


export class App{

    #Ui;
    #cardPresentation;
    #ClassPresentation;
    constructor(){
        this.#Ui = new Ui();
        this.#ClassPresentation = new Presentations();
        this.allEvents();
        // this.#cardPresentation = new CardPresentation();

    }

    init(){
        this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProducts());
        Fancybox.bind('[data-fancybox="gallery1"]', {
            // כאן אפשר להוסיף אפשרויות מותאמות אישית אם נרצה בעתיד
        });
    }


    // האזנת הפעלת העכבר של המשתמש
    allEvents(){
        document.body.addEventListener("click", (event) => {

            const presentationCard = event.target.closest(`.${ClassesName.DIV_CARD}`);
            if(presentationCard){
                this.#Ui.renderOnePresentation(this.#ClassPresentation.getProductById(event.target.dataset.id));
            }
        })
    }
}