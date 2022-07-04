import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

let sectionStep = document.querySelectorAll('.step__inner .section-step');
let stepValueItem = document.querySelectorAll('.step .step__value');
let stepValueLine = document.querySelectorAll('.step .line');
let stepValue;

window.addEventListener("load", function load() {
   if (readCookie('step-now(new__vacancy__mobile)') != undefined) {
      stepValue = readCookie('step-now(new__vacancy__mobile)');

      sectionStep.forEach(section => {
         if (section.getAttribute('data-value') == stepValue) {
            section.classList.remove('hide')
         } else {
            section.classList.add('hide');
         }
      })

      stepValueItem.forEach(step => {
         if (step.getAttribute('data-value') < stepValue) {
            step.classList.add('done');
         }
      })

      stepValueLine.forEach(line => {
         if (line.getAttribute('data-value') < stepValue) {
            line.classList.add('active');
         }
      })

      stepDone();
   } else {
      stepValue = 1;
   }
}, false);

// нажатие на кнопку назад
export function clickBtnBack() {
   stepValue--;

   sectionStep.forEach(section => {
      if (section.getAttribute('data-value') == stepValue) {
         section.classList.remove('hide');
      } else {
         section.classList.add('hide');
      }
   })

   stepDone();
}

// нажатие на кнопку вперёд
export function clickBtnNext() {
   stepValue++;

   sectionStep.forEach(section => {
      if (section.getAttribute('data-value') == stepValue) {
         section.classList.remove('hide')
      } else {
         section.classList.add('hide');
      }
   })

   stepValueItem.forEach(step => {
      if (step.getAttribute('data-value') < stepValue) {
         if (!(step.classList.contains('hide'))) {
            step.classList.add('done');
         }
      }
      if ((step.getAttribute('data-value') == stepValue - 1)) {
         if (step.classList.contains('error')) {
            step.classList.remove('error');
         }
      }
   })

   stepValueLine.forEach(line => {
      if (line.getAttribute('data-value') < stepValue) {
         line.classList.add('active');
      }
   })

   stepDone();
}

function stepDone() {
   stepValueItem.forEach(item => {
      item.classList.remove('now');
   })
   stepValueItem.forEach(item => {
      if (item.getAttribute('data-value') == stepValue) {
         item.classList.add('now');
         writeCookie('step-now(new__vacancy__mobile)', item.getAttribute('data-value'), 30);
      }
   })
}

// преход по секциям нажатием на шаги
document.addEventListener('click', (event) => {
   let target = event.target;

   if (target.closest('.step__value') && target.closest('.done') || target.closest('.now')) {
      sectionStep.forEach(section => {

         if (target.closest('.step__value').getAttribute('data-value') == section.getAttribute('data-value')) {
            sectionStep.forEach(section => {
               section.classList.add('hide')
            })
            section.classList.remove('hide');
            stepValue = target.closest('.step__value').getAttribute('data-value');

            stepValueItem.forEach(step => {
               step.classList.remove('now')
               if (step.classList.contains('done') && step.classList.contains('now')) {
                  step.classList.remove('now')
               }
            })

            target.closest('.step__value').classList.add('now');
         }
      })
   }
})