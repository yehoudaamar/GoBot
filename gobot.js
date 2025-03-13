// דוגמה לפונקציה פשוטה
document.addEventListener('DOMContentLoaded', function() {
    console.log("GoBot Loaded!");
});

// אתחול ספריית AOS לאנימציות גלילה
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // הוספת אנימציות לאלמנטים
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });
});

// פונקציה לגלילת הקרוסלה
function slideCarousel(direction) {
    const container = document.getElementById('botShowcase');
    const cardWidth = 380; // רוחב כרטיס + מרווח
    const scrollAmount = direction * cardWidth;
    
    container.scrollBy({
        left: -scrollAmount, // שלילי כי העברית מימין לשמאל
        behavior: 'smooth'
    });
}

// הוספת מאזיני לחיצה לכפתורים
document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => slideCarousel(-1));
        nextButton.addEventListener('click', () => slideCarousel(1));
    }
});

// מוסיף תמיכה במגע (swipe) למובייל
let touchStartX = 0;
let touchEndX = 0;

// document.getElementById('botShowcase').addEventListener('touchstart', e => {
//     touchStartX = e.changedTouches[0].screenX;
// });

// document.getElementById('botShowcase').addEventListener('touchend', e => {
//     touchEndX = e.changedTouches[0].screenX;
//     handleSwipe();
// });

function handleSwipe() {
    const swipeThreshold = 50; // מרחק מינימלי להחלקה
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        // החלקה שמאלה
        if (difference > 0) {
            slideCarousel(-1);
        }
        // החלקה ימינה
        else {
            slideCarousel(1);
        }
    }
}

// // מעקב אחר מיקום הגלילה
// document.getElementById('botShowcase').addEventListener('scroll', function() {
//     const container = this;
//     const maxScroll = container.scrollWidth - container.clientWidth;
//     const currentScroll = container.scrollLeft;
//     const progress = (currentScroll / maxScroll) * 100;
    
//     // עדכון סרגל ההתקדמות
//     document.querySelector('.progress-bar').style.width = `${100 - progress}%`;
    
//     // עדכון מונה הכרטיסים
//     const totalCards = document.querySelectorAll('.bot-card').length;
//     const currentCard = Math.round((progress / 100) * (totalCards - 1)) + 1;
//     document.querySelector('.carousel-counter').textContent = `${currentCard}/${totalCards}`;
// });

// הוספת תמיכה בלחיצה על סרגל ההתקדמות
// document.querySelector('.carousel-progress').addEventListener('click', function(e) {
//     const container = document.getElementById('botShowcase');
//     const maxScroll = container.scrollWidth - container.clientWidth;
//     const clickPosition = e.offsetX / this.offsetWidth;
    
//     container.scrollTo({
//         left: maxScroll * (1 - clickPosition),
//         behavior: 'smooth'
//     });
// });

// פונקציה מעודכנת להפעלה/הפסקה של סרטון
function toggleVideo(button) {
    var screen = button.parentElement;
    var video = screen.querySelector('video');
    var icon = button.querySelector('i');
    
    if (video.paused) {
        video.play();
        icon.className = 'fas fa-pause';
        screen.classList.remove('video-paused');
    } else {
        video.pause();
        icon.className = 'fas fa-play';
        screen.classList.add('video-paused');
    }
}

// הוספת כפתורי הפעלה לכל הסרטונים בטעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    var screens = document.querySelectorAll('.iphone-screen');
    
    screens.forEach(function(screen) {
        var video = screen.querySelector('video');
        
        // הסר את תכונת autoplay מהסרטון
        video.removeAttribute('autoplay');
        
        // הוסף מחלקה לציון שהסרטון מופסק
        screen.classList.add('video-paused');
        
        // בדוק אם כבר יש כפתור
        if (!screen.querySelector('.video-control-btn')) {
            var button = document.createElement('button');
            button.className = 'video-control-btn';
            button.innerHTML = '<i class="fas fa-play"></i>';
            button.onclick = function() { toggleVideo(this); };
            screen.appendChild(button);
        }
        
        // הוסף מאזין אירועים לסרטון
        video.addEventListener('pause', function() {
            var btn = screen.querySelector('.video-control-btn i');
            if (btn) btn.className = 'fas fa-play';
            screen.classList.add('video-paused');
        });
        
        video.addEventListener('play', function() {
            var btn = screen.querySelector('.video-control-btn i');
            if (btn) btn.className = 'fas fa-pause';
            screen.classList.remove('video-paused');
        });
    });
});


// פונקציה לשליחת טופס צור קשר
function submitContactForm(event) {
    event.preventDefault();
    
    // קבלת הערכים מהטופס
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // בדיקת תקינות בסיסית
    if (!name || !email || !message) {
        alert('אנא מלא את כל השדות');
        return;
    }
    
    // הצגת אנימציית טעינה
    const submitBtn = document.querySelector('.contact-form button');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
    submitBtn.disabled = true;
    
    // הכנת ה-URL לשליחה
    const url = `https://hook.integrator.boost.space/pm58js2bh8yfipdorbd78o2ykkl1egsi?name=${encodeURIComponent(name)}&mail=${encodeURIComponent(email)}&text=${encodeURIComponent(message)}`;
    
    // שליחת הבקשה
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            // הצגת הודעת הצלחה
            const form = document.querySelector('.contact-form');
            form.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>תודה על פנייתך!</h3>
                    <p>ההודעה נשלחה בהצלחה. ניצור איתך קשר בהקדם.</p>
                </div>
            `;
        } else {
            throw new Error('שגיאה בשליחת הטופס');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
        
        // החזרת הכפתור למצב הרגיל
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}

// הוספת מאזין אירועים לטופס
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
         contactForm.addEventListener('submit', submitContactForm);
    }
});
