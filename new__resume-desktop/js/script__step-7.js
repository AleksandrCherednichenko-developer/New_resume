import scrollTo from './script__scroll-to.js';
import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let stepValue = document.querySelectorAll('.right__content .step__value');
   let scrollY;
   let background = document.querySelector('.background');
   let popupPublication = document.querySelector('.popup__publication');

   let step7 = document.querySelector('.left__content .step-7'),
      resumeVisibilityItems = step7.querySelectorAll('.resume-visibility input'),
      resumeVisibilityError = step7.querySelector('.error-message');

   let resumeShowCompanyBtn = step7.querySelector('.resume-show-company'),
      popupResumeShowCompany = document.querySelector('.popup__resume-show-company'),
      resumeShowCompanyInput = popupResumeShowCompany.querySelector('.resume-show-company__input input'),
      resumeShowCompanyInputList = popupResumeShowCompany.querySelector('.resume-show-company__input-list'),
      resumeShowCompanyArr = [],
      resumeShowCompanyList = popupResumeShowCompany.querySelector('.resume-show-company__list'),
      resumeShowCompanyCount = popupResumeShowCompany.querySelector('.resume-show-company__count'),
      resumeShowCompanyClear = popupResumeShowCompany.querySelector('.resume-show-company__clear');

   let resumeDontShowCompanyBtn = step7.querySelector('.resume-dont-show-company'),
      popupResumeDontShowCompany = document.querySelector('.popup__resume-dont-show-company'),
      resumeDontShowCompanyInput = popupResumeDontShowCompany.querySelector('.resume-dont-show-company__input input'),
      resumeDontShowCompanyInputList = popupResumeDontShowCompany.querySelector('.resume-dont-show-company__input-list'),
      resumeDontShowCompanyArr = [],
      resumeDontShowCompanyList = popupResumeDontShowCompany.querySelector('.resume-dont-show-company__list'),
      resumeDontShowCompanyCount = popupResumeDontShowCompany.querySelector('.resume-dont-show-company__count'),
      resumeDontShowCompanyClear = popupResumeDontShowCompany.querySelector('.resume-dont-show-company__clear');

   let resumeAnonymusCheckbox = step7.querySelector('.resume-anonymous__checkbox input');

   let resumeDontShow = step7.querySelector('.resume-dont-show__list'),
      resumeDontShowList = step7.querySelectorAll('.resume-dont-show__list .item'),
      resumeDontShowArr = [];

   let typePublicationItems = step7.querySelectorAll('.type__publication .item'),
      typePublicationItemsRadio = step7.querySelectorAll('.type__publication .item input'),
      typePublicationErrorMessage = step7.querySelector('.type__publication .error-message');

   let agreementCheckbox = step7.querySelector('.resume-agreement input');

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


   //скрывать сообщение об ошибке если оно показанно
   resumeVisibilityItems.forEach(item => {
      item.addEventListener('click', () => {
         if (!resumeVisibilityError.classList.contains('hide')) {
            resumeVisibilityError.classList.add('hide');
         }
      })
   })

   document.addEventListener('click', (event) => {
      let target = event.target;

      // выбор элемента из списка видимости резюме
      if (target.tagName == 'INPUT' && target.closest('.item') && target.closest('.resume-visibility')) {
         writeCookie('resume-visibility(new__resume)', target.closest('.item').getAttribute('data-value'), 30);
      }

      // функционал попапа видят моё резюме
      function clickPopupResumeShow() {
         // открыть попап
         if (target == resumeShowCompanyBtn) {
            scrollY = window.scrollY;
            scrollTo(popupResumeShowCompany, scrollY);
            background.classList.add('active');
            popupResumeShowCompany.classList.add('active');
         }

         // закрытие попапа
         if (target.closest('.close-popup') || target == background && popupResumeShowCompany.classList.contains('active')) {
            popupResumeShowCompany.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupResumeShowCompany, scrollY);
         }

         // ввод компании
         if (target == resumeShowCompanyInput) {
            resumeShowCompanyInput.addEventListener('input', () => {
               resumeShowCompanyInput.value = resumeShowCompanyInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (resumeShowCompanyInput.value.length >= 3) {
                  resumeShowCompanyInputList.classList.remove('hide');
               } else {
                  resumeShowCompanyInputList.classList.add('hide');
               }

               if (resumeShowCompanyInput.value.length > 0) {
                  resumeShowCompanyInput.classList.add('not-empty')
               } else {
                  resumeShowCompanyInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == resumeShowCompanyInputList) {
            resumeShowCompanyInput.value = '';
            resumeShowCompanyInputList.classList.add('hide');

            if (resumeShowCompanyArr.length < 15) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (resumeShowCompanyArr.indexOf(target.getAttribute('data-name')) == -1) {
                  resumeShowCompanyArr.push(target.getAttribute('data-name'));
                  writeCookie('resume-show-company(new__resume)', JSON.stringify(resumeShowCompanyArr), 30);
                  cloneItem.append(removeBtn);
                  resumeShowCompanyList.append(cloneItem);

                  resumeShowCompanyCount.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
                  resumeShowCompanyBtn.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
               }
               if (resumeShowCompanyArr != 0) {
                  resumeShowCompanyList.classList.remove('hide');
               } else {
                  resumeShowCompanyList.classList.add('hide');
               }
            }

            if (resumeShowCompanyArr.length > 0) {
               resumeShowCompanyClear.classList.remove('hide')
            }

            resumeShowCompanyInput.classList.remove('not-empty')
         } else if (!(target.closest('.item')) && target.parentNode !== resumeShowCompanyInputList && !(resumeShowCompanyInputList.classList.contains('hide'))) {
            resumeShowCompanyInput.value = '';
            resumeShowCompanyInputList.classList.add('hide');
         }

         // удаление элемента из Выбраных
         if (target.closest('.remove-btn') && target.closest('.item') && target.closest('.resume-show-company__list')) {
            target.closest('.item').remove();
            resumeShowCompanyArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  resumeShowCompanyArr.splice((resumeShowCompanyArr.indexOf(elemArr)), 1);
                  writeCookie('resume-show-company(new__resume)', JSON.stringify(resumeShowCompanyArr), 30);

                  resumeShowCompanyCount.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
                  resumeShowCompanyBtn.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
               }

               if (resumeShowCompanyArr == 0) {
                  resumeShowCompanyList.classList.add('hide');
                  deleteCookie('resume-show-company(new__resume)');

                  resumeShowCompanyCount.textContent = `Компании не Выбраны`
                  resumeShowCompanyBtn.textContent = `Указать компании`
               }
            })

            if (resumeShowCompanyArr.length == 0) {
               resumeShowCompanyClear.classList.add('hide')
            }
         }

         // нажатие кнопки сохранить
         if (target.closest('.save-btn') && target.closest('.popup__resume-show-company')) {
            popupResumeShowCompany.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupResumeShowCompany, scrollY);
         }

         // нажатие кнопки очистить
         if (target == resumeShowCompanyClear) {
            resumeShowCompanyList.querySelectorAll('.item').forEach(item => {
               item.remove();
            })
            resumeShowCompanyList.classList.add('hide')
            resumeShowCompanyClear.classList.add('hide')
            resumeShowCompanyArr = []

            deleteCookie('resume-show-company(new__resume)')

            resumeShowCompanyCount.textContent = `Компании не Выбраны`
            resumeShowCompanyBtn.textContent = `Компании не Выбраны`
         }
      }
      clickPopupResumeShow();

      // функционал попапа не видят моё резюме
      function clickPopupResumeDontShow() {
         // открыть попап
         if (target == resumeDontShowCompanyBtn) {
            scrollY = window.scrollY;
            scrollTo(popupResumeDontShowCompany, scrollY);
            background.classList.add('active');
            popupResumeDontShowCompany.classList.add('active');
         }

         // закрытие попапа
         if (target.closest('.close-popup') || target == background && popupResumeDontShowCompany.classList.contains('active')) {
            popupResumeDontShowCompany.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupResumeDontShowCompany, scrollY);
         }

         // ввод компании
         if (target == resumeDontShowCompanyInput) {
            resumeDontShowCompanyInput.addEventListener('input', () => {
               resumeDontShowCompanyInput.value = resumeDontShowCompanyInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (resumeDontShowCompanyInput.value.length >= 3) {
                  resumeDontShowCompanyInputList.classList.remove('hide');
               } else {
                  resumeDontShowCompanyInputList.classList.add('hide');
               }

               if (resumeDontShowCompanyInput.value.length > 0) {
                  resumeDontShowCompanyInput.classList.add('not-empty')
               } else {
                  resumeDontShowCompanyInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == resumeDontShowCompanyInputList) {
            resumeDontShowCompanyInput.value = '';
            resumeDontShowCompanyInputList.classList.add('hide');

            if (resumeDontShowCompanyArr.length < 15) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (resumeDontShowCompanyArr.indexOf(target.getAttribute('data-name')) == -1) {
                  resumeDontShowCompanyArr.push(target.getAttribute('data-name'));
                  writeCookie('resume-dont-show-company(new__resume)', JSON.stringify(resumeDontShowCompanyArr), 30);
                  cloneItem.append(removeBtn);
                  resumeDontShowCompanyList.append(cloneItem);

                  resumeDontShowCompanyCount.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
                  resumeDontShowCompanyBtn.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
               }
               if (resumeDontShowCompanyArr != 0) {
                  resumeDontShowCompanyList.classList.remove('hide');
               } else {
                  resumeDontShowCompanyList.classList.add('hide');
               }
            }

            if (resumeDontShowCompanyArr.length > 0) {
               resumeDontShowCompanyClear.classList.remove('hide')
            }

            resumeDontShowCompanyInput.classList.remove('not-empty')
         } else if (!(target.closest('.item')) && target.parentNode !== resumeDontShowCompanyInputList && !(resumeDontShowCompanyInputList.classList.contains('hide'))) {
            resumeDontShowCompanyInput.value = '';
            resumeDontShowCompanyInputList.classList.add('hide');
         }

         // удаление элемента из Выбраных
         if (target.closest('.remove-btn') && target.closest('.item') && target.closest('.resume-dont-show-company__list')) {
            target.closest('.item').remove();
            resumeDontShowCompanyArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  resumeDontShowCompanyArr.splice((resumeDontShowCompanyArr.indexOf(elemArr)), 1);
                  writeCookie('resume-dont-show-company(new__resume)', JSON.stringify(resumeDontShowCompanyArr), 30);

                  resumeDontShowCompanyCount.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
                  resumeDontShowCompanyBtn.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
               }

               if (resumeDontShowCompanyArr == 0) {
                  resumeDontShowCompanyList.classList.add('hide');
                  deleteCookie('resume-dont-show-company(new__resume)');

                  resumeDontShowCompanyCount.textContent = `Компании не Выбраны`
                  resumeShowCompanyBtn.textContent = `Указать компании`
               }
            })

            if (resumeDontShowCompanyArr.length == 0) {
               resumeDontShowCompanyClear.classList.add('hide')
            }
         }

         // нажатие кнопки сохранить
         if (target.closest('.save-btn') && target.closest('.popup__resume-dont-show-company')) {
            popupResumeDontShowCompany.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupResumeDontShowCompany, scrollY);
         }

         // нажатие кнопки очистить
         if (target == resumeDontShowCompanyClear) {
            resumeDontShowCompanyList.querySelectorAll('.item').forEach(item => {
               item.remove();
            })
            resumeDontShowCompanyArr = []

            resumeDontShowCompanyList.classList.add('hide')
            resumeDontShowCompanyClear.classList.add('hide')

            deleteCookie('resume-dont-show-company(new__resume)')

            resumeDontShowCompanyCount.textContent = `Компании не Выбраны`
            resumeDontShowCompanyBtn.textContent = `Компании не Выбраны`
         }
      }
      clickPopupResumeDontShow();

      // установка чекбока анонимное резюме
      if (target == resumeAnonymusCheckbox) {
         if (resumeAnonymusCheckbox.checked) {
            writeCookie('resume-anonymous__checkbox(new__resume)', true, 30);
            resumeDontShow.classList.remove('dont-click');
         } else {
            deleteCookie('resume-anonymous__checkbox(new__resume)');
            resumeDontShow.classList.add('dont-click');

            resumeDontShowList.forEach(item => {
               item.querySelector('input').checked = false;
            })
            resumeDontShowArr = []
            deleteCookie('resume-dont-show__list(new__resume)');
         }
      }

      // выбор элементов из списка не показывать
      function clickResumeDontShowList() {
         if (target.closest('.item') && target.closest('.resume-dont-show__list')) {
            if (target.closest('.item').querySelector('input').checked) {
               resumeDontShowArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('resume-dont-show__list(new__resume)', JSON.stringify(resumeDontShowArr), 30);
            } else {
               resumeDontShowArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     resumeDontShowArr.splice((resumeDontShowArr.indexOf(elemArr)), 1);
                     if (resumeDontShowArr.length != 0) {
                        writeCookie('resume-dont-show__list(new__resume)', JSON.stringify(resumeDontShowArr), 30);
                     } else {
                        deleteCookie('resume-dont-show__list(new__resume)');
                     }
                  }
               })
            }
         }
      }
      clickResumeDontShowList();

      // выбор типа публикации
      function clickTypePublication() {
         if (target.closest('.item') && target.closest('.type__publication')) {
            typePublicationItemsRadio.forEach(item => {
               item.checked = false
            })

            target.closest('.item').querySelector('input').checked = true;

            if (!(typePublicationErrorMessage.classList.contains('hide'))) {
               typePublicationErrorMessage.classList.add('hide');
            }

            writeCookie('type__publication(new__resume)', target.closest('.item').getAttribute('data-name'), 30);
         }
      }
      clickTypePublication();

      // установка чекбокса приняте пользовательских соглашений 
      if (target == agreementCheckbox) {
         if (agreementCheckbox.parentNode.classList.contains('error')) {
            agreementCheckbox.parentNode.classList.remove('error')
         }
      }

      // нажатие на кнопки поле ввода данных
      function clickBtn() {
         if (target.closest('.publish') && target.closest('.step-7')) {
            let validateCareerObjective = false
            let validateSpecialisation = false
            function validateStep1() {
               let step1 = document.querySelector('.left__content .step-1'),
                  careerObjectiveInput = step1.querySelector('.career-object__input input'),
                  careerObjectiveError = step1.querySelector('.career-object__error'),
                  specialisationError = step1.querySelector('.specialisation__promp');

               if (readCookie('career__objective__value(new__resume)') != undefined) {
                  validateCareerObjective = true
               } else {
                  careerObjectiveError.classList.remove('hide');
                  careerObjectiveInput.classList.add('error');
               }

               if (readCookie('popup-specialisation(new__resume)') != undefined) {
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
               let step4 = document.querySelector('.left__content .step-4'),
                  inputSurname = step4.querySelector('.initials__inner-input-surname'),
                  inputName = step4.querySelector('.initials__inner-input-name');

               if (readCookie('initial-surname(new__resume)') !== undefined) {
                  validateSurname = true
               } else {
                  inputSurname.classList.add('error')
               }

               if (readCookie('initial-name(new__resume)') !== undefined) {
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
               if (readCookie('type__publication(new__resume)') != undefined) {
                  validateTypePublication = true;
               } else {
                  typePublicationErrorMessage.classList.remove('hide');
               }

               resumeVisibilityItems.forEach(item => {
                  if (item.checked) {
                     validateResumeVisibility = true;
                  }
               })
               if (!validateResumeVisibility) {
                  resumeVisibilityError.classList.remove('hide');
               }

               if (agreementCheckbox.checked) {
                  validateAgreement = true;
               } else {
                  agreementCheckbox.parentNode.classList.add('error');
               }

               if (validateCareerObjective && validateSpecialisation && validateSurname && validateName && validateResumeVisibility && validateTypePublication && validateAgreement) {
                  scrollY = window.scrollY;
                  scrollTo(popupPublication, scrollY);
                  background.classList.add('active');
                  popupPublication.classList.add('active');

                  deleteCookie('resume-visibility(new__resume)')
                  deleteCookie('resume-show-company(new__resume)')
                  deleteCookie('resume-dont-show-company(new__resume)')
                  deleteCookie('resume-dont-show__list(new__resume)')
                  deleteCookie('relocation(new__resume)')
                  deleteCookie('resume-anonymous__checkbox(new__resume)')
                  deleteCookie('contact(new__resume)')
                  deleteCookie('work__format-checkbox(new__resume)')
                  deleteCookie('working__format(new__resume)')
                  deleteCookie('employment(new__resume)')
                  deleteCookie('schedule(new__resume)')
                  deleteCookie('bonuses-list(new__resume)')
                  deleteCookie('bisness-trip(new__resume)')
                  deleteCookie('relocation-possible(new__resume)')
                  deleteCookie('initial-surname(new__resume)')
                  deleteCookie('initial-name(new__resume)')
                  deleteCookie('iinitial-patronymic(new__resume)')
                  deleteCookie('description-text(new__resume)')
                  deleteCookie('day-of-birth__day(new__resume)')
                  deleteCookie('day-of-birth__month(new__resume)')
                  deleteCookie('day-of-birth__year(new__resume)')
                  deleteCookie('gender-value(new__resume)')
                  deleteCookie('city(new__resume)')
                  deleteCookie('underground(new__resume)')
                  deleteCookie('citizenship(new__resume)')
                  deleteCookie('work-permit(new__resume)')
                  deleteCookie('driver__license-list1(new__resume)')
                  deleteCookie('driver__license-list2(new__resume)')
                  deleteCookie('driver__license-checkbox(new__resume)')
                  deleteCookie('skill-value(new__resume)')
                  deleteCookie('education__checkbox(new__resume)')
                  deleteCookie('education(new__resume)')
                  deleteCookie('additional__education(new__resume)(new__resume)')
                  deleteCookie('experience(new__resume)')
                  deleteCookie('additional__education(new__resume)')
                  deleteCookie('no_experience-block(new__resume)')
                  deleteCookie('languages-native(new__resume)')
                  localStorage.removeItem('languages-value(new__resume)')
                  deleteCookie('popup-categories(new__resume)')
                  deleteCookie('popup-specialisation(new__resume)')
                  deleteCookie('career__objective__value(new__resume)')
                  deleteCookie('income(new__resume)')
                  deleteCookie('income-period(new__resume)')
                  deleteCookie('type__publication(new__resume)')
                  deleteCookie('place_work(new__resume)')
                  deleteCookie('income__period(new__resume)')
                  deleteCookie('income__currency(new__resume)')
                  deleteCookie('step-now(new__resume)')
               }
            }
            validateStep7()
         }

         if (target.closest('.back') && target.closest('.step-7')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });

   // получение данных при перезагрузке
   function loadResumeVisibility() {
      if (readCookie('resume-visibility(new__resume)') != undefined) {
         let resumeVisibilityItems = step7.querySelectorAll('.resume-visibility .item');
         resumeVisibilityItems.forEach(item => {
            if (item.getAttribute('data-value') == readCookie('resume-visibility(new__resume)')) {
               item.querySelector('input').checked = true;
            }
         })
      }
   }
   function loadAnonymusCheckbox() {
      if (readCookie('resume-anonymous__checkbox(new__resume)') != undefined) {
         resumeAnonymusCheckbox.checked = true;
         resumeDontShow.classList.remove('dont-click');

         if (readCookie('resume-dont-show__list(new__resume)') != undefined) {
            resumeDontShowArr = JSON.parse(readCookie('resume-dont-show__list(new__resume)'));

            resumeDontShowList.forEach(item => [
               resumeDontShowArr.forEach(elemArr => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            ])
         }
      }
   }
   function loadShowCompany() {
      if (readCookie('resume-show-company(new__resume)') !== undefined) {
         resumeShowCompanyArr = JSON.parse(readCookie('resume-show-company(new__resume)'))
         if (resumeShowCompanyArr.length != 0) {
            resumeShowCompanyList.classList.remove('hide')
            resumeShowCompanyArr.forEach(elemArr => {
               let item = `
               <p class="item" data-value="" data-name="${elemArr}">
                  ${elemArr}<span class="remove-btn"></span>
               </p>
               `;
               resumeShowCompanyList.insertAdjacentHTML('beforeend', item);
            })

            resumeShowCompanyCount.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
            resumeShowCompanyBtn.textContent = `${declOfNum(resumeShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeShowCompanyArr.length} ${declOfNum(resumeShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`

            resumeShowCompanyClear.classList.remove('hide')
         }
      }
   }
   function loadShowDontCompany() {
      if (readCookie('resume-dont-show-company(new__resume)') !== undefined) {
         resumeDontShowCompanyArr = JSON.parse(readCookie('resume-dont-show-company(new__resume)'))
         if (resumeDontShowCompanyArr.length != 0) {
            resumeDontShowCompanyList.classList.remove('hide')
            resumeDontShowCompanyArr.forEach(elemArr => {
               let item = `
               <p class="item" data-value="" data-name="${elemArr}">
                  ${elemArr}<span class="remove-btn"></span>
               </p>
               `;
               resumeDontShowCompanyList.insertAdjacentHTML('beforeend', item);
            })

            resumeDontShowCompanyCount.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`
            resumeDontShowCompanyBtn.textContent = `${declOfNum(resumeDontShowCompanyArr.length, ['Выбрана', 'Выбраны', 'Выбрано'])} ${resumeDontShowCompanyArr.length} ${declOfNum(resumeDontShowCompanyArr.length, ['компания', 'компании', 'компаний'])}`

            resumeDontShowCompanyClear.classList.remove('hide')
         }
      }
   }
   function loadTypePublication() {
      if (readCookie('type__publication(new__resume)') !== undefined) {
         typePublicationItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('type__publication(new__resume)')) {
               item.querySelector('input').checked = true;
            }
         })
      }
   }

   window.addEventListener('load', function load() {
      loadResumeVisibility();
      loadAnonymusCheckbox();
      loadShowCompany();
      loadShowDontCompany();
      loadTypePublication();
   }, false);
})