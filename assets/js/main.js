
 // menu 
//  $('.siteBar-btn').click( function (event){ 
//     event.preventDefault()
//     $(this).toggleClass('active');   
//     $('.mobile-menu').toggleClass('siteBar');   
//   });

var siteBtn = document.querySelector('.siteBar-btn');
var menu = document.querySelector('.mobile-menu');

siteBtn.addEventListener('click', function (event) {
  event.preventDefault();
  siteBtn.classList.toggle('active');
  menu.classList.toggle('siteBar');
});



// Range Slider filter modal 
    // https://codepen.io/sumoncse19/pen/YzeEEow
    const range = document.querySelectorAll(".range-slider span input");
    progress = document.querySelector(".range-slider .progress");
    let gap = 0.1;
    const inputValue = document.querySelectorAll(".numberVal input");

    range.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minRange = parseInt(range[0].value);
        let maxRange = parseInt(range[1].value);

        if (maxRange - minRange < gap) {
        if (e.target.className === "range-min") {
            range[0].value = maxRange - gap;
        } else {
            range[1].value = minRange + gap;
        }
        } else {
        progress.style.left = (minRange / range[0].max) * 100 + "%";
        progress.style.right = 100 - (maxRange / range[1].max) * 100 + "%";
        inputValue[0].value = minRange;
        inputValue[1].value = maxRange;
        }
    });
    });



    // Range Slider search modal
    // https://codepen.io/alexerlandsson/pen/YzLeBVX
    const onInput = (parent, e) => {
      const slides = parent.querySelectorAll('input');
      const min = parseFloat(slides[0].min);
      const max = parseFloat(slides[0].max);
  
      let slide1 = parseFloat(slides[0].value);
      let slide2 = parseFloat(slides[1].value);
  
      const percentageMin = (slide1 / (max - min)) * 100;
      const percentageMax = (slide2 / (max - min)) * 100;
  
      parent.style.setProperty('--range-slider-value-low', percentageMin);
      parent.style.setProperty('--range-slider-value-high', percentageMax);
  
      if (slide1 > slide2) {
          const tmp = slide2;
          slide2 = slide1;
          slide1 = tmp;
  
          if (e?.currentTarget === slides[0]) {
          slides[0].insertAdjacentElement('beforebegin', slides[1]);
          } else {
          slides[1].insertAdjacentElement('afterend', slides[0]);
          }
      }
      
      parent.querySelector('.range-slider__display').setAttribute('data-low', slide1);
      parent.querySelector('.range-slider__display').setAttribute('data-high', slide2);
      }
  
      addEventListener('DOMContentLoaded', (event) => {
      document.querySelectorAll('.range-sliders')
      .forEach(range => range.querySelectorAll('input')
          .forEach((input) => {
          if (input.type === 'range') {
              input.oninput = (e) => onInput(range, e);
              onInput(range);
          }
      }))
      });




// Mouse Drag Scroll
const slider = document.querySelector('.place__wrp ul');
            
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});



var swiper = new Swiper(".place-card-swiper", {
  navigation: {
    nextEl: ".swiper-button-right",
    prevEl: ".swiper-button-left",
  },
});



  // page Animation
  // AOS.init({
  //   mirror: true,
  //   duration: 1500,
  //   initClassName: 'aos-init',
  //   once: true,
  // });

  // data-aos="fade-up" 
  // data-aos-delay="300" 

 