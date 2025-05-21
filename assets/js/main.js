
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


 

// search bar Home Page
const locsArea = document.querySelector('.location__area');
const locsBtn = document.querySelector('.location__btn');
const locsbody = document.querySelector('body');
const newBox = document.querySelector('.new-box');

if (locsBtn) {
  locsBtn.addEventListener('click', () => {
    locsBtn.classList.add('active');
    console.log('Button clicked');
  });


}

document.addEventListener('click', function(e) {
  if (!locsBtn.contains(e.target)) {
    locsBtn.classList.remove('active');
    locsArea.classList.remove('deactive');
  }
});


    // place Checked Home Page
    var placeBtn = document.querySelectorAll('.place__wrp a');
    placeBtn.forEach(btn => {
        btn.addEventListener('click',  (e) => {
            e.preventDefault()
            btn.classList.toggle('checked');
        });
    });

    // place Checked Home Page
    var locBtn = document.querySelectorAll('.location__area button');
    var locDiv = document.querySelectorAll('.location__area');
    var masterDiv = document.querySelectorAll('.master-box');

    locBtn.forEach(btns => {
        btns.addEventListener('click', (e) => {
            e.preventDefault()
            btns.parentElement.parentElement.parentElement.parentElement.classList.add('deactive');
            masterDiv.classList.add('active');
        });
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



      
    // Search Filter Home Page
    // https://codepen.io/parken26/pen/gOvXqqy
    function searchFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName('li');
    
      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
    
    filterSelection("all")
    function filterSelection(c) {
      var x, i;
      x = document.getElementsByClassName("filterDiv");
      if (c == "all") c = "";
      // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
      for (i = 0; i < x.length; i++) {
        faqRemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) faqAddClass(x[i], "show");
      }
    }
    
    // Show filtered elements
    function faqAddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }
    
    // Hide elements that are not selected
    function faqRemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1); 
        }
      }
      element.className = arr1.join(" ");
    }
    
    // Add active class to the current control button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
    
      
    
    // Accordion Function
    $(function() {
      // (Optional) Active an item if it has the class "is-active"	
      $("#myUL > .filterDiv.is-active").children(".accordion-panel").slideDown();
      
      $("#myUL > .filterDiv").click(function() {
        event.preventDefault();
        // Cancel the siblings
        $(this).siblings(".filterDiv").removeClass("is-active").children(".accordion-panel").slideUp();
        // Toggle the item
        $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
      });
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

 