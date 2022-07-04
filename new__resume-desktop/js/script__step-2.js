import scrollTo from './script__scroll-to.js';
import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import { inputNumber } from "./script__input-number.js";

document.addEventListener("DOMContentLoaded", () => {
   let scrollY;
   let background = document.querySelector('.background');

   let step2 = document.querySelector('.left__content .step-2'),
      experienceSwitcher = step2.querySelector('.experience-switcher input');

   let haveExperienceBlock = step2.querySelector('.have__experience-block'),
      haveExperienceBlockList = step2.querySelector('.list__place-work'),
      newPlaceWorkBtn = step2.querySelector('.new__place-work');

   let noExperienceBlock = step2.querySelector('.no__experience-block'),
      noExperienceBlockText = step2.querySelector('.no__experience-block .text');

   let newPlaceWorkPopup = document.querySelector('.popup__new-place-work'),
      companyName = newPlaceWorkPopup.querySelector('.company__name input'),
      companyPosition = newPlaceWorkPopup.querySelector('.company__position input'),
      periodFrom = newPlaceWorkPopup.querySelector('.work__period-from'),
      periodFromMonth = newPlaceWorkPopup.querySelector('.work__period-from .month__value'),
      periodFromYear = newPlaceWorkPopup.querySelector('.work__period-from .year'),
      periodUpto = newPlaceWorkPopup.querySelector('.work__period-upto'),
      periodUptoMonth = newPlaceWorkPopup.querySelector('.work__period-upto .month__value'),
      periodUptoYear = newPlaceWorkPopup.querySelector('.work__period-upto .year'),
      periodCheckbox = newPlaceWorkPopup.querySelector('.work__period-checkbox input'),
      responsibilities = newPlaceWorkPopup.querySelector('.responsibilities'),
      achievements = newPlaceWorkPopup.querySelector('.achievements'),
      reasonForLeaving = newPlaceWorkPopup.querySelector('.reason-for-leaving'),
      note = newPlaceWorkPopup.querySelector('.note'),
      placeWorkArr = [];

   // очистка попапа "Опыт работы"
   function clearPopupNewWorkPlace() {
      newPlaceWorkPopup.classList.remove('active');
      background.classList.remove('active');
      scrollTo(newPlaceWorkPopup, scrollY);
      companyName.value = '';
      companyPosition.value = '';

      periodFrom.querySelector('.month__value').classList.remove('not-empty')
      periodFrom.querySelector('.month__value').textContent = 'Месяц'
      periodFrom.querySelector('.month__value').setAttribute('data-value', '')
      periodFrom.querySelector('.month__value').setAttribute('data-name', '')
      periodFrom.querySelectorAll('.month__list .item').forEach(item => {
         item.classList.remove('active');
      })
      periodFrom.querySelector('.year').value = '';
      periodFrom.querySelector('.year').classList.remove('not-empty');

      periodUpto.querySelector('.month__value').classList.remove('not-empty')
      periodUpto.querySelector('.month__value').textContent = 'Месяц'
      periodUpto.querySelector('.month__value').setAttribute('data-value', '')
      periodUpto.querySelector('.month__value').setAttribute('data-name', '')
      periodUpto.querySelectorAll('.month__list .item').forEach(item => {
         item.classList.remove('active');
      })
      periodUpto.querySelector('.year').value = '';
      periodUpto.querySelector('.year').classList.remove('not-empty');

      periodUpto.classList.remove('dont-click')
      periodCheckbox.checked = false;

      responsibilities.querySelector('textarea').value = ''
      achievements.querySelector('textarea').value = ''
      reasonForLeaving.querySelector('textarea').value = ''
      responsibilities.classList.add('dont-show')
      achievements.classList.add('dont-show')
      reasonForLeaving.classList.add('dont-show')
      responsibilities.querySelector('.text-count span').textContent = '0'
      achievements.querySelector('.text-count span').textContent = '0'
      reasonForLeaving.querySelector('.text-count span').textContent = '0'


      companyName.parentNode.classList.remove('error')
      companyPosition.parentNode.classList.remove('error')
      periodFromMonth.classList.remove('error');
      periodFromYear.classList.remove('error');
      periodUptoMonth.classList.remove('error');
      periodUptoYear.classList.remove('error');
      newPlaceWorkPopup.querySelector('.work__period').classList.remove('error')
   }

   // проверка данных при вводе года (нынешний год - 70 лет)
   function validateYear(inputYear, inputMonth) {
      inputYear.onblur = function () {
         if (inputYear.value > new Date().getFullYear() || inputYear.value <= new Date().getFullYear() - 70) {
            inputYear.value = '';
            inputYear.classList.remove('not-empty');
         }

         if (+(inputMonth.getAttribute('data-value')) > new Date().getMonth() + 1 && inputYear.value == new Date().getFullYear()) {
            inputMonth.classList.remove('not-empty');
            inputMonth.setAttribute('data-value', '');
            inputMonth.setAttribute('data-name', '');
            inputMonth.textContent = 'Месяц';
            inputMonth.classList.add('error');
         }

         if (periodUptoYear.value < periodFromYear.value) {
            periodUptoYear.value = ''
         }
      };
   }
   validateYear(periodFromYear, periodFromMonth)
   validateYear(periodUptoYear, periodUptoMonth)


   document.addEventListener('click', (event) => {
      let target = event.target;

      function clickExperienseSwitcher() {
         if (target == experienceSwitcher) {
            if (experienceSwitcher.checked) {
               noExperienceBlock.classList.remove('active')
               haveExperienceBlock.classList.add('active')
               writeCookie('experience(new__resume)', 'have__experience', 30)
            } else {
               noExperienceBlock.classList.add('active')
               haveExperienceBlock.classList.remove('active')
               writeCookie('experience(new__resume)', 'no__experience', 30)
            }
         }
      }
      clickExperienseSwitcher()

      // функционал попапа опыт работы
      function clickPopupNewPlaceWork() {
         // открытие попапа
         if (target == newPlaceWorkBtn) {
            scrollY = window.scrollY;
            background.classList.add('active');
            newPlaceWorkPopup.classList.add('active');
            scrollTo(newPlaceWorkPopup, scrollY);
         }

         // закрытие попапа
         if (target == background && newPlaceWorkPopup.classList.contains('active') ||
            target.closest('.close-popup') && target.closest('.popup__new-place-work')) {
            clearPopupNewWorkPlace()
         }

         // ввод названия компании
         if (target.closest('.company__name input')) {
            if (target.closest('.company__name').classList.contains('error')) {
               target.closest('.company__name').classList.remove('error')
            }
            target.closest('.company__name input').addEventListener('input', () => {
               if (target.closest('.company__name input').value.length > 0) {
                  target.closest('.company__name input').classList.add('not-empty');
               } else {
                  target.closest('.company__name input').classList.remove('not-empty');
               }
            })
         }

         // ввод должности
         if (target.closest('.company__position input')) {
            if (target.closest('.company__position').classList.contains('error')) {
               target.closest('.company__position').classList.remove('error')
            }
            target.closest('.company__position input').addEventListener('input', () => {
               if (target.closest('.company__position input').value.length > 0) {
                  target.closest('.company__position input').classList.add('not-empty');
               } else {
                  target.closest('.company__position input').classList.remove('not-empty');
               }
            })
         }

         // выбор месяца
         if (target.closest('.month__value') && target.closest('.popup__new-place-work')) {
            if (target.closest('.month__value').classList.contains('error')) {
               target.closest('.month__value').classList.remove('error')
            }

            if (target.closest('.month').querySelector('.month__list').classList.contains('hide')) {
               newPlaceWorkPopup.querySelectorAll('.month__list').forEach(list => {
                  list.classList.add('hide');
               })
               target.closest('.month').querySelector('.month__list').classList.remove('hide');
            } else {
               newPlaceWorkPopup.querySelectorAll('.month__list').forEach(list => {
                  list.classList.add('hide');
               })
               target.closest('.month').querySelector('.month__list').classList.add('hide');
            }
         } else {
            newPlaceWorkPopup.querySelectorAll('.month__list').forEach(list => {
               if (!list.classList.contains('hide')) {
                  list.classList.add('hide');
               }
            })
         }

         // нажатие на элементы выпадющего списка
         if (target.closest('.item') && target.closest('.month__list') && target.closest('.popup__new-place-work')) {
            target.closest('.month__list').querySelectorAll('.item').forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            target.closest('.month').querySelector('.month__value').classList.add('not-empty');
            target.closest('.month').querySelector('.month__value').textContent = target.closest('.item').textContent;
            target.closest('.month').querySelector('.month__value').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));
            target.closest('.month').querySelector('.month__value').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));

            if (target.closest('.month').parentNode.querySelector('.year').value != '' && target.closest('.month').parentNode.querySelector('.year').value == new Date().getFullYear()) {
               if (+(target.closest('.month').querySelector('.month__value .item').getAttribute('data-value')) > new Date().getMonth() + 1) {
                  target.closest('.month').querySelector('.month__value').classList.remove('not-empty');
                  target.closest('.month').querySelector('.month__value').textContent = 'Месяц';
                  target.closest('.month').querySelector('.month__value').setAttribute('data-name', '');
                  target.closest('.month').querySelector('.month__value').setAttribute('data-value', '');
                  target.closest('.month').querySelectorAll('.month__list').forEach(item => {
                     item.classList.remove('active');
                  })
                  target.closest('.month').querySelector('.month__value').classList.add('error');
               }
            }
         }

         // ввод года
         if (target == periodFromYear) {
            if (periodFromYear.classList.contains('error')) {
               periodFromYear.classList.remove('error')
            }
            periodFromYear.addEventListener('input', () => {
               inputNumber(periodFromYear)
               periodFromYear.setAttribute('data-value', periodFromYear.value);
               if (periodFromYear.value.length > 0) {
                  periodFromYear.classList.add('not-empty');
               } else {
                  periodFromYear.classList.remove('not-empty');
               }
            })
         }
         if (target == periodUptoYear) {
            if (periodUptoYear.classList.contains('error')) {
               periodUptoYear.classList.remove('error')
            }
            periodUptoYear.addEventListener('input', () => {
               inputNumber(periodUptoYear)
               periodUptoYear.setAttribute('data-value', periodUptoYear.value);
               if (periodUptoYear.value.length > 0) {
                  periodUptoYear.classList.add('not-empty');
               } else {
                  periodUptoYear.classList.remove('not-empty');
               }
            })
         }

         // установка чекбокса по настоящее время
         if (target.closest('.work__period-checkbox')) {
            if (target.closest('.work__period-checkbox').querySelector('input').checked == true) {
               periodUpto.classList.add('dont-click');
               periodUptoMonth.classList.remove('error');
               periodUptoYear.classList.remove('error');
            } else {
               periodUpto.classList.remove('dont-click');
            }
         }

         // открытие текстовых полей
         if (target.closest('.responsibilities h6') || target.closest('.achievements h6') || target.closest('.reason-for-leaving h6') || target.closest('.note h6')) {
            target.parentNode.classList.toggle('dont-show')
         }

         // ввод текста в тектовые поля
         function inputText(textarea, parent) {
            if (target.closest(textarea)) {
               (target.closest(textarea)).addEventListener('input', () => {
                  target.closest(parent).querySelector('.text-count span').textContent = target.closest(textarea).value.length;
                  if (target.closest(textarea).value.length > 0) {
                     target.closest(textarea).classList.add('not-empty');
                  } else {
                     target.closest(textarea).classList.remove('not-empty');
                  }
               })
            }
         }
         inputText('.responsibilities textarea', '.responsibilities')
         inputText('.achievements textarea', '.achievements')
         inputText('.reason-for-leaving textarea', '.reason-for-leaving')
         inputText('.note textarea', '.note')

         // нажатие кнопки сохранить
         if (target.closest('.save__place-work')) {
            let validateCompanyName = false;
            let validateCompanyPosition = false;
            let validatePeriodFromMonth = false;
            let validatePeriodFromYear = false;
            let validatePeriodUptoMonth = false;
            let validatePeriodUptoYear = false;

            if (companyName.value.length > 0 && companyName.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               companyName.parentNode.classList.remove('error')
               validateCompanyName = true
            } else {
               companyName.parentNode.classList.add('error')
               validateCompanyName = false
            }

            if (companyPosition.value.length > 0 && companyPosition.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               companyPosition.parentNode.classList.remove('error')
               validateCompanyPosition = true
            } else {
               companyPosition.parentNode.classList.add('error')
               validateCompanyPosition = false
            }

            if (!periodFromMonth.classList.contains('not-empty')) {
               periodFromMonth.classList.add('error');
               validatePeriodFromMonth = false
            } else {
               periodFromMonth.classList.remove('error');
               validatePeriodFromMonth = true
            }

            if (periodFromYear.value.length != 4) {
               periodFromYear.classList.add('error');
               validatePeriodFromYear = false
            } else {
               periodFromYear.classList.remove('error');
               validatePeriodFromYear = true
            }

            if (periodCheckbox.checked === true) {
               validatePeriodUptoMonth = true;
               validatePeriodUptoYear = true;

               periodUptoMonth.classList.remove('error');
               periodUptoYear.classList.remove('error');
            } else {
               if (periodUptoYear.value === periodFromYear.value) {
                  if (periodUptoMonth.getAttribute('data-value') < periodFromMonth.getAttribute('data-value')) {
                     periodUptoMonth.classList.add('error')
                  } else {
                     validatePeriodUptoMonth = true;
                     validatePeriodUptoYear = true;
                  }
               } else {
                  validatePeriodUptoMonth = true;
                  validatePeriodUptoYear = true;
               }
            }

            if (!validatePeriodFromMonth || !validatePeriodFromYear || !validatePeriodUptoMonth || !validatePeriodUptoYear) {
               newPlaceWorkPopup.querySelector('.work__period').classList.add('error')
            } else {
               newPlaceWorkPopup.querySelector('.work__period').classList.remove('error')
            }

            if (validateCompanyName && validateCompanyPosition && validatePeriodFromMonth && validatePeriodFromYear && validatePeriodUptoMonth && validatePeriodUptoYear) {
               let periodWork
               let plaseWorkItem

               if (periodCheckbox.checked != true) {
                  periodWork = periodFromMonth.getAttribute('data-name') + ' ' + periodFromYear.value + ' - ' + periodUptoMonth.getAttribute('data-name') + ' ' + periodUptoYear.value
               } else {
                  periodWork = periodFromMonth.getAttribute('data-name') + ' ' + periodFromYear.value + ' - по настоящее время'
               }

               plaseWorkItem = `
                  <p class="item text-s15-h18-w400"
                  data-month-from="${periodFromMonth.getAttribute('data-value')}"
                  data-month-upto="${periodUptoMonth.getAttribute('data-value')}"
                  data-year-from="${periodFromYear.getAttribute('data-value')}"
                  data-year-upto="${periodUptoYear.getAttribute('data-value')}"
                  data-responsibilities="${responsibilities.querySelector('textarea').value}"
                  data-achievements="${achievements.querySelector('textarea').value}"
                  data-reason-for-leaving="${reasonForLeaving.querySelector('textarea').value}"
                  data-note="${note.querySelector('textarea').value}">
                  <span class ="company__position">${companyPosition.value}</span>, 
                  <span class ="company__name">${companyName.value}</span>, 
                  <span class ="work__period">${periodWork}</span>
                  <span class="remove-btn"></span>
                  </p>
               `

               placeWorkArr.push(plaseWorkItem)
               haveExperienceBlockList.classList.remove('hide');
               haveExperienceBlockList.insertAdjacentHTML('beforeend', plaseWorkItem);
               writeCookie('place_work(new__resume)', JSON.stringify(placeWorkArr), 30);

               newPlaceWorkBtn.textContent = '+ Добавить еще одно место работы';
               clearPopupNewWorkPlace()
            }
         }

         // удаление места работы нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.list__place-work')) {
            target.closest('.item').remove();
            placeWorkArr.forEach(elemArr => {
               if (elemArr.replace(/\s/g, '') === target.closest('.item').outerHTML.replace(/\s/g, '')) {
                  placeWorkArr.splice((placeWorkArr.indexOf(elemArr)), 1)
                  writeCookie('place_work(new__resume)', JSON.stringify(placeWorkArr), 30);
                  if (placeWorkArr.length == 0) {
                     deleteCookie('place_work(new__resume)')
                     haveExperienceBlockList.classList.add('hide')
                     newPlaceWorkBtn.textContent = '+ Добавить место работы'
                  }
               }
            })
         }
      }
      clickPopupNewPlaceWork();

      // функционал для текстового поля во вкладке нет опыта
      function inputText() {
         // нажатие на переменные в текстовом поле
         if (target.closest('.variables__item')) {
            noExperienceBlockText.value = target.closest('.variables__item').getAttribute('data-value');
            writeCookie('no_experience-block(new__resume)', noExperienceBlockText.value, 30);
         }

         // ввод текста в поле
         noExperienceBlockText.addEventListener('input', () => {
            writeCookie('no_experience-block(new__resume)', noExperienceBlockText.value, 30);
         })
      }
      inputText();

      // нажатие на кнопки после ввода данных
      function clickBtn() {
         if (target.closest('.next') && target.closest('.step-2')) {
            clickBtnNext();
         }

         if (target.closest('.back') && target.closest('.step-2')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   function loadBlockExperience() {
      if (readCookie('experience(new__resume)') != undefined) {
         if (readCookie('experience(new__resume)') == 'have__experience') {
            noExperienceBlock.classList.remove('active')
            haveExperienceBlock.classList.add('active')
            writeCookie('experience(new__resume)', 'have__experience', 30)
            experienceSwitcher.checked = true;
         } else {
            noExperienceBlock.classList.add('active')
            haveExperienceBlock.classList.remove('active')
            writeCookie('experience(new__resume)', 'no__experience', 30)
         }
      } else {
         noExperienceBlock.classList.add('active')
         haveExperienceBlock.classList.remove('active')
         writeCookie('experience(new__resume)', 'no__experience', 30)
      }
   }
   function loadText() {
      if (readCookie('no_experience-block(new__resume)') != undefined) {
         noExperienceBlockText.value = readCookie('no_experience-block(new__resume)');
      }
   }
   function loadLastPlaceWork() {
      if (readCookie('place_work(new__resume)') != undefined) {
         placeWorkArr = JSON.parse(readCookie('place_work(new__resume)'));
         haveExperienceBlockList.classList.remove('hide');
         placeWorkArr.forEach(elemArr => {
            haveExperienceBlockList.insertAdjacentHTML('beforeend', elemArr);
            newPlaceWorkBtn.textContent = '+ Добавить еще одно место работы'
         })
      }
   }

   window.addEventListener('load', function load() {
      loadBlockExperience()
      loadText()
      loadLastPlaceWork()
   }, false);
}
)