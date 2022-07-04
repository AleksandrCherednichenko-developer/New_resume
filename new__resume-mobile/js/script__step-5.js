import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let step5 = document.querySelector('.step__inner .step-5');
   let backgroundList = document.querySelector('.background-list');
   let backgroundModal = document.querySelector('.background-modal');

   // свитчер только удаленный формат работы
   let onlyRemoteWorkSwitcher = step5.querySelector('.only-remote-work input');
   // блок формат работы
   let workFromatblock = step5.querySelector('.work__format'),
      workFromatValue = step5.querySelector('.work__format p'),
      workFormatItems = document.querySelectorAll('.work__format-modal .item'),
      workFormatArr = [];
   // модальное окно с форматов работы
   let workFormatBtnClass = '.work__format',
      workFormatModal = document.querySelector('.modal-window .work__format-modal'),
      workFormatModalInner = document.querySelector('.modal-window .work__format-modal .inner'),
      workFormatModalInnerClass = '.modal-window .work__format-modal .inner',
      workFormatModalClose = document.querySelector('.modal-window .work__format-modal-close');
   mobileModal(backgroundModal, workFormatBtnClass, workFormatModal, workFormatModalInner, workFormatModalInnerClass, workFormatModalClose);
   let workFormatClear = workFormatModal.querySelector('.modal__button .clear'),
      workFormatSave = workFormatModal.querySelector('.modal__button .apply');

   // блок тип занятости
   let scheduleValue = step5.querySelector('.schedule p'),
      scheduleItems = document.querySelectorAll('.schedule-modal .item'),
      scheduleArr = [];
   // модальное окно с тип занятости
   let scheduleBtnClass = '.schedule',
      scheduleModal = document.querySelector('.modal-window .schedule-modal'),
      scheduleModalInner = document.querySelector('.modal-window .schedule-modal .inner'),
      scheduleModalInnerClass = '.modal-window .schedule-modal .inner',
      scheduleModalClose = document.querySelector('.modal-window .schedule-modal-close');
   mobileModal(backgroundModal, scheduleBtnClass, scheduleModal, scheduleModalInner, scheduleModalInnerClass, scheduleModalClose);
   let scheduleClear = scheduleModal.querySelector('.modal__button .clear'),
      scheduleSave = scheduleModal.querySelector('.modal__button .apply');

   // блок график работы
   let workingModeValue = step5.querySelector('.working__mode p'),
      workingModeItems = document.querySelectorAll('.working__mode-modal .item'),
      workingModeArr = [];
   // модальное окно с форматов работы
   let workingModeBtnClass = '.working__mode',
      workingModeModal = document.querySelector('.modal-window .working__mode-modal'),
      workingModeModalInner = document.querySelector('.modal-window .working__mode-modal .inner'),
      workingModeModalInnerClass = '.modal-window .working__mode-modal .inner',
      workingModeModalClose = document.querySelector('.modal-window .working__mode-modal-close');
   mobileModal(backgroundModal, workingModeBtnClass, workingModeModal, workingModeModalInner, workingModeModalInnerClass, workingModeModalClose);
   let workingModeClear = workingModeModal.querySelector('.modal__button .clear'),
      workingModeSave = workingModeModal.querySelector('.modal__button .apply');

   // блок с бонусами
   let bonusesValue = step5.querySelector('.bonuses p'),
      bonusesList = backgroundList.querySelector('.bonuses__list'),
      bonusesListClose = backgroundList.querySelector('.bonuses__list .list__title button'),
      bonusesListItems,
      bonusesListClear = backgroundList.querySelector('.bonuses__list .clear'),
      bonusesListSave = backgroundList.querySelector('.bonuses__list .save'),
      bonusesArr = [];

   // блок готовность к командировкам
   let businessTripsItems = step5.querySelectorAll('.business__trips .item')

   // блок переезда
   let relocateSwitcher = step5.querySelector('.relocation-switcher input'),
      relocateBlock = step5.querySelector('.relocation-block'),
      relocateValue = step5.querySelector('.relocation-block p'),
      relocateList = backgroundList.querySelector('.relocate__list'),
      relocateListClose = relocateList.querySelector('.list__title button'),
      relocateListClear = relocateList.querySelector('.list__bottom .clear'),
      relocateListSave = relocateList.querySelector('.list__bottom .save'),
      relocateInput = relocateList.querySelector('.relocate__input input'),
      relocateInputList = relocateList.querySelector('.relocate__input .list'),
      relocateAddList = relocateList.querySelector('.relocate__add-list'),
      relocateArr = [];

   document.addEventListener('click', (event) => {
      let target = event.target;

      // переключение свитчера только удаленный формат
      function clickOnlyRemoteWorkSwitcher() {
         if (target === onlyRemoteWorkSwitcher) {
            if (onlyRemoteWorkSwitcher.checked) {
               workFromatblock.classList.add('dont-click')
               writeCookie('only-remote-work(new__resume__mobile)', true, 30)
            } else {
               workFromatblock.classList.remove('dont-click')
               deleteCookie('only-remote-work(new__resume__mobile)')
            }
         }
      }
      clickOnlyRemoteWorkSwitcher()

      // выбор форматов работы
      function addWorkFormat() {
         // нажатие на элементы в модальном окне
         if (target.tagName === 'INPUT' && target.closest('.item') && target.closest('.work__format-modal')) {
            if (target.checked) {
               workFormatArr.push(target.closest('.item').getAttribute('data-value'))
            } else {
               workFormatArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     workFormatArr.splice((workFormatArr.indexOf(elemArr)), 1);
                  }
               })
            }

            if (workFormatArr.length != 0) {
               workFromatValue.textContent = workFormatArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
               writeCookie('work-format(new__resume__mobile)', JSON.stringify(workFormatArr), 30)
            } else {
               workFromatValue.textContent = 'Выберите подходящие форматы работы'
               deleteCookie('work-format(new__resume__mobile)')
            }
         }

         // нажатие кнопки сбросить
         if (target === workFormatClear) {
            workFormatItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            workFromatValue.textContent = 'Выберите подходящие форматы работы'
            workFormatArr = []
            deleteCookie('work-format(new__resume__mobile)')
            backgroundModal.classList.remove('active')
            workFormatModal.classList.remove('active')
            enableScroll()
         }

         // нажатие кнопки применить
         if (target === workFormatSave) {
            backgroundModal.classList.remove('active')
            workFormatModal.classList.remove('active')
            enableScroll()
         }
      }
      addWorkFormat()

      // выбор форматов работы
      function addSchedule() {
         // нажатие на элементы в модальном окне
         if (target.tagName === 'INPUT' && target.closest('.item') && target.closest('.schedule-modal')) {
            if (target.checked) {
               scheduleArr.push(target.closest('.item').getAttribute('data-value'))
            } else {
               scheduleArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     scheduleArr.splice((scheduleArr.indexOf(elemArr)), 1);
                  }
               })
            }

            if (scheduleArr.length != 0) {
               scheduleValue.textContent = scheduleArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
               writeCookie('schedule(new__resume__mobile)', JSON.stringify(scheduleArr), 30)
            } else {
               scheduleValue.textContent = 'Выберите подходящие варианты'
               deleteCookie('schedule(new__resume__mobile)')
            }
         }

         // нажатие кнопки сбросить
         if (target === scheduleClear) {
            scheduleItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            scheduleValue.textContent = 'Выберите подходящие варианты'
            scheduleArr = []
            deleteCookie('schedule(new__resume__mobile)')
            backgroundModal.classList.remove('active')
            scheduleModal.classList.remove('active')
            enableScroll()
         }

         // нажатие кнопки применить
         if (target === scheduleSave) {
            backgroundModal.classList.remove('active')
            scheduleModal.classList.remove('active')
            enableScroll()
         }
      }
      addSchedule()

      // выбор форматов работы
      function addWorkingMode() {
         // нажатие на элементы в модальном окне
         if (target.tagName === 'INPUT' && target.closest('.item') && target.closest('.working__mode-modal')) {
            if (target.checked) {
               workingModeArr.push(target.closest('.item').getAttribute('data-value'))
            } else {
               workingModeArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     workingModeArr.splice((workingModeArr.indexOf(elemArr)), 1);
                  }
               })
            }

            if (workingModeArr.length != 0) {
               workingModeValue.textContent = workingModeArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
               writeCookie('working-mode(new__resume__mobile)', JSON.stringify(workingModeArr), 30)
            } else {
               workingModeValue.textContent = 'Выберите подходящие варианты'
               deleteCookie('working-mode(new__resume__mobile)')
            }
         }

         // нажатие кнопки сбросить
         if (target === workingModeClear) {
            workingModeItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            workingModeValue.textContent = 'Выберите подходящие варианты'
            workingModeArr = []
            deleteCookie('working-mode(new__resume__mobile)')
            backgroundModal.classList.remove('active')
            workingModeModal.classList.remove('active')
            enableScroll()
         }

         // нажатие кнопки применить
         if (target === workingModeSave) {
            backgroundModal.classList.remove('active')
            workingModeModal.classList.remove('active')
            enableScroll()
         }
      }
      addWorkingMode()

      // выбор доступных бонусов
      function addBonuses() {
         // открытие
         if (target.closest('.bonuses')) {
            bonusesListItems = backgroundList.querySelectorAll('.bonuses__list .item');
            backgroundList.classList.add('active')
            bonusesList.classList.add('active')
            bg__lock()
         }
         // закрытие
         if (target === bonusesListClose || target === bonusesListSave) {
            backgroundList.classList.remove('active')
            bonusesList.classList.remove('active')
            bg__unlock()
         }
         // нажатие на элементы
         if (target.tagName === 'INPUT' && target.closest('.bonuses__list')) {
            if (target.checked) {
               bonusesArr.push(target.closest('.item').getAttribute('data-value'))
               bonusesValue.textContent = bonusesArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
               writeCookie('bonuses(new__resume__mobile)', JSON.stringify(bonusesArr), 30)
            } else {
               bonusesArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     bonusesArr.splice((bonusesArr.indexOf(elemArr)), 1);
                  }
               })

               if (bonusesArr.length !== 0) {
                  bonusesValue.textContent = bonusesArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
                  writeCookie('bonuses(new__resume__mobile)', JSON.stringify(bonusesArr), 30)
               } else {
                  bonusesValue.textContent = 'Выберите доступные бонусы'
                  deleteCookie('bonuses(new__resume__mobile)')
               }
            }
         }
         // нажатие кнопки сбросить
         if (target === bonusesListClear) {
            bonusesListItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            bonusesArr = []
            bonusesValue.textContent = 'Выберите страны'
            deleteCookie('bonuses(new__resume__mobile)')
            backgroundList.classList.remove('active')
            bonusesList.classList.remove('active')
            bg__unlock()
         }
      }
      addBonuses()

      // выбор готовности к командировкам
      function addBusinessTrip() {
         if (target.closest('.item') && target.closest('.business__trips')) {
            businessTripsItems.forEach(item => item.classList.remove('active'))
            target.closest('.item').classList.add('active')

            writeCookie('business-trips(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      addBusinessTrip()

      // выбор возможности релокации
      function clickRelocateBlock() {
         // переключения свитчера
         if (target === relocateSwitcher) {
            if (relocateSwitcher.checked) {
               relocateBlock.classList.add('active')
               writeCookie('relocate(new__resume__mobile)', true, 30)
            } else {
               relocateBlock.classList.remove('active')
               deleteCookie('relocate(new__resume__mobile)')
            }
         }

         // открытие 
         if (target.closest('.relocation-block') && target.closest('.step-5')) {
            backgroundList.classList.add('active')
            relocateList.classList.add('active')
            bg__lock()
         }

         // закрытие
         if (target === relocateListClose || target === relocateListSave) {
            backgroundList.classList.remove('active')
            relocateList.classList.remove('active')
            bg__lock()
         }

         // ввод значения
         if (target === relocateInput) {
            relocateInput.addEventListener('input', () => {
               if (relocateInput.value.length > 2) {
                  relocateInputList.classList.remove('hide')
               } else {
                  relocateInputList.classList.add('hide')
               }
            })
         } else if (!relocateInputList.classList.contains('hide')) {
            relocateInputList.classList.add('hide')
            relocateInput.value = ''
         }

         // нажатие на элементы из списка
         if (target.closest('.item') && target.parentNode == relocateInputList) {
            if (relocateArr.indexOf(target.closest('.item').getAttribute('data-value')) === -1) {
               relocateArr.push(target.closest('.item').getAttribute('data-value'))

               let removeBtn = document.createElement('span')
               removeBtn.className = 'remove-btn'
               let item = target.closest('.item').cloneNode(true)

               item.append(removeBtn)
               relocateAddList.append(item)

               relocateValue.textContent = relocateArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');
               writeCookie('relocate-value(new__resume__mobile)', JSON.stringify(relocateArr), 30)
            }
         }

         // удаление нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.relocate__add-list')) {
            relocateArr.forEach(elemArr => {
               if (elemArr === target.closest('.item').getAttribute('data-value')) {
                  relocateArr.splice((relocateArr.indexOf(elemArr)), 1);
                  target.closest('.item').remove();
               }
            })

            if (relocateArr.length > 0) {
               relocateValue.textContent = relocateArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');
               writeCookie('relocate-value(new__resume__mobile)', JSON.stringify(relocateArr), 30)
            } else {
               relocateValue.textContent = 'Выберите страны'
               deleteCookie('relocate-value(new__resume__mobile)')
            }
         }

         // нажатие кнопки сбросить
         if (target === relocateListClear) {
            relocateValue.textContent = 'Выберите страны'
            relocateArr = []
            deleteCookie('relocate-value(new__resume__mobile)')
            relocateAddList.innerHTML = ''
            backgroundList.classList.remove('active')
            relocateList.classList.remove('active')
            bg__lock()
         }
      }
      clickRelocateBlock()

      // нажатие кнопок внутри блока
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.section__bottom') && target.closest('.step-5')) {
            clickBtnNext();
         }
         if (target.closest('.back-btn') && target.closest('.section__bottom') && target.closest('.step-5')) {
            clickBtnBack();
         }
      }
      clickBtn();
   })

   // получение данных при перезагрузке
   function loadOnlyRemoteWorkSwitcher() {
      if (readCookie('only-remote-work(new__resume__mobile)') !== undefined) {
         onlyRemoteWorkSwitcher.checked = true
         workFromatblock.classList.add('dont-click')
      }
   }
   function loadWorkformat() {
      if (readCookie('work-format(new__resume__mobile)') !== undefined) {
         workFormatArr = JSON.parse(readCookie('work-format(new__resume__mobile)'))

         workFormatArr.forEach(elemArr => {
            workFormatItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         workFromatValue.textContent = workFormatArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
      }
   }
   function loadSchedule() {
      if (readCookie('schedule(new__resume__mobile)') !== undefined) {
         scheduleArr = JSON.parse(readCookie('schedule(new__resume__mobile)'))

         scheduleArr.forEach(elemArr => {
            scheduleItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         scheduleValue.textContent = scheduleArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
      }
   }
   function loadWorkingMode() {
      if (readCookie('working-mode(new__resume__mobile)') !== undefined) {
         workingModeArr = JSON.parse(readCookie('working-mode(new__resume__mobile)'))

         workingModeArr.forEach(elemArr => {
            workingModeItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         workingModeValue.textContent = workingModeArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
      }
   }
   function loadBonuses() {
      if (readCookie('bonuses(new__resume__mobile)') !== undefined) {
         bonusesArr = JSON.parse(readCookie('bonuses(new__resume__mobile)'))
         bonusesListItems = backgroundList.querySelectorAll('.bonuses__list .item');

         bonusesArr.forEach(elemArr => {
            bonusesListItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         bonusesValue.textContent = bonusesArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
      }
   }
   function loadBusinessTrip() {
      if (readCookie('business-trips(new__resume__mobile)') !== undefined) {
         businessTripsItems.forEach(item => {
            if (item.getAttribute('data-name') === readCookie('business-trips(new__resume__mobile)')) {
               item.classList.add('active')
            }
         })
      }
   }
   function loadRelocateBlock() {
      if (readCookie('relocate(new__resume__mobile)') !== undefined) {
         relocateSwitcher.checked = true
         relocateBlock.classList.add('active')
      }

      if (readCookie('relocate-value(new__resume__mobile)') != undefined) {
         relocateArr = JSON.parse(readCookie('relocate-value(new__resume__mobile)'))
         relocateValue.textContent = relocateArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');

         relocateArr.forEach(elemArr => {
            let removeBtn = document.createElement('span')
            removeBtn.className = 'remove-btn'
            let item = document.createElement('p')
            item.className = 'item'
            item.textContent = elemArr
            item.setAttribute('data-value', elemArr)

            item.append(removeBtn)
            relocateAddList.append(item)
         })
      }
   }

   window.addEventListener("load", function load() {
      loadOnlyRemoteWorkSwitcher()
      loadWorkformat()
      loadSchedule()
      loadWorkingMode()
      loadBonuses()
      loadBusinessTrip()
      loadRelocateBlock()
   }, false);
});

