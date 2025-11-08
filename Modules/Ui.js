
import { ClassesName, State } from "./Constans.js";

export class Ui{
    #mainContiner;
    constructor(){
        this.#mainContiner = document.querySelector(`.${ClassesName.CONTINER_MAIN}`);
    }

    // יצירת כל המצגות על המסך הראשי
    renderAllPresentation(AllPresentation){
        this.#mainContiner.innerHTML = "";
        AllPresentation.forEach(element => {
            const divPresentation = this.#creaCardForAllPresentation(element);
            this.#mainContiner.appendChild(divPresentation);
        });

    }

    
    // יצירת כרטיס מצגת אחת לצורך הלוח הראשי
    #creaCardForAllPresentation(element){

        const div = document.createElement("div");
        div.className = ClassesName.DIV_CARD;
        div.setAttribute("data-id", element.id);

        const figure = document.createElement("figure");
        figure.setAttribute("data-id", element.id);
        
        const img = document.createElement("img");
        img.src = element.mainImg;
        img.setAttribute("data-id", element.id);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = element.name;
        figcaption.setAttribute("data-id", element.id);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        div.appendChild(figure);

        return div;
    }

    // יצירת האלמנטים של מצגת אחת
    renderOnePresentation(presentation){

        this.#mainContiner.innerHTML = "";

        const divMain = document.createElement("div");
        divMain.className = ClassesName.DIV_PRESENTATION;

        const h2 = document.createElement("h2");
        h2.textContent = presentation.name;

        const divTrailer = document.createElement("div");
        divTrailer.className = ClassesName.DIV_TRAILER;
        divTrailer.innerHTML = presentation.vidue.Trailer;

        const divShowData = this.#creatDivShowData(presentation);

        const divGalery = this.#creatGaleryForPresentation(presentation.arrayGallery);

        divMain.appendChild(h2);
        divMain.appendChild(divTrailer);
        divMain.appendChild(divShowData);
        divMain.appendChild(divGalery);

        this.#mainContiner.appendChild(divMain);
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

                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ronitluz@gmail.com" target="_blank" class="contact-card email">
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
