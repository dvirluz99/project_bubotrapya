
import { ClassesName, State } from "./Constans.js";

export class Ui{
    #mainContiner;
    constructor(){
        this.#mainContiner = document.querySelector(`.${ClassesName.CONTINER_MAIN_FOR_HOME}`);
    }

    // יצירת כל המצגות על המסך הראשי
    renderAllPresentation(AllPresentation){
        this.#mainContiner.innerHTML = "";
        const div = document.createElement('div');
        div.className = ClassesName.CONTINER_MAIN_FOR_ALL;
        AllPresentation.forEach(element => {
            const divPresentation = this.#creaCardForAllPresentation(element);
            div.appendChild(divPresentation);
        });
        this.#mainContiner.appendChild(div);

    }

    
    // יצירת כרטיס מצגת אחת לצורך הלוח הראשי
    #creaCardForAllPresentation(element){
        let dataId;
        if(element.type === 'single' && element.linkedShowId){
            dataId = element.linkedShowId;
        }else{
            dataId = element.id;
        }

        const div = document.createElement("div");
        div.className = ClassesName.DIV_CARD;
        div.setAttribute("data-id", dataId);

        const figure = document.createElement("figure");
        figure.setAttribute("data-id", dataId);
        
        const img = document.createElement("img");
        img.src = element.mainImg;
        img.className = ClassesName.IMG_FOR_CARD;
        img.setAttribute("data-id", dataId);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = element.title;
        figcaption.setAttribute("data-id", dataId);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        div.appendChild(figure);

        return div;
    }

    // יצירת האלמנטים של מצגת אחת
renderOnePresentation(presentation) {
    // 1. ניקוי והכנה
    this.#mainContiner.innerHTML = "";
    // this.#renderClassesNameMain("cart"); // אני מניח שזה משנה את ה-CSS של הקונטיינר
    
    // 2. יצירת המעטפת הראשית
    const divMain = document.createElement("div");
    divMain.className = ClassesName.DIV_PRESENTATION;

    // 3. כותרת
    const h2 = document.createElement("h2");
    h2.textContent = presentation.name;
    divMain.appendChild(h2);

    // 4. טיפול בטריילרים (בצורה חכמה ובטוחה)
    // בודקים: האם קיים אובייקט vidue? והאם בתוכו יש Trailer?
    if (presentation.vidue && presentation.vidue.Trailer) {
        const divTrailer = document.createElement("div");
        divTrailer.className = ClassesName.DIV_TRAILER;

        // בדיקה: אם זה מערך - מחברים. אם זו מחרוזת - משתמשים בה כמו שהיא.
        // זה פותר לך את הבאג הנוכחי בלי לשנות את כל הנתונים אם אתה מתעצל
        const trailerContent = Array.isArray(presentation.vidue.Trailer) 
                               ? presentation.vidue.Trailer.join(" ") 
                               : presentation.vidue.Trailer;
        
        divTrailer.innerHTML = trailerContent;
        divMain.appendChild(divTrailer);
    }

    // 5. נתונים טקסטואליים
    if (presentation.showData) {
        const divShowData = this.#creatDivShowData(presentation);
        divMain.appendChild(divShowData);
    }

    // 6. גלריה (רק אם יש תמונות)
    if (presentation.arrayGallery && presentation.arrayGallery.length > 0) {
        const divGalery = this.#creatGaleryForPresentation(presentation.arrayGallery);
        divMain.appendChild(divGalery);
    }

    // 7. הוספה לדף
    this.#mainContiner.appendChild(divMain);
    
    // גלילה למעלה (חווית משתמש חשובה במעבר בין דפים)
    window.scrollTo(0, 0);
}

    
    // ואז ב-JavaScript אתה בונה את ה-HTML דינמית:
    #creatDivShowData(presentation){
        const container = document.createElement('div');
        container.className = 'show-details-container';
        container.innerHTML = `
            <h2 class="show-title">${presentation.showData.title}</h2>
            <p class="show-description">${presentation.showData.description}</p>
            <div class="creator-bio">
                <p class="creator-intro">${presentation.showData.creatorIntro}</p>
                <p class="creator-name">${presentation.showData.creatorName}</p>
                <p class="creator-credentials">${presentation.showData.creatorCredentials}</p>
            </div>
            <p class="audience-highlight">${presentation.showData.audience}</p>
            <div class="cta-container">
                <a href="tel:${presentation.showData.phone}" class="cta-button">
                    להזמנות והמלצות
                </a>
            </div>
            <div class="social-proof">
                <h4>ניסיון וקהלים:</h4>
                <p>${presentation.showData.socialProof}</p>
            </div>
        `;

        return container;
    }

    // יצירת הגלריה לדף מצגת
    #creatGaleryForPresentation(arrayGalery){
        const divGallery = document.createElement("div");
        divGallery.className = ClassesName.DIV_GALLERY;
        arrayGalery.forEach((item) => {
            const a = document.createElement("a");
            a.href = item.img;
            a.setAttribute("data-fancybox", "gallery1")

            const img = document.createElement("img");
            img.src = item.img;
            a.appendChild(img);

            divGallery.appendChild(a);
        })
        return divGallery;
    }

    //יצירת דף אודות
    renderPageAbout(){
        const div = document.createElement("div");

    }

    //יצירת דף יצירת קשר
    renderPageContactUs(){
        this.#mainContiner.innerHTML = `<div class="contact-page-container">
            <h2>יצירת קשר</h2>
            <p>אני כאן לכל שאלה, בקשה או הזמנה.
               <br>
               אפשר לבחור את הדרך הנוחה לך:
            </p>

            <div class="contact-options-grid">

                <a href="https://wa.me/972542043429" class="contact-card whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    <h3>שליחת הודעה בוואטסאפ</h3>
                    <p>לשיחה מהירה ונוחה</p>
                </a>

                <a href="mailto:ronitluz@gmail.com" target="_blank" class="contact-card email">
                    <i class="far fa-envelope"></i>
                    <h3>שליחת אימייל</h3>
                    <p>לפניות מפורטות או רשמיות</p>
                </a>

                <a href="https://facebook.com/your-page" class="contact-card facebook" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                    <h3>עמוד הפייסבוק</h3>
                    <p>להישאר מעודכנים ולצפות בתמונות</p>
                </a>

            </div> </div>`;
    }
}
