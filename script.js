document.addEventListener("DOMContentLoaded", () => {

    /* ================= NAVBAR ================= */
    const toggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.getElementById("navbar");

    if(toggle && navLinks){

        // Toggle menu
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggle.classList.toggle("active");
            navLinks.classList.toggle("active");

            // prevent background scroll
            document.body.classList.toggle("no-scroll");
        });

        // Close on link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                toggle.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if(!navLinks.contains(e.target) && !toggle.contains(e.target)){
                toggle.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        });
    }

    /* SCROLL EFFECT (OPTIONAL CLEAN) */
    window.addEventListener("scroll", () => {
        if(navbar){
            if(window.scrollY > 50){
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });


    /* ================= HERO SLIDER ================= */
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const hero = document.querySelector(".hero");

    let current = 0;
    let interval;

    function showSlide(index){
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if(i === index){
                slide.classList.add("active");
            }
        });
    }

    function nextSlide(){
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide(){
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    function startSlider(){
        stopSlider();
        interval = setInterval(nextSlide, 4000);
    }

    function stopSlider(){
        clearInterval(interval);
    }

    if(nextBtn){
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startSlider();
        });
    }

    if(prevBtn){
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startSlider();
        });
    }

    if(hero){
        hero.addEventListener("mouseenter", stopSlider);
        hero.addEventListener("mouseleave", startSlider);
    }

    if(slides.length > 0){
        showSlide(current);
        startSlider();
    }


    /* ================= PROJECT TABS ================= */
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    if(tabs.length > 0){
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {

                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(c => c.classList.remove("active"));

                tab.classList.add("active");

                const target = document.getElementById(tab.dataset.tab);
                if(target){
                    target.classList.add("active");
                }
            });
        });
    }

});



/* ================= CONTACT FORM (WHATSAPP) ================= */
const contactForm = document.getElementById("contactForm");

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        // Get values safely
        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        // Validation
        if(!name || !email || !phone || !message){
            alert("Please fill all fields");
            return;
        }

        // Optional: Phone validation (India)
        const phoneRegex = /^[6-9]\d{9}$/;
        if(!phoneRegex.test(phone)){
            alert("Enter valid 10-digit phone number");
            return;
        }

        // 🔴 CHANGE THIS NUMBER
        const whatsappNumber = "917057117995";

        // Format message
        const text = 
`Hello, I am interested in your plots.

Name: ${name}
Email: ${email}
Phone: ${phone}
Requirement: ${message}`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        // Open WhatsApp
        window.open(url, "_blank");

        // Reset form
        contactForm.reset();
    });
}