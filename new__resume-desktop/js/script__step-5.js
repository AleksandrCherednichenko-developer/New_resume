import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let step5 = document.querySelector('.left__content .step-5');

   let workFormatCheckbox = step5.querySelector('.work__format-checkbox input'),
      workFormatList = step5.querySelector('.work__format-list'),
      workFormatListItem = step5.querySelectorAll('.work__format-list .item'),
      workFormatArray = [];

   let employmentList = step5.querySelector('.employment-list'),
      employmentListItem = step5.querySelectorAll('.employment-list .item'),
      employmentArray = [];

   let scheduleList = step5.querySelector('.schedule-list'),
      scheduleListItem = step5.querySelectorAll('.schedule-list .item'),
      scheduleArray = [];

   let bonusesList = step5.querySelector('.bonuses-list'),
      bonusesListItems = step5.querySelectorAll('.bonuses-list .item'),
      bonusesArray = [];

   let bisnessTripsItems = step5.querySelectorAll('.business-trips__items .item');

   let relocationSwitcher = step5.querySelector('.relocation-possible input'),
      relocationBlock = step5.querySelector('.relocation-possible__inner'),
      relocationInput = relocationBlock.querySelector('input'),
      relocationInputList = relocationBlock.querySelector('.list'),
      relocationArr = [],
      relocationList = relocationBlock.querySelector('.add__item');


   // нажатия на странице
   document.addEventListener('click', (event) => {
      let target = event.target;

      // нажатие на чекбоксе "только удалённо"
      if (target.tagName == 'INPUT' && target.closest('.work__format-checkbox')) {
         if (workFormatCheckbox.checked) {
            workFormatList.classList.add('dont-click');
            workFormatListItem.forEach(item => {
               item.classList.remove('active');
            });
            deleteCookie('working__format(new__resume)');
            writeCookie('work__format-checkbox(new__resume)', true, 30);
         } else {
            workFormatList.classList.remove('dont-click');
            deleteCookie('work__format-checkbox(new__resume)');
         }
      }

      // нажатия на списках "занятость, график работы, доступные бонусы"
      function clickListItem(parent, arrValue, cookieName) {
         if (target.closest('.item') && target.parentNode == parent) {
            target.closest('.item').classList.toggle('active');
            if (target.closest('.item').classList.contains('active')) {
               arrValue.push(target.closest('.item').getAttribute('data-name'));
               writeCookie(cookieName, JSON.stringify(arrValue), 30);
            } else {
               arrValue.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-name')) {
                     arrValue.splice((arrValue.indexOf(elemArr)), 1);
                     if (arrValue.length != 0) {
                        writeCookie(cookieName, JSON.stringify(arrValue), 30);
                     } else {
                        deleteCookie(cookieName);
                     }
                  }
               })
            }
         }
      }
      clickListItem(workFormatList, workFormatArray, 'working__format(new__resume)');
      clickListItem(employmentList, employmentArray, 'employment(new__resume)');
      clickListItem(scheduleList, scheduleArray, 'schedule(new__resume)');
      clickListItem(bonusesList, bonusesArray, 'bonuses-list(new__resume)');

      // нажатие в блоке "готовность к командировкам"
      function clickBisnessTrips() {
         if (target.closest('.item') && target.closest('.business-trips__items')) {
            bisnessTripsItems.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.item').classList.add('active');
            writeCookie('bisness-trip(new__resume)', target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      clickBisnessTrips();

      // нажатия в блоке возможен переезд
      function clickRelocation() {
         // показывать блок если установленн свитчер
         if (target == relocationSwitcher) {
            if (relocationSwitcher.checked) {
               writeCookie('relocation-possible(new__resume)', true, 30);
               relocationBlock.classList.add('active')

               setTimeout(() => {
                  window.scrollBy({
                     top: 300,
                     behavior: 'auto'
                  });
               }, 50);
            } else {
               deleteCookie('relocation-possible(new__resume)');
               relocationBlock.classList.remove('active')
            }
         }

         // ввод гражданства
         if (target == relocationInput) {
            relocationInput.addEventListener('input', () => {
               relocationInput.value = relocationInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (relocationInput.value.length >= 3) {
                  relocationInputList.classList.remove('hide');
                  window.scrollBy({
                     top: relocationInputList.scrollHeight,
                     behavior: 'auto'
                  });
               } else {
                  relocationInputList.classList.add('hide');
               }

            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == relocationInputList) {
            relocationInput.value = '';
            relocationInputList.classList.add('hide');

            let removeBtn = document.createElement('span');
            removeBtn.className = 'remove-btn'
            let cloneItem = target.cloneNode(true);
            // не добавлять в массив одинаковые значения
            if (relocationArr.indexOf(target.getAttribute('data-name')) == -1) {
               relocationArr.push(target.getAttribute('data-name'));
               writeCookie('relocation(new__resume)', JSON.stringify(relocationArr), 30);
               cloneItem.append(removeBtn);
               relocationList.append(cloneItem);
            }
            if (relocationArr != 0) {
               relocationList.classList.remove('hide');
            } else {
               relocationList.classList.add('hide');
            }
         } else if (!(target.closest('.item')) && target.parentNode !== relocationInputList && !(relocationInputList.classList.contains('hide'))) {
            relocationInput.value = '';
            relocationInputList.classList.add('hide');
         }

         // удаление элемента из выбранных
         if (target.closest('.remove-btn') && target.closest('.add__item') && target.closest('.relocation-possible__inner')) {
            target.closest('.item').remove();
            relocationArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  relocationArr.splice((relocationArr.indexOf(elemArr)), 1);
                  writeCookie('relocation(new__resume)', JSON.stringify(relocationArr), 30);
               }

               if (relocationArr == 0) {
                  relocationList.classList.add('hide');
                  deleteCookie('relocation(new__resume)');
               }
            })
         }
      }
      clickRelocation();

      // нажатие на кнопки поле ввода данных
      function clickBtn() {
         if (target.closest('.next') && target.closest('.step-5')) {
            clickBtnNext();
         }
         if (target.closest('.back') && target.closest('.step-5')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   // получение данных для списков при перезагрузке страници
   function loadWorkFormatList() {
      if (readCookie('work__format-checkbox(new__resume)') != undefined) {
         workFormatCheckbox.checked = true;
         workFormatList.classList.add('dont-click');
      } else {
         if (readCookie('working__format(new__resume)') !== undefined) {
            workFormatArray = JSON.parse(readCookie('working__format(new__resume)'))
            workFormatArray.forEach(elemArr => {
               workFormatListItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-name')) {
                     item.classList.add('active');
                  }
               })
            })
         }
      }
   }
   function loadEmploymentList() {
      if (readCookie('employment(new__resume)') !== undefined) {
         employmentArray = JSON.parse(readCookie('employment(new__resume)'))
         employmentArray.forEach(elemArr => {
            employmentListItem.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   function loadScheduleList() {
      if (readCookie('schedule(new__resume)') !== undefined) {
         scheduleArray = JSON.parse(readCookie('schedule(new__resume)'))
         scheduleArray.forEach(elemArr => {
            scheduleListItem.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   function loadBonusesList() {
      if (readCookie('bonuses-list(new__resume)') !== undefined) {
         bonusesArray = JSON.parse(readCookie('bonuses-list(new__resume)'))
         bonusesArray.forEach(elemArr => {
            bonusesListItems.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   function loadBisnessTrips() {
      if (readCookie('bisness-trip(new__resume)') != undefined) {
         bisnessTripsItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('bisness-trip(new__resume)')) {
               item.classList.add('active')
            };
         })
      }
   }
   function loadRealocatePosible() {
      if (readCookie('relocation-possible(new__resume)') != undefined) {
         relocationSwitcher.checked = true;

         relocationBlock.classList.add('active');
         if (readCookie('relocation(new__resume)') != undefined) {
            relocationArr = JSON.parse(readCookie('relocation(new__resume)'))
            if (relocationArr.length != 0) {
               relocationList.classList.remove('hide')
               relocationArr.forEach(elemArr => {
                  let citizenshipItem = `
                  <p class="item" data-value="" data-name="${elemArr}">
                     ${elemArr}<span class="remove-btn"></span>
                  </p>
                  `;
                  relocationList.insertAdjacentHTML('beforeend', citizenshipItem);
               })
            }
         }
      }
   }

   window.addEventListener('load', function load() {
      loadWorkFormatList();
      loadEmploymentList();
      loadScheduleList();
      loadBonusesList();
      loadBisnessTrips();
      loadRealocatePosible();
   }, false);
})


