const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let interval;

// Show Slide
function showSlide(i){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

// Next Slide
function nextSlide(){
    index = (index + 1) % slides.length;
    showSlide(index);
}

// Prev Slide
function prevSlide(){
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

// Auto Slide
function startAuto(){
    interval = setInterval(nextSlide, 4000);
}

function stopAuto(){
    clearInterval(interval);
}

// Events
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

document.querySelector(".slider").addEventListener("mouseenter", stopAuto);
document.querySelector(".slider").addEventListener("mouseleave", startAuto);

// Init
showSlide(index);
startAuto();



const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // remove active
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // add active
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});