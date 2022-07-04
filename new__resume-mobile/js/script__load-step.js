// загрузка последнего шага при перезагрузке 
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let sections = document.querySelectorAll('.bottom__content .section-step');
   let steps = document.querySelectorAll('.top__content .step__value');
   let stepLine = document.querySelectorAll('.top__content .line')

   if (readCookie('step-now(new__vacancy)') != undefined) {
      steps.forEach(step => {
         if (step.getAttribute('data-value') < readCookie('step-now(new__vacancy)')) {
            step.classList.add('done');
         }
         if (step.getAttribute('data-value') == readCookie('step-now(new__vacancy)')) {
            steps.forEach(step => {
               step.classList.remove('now');
            })
            step.classList.add('now');
         }
      })

      stepLine.forEach(line => {
         if (line.getAttribute('data-value') < readCookie('step-now(new__vacancy)')) {
            line.classList.add('done');
         }
      })

      sections.forEach(section => {
         if (section.getAttribute('data-value') == readCookie('step-now(new__vacancy)')) {
            sections.forEach(section => {
               section.classList.add('hide')
            })
            section.classList.remove('hide')
         }
      })
   }
})
