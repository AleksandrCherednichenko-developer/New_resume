import scrollTo from './script__scroll-to.js';
import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { inputNumber } from './script__input-number.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let scrollY;
   let background = document.querySelector('.background');

   let step1 = document.querySelector('.left__content .step-1');

   let careerObjectiveInput = step1.querySelector('.career-object__input input'),
      careerObjectiveInputList = step1.querySelector('.career-object__input-list'),
      careerObjectiveInputClear = step1.querySelector('.career-object__input-clear'),
      careerObjectiveInputListItems,
      careerObjectiveArray = [
         'продавец',
         'кассир',
         'слесарь',
         'сантехник',
         'строитель',
         'проектировщик',
         'сварщих',
         'крановщик',
         'разнорабочий',
         'механник',
         'повар',
         'кондитер',
         'дизайнер',
         'руководитель проекта',
         'сборщик',
         'веерстальщик',
         'директор',
         'тестировщик',
         'уборщик'
      ],
      careerObjectiveValue,
      careerObjectiveError = step1.querySelector('.career-object__error'),
      careerObjectiveDefaultList = step1.querySelector('.career-object__default'),
      careerObjectiveDefaultItems = step1.querySelectorAll('.career-object__default .item');

   let incomeInput = step1.querySelector('.income__input'),
      incomePeriodHeader = step1.querySelector('.income__period-select .header'),
      incomePeriodList = step1.querySelector('.income__period-select .list'),
      incomePeriodListItems = incomePeriodList.querySelectorAll('.item'),
      incomeCurrencyHeader = step1.querySelector('.income__currency-select .header'),
      incomeCurrencyList = step1.querySelector('.income__currency-select .list'),
      incomeCurrencyListItems = incomeCurrencyList.querySelectorAll('.item');

   let specialisationPromp = step1.querySelector('.specialisation__promp'),
      specialisationList = step1.querySelector('.specialisation__list'),
      specialisationListItem = step1.querySelector('.specialisation__list .specialisation__item'),
      btnChangeSpecialisation = step1.querySelector('.specialisation .specialisation__change-btn');

   let popupCategories = document.querySelector('.popup__categories'),
      popupCategoriesItem,
      popupCategoriesClearBtn = popupCategories.querySelector('.clear'),
      popupCategoriesNextBtn = popupCategories.querySelector('.next'),
      popupCategoriesSearchBtn = popupCategories.querySelector('.search');

   let popupSpecialisation = document.querySelector('.popup__specialisation'),
      popupSpecialisationItem,
      popupSpecialisationClearBtn = popupSpecialisation.querySelector('.clear'),
      popupSpecialisationSaveBtn = popupSpecialisation.querySelector('.save'),
      popupSpecialisationBtnBack = popupSpecialisation.querySelector('.btn-back'),
      popupSpecialisationActiveCategories = popupSpecialisation.querySelector('.categories-active');


   // добавить элементы из массива в список
   careerObjectiveArray.forEach(elemArr => {
      let listItem = document.createElement('p');
      listItem.className = "item";
      listItem.innerHTML = elemArr;
      careerObjectiveInputList.append(listItem)
   })


   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод желаемой должности
      function inputCareerObjective() {
         // ввод значений в поле ввода
         if (target == careerObjectiveInput) {
            // если есть сообщение об ошибке то убрать его
            if (careerObjectiveInput.classList.contains('error')) {
               careerObjectiveInput.classList.remove('error');
               careerObjectiveError.classList.add('hide');
            }

            // ввод значения в поле
            careerObjectiveInput.addEventListener('input', () => {
               let inputValue = careerObjectiveInput.value.replace(/[^a-zа-яё0-9.,-/:'"()+ ]/ig, '');
               careerObjectiveInput.value = inputValue;
               careerObjectiveInputListItems = careerObjectiveInputList.querySelectorAll('.item');
               let count = 0
               writeCookie('career__objective__value(new__resume)', careerObjectiveInput.value, 30);

               // выделить значение если оно есть в стандартных должностях
               careerObjectiveDefaultItems.forEach(item => {
                  if (item.getAttribute('data-value').toLowerCase() == inputValue.toLowerCase()) {
                     item.classList.add('active')
                  } else {
                     item.classList.remove('active')
                  }
               })

               if (inputValue != '' && inputValue.length > 1) {
                  careerObjectiveInputClear.classList.remove('hide');
                  careerObjectiveInputList.classList.remove('hide');
                  careerObjectiveInputListItems.forEach(item => {
                     if (item.textContent.toLowerCase() !== inputValue.toLowerCase() && item.textContent.search(inputValue) == -1) {
                        item.classList.add('hide');
                        item.innerHTML = item.innerHTML;

                        // скрывать список если нет похожих элементов
                        count++
                        if (count == careerObjectiveInputListItems.length) {
                           careerObjectiveInputList.classList.add('hide');
                        }
                     } else {
                        item.classList.remove('hide');

                        // скрывать список если нет похожих элементов
                        count--
                        if (count == careerObjectiveInputListItems.length) {
                           careerObjectiveInputList.classList.add('hide');
                        }

                        let str = item.textContent;
                        item.innerHTML = insertMark(str, item.textContent.search(inputValue), inputValue.length)
                     }
                  })
               } else {
                  careerObjectiveInputList.classList.add('hide');
                  careerObjectiveInputListItems.forEach(function (item) {
                     item.classList.remove('hide')
                     item.innerHTML = item.innerHTML;
                  })
               }

               if (inputValue.length == 0) {
                  careerObjectiveInput.classList.remove('not-empty');
                  careerObjectiveInputClear.classList.add('hide');
                  deleteCookie('career__objective__value(new__resume)');
               } else {
                  careerObjectiveInput.classList.add('not-empty');
               }
            })

            // выделение совпавших символов при вводе данных в поле ключевых навыков
            function insertMark(str, pos, len) {
               return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark >' + str.slice(pos + len);
            }

            // добавлять элементы нажатием клавиши enter
            careerObjectiveInput.addEventListener('keydown', (e) => {
               if (e.keyCode == 13 && careerObjectiveInput.value.length > 2) {
                  if (careerObjectiveInput.value.replace(/\s+/g, ' ') != ' ') {
                     writeCookie('career__objective__value(new__resume)', careerObjectiveInput.value, 30);
                  }
               }
            })
         } else {
            if (!(careerObjectiveInputList.classList.contains('hide'))) {
               careerObjectiveInputListItems = careerObjectiveInputList.querySelectorAll('.item');
               careerObjectiveInputListItems.forEach(item => {
                  item.classList.remove('hide')
                  item.innerHTML = item.innerHTML;
               })
               careerObjectiveInputList.classList.add('hide');
            }
         }

         // нажатие на элементы предложенные из списка
         if (target.closest('.item') && target.parentNode == careerObjectiveInputList) {
            careerObjectiveInputList.classList.add('hide');
            careerObjectiveValue = (target.textContent)[0].toUpperCase() + (target.textContent).slice(1);
            careerObjectiveInput.value = careerObjectiveValue;
            writeCookie('career__objective__value(new__resume)', careerObjectiveValue, 30);
         }

         // нажатие на стандарные должности
         if (target.closest('.item') && target.parentNode == careerObjectiveDefaultList) {
            // если есть сообщение об ошибке то убрать его
            if (careerObjectiveInput.classList.contains('error')) {
               careerObjectiveInput.classList.remove('error');
               careerObjectiveError.classList.add('hide');
            }

            careerObjectiveDefaultItems.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.item').classList.toggle('active')

            careerObjectiveValue = (target.textContent)[0].toUpperCase() + (target.textContent).slice(1);
            careerObjectiveInput.value = careerObjectiveValue
            writeCookie('career__objective__value(new__resume)', careerObjectiveValue, 30);

            if (!(careerObjectiveInput.classList.contains('not-empty'))) {
               careerObjectiveInput.classList.add('not-empty')
               careerObjectiveInputClear.classList.remove('hide')
            }
         }

         // очистка поля нажатием на крестик
         if (target == careerObjectiveInputClear) {
            // если должность выбранна из стандартного списка то очистьб её
            careerObjectiveDefaultItems.forEach(item => {
               if (item.classList.contains('active')) {
                  item.classList.remove('active')
               }
            })

            careerObjectiveInput.classList.remove('not-empty');
            careerObjectiveValue = '';
            careerObjectiveInput.value = careerObjectiveValue;
            deleteCookie('career__objective__value(new__resume)');
            careerObjectiveInputClear.classList.add('hide');
         }
      }
      inputCareerObjective();

      // ввод зарплаты
      function inputIncome() {
         incomeInput.addEventListener('input', () => {
            inputNumber(incomeInput)

            if (incomeInput.value.length > 0) {
               writeCookie('income(new__resume)', incomeInput.value, 30);
               incomeInput.classList.add('not-empty');
            } else {
               deleteCookie('income(new__resume)');
               incomeInput.classList.remove('not-empty');
            }
         })
      }
      inputIncome();

      // выпадающий список периода дохода
      function clickSelect(headerName, listName, listItems, cookieName) {
         // открытие списка
         if (target == headerName || target.parentNode == headerName) {
            listName.classList.toggle('hide');
         } else {
            if (!(listName.classList.contains('hide'))) {
               listName.classList.add('hide');
            }
         }

         // нажатие на элементы из выпадающего списка
         if (target.closest('.item') && target.parentNode == listName) {
            listItems.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.item').classList.add('active');

            headerName.setAttribute('data-name', target.closest('.item').getAttribute('data-name'))
            headerName.querySelector('.item').textContent = target.closest('.item').textContent
            writeCookie(cookieName, target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      clickSelect(incomePeriodHeader, incomePeriodList, incomePeriodListItems, 'income__period(new__resume)')
      clickSelect(incomeCurrencyHeader, incomeCurrencyList, incomeCurrencyListItems, 'income__currency(new__resume)')

      // нажатия в popup Категории
      function clickPopupCategories() {

         // нажатие на кнопку изменить специализацию
         if (target == btnChangeSpecialisation) {
            background.classList.add('active');
            popupCategories.classList.add('active');
            scrollY = window.scrollY;
            scrollTo(popupCategories, scrollY);

            if (!(specialisationPromp.classList.contains('hide'))) {
               specialisationPromp.classList.add('hide')
            }
         }
         // нажатие на фон или нажатие на крестик
         if (target == background && popupCategories.classList.contains('active') || target.closest('.close-popup') && target.closest('.popup__categories')) {
            background.classList.remove('active');
            if (popupCategories.classList.contains('active')) {
               popupCategories.classList.remove('active');
               scrollTo(popupCategories, scrollY);
            }
         }

         // нажатие на элементы из списка в popup Категории
         if (target.closest('.item') && target.closest('.popup__categories')) {
            popupCategoriesItem = popupCategories.querySelectorAll('.item');
            popupCategoriesItem.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');
            popupSpecialisationActiveCategories.textContent = target.closest('.item').querySelector('p').textContent;

            if (target.getAttribute('data-value') == 'all') {
               popupCategoriesClearBtn.disabled = false
               popupCategoriesNextBtn.disabled = true
               popupCategoriesSearchBtn.disabled = false
               popupCategoriesNextBtn.classList.add('hide');
               popupCategoriesSearchBtn.classList.remove('hide');
            } else {
               popupCategoriesClearBtn.disabled = false
               popupCategoriesNextBtn.disabled = false
               popupCategoriesSearchBtn.disabled = true
               popupCategoriesNextBtn.classList.remove('hide');
               popupCategoriesSearchBtn.classList.add('hide');
            }

            writeCookie('popup-categories(new__resume)', target.closest('.item').getAttribute('data-value'), 30);

            // убрать элемент из списка специализаций при смене категорий
            specialisationListItem.textContent = '';
            specialisationListItem.setAttribute('data-value', '');
            specialisationList.classList.add('hide');
            // убрать все checkbox в popup Специализации при смене категории
            popupSpecialisationItem = popupSpecialisation.querySelectorAll('.item');
            popupSpecialisationItem.forEach(item => {
               item.querySelector('input').checked = false;
            })
            deleteCookie('popup-specialisation(new__resume)');
         }

         // нажатие на кнопку Сбросить
         if (target == popupCategoriesClearBtn) {
            popupCategoriesItem = popupCategories.querySelectorAll('.item');
            popupCategoriesItem.forEach(item => {
               item.classList.remove('active');
            })

            background.classList.remove('active');
            popupCategories.classList.remove('active')

            popupCategoriesClearBtn.disabled = true
            popupCategoriesNextBtn.disabled = true
            popupCategoriesSearchBtn.disabled = true

            deleteCookie('popup-categories(new__resume)');

            // убрать элемент из списка специализаций при нажатии кнопки сбросить в popup Категории
            specialisationListItem.textContent = '';
            specialisationListItem.setAttribute('data-value', '');
            specialisationList.classList.add('hide');

            deleteCookie('popup-specialisation(new__resume)');
         }

         // нажатие на кнопку Далее
         if (target == popupCategoriesNextBtn) {
            popupCategories.classList.remove('active');
            popupSpecialisation.classList.add('active');
         }
      }
      clickPopupCategories();

      // нажатие в popup Специализации
      function clickPopupSpecialisation() {
         // нажатие на фон или нажатие на крестик
         if (target == background && popupSpecialisation.classList.contains('active') || target.closest('.close-popup') && target.closest('.popup__specialisation')) {
            background.classList.remove('active');
            if (popupSpecialisation.classList.contains('active')) {
               popupSpecialisation.classList.remove('active');
               scrollTo(popupSpecialisation, scrollY);
            }
         }

         // получение элементов списка в popup Специализации при нажатии на кнопку далее в popup Категории
         if (target == popupCategoriesNextBtn) {
            popupSpecialisationItem = popupSpecialisation.querySelectorAll('.item');
         }

         // нажатие кнопки назад в popup Специализация
         if (target == popupSpecialisationBtnBack) {
            popupSpecialisation.classList.remove('active');
            popupCategories.classList.add('active');
         }

         // нажатие на элементы из popup Специализация
         if (target.closest('.item input') && target.closest('.popup__specialisation')) {
            if (target.closest('.item input').checked) {
               popupSpecialisationItem.forEach(item => {
                  item.querySelector('input').checked = false;
               })
               target.closest('.item input').checked = true;
               writeCookie('popup-specialisation(new__resume)', target.closest('.item').getAttribute('data-value'), 30);

               specialisationList.classList.remove('hide');
               specialisationListItem.textContent = target.closest('.item').textContent;
               specialisationListItem.setAttribute('data-value', target.closest('.item').getAttribute('data-value'));

               btnChangeSpecialisation.textContent = 'Изменить специализацию'
            }
         }

         // нажатие кнопки очистить в popup Специализации
         if (target == popupSpecialisationClearBtn) {
            specialisationList.classList.add('hide');
            specialisationListItem.textContent = '';
            specialisationListItem.setAttribute('data-value', '');

            popupSpecialisationItem.forEach(item => {
               item.querySelector('input').checked = false;
            });
            specialisationList.classList.add('hide');
            deleteCookie('popup-specialisation(new__resume)');

            btnChangeSpecialisation.textContent = 'Выбрать специализацию'
         }

         // нажатие кнопки поиск в popup Специализации
         if (target == popupSpecialisationSaveBtn) {
            background.classList.remove('active');
            if (popupSpecialisation.classList.contains('active')) {
               popupSpecialisation.classList.remove('active');
               scrollTo(popupSpecialisation, scrollY);
            }
         }

      }
      clickPopupSpecialisation();

      // удаление выбранной специализаций при нажатии на крестик
      function clickRemoveBtnSpecialisation() {
         if (target.closest('.specialisation__list') && target.closest('.remove__btn')) {
            // убрать все элементы из списка специализаций при нажатии кнопки сбросить в popup Категории
            specialisationList.classList.add('hide');
            specialisationListItem.textContent = '';
            specialisationListItem.setAttribute('data-value', '');

            popupCategoriesItem = popupCategories.querySelectorAll('.item');
            popupCategoriesItem.forEach(item => {
               item.classList.remove('active');
            })

            popupCategoriesClearBtn.disabled = true
            popupCategoriesNextBtn.disabled = true
            popupCategoriesSearchBtn.disabled = true

            deleteCookie('popup-categories(new__resume)');
            deleteCookie('popup-specialisation(new__resume)');
            btnChangeSpecialisation.textContent = 'Указать'
         }
      }
      clickRemoveBtnSpecialisation();

      // нажатие на кнопки после ввода данных
      function clickBtn() {
         if (target.closest('.next') && target.closest('.step-1')) {
            let countSpecialisation = false;
            let careerObjective = false;

            // console.log(readCookie('career__objective__value(new__resume)').replace(/^ +| +$|( ) +/g, "$1").length)

            if (readCookie('popup-specialisation(new__resume)') != undefined) {
               countSpecialisation = true;
            } else {
               specialisationPromp.classList.remove('hide');
            }

            if (readCookie('career__objective__value(new__resume)') != undefined && readCookie('career__objective__value(new__resume)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               careerObjective = true;
            } else {
               careerObjectiveError.classList.remove('hide');
               careerObjectiveInput.classList.add('error');
            }

            if (countSpecialisation && careerObjective) {
               clickBtnNext();
            }
         }
      }
      clickBtn();
   });


   // получение данных после перезагрузки страницы
   function loadCareerObjective() {
      if (readCookie('career__objective__value(new__resume)') != undefined) {
         careerObjectiveDefaultItems.forEach(item => {
            if (item.getAttribute('data-value').toLowerCase() == readCookie('career__objective__value(new__resume)').toLowerCase()) {
               item.classList.add('active')
            }
         })
         careerObjectiveInput.value = readCookie('career__objective__value(new__resume)');
         careerObjectiveInputClear.classList.remove('hide');
         careerObjectiveInput.classList.add('not-empty');
      }
   }
   function loadIncome() {
      if (readCookie('income(new__resume)') != undefined) {
         incomeInput.value = readCookie('income(new__resume)');
         incomeInput.classList.add('not-empty');
      }
   }
   function loadIncomeSelect(headerName, listItems, cookieName, defaultValue) {
      if (readCookie(cookieName) != undefined) {
         listItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie(cookieName)) {
               item.classList.add('active')
               headerName.setAttribute('data-name', readCookie(cookieName))
               headerName.querySelector('.item').textContent = readCookie(cookieName)
            } else {
               item.classList.remove('active')
            }
         })
      } else {
         writeCookie(cookieName, defaultValue, 30)
         listItems.forEach(item => {
            if (item.getAttribute('data-name') == defaultValue) {
               item.classList.add('active')
               headerName.setAttribute('data-name', item.getAttribute('data-name'))
               headerName.querySelector('.item').textContent = item.textContent
            } else {
               item.classList.remove('active')
            }
         })
      }
   }
   function loadPopupCategories() {
      if (readCookie('popup-categories(new__resume)') != undefined) {
         btnChangeSpecialisation.addEventListener('click', () => {
            popupCategoriesItem = popupCategories.querySelectorAll('.item');

            popupCategoriesItem.forEach(item => {
               if (item.getAttribute('data-value') == readCookie('popup-categories(new__resume)')) {
                  item.classList.add('active');
                  popupSpecialisationActiveCategories.textContent = item.querySelector('p').textContent;

                  if (item.getAttribute('data-value') == 'all') {
                     popupCategoriesClearBtn.disabled = false
                     popupCategoriesNextBtn.disabled = true
                     popupCategoriesSearchBtn.disabled = false

                     popupCategoriesNextBtn.classList.add('hide');
                     popupCategoriesSearchBtn.classList.remove('hide');
                  } else {
                     popupCategoriesClearBtn.disabled = false
                     popupCategoriesNextBtn.disabled = false
                     popupCategoriesSearchBtn.disabled = true

                     popupCategoriesNextBtn.classList.remove('hide');
                     popupCategoriesSearchBtn.classList.add('hide');
                  }
               }
            })
         })
      }
   }
   function loadPopupSpecialsation() {
      if (readCookie('popup-specialisation(new__resume)') != undefined && readCookie('popup-categories(new__resume)') != undefined) {
         popupSpecialisationItem = popupSpecialisation.querySelectorAll('.item');
         // установить checkbox 
         popupSpecialisationItem.forEach(item => {
            if (item.getAttribute('data-value') == readCookie('popup-specialisation(new__resume)')) {
               item.querySelector('input').checked = true;

               // добавить элементы в список Специализаций
               specialisationList.classList.remove('hide');
               specialisationListItem.textContent = item.textContent;
               specialisationListItem.setAttribute('data-value', item.getAttribute('data-value'));
            }
         })

         btnChangeSpecialisation.textContent = 'Изменить специализацию'
      }
   }
   window.addEventListener("load", function load() {
      loadCareerObjective();
      loadIncome();
      loadIncomeSelect(incomePeriodHeader, incomePeriodListItems, 'income__period(new__resume)', 'В месяц')
      loadIncomeSelect(incomeCurrencyHeader, incomeCurrencyListItems, 'income__currency(new__resume)', 'RUB')
      loadPopupCategories();
      loadPopupSpecialsation();
   }, false);
})
