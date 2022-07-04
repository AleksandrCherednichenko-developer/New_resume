import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let stepValue = document.querySelectorAll('.main__wrapper .step .step__value');
   let step7 = document.querySelector('.step__inner .step-7');
   let backgroundList = document.querySelector('.background-list');
   let backgroundModal = document.querySelector('.background-modal');

   let typePublicationName = step7.querySelector('.type__publication .type__publication-title'),
      typePublicationInfo = step7.querySelector('.type__publication .type__publication-text'),
      typePublicationModalItems = document.querySelectorAll('.type__publication-modal .inner .item'),
      typePublicationError = step7.querySelector('.type__publication-error');
   let publishClass = '.type__publication',
      publishModal = document.querySelector('.modal-window .type__publication-modal'),
      publishModalInner = document.querySelector('.modal-window .type__publication-modal .inner'),
      publishModalInnerClass = '.modal-window .type__publication-modal .inner',
      publishModalClose = document.querySelector('.modal-window .type__publication-modal-close');
   mobileModal(backgroundModal, publishClass, publishModal, publishModalInner, publishModalInnerClass, publishModalClose);

   let visibilityName = step7.querySelector('.visibility .visibility-title'),
      visibilityInfo = step7.querySelector('.visibility .visibility-text'),
      visibilityModalItems = document.querySelectorAll('.visibility-modal .inner .item'),
      visibilityError = step7.querySelector('.visibility-error'),
      visibilityCompany = step7.querySelector('.visibility-company'),
      visibilityCompanyList = backgroundList.querySelector('.visibility-company__list'),
      visibilityCompanyInput = visibilityCompanyList.querySelector('.visibility-company__input input'),
      visibilityCompanyInputList = visibilityCompanyList.querySelector('.visibility-company__input .list'),
      visibilityCompanyAddList = visibilityCompanyList.querySelector('.visibility-company__add-list'),
      visibilityCompanyClose = visibilityCompanyList.querySelector('.list__title button'),
      visibilityCompanyClear = visibilityCompanyList.querySelector('.list__bottom .clear'),
      visibilityCompanySave = visibilityCompanyList.querySelector('.list__bottom .save'),
      visibilityCompanyArr = [];
   let visibilityClass = '.visibility-block',
      visibilityModal = document.querySelector('.modal-window .visibility-modal'),
      visibilityModalInner = document.querySelector('.modal-window .visibility-modal .inner'),
      visibilityModalInnerClass = '.modal-window .visibility-modal .inner',
      visibilityModalClose = document.querySelector('.modal-window .visibility-modal-close');
   mobileModal(backgroundModal, visibilityClass, visibilityModal, visibilityModalInner, visibilityModalInnerClass, visibilityModalClose);

   let anonymitySwitcher = step7.querySelector('.anonymity-switcher input'),
      anonymityBlock = step7.querySelector('.anonymity-block'),
      anonymityValue = step7.querySelector('.anonymity-block p'),
      anonymityItems = document.querySelectorAll('.anonymity-modal .item'),
      anonymityArr = [];
   let anonymityBtnClass = '.anonymity-block',
      anonymityModal = document.querySelector('.modal-window .anonymity-modal'),
      anonymityModalInner = document.querySelector('.modal-window .anonymity-modal .inner'),
      anonymityModalInnerClass = '.modal-window .anonymity-modal .inner',
      anonymityModalClose = document.querySelector('.modal-window .anonymity-modal-close');
   mobileModal(backgroundModal, anonymityBtnClass, anonymityModal, anonymityModalInner, anonymityModalInnerClass, anonymityModalClose);
   let anonymityClear = anonymityModal.querySelector('.modal__button .clear'),
      anonymitySave = anonymityModal.querySelector('.modal__button .apply');

   let agreementCheckbox = step7.querySelector('.agreement-checkbox input');

   let successModal = document.querySelector('.modal-window .success-modal'),
      successModalcareerObjectiveValue = successModal.querySelector('h6 span');

   function declOfNum(n, text_forms) {
      n = Math.abs(n) % 100;
      var n1 = n % 10;
      if (n > 10 && n < 20) {
         return text_forms[2];
      }
      if (n1 > 1 && n1 < 5) {
         return text_forms[1];
      }
      if (n1 == 1) {
         return text_forms[0];
      }
      return text_forms[2];
   };


   document.addEventListener('click', (event) => {
      let target = event.target;
      // нажатия в модальном окне видимость резюме
      function clickVisibilityModal() {
         if (target.closest('.visibility-block') && !visibilityError.classList.contains('hide')) {
            visibilityError.classList.add('hide')
         }

         if (target.closest('.item') && target.closest('.visibility-modal')) {
            visibilityModalItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            visibilityName.textContent = target.closest('.item').getAttribute('data-name');
            visibilityInfo.textContent = target.closest('.item').getAttribute('data-info')
            writeCookie('visibility-resume(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30);

            visibilityModal.classList.remove('active');
            backgroundModal.classList.remove('active');
            enableScroll();

            // показывать блок с добавленными компаниями
            if (target.closest('.item').getAttribute('data-name') === 'Видно выбранным компаниям' ||
               target.closest('.item').getAttribute('data-name') === 'Скрыто от выбранных компаний, видно остальным') {
               visibilityCompany.classList.remove('hide')
               visibilityCompanyAddList.textContent = ''
               visibilityCompany.textContent = 'Указать компании'
               visibilityCompanyArr = []
               deleteCookie('visibility-company(new__resume__mobile)')
            } else {
               visibilityCompany.classList.add('hide')
               visibilityCompanyAddList.textContent = ''
               visibilityCompany.textContent = 'Указать компании'
               visibilityCompanyArr = []
               deleteCookie('visibility-company(new__resume__mobile)')
            }
         }

         // открытие окна с добавлением компаний
         if (target === visibilityCompany) {
            visibilityCompanyList.classList.add('active')
            backgroundList.classList.add('active')
            bg__lock();
         }

         // закрытие окна с добавлением компаний
         if (target === visibilityCompanyClose || target === visibilityCompanySave) {
            visibilityCompanyList.classList.remove('active')
            backgroundList.classList.remove('active')
            bg__unlock();
         }

         // нажатие кнопки сбросить в окне с добавлением компаний
         if (target === visibilityCompanyClear) {
            visibilityCompanyAddList.textContent = ''
            visibilityCompany.textContent = 'Указать компании'
            visibilityCompanyArr = []
            deleteCookie('visibility-company(new__resume__mobile)')

            visibilityCompanyList.classList.remove('active')
            backgroundList.classList.remove('active')
            bg__unlock();
         }

         // ввод названия компаний 
         if (target == visibilityCompanyInput) {
            visibilityCompanyInput.addEventListener('input', () => {
               if (visibilityCompanyInput.value.length > 2) {
                  visibilityCompanyInputList.classList.remove('hide')
               } else {
                  visibilityCompanyInputList.classList.add('hide')
               }
            })
         } else if (!visibilityCompanyInputList.classList.contains('hide')) {
            visibilityCompanyInputList.classList.add('hide')
            visibilityCompanyInput.value = ''
         }

         // нажатие на варианты предложенные из списка
         if (target.closest('.item') && target.parentNode === visibilityCompanyInputList) {
            if (visibilityCompanyArr.length < 3) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (visibilityCompanyArr.indexOf(target.getAttribute('data-value')) == -1) {
                  visibilityCompanyArr.push(target.getAttribute('data-value'));
                  cloneItem.append(removeBtn);
                  visibilityCompanyAddList.append(cloneItem);
                  writeCookie('visibility-company(new__resume__mobile)', JSON.stringify(visibilityCompanyArr), 30);
               }

               visibilityCompany.textContent = `${declOfNum(visibilityCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${visibilityCompanyArr.length} ${declOfNum(visibilityCompanyArr.length, ['компания', 'компании', 'компаний'])}`
            }
         }

         // удаление элементов нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.visibility-company__add-list')) {
            target.closest('.item').remove();
            visibilityCompanyArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-value')) {
                  visibilityCompanyArr.splice((visibilityCompanyArr.indexOf(elemArr)), 1);
               }
            })

            if (visibilityCompanyArr.length !== 0) {
               visibilityCompany.textContent = `${declOfNum(visibilityCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${visibilityCompanyArr.length} ${declOfNum(visibilityCompanyArr.length, ['компания', 'компании', 'компаний'])}`
               writeCookie('visibility-company(new__resume__mobile)', JSON.stringify(visibilityCompanyArr), 30);
            } else {
               visibilityCompany.textContent = 'Указать компании'
               deleteCookie('visibility-company(new__resume__mobile)');
            }
         }
      }
      clickVisibilityModal();

      // нажатие в модальном окне анонимное резюме
      function clickAnonymityBlock() {
         if (target === anonymitySwitcher) {
            if (anonymitySwitcher.checked) {
               anonymityBlock.classList.add('active')
               writeCookie('anonymity(new__resume__mobile)', true, 30)
            } else {
               anonymityBlock.classList.remove('active')
               deleteCookie('anonymity(new__resume__mobile)')
            }
         }

         // нажатие на элементы в модальном окне
         if (target.tagName === 'INPUT' && target.closest('.item') && target.closest('.anonymity-modal')) {
            if (target.checked) {
               anonymityArr.push(target.closest('.item').getAttribute('data-value'))
            } else {
               anonymityArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     anonymityArr.splice((anonymityArr.indexOf(elemArr)), 1);
                  }
               })
            }

            if (anonymityArr.length != 0) {
               anonymityValue.textContent = anonymityArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
               writeCookie('anonymity-value(new__resume__mobile)', JSON.stringify(anonymityArr), 30)
            } else {
               anonymityValue.textContent = 'Выберите то что хотите скрыть'
               deleteCookie('anonymity-value(new__resume__mobile)')
            }
         }

         // нажатие кнопки сбросить
         if (target === anonymityClear) {
            anonymityItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            anonymityValue.textContent = 'Выберите то что хотите скрыть'
            anonymityArr = []
            deleteCookie('anonymity-value(new__resume__mobile)')
            backgroundModal.classList.remove('active')
            anonymityModal.classList.remove('active')
            enableScroll()
         }

         // нажатие кнопки применить
         if (target === anonymitySave) {
            backgroundModal.classList.remove('active')
            anonymityModal.classList.remove('active')
            enableScroll()
         }
      }
      clickAnonymityBlock()

      // нажатия в модальном окне тип публикации
      function clickTypePublicationModal() {
         if (target.closest('.type__publication') && !typePublicationError.classList.contains('hide')) {
            typePublicationError.classList.add('hide')
         }

         if (target.closest('.item') && target.closest('.type__publication-modal')) {
            typePublicationModalItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            typePublicationName.textContent = target.closest('.item').getAttribute('data-name');
            typePublicationInfo.textContent = target.closest('.item').getAttribute('data-info') + '. ' + target.closest('.item').getAttribute('data-period');
            writeCookie('type__publication(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30);

            publishModal.classList.remove('active');
            backgroundModal.classList.remove('active');
            enableScroll();
         }
      }
      clickTypePublicationModal();

      if (target === agreementCheckbox && target.parentNode.classList.contains('error')) {
         target.parentNode.classList.remove('error')
      }

      // нажатие на кнопки внутри блока
      function clickBtn() {
         if (target.closest('.publised-btn') && target.closest('.section__bottom') && target.closest('.step-7')) {
            let validateCareerObjective = false
            let validateSpecialisation = false
            function validateStep1() {
               let step1 = document.querySelector('.step__inner .step-1'),
                  careerObjectiveInput = step1.querySelector('.career-object__input input'),
                  careerObjectiveError = step1.querySelector('.career-object__error'),
                  specialisationError = step1.querySelector('.vacancy__specialisation-error');

               if (readCookie('career__objective__value(new__resume__mobile)') != undefined) {
                  validateCareerObjective = true
               } else {
                  careerObjectiveError.classList.remove('hide');
                  careerObjectiveInput.classList.add('error');
               }

               if (readCookie('specialisation(new__resume__mobile)') != undefined) {
                  validateSpecialisation = true;
               } else {
                  specialisationError.classList.remove('hide')
               }

               if (!validateCareerObjective || !validateSpecialisation) {
                  stepValue.forEach(step => {
                     if (step.getAttribute('data-value') == '1') {
                        step.classList.add('error');
                     }
                  })
               } else {
                  stepValue.forEach(step => {
                     if (step.getAttribute('data-value') == '1') {
                        if (step.classList.contains('error')) {
                           step.classList.remove('error');
                        }
                     }
                  })
               }

            }
            validateStep1()

            let validateSurname = false
            let validateName = false
            function validateStep4() {
               let step4 = document.querySelector('.step__inner .step-4'),
                  inputSurname = step4.querySelector('.personal__information .surname'),
                  inputName = step4.querySelector('.personal__information .name');

               if (readCookie('initial-surname(new__resume__mobile)') !== undefined) {
                  validateSurname = true
               } else {
                  inputSurname.classList.add('error')
               }

               if (readCookie('initial-name(new__resume__mobile)') !== undefined) {
                  validateName = true
               } else {
                  inputName.classList.add('error')
               }

               if (!validateSurname || !validateName) {
                  stepValue.forEach(step => {
                     if (step.getAttribute('data-value') == '4') {
                        step.classList.add('error');
                     }
                  })
               } else {
                  stepValue.forEach(step => {
                     if (step.getAttribute('data-value') == '4') {
                        if (step.classList.contains('error')) {
                           step.classList.remove('error');
                        }
                     }
                  })
               }
            }
            validateStep4()

            let validateResumeVisibility = false;
            let validateTypePublication = false;
            let validateAgreement = false;
            function validateStep7() {
               if (readCookie('type__publication(new__resume__mobile)') != undefined) {
                  validateTypePublication = true;
               } else {
                  typePublicationError.classList.remove('hide');
               }


               if (readCookie('visibility-resume(new__resume__mobile)') != undefined) {
                  validateResumeVisibility = true;
               } else {
                  visibilityError.classList.remove('hide');
               }

               if (agreementCheckbox.checked) {
                  validateAgreement = true;
               } else {
                  agreementCheckbox.parentNode.classList.add('error');
               }

               if (validateCareerObjective && validateSpecialisation && validateSurname && validateName && validateResumeVisibility && validateTypePublication && validateAgreement) {
                  backgroundList.classList.add('active')
                  successModal.classList.add('active')
                  successModalcareerObjectiveValue.textContent = readCookie('career__objective__value(new__resume__mobile)')
                  bg__lock();

                  deleteCookie('step-now(new__vacancy__mobile)')
                  deleteCookie('career__objective__value(new__resume__mobile)')
                  deleteCookie('income(new__resume__mobile)')
                  deleteCookie('income__currency(new__resume__mobile)')
                  deleteCookie('income__period((new__resume__mobile)')
                  deleteCookie('categories(new__resume__mobile)')
                  deleteCookie('specialisation(new__resume__mobile)')
                  deleteCookie('experience(new__resume__mobile)')
                  deleteCookie('no__experience__block(new__resume__mobile)')
                  deleteCookie('place_work(new__resume__mobile)')
                  deleteCookie('skill-value(new__resume__mobile)')
                  deleteCookie('languages-native(new__resume__mobile)')
                  localStorage.removeItem('languages-value(new__resume__mobile)')
                  deleteCookie('languages__name(new__vacancy__mobile)')
                  deleteCookie('education__switcher(new__resume__mobile)')
                  deleteCookie('education(new__resume__mobile)')
                  deleteCookie('additional__education(new__resume__mobile)')
                  deleteCookie('initial-surname(new__resume__mobile)')
                  deleteCookie('initial-name(new__resume__mobile)')
                  deleteCookie('initial-patronymic(new__resume__mobile)')
                  deleteCookie('day-of-birth__day(new__resume__mobile)')
                  deleteCookie('day-of-birth__month(new__resume__mobile)')
                  deleteCookie('day-of-birth__year(new__resume__mobile)')
                  deleteCookie('gender-value(new__resume__mobile)')
                  deleteCookie('user-city(new__resume__mobile)')
                  deleteCookie('citizenship(new__resume__mobile)')
                  deleteCookie('work-permit(new__resume__mobile)')
                  deleteCookie('description-text(new__resume__mobile)')
                  deleteCookie('driver__license-list1(new__resume__mobile)')
                  deleteCookie('driver__license-checkbox(new__resume__mobile)')
                  deleteCookie('driver__license-list2(new__resume__mobile)')
                  deleteCookie('only-remote-work(new__resume__mobile)')
                  deleteCookie('work-format(new__resume__mobile)')
                  deleteCookie('schedule(new__resume__mobile)')
                  deleteCookie('working-mode(new__resume__mobile)')
                  deleteCookie('bonuses(new__resume__mobile)')
                  deleteCookie('business-trips(new__resume__mobile)')
                  deleteCookie('relocate(new__resume__mobile)')
                  deleteCookie('relocate-value(new__resume__mobile)')
                  deleteCookie('contact(new__resume__mobile)')
                  deleteCookie('type__publication(new__resume__mobile)')
                  deleteCookie('visibility-resume(new__resume__mobile)')
                  deleteCookie('anonymity(new__resume__mobile)')
                  deleteCookie('anonymity-value(new__resume__mobile)')
               }
            }
            validateStep7()
         }
         if (target.closest('.back-btn') && target.closest('.section__bottom') && target.closest('.step-7')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   // получение данных при перезагрузке
   function loadTypePublication() {
      if (readCookie('type__publication(new__resume__mobile)') != undefined) {
         typePublicationModalItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('type__publication(new__resume__mobile)')) {
               typePublicationModalItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               typePublicationName.textContent = item.getAttribute('data-name')
               typePublicationInfo.textContent = item.getAttribute('data-info') + '. ' + item.getAttribute('data-period')
            }
         })
      }
   }
   function loadVisibility() {
      if (readCookie('visibility-resume(new__resume__mobile)') != undefined) {
         visibilityModalItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('visibility-resume(new__resume__mobile)')) {
               visibilityModalItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               visibilityName.textContent = item.getAttribute('data-name')
               visibilityInfo.textContent = item.getAttribute('data-info')

               // показывать блок с добавленными компаниями
               if (item.getAttribute('data-name') === 'Видно выбранным компаниям' ||
                  item.getAttribute('data-name') === 'Скрыто от выбранных компаний, видно остальным') {
                  visibilityCompany.classList.remove('hide')

                  if (readCookie('visibility-company(new__resume__mobile)') != undefined) {
                     visibilityCompanyArr = JSON.parse(readCookie('visibility-company(new__resume__mobile)'))
                     visibilityCompanyArr.forEach(elemArr => {
                        let undergroundItem = `
                           <p class="item" data-value='${elemArr}'>
                              ${elemArr}<span class="remove-btn"></span>
                           </p>
                           `;
                        visibilityCompanyAddList.insertAdjacentHTML('beforeend', undergroundItem);
                     })

                     visibilityCompany.textContent = `${declOfNum(visibilityCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${visibilityCompanyArr.length} ${declOfNum(visibilityCompanyArr.length, ['компания', 'компании', 'компаний'])}`
                  }
               } else {
                  visibilityCompany.classList.add('hide')
               }
            }
         })
      }
   }
   function loadAnonymity() {
      if (readCookie('anonymity(new__resume__mobile)') !== undefined) {
         anonymitySwitcher.checked = true
         anonymityBlock.classList.add('active')
      }
      if (readCookie('anonymity-value(new__resume__mobile)') !== undefined) {
         anonymityArr = JSON.parse(readCookie('anonymity-value(new__resume__mobile)'))

         anonymityArr.forEach(elemArr => {
            anonymityItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         anonymityValue.textContent = anonymityArr.map(n => n.replace(/./, m => m.toUpperCase())).join('; ')
      }
   }
   window.addEventListener('load', function load() {
      loadTypePublication();
      loadVisibility();
      loadAnonymity();
   }, false);
})