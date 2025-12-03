
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
        window.addEventListener('popstate', this.handlePopState.bind(this));
        
    }

    init(){
        const hash = window.location.hash;
        switch (hash) {
            case Route.home:
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProductsForHome());
                break;
            default:
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProductsForHome());
                break;
        }
        Fancybox.bind('[data-fancybox="gallery1"]', {
            // כאן אפשר להוסיף אפשרויות מותאמות אישית אם נרצה בעתיד
        });
    }

    handlePopState() {
        const path = window.location.hash.slice(1); // מוריד את ה-#
        
        if (path.startsWith('show/p')) {
            const id = path.split('/')[1];
            this.navigate(id, 'single');
        }else if(path.startsWith('show/card')){
            const id = path.split('/')[1];
            this.navigate(id, 'collection');
        }else if (path === 'contact') {
            this.navigate(null, 'contact');
        } else {
            this.navigate(null, 'home');
        }
    }

    navigate(id, type) {
    if (type === 'single') {
        const product = this.#ClassPresentation.getProductById(id);
        this.#Ui.renderOnePresentation(product); // נצטרך לעדכן את הפונקציה הזו שתקבל פרמטר backAction
    } else if (type === 'collection') {
        const collection = this.#ClassPresentation.getColcationfromCard(id); // הפונקציה שלך ששולפת את נתוני האוסף
        this.#Ui.renderAllPresentation(collection); // נצטרך פונקציית רינדור חדשה לאוסף
    } else if (type === 'contact') {
        this.#Ui.renderPageContactUs();
    } else {
        this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProductsForHome());
    }
}


    // האזנת הפעלת העכבר של המשתמש
    allEvents(){
        document.body.addEventListener("click", (event) => {

            const card = event.target.closest(`.${ClassesName.DIV_CARD}`);
            if(card){
                const linkedId = event.target.dataset.linkedShowId || event.target.dataset.id;
                const elementCard = this.#ClassPresentation.getProductById(linkedId); // משתמשים ב-linkedId הנכון
                // 1. הוספת מצב להיסטוריה
                // הפרמטר הראשון: אובייקט מצב (לא הכרחי פה). השני: כותרת (שוב, לא הכרחי). השלישי: ה-URL החדש.
                history.pushState({ page: 'show', id: linkedId }, '', `#show/${linkedId}`);
                
                // 2. הפעלת מנוע הרינדור מחדש
                this.navigate(linkedId, elementCard.type); // קוראים לפונקציית הניווט המרכזית
                return;
                
            }

            const contactUs = event.target.closest(`.${ClassesName.CONTACT_US}`);
            if(contactUs){
                // ניווט לדף צור קשר
                history.pushState({ page: 'contact' }, '', `#contact`);
                this.#Ui.renderPageContactUs();
            }
            
            const homePage = event.target.closest(`.${ClassesName.HOME_PAGE}`);
            if(homePage){
                history.pushState({ page: 'home' }, '', `#home`);
                this.#Ui.renderAllPresentation(this.#ClassPresentation.getAllProductsForHome());
            }

            const about = event.target.closest(`.${ClassesName.ABOUT}`);
            if(about){

            }
        })
    }
}