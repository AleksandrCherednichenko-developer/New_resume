document.addEventListener("DOMContentLoaded", () => {
   let sectionStep = document.querySelectorAll('.left__content .section-step');
   let btnSection = document.querySelector('.left__content .step__btn'),
      btnBack = btnSection.querySelector('.back'),
      btnNext = btnSection.querySelector('.next'),
      btnPublish = btnSection.querySelector('.publish');
   let stepValueItem = document.querySelectorAll('.step .step__value');
   let stepValue = 1;

   document.addEventListener('click', (event) => {
      let target = event.target;

      if (target.closest('.step__btn') && target.closest('.left__content')) {
         // нажатие на кнопку назад
         if (target == btnBack) {
            if (stepValue !== 1) {
               stepValue--;

               sectionStep.forEach(section => {
                  if (section.getAttribute('data-value') == stepValue) {
                     sectionStep.forEach(section => {
                        section.classList.add('hide');
                     })
                     section.classList.remove('hide');
                  }
               })
            }

            if (stepValue == 1) {
               btnBack.classList.add('hide');
               btnSection.classList.add('one-btn');
            }

            // скрыть кнопку опубликовать и показать кнопку вперед
            if (stepValue !== sectionStep.length) {
               btnPublish.classList.add('hide');
               btnNext.classList.remove('hide');
            }
            stepDone();
         }

         // нажатие на кнопку вперёд
         if (target == btnNext) {
            if (stepValue !== sectionStep.length) {
               btnBack.classList.remove('hide');
               btnSection.classList.remove('one-btn');
               stepValue++;

               sectionStep.forEach(section => {
                  if (section.getAttribute('data-value') == stepValue) {
                     sectionStep.forEach(section => {
                        section.classList.add('hide');
                     })
                     section.classList.remove('hide');
                  }
               })
            }

            // скрыть пнопку вперед и показать кнопку опубликовать
            if (stepValue == sectionStep.length) {
               btnPublish.classList.remove('hide');
               btnNext.classList.add('hide');
            }
            stepDone();
         }

         // переключение индикатора шагов
         function stepDone() {
            stepValueItem.forEach(item => {
               item.classList.remove('now');
               item.classList.remove('done');
            })
            stepValueItem.forEach(item => {
               if (item.getAttribute('data-value') == stepValue) {
                  item.classList.add('now');
               } else if (item.getAttribute('data-value') < stepValue) {
                  item.classList.add('now');
                  item.classList.add('done');
               }
            })
         }
      }
   })

})