import { clickBtnBack, clickBtnNext } from './script__click-btn.js'
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js'
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';

document.addEventListener("DOMContentLoaded", () => {
   let step2 = document.querySelector('.step__inner .step-2');
   let backgroundModal = document.querySelector('.background-modal');

   let experienceSwitcher = step2.querySelector('.experience-switcher input');

   let noExperienceBlock = step2.querySelector('.no__experience-block'),
      noExperienceBlockVariables = step2.querySelectorAll('.no__experience-block .variables__item'),
      noExperienceBlockText = step2.querySelector('.no__experience-block .text');

   // блок "есть опыт работы"
   let haveExperienceBlock = step2.querySelector('.have__experience-block'),
      haveExperienceBlockList = step2.querySelector('.list__place-work'),
      newPlaceWorkBtn = step2.querySelector('.new__place-work');
   // модальное окно места работы
   let placeWorkBtnClass = '.new__place-work',
      placeWorkModal = document.querySelector('.modal-window .place__work-modal'),
      placeWorkModalInner = document.querySelector('.modal-window .place__work-modal .inner'),
      placeWorkModalInnerClass = '.modal-window .place__work-modal .inner',
      placeWorkModalClose = document.querySelector('.modal-window .place__work-modal-close');
   mobileModal(backgroundModal, placeWorkBtnClass, placeWorkModal, placeWorkModalInner, placeWorkModalInnerClass, placeWorkModalClose);
   // инпуты в модальном окне "новое место работы"
   let placeWorkName = placeWorkModal.querySelector('.company__name'),
      placeWorkPosition = placeWorkModal.querySelector('.company__position'),
      placeWorkPeriodFrom = placeWorkModal.querySelector('.work__period-from'),
      placeWorkPeriodTo = placeWorkModal.querySelector('.work__period-to'),
      placeWorkPeriodSwitcher = placeWorkModal.querySelector('.work__period-switcher input'),
      placeWorkResponsibilities = placeWorkModal.querySelector('.responsibilities textarea'),
      placeWorkAchievements = placeWorkModal.querySelector('.achievements textarea'),
      placeWorkReasonsForLeaving = placeWorkModal.querySelector('.reasons-for-leaving textarea'),
      placeWorkNotes = placeWorkModal.querySelector('.notes textarea');
   let plaseWorkArray = [];
   //параметры для ввода даты
   let inputDateOption = {
      mask: Date,
      min: new Date((new Date().getFullYear() - 60), 0, 1),
      max: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      lazy: false
   }
   IMask(placeWorkPeriodFrom, inputDateOption)
   IMask(placeWorkPeriodTo, inputDateOption)

   // очиста колей в модальном окне
   function clearPlaceWorkForm() {
      placeWorkName.value = ''
      placeWorkPosition.value = ''
      placeWorkPeriodFrom.value = ''
      placeWorkPeriodTo.value = ''
      placeWorkPeriodTo.removeAttribute('tabindex')
      placeWorkPeriodSwitcher.checked = false
      placeWorkResponsibilities.value = ''
      placeWorkAchievements.value = ''
      placeWorkReasonsForLeaving.value = ''
   }


   document.addEventListener('click', (event) => {
      let target = event.target

      // нажатие на свитчер "есть опыт работы"
      function clickExperienseSwitcher() {
         if (target == experienceSwitcher) {
            if (experienceSwitcher.checked) {
               noExperienceBlock.classList.remove('active')
               haveExperienceBlock.classList.add('active')
               writeCookie('experience(new__resume__mobile)', 'have__experience', 30)
            } else {
               noExperienceBlock.classList.add('active')
               haveExperienceBlock.classList.remove('active')
               writeCookie('experience(new__resume__mobile)', 'no__experience', 30)
            }
         }
      }
      clickExperienseSwitcher()

      // нажатие на стандартные переменные в блоке нет опыта работы
      function clickNoExperienceVariables() {
         if (target.closest('.variables__item') && target.closest('.no__experience-block')) {
            noExperienceBlockVariables.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.variables__item').classList.add('active')

            noExperienceBlockText.value = target.closest('.variables__item').getAttribute('data-value')
            writeCookie('no__experience__block(new__resume__mobile)', noExperienceBlockText.value, 30)
         }

         noExperienceBlockText.addEventListener('input', () => {
            writeCookie('no__experience__block(new__resume__mobile)', noExperienceBlockText.value, 30)

            noExperienceBlockVariables.forEach(item => {
               if (item.getAttribute('data-value') == noExperienceBlockText.value) {
                  item.classList.add('active');
               } else {
                  item.classList.remove('active');
               }
            })
         })
      }
      clickNoExperienceVariables()

      // нажатия в модальном окне опыт работы
      function clickExperienceBlock() {
         // ввод в поле "название компании"
         if (target == placeWorkName) {
            if (placeWorkName.classList.contains('error')) {
               placeWorkName.classList.remove('error')
            }
         }

         // ввод в поле "должность"
         if (target == placeWorkPosition) {
            if (placeWorkPosition.classList.contains('error')) {
               placeWorkPosition.classList.remove('error')
            }
         }

         // ввод в поле "период от"
         if (target == placeWorkPeriodFrom) {
            if (placeWorkPeriodFrom.classList.contains('error')) {
               placeWorkPeriodFrom.classList.remove('error')
            }
         }

         // ввод в поле "период до"
         if (target == placeWorkPeriodTo) {
            if (placeWorkPeriodTo.classList.contains('error')) {
               placeWorkPeriodTo.classList.remove('error')
            }
         }

         // переключение свитчера "по настоящее время"
         if (target == placeWorkPeriodSwitcher) {
            if (placeWorkPeriodSwitcher.checked) {
               placeWorkPeriodTo.classList.add('dont-click')
               placeWorkPeriodTo.setAttribute('tabindex', -1)
            } else {
               placeWorkPeriodTo.classList.remove('dont-click')
               placeWorkPeriodTo.removeAttribute('tabindex')
            }
         }

         // нажатие кнопки отмена
         if ((target.closest('.clear') || target == placeWorkModalClose) && target.closest('.place__work-modal') || target == backgroundModal) {
            placeWorkModal.classList.remove('active')
            backgroundModal.classList.remove('active')
            clearPlaceWorkForm()
            enableScroll()
         }

         // нажатие кнопки сохранить
         if (target.closest('.save') && target.closest('.place__work-modal')) {
            let validateName = false
            let validatePosition = false
            let validatePeriodFrom = false
            let validatePeriodTo = false

            // проверка поля с названием компании
            if (placeWorkName.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true;
            } else {
               placeWorkName.classList.add('error')
            }
            // проверка поля с должностью
            if (placeWorkPosition.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validatePosition = true;
            } else {
               placeWorkPosition.classList.add('error')
            }

            let fromData = new Date(`${placeWorkPeriodFrom.value.split('.')[2]}-${placeWorkPeriodFrom.value.split('.')[1]}-${placeWorkPeriodFrom.value.split('.')[0]}`)
            let toData = new Date(`${placeWorkPeriodTo.value.split('.')[2]}-${placeWorkPeriodTo.value.split('.')[1]}-${placeWorkPeriodTo.value.split('.')[0]}`)

            // проверка поля периода от
            if (Number(placeWorkPeriodFrom.value.split('.')[0]) &&
               Number(placeWorkPeriodFrom.value.split('.')[1]) &&
               Number(placeWorkPeriodFrom.value.split('.')[2])) {
               validatePeriodFrom = true
            } else {
               placeWorkPeriodFrom.classList.add('error')
            }
            // проверка поля периода до
            if (placeWorkPeriodSwitcher.checked !== true) {
               if (Number(placeWorkPeriodTo.value.split('.')[0]) && Number(placeWorkPeriodTo.value.split('.')[1]) && Number(placeWorkPeriodTo.value.split('.')[2])) {
                  if (fromData < toData) {
                     validatePeriodTo = true
                  } else {
                     placeWorkPeriodTo.classList.add('error')
                  }
               } else {
                  placeWorkPeriodTo.classList.add('error')
               }
            } else {
               validatePeriodTo = true
            }
            // создание нового места работы если нет ошибок
            if (validateName && validatePosition && validatePeriodFrom && validatePeriodTo) {
               let plaseWorkItem
               let positionWork = placeWorkPosition.value.trim()
               let periodWork

               if (placeWorkPeriodSwitcher.checked) {
                  periodWork = `с ${placeWorkPeriodFrom.value} - по настоящее время`
               } else {
                  periodWork = `с ${placeWorkPeriodFrom.value} - до ${placeWorkPeriodTo.value}`
               }

               plaseWorkItem = `
               <div class="item" data-company-name="${placeWorkName.value}" data-company-position="${placeWorkPosition.value}" data-period-from="${placeWorkPeriodFrom.value}" data-period-to="${placeWorkPeriodTo.value}" data-responsibilities="${placeWorkResponsibilities.value}" data-achievements="${placeWorkAchievements.value}" data-reason-for-leaving="${placeWorkReasonsForLeaving.value}" data-notes="${placeWorkNotes.value}">
                  <h6 class="text-s13-h16-w400">Место работы</h6>
                  <p>${positionWork[0].toUpperCase() + positionWork.slice(1)}, ${placeWorkName.value}, ${periodWork}</p>
                  <span class="remove-btn"></span>
               </div>
               `
               if (haveExperienceBlockList.classList.contains('hide')) {
                  haveExperienceBlockList.classList.remove('hide');
               }

               plaseWorkArray.push(plaseWorkItem)
               haveExperienceBlockList.insertAdjacentHTML('beforeend', plaseWorkItem);
               writeCookie('place_work(new__resume__mobile)', JSON.stringify(plaseWorkArray), 30);
               newPlaceWorkBtn.textContent = '+ Добавить еще одно место работы'
               clearPlaceWorkForm()
               backgroundModal.classList.remove('active')
               placeWorkModal.classList.remove('active')
            }
            enableScroll()
         }

         // удаление места работы нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.list__place-work')) {
            target.closest('.item').remove();
            plaseWorkArray.forEach(elemArr => {
               if (elemArr.replace(/\s/g, '') === target.closest('.item').outerHTML.replace(/\s/g, '')) {
                  plaseWorkArray.splice((plaseWorkArray.indexOf(elemArr)), 1)
                  writeCookie('place_work(new__resume__mobile)', JSON.stringify(plaseWorkArray), 30);
                  if (plaseWorkArray.length == 0) {
                     deleteCookie('place_work(new__resume__mobile)')
                     haveExperienceBlockList.classList.add('hide')
                     newPlaceWorkBtn.textContent = '+ Добавить место работы'
                  }
               }
            })
         }
      }
      clickExperienceBlock();

      // нажатие кнопок внутри блоков
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.section__bottom') && target.closest('.step-2')) {
            clickBtnNext()
         }
         if (target.closest('.back-btn') && target.closest('.section__bottom') && target.closest('.step-2')) {
            clickBtnBack()
         }
      }
      clickBtn()
   })


   // получение данных при перезагрузке
   function loadExperienceSwitcher() {
      if (readCookie('experience(new__resume__mobile)') !== undefined) {
         if (readCookie('experience(new__resume__mobile)') == 'have__experience') {
            noExperienceBlock.classList.remove('active')
            haveExperienceBlock.classList.add('active')
            writeCookie('experience(new__resume__mobile)', 'have__experience', 30)
            experienceSwitcher.checked = true
         } else {
            noExperienceBlock.classList.add('active')
            haveExperienceBlock.classList.remove('active')
            writeCookie('experience(new__resume__mobile)', 'no__experience', 30)
         }
      } else {
         noExperienceBlock.classList.add('active')
         haveExperienceBlock.classList.remove('active')
         writeCookie('experience(new__resume__mobile)', 'no__experience', 30)
      }
   }
   function loadNoExperienceBlock() {
      if (readCookie('no__experience__block(new__resume__mobile)') !== undefined) {
         noExperienceBlockVariables.forEach(item => {
            if (item.getAttribute('data-value') == readCookie('no__experience__block(new__resume__mobile)')) {
               item.classList.add('active')
            } else {
               item.classList.remove('active')
            }
         })
         noExperienceBlockText.value = readCookie('no__experience__block(new__resume__mobile)');
      }
   }
   function loadHaveExperienceBlock() {
      if (readCookie('place_work(new__resume__mobile)') !== undefined) {
         plaseWorkArray = JSON.parse(readCookie('place_work(new__resume__mobile)'))

         haveExperienceBlockList.classList.remove('hide')

         plaseWorkArray.forEach(item => {
            haveExperienceBlockList.insertAdjacentHTML('beforeend', item);
         })

         newPlaceWorkBtn.textContent = '+ Добавить еще одно место работы';
      }
   }

   window.addEventListener("load", function load() {
      loadExperienceSwitcher()
      loadNoExperienceBlock()
      loadHaveExperienceBlock()
   }, false)
})