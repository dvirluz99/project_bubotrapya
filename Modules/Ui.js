
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

        if (element.importance) {
            div.classList.add(`importance-${element.importance}`);
        }

        const figure = document.createElement("figure");
        figure.setAttribute("data-id", dataId);
        
        const img = document.createElement("img");
        img.src = element.mainImg;
        img.className = ClassesName.IMG_FOR_CARD;
        img.setAttribute("data-id", dataId);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = element.title;
        figcaption.setAttribute("data-id", dataId);
        if (element.importance === 'recommended') {
            figcaption.classList.add('caption-highlight');
        }

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
                <a  class="cta-button" data-id ="${presentation.id}">
                    להמלצות
                </a>
                <a  class="invitation-button ${ClassesName.CONTACT_US}" data-id ="${presentation.linkRec}">
                    להזמנה
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

    renderRecommendationsPage(recommendationsArray) {
    this.#mainContiner.innerHTML = "";
    window.scrollTo(0, 0);

    // 1. עוטף ראשי לדף ההמלצות
    const wrapper = document.createElement("div");
    wrapper.className = "recommendation-page-wrapper";

    // 2. כותרת ראשית לדף
    const pageHeader = document.createElement("h2");
    pageHeader.className = "recommendation-header";
    pageHeader.textContent = "המלצות חמות";
    wrapper.appendChild(pageHeader);

    // 3. מיכל (Container) שבו יערמו כל כרטיסי ההמלצה
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "recommendations-list-container";
    
    // סגנון CSS מקומי לסידור הכרטיסים (אפשר להעביר לקובץ CSS)
    cardsContainer.style.display = "flex";
    cardsContainer.style.flexDirection = "column";
    cardsContainer.style.gap = "2rem"; // רווח בין המלצה להמלצה

    // 4. לולאה שבונה כרטיס לכל המלצה במערך
    recommendationsArray.forEach(recData => {
        
        const card = document.createElement("div");
        card.className = "recommendation-card-full"; // שימוש באותו קלאס מעוצב שיצרנו קודם

        card.innerHTML = `
            <div class="rec-meta">
                <span class="rec-role">
                    <strong>${recData.recommenderName}</strong>
                    <br>
                    <span style="font-size: 0.9em; color: #666;">${recData.recommenderRole}</span>
                </span>
                <span class="rec-date">${recData.date}</span>
            </div>
            
            <div class="rec-content">
                ${recData.content}
            </div>

            <div class="rec-footer">
                <p><strong>מתייחס להצגה:</strong> ${recData.relatedShow}</p>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    wrapper.appendChild(cardsContainer);

    // 5. כפתור הנעה לפעולה כללי בתחתית העמוד
    const ctaDiv = document.createElement("div");
    ctaDiv.className = "rec-cta-container";
    ctaDiv.style.marginTop = "3rem";
    
    const contactBtn = document.createElement("button");
    contactBtn.className = "cta-button-large";
    contactBtn.classList.add(`${ClassesName.CONTACT_US}`); // כדי שה-Listener הראשי יתפוס אותו ויעביר לצור קשר
    contactBtn.textContent = `להזמנת הצגה / סדנא צרו קשר`;
    
    ctaDiv.appendChild(contactBtn);
    wrapper.appendChild(ctaDiv);

    this.#mainContiner.appendChild(wrapper);
}

renderAboutPage(aboutData) {
    this.#mainContiner.innerHTML = "";
    window.scrollTo(0, 0);

    const wrapper = document.createElement("div");
    wrapper.className = "about-page-wrapper";

    // --- חלק עליון: תמונה וטקסט ---
    const topSection = document.createElement("div");
    topSection.className = "about-top-section";

    // תמונה (אם יש)
    if (aboutData.mainImage) {
        const imgDiv = document.createElement("div");
        imgDiv.className = "about-image-container";
        
        const img = document.createElement("img");
        img.src = aboutData.mainImage;
        img.alt = "רונית לוז";
        
        imgDiv.appendChild(img);
        topSection.appendChild(imgDiv);
    }

    // טקסט ראשי
    const textDiv = document.createElement("div");
    textDiv.className = "about-text-content";
    textDiv.innerHTML = `
        <h1 class="about-title">${aboutData.title}</h1>
        <div class="about-description">${aboutData.mainDescription}</div>
    `;
    topSection.appendChild(textDiv);

    wrapper.appendChild(topSection);

    // --- חלק תחתון: כרטיסיות ציטוטים ---
    if (aboutData.testimonials && aboutData.testimonials.length > 0) {
        const testimonialsSection = document.createElement("div");
        testimonialsSection.className = "testimonials-section";
        
        const sectionTitle = document.createElement("h3");
        sectionTitle.textContent = "מילים חמות מהשטח";
        testimonialsSection.appendChild(sectionTitle);

        const grid = document.createElement("div");
        grid.className = "testimonials-grid";

        aboutData.testimonials.forEach(item => {
            const card = document.createElement("div");
            card.dataset.id = item.linkRecId;
            card.className = "testimonial-mini-card";
            card.innerHTML = `
                <div class="quote-icon">❝</div>
                <p class="testi-text">${item.text}</p>
                <span class="testi-author">- ${item.author}</span>
                <span class="testi-from-Pres">${item.fromPresention}</span>
            `;
            grid.appendChild(card);
        });

        testimonialsSection.appendChild(grid);
        wrapper.appendChild(testimonialsSection);
    }

    this.#mainContiner.appendChild(wrapper);
}

    
}
