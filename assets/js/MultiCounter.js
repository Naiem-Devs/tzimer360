
  class MultiCounter {
    constructor(wrapperClass = '.multi-counter-wrapper') {
      this.init(wrapperClass);
    }

    init(wrapperClass) {
      const counters = document.querySelectorAll(wrapperClass);
      counters.forEach(counter => {
        const plusBtn = counter.querySelector('.multi-counter-plus');
        const minusBtn = counter.querySelector('.multi-counter-minus');
        const display = counter.querySelector('.multi-counter-display');

        let count = parseInt(display.textContent) || 0;

        const updateDisplay = () => {
          display.innerHTML = `${count} <span>סועדים</span>`;
        };

        plusBtn?.addEventListener('click', () => {
          count++;
          updateDisplay();
        });

        minusBtn?.addEventListener('click', () => {
          if (count > 0) {
            count--;
            updateDisplay();
          }
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new MultiCounter();
  });

