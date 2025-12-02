
import { Presentations } from "./ClassPresentation.js";
import { Ui } from "./Ui.js";
import { ClassesName, Route } from "./Constans.js";


export class App{

    #Ui;
    
    #ClassPresentation;
    constructor(){
        this.#Ui = new Ui();
        this.#ClassPresentation = new Presentations();
        this.allEvents();
        
    }

    init(){
        const hash = window.location.hash;
        switch (hash) {
            case Route.home:
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProducts());
                break;
            default:
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProducts());
                break;
        }
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