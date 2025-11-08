
import { Presentations } from "./ClassPresentation.js";
import { Ui } from "./Ui.js";
import { ClassesName } from "./Constans.js";


export class App{

    #Ui;
    
    #ClassPresentation;
    constructor(){
        this.#Ui = new Ui();
        this.#ClassPresentation = new Presentations();
        this.allEvents();
        
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

            const homePage = event.target.closest(`.${ClassesName.HOME_PAGE}`);
            if(homePage){
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProducts());
            }

            const about = event.target.closest(`.${ClassesName.ABOUT}`);
            if(about){

            }

            const contactUs = event.target.closest(`.${ClassesName.CONTACT_US}`);
            if(contactUs){
                this.#Ui.renderPageContactUs();
            }
        })
    }
}