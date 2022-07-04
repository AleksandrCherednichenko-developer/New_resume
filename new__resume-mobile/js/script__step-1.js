import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let step1 = document.querySelector('.step__inner .step-1');
   let backgroundList = document.querySelector('.background-list');
   let backgroundModal = document.querySelector('.background-modal');

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
   // добавить элементы из массива в список
   careerObjectiveArray.forEach(elemArr => {
      let listItem = document.createElement('p');
      listItem.className = "item";
      listItem.innerHTML = elemArr;
      careerObjectiveInputList.append(listItem)
   })

   let incomeInput = step1.querySelector('.income__input input'),
      incomeInputClear = step1.querySelector('.income__input .clear');
   let incomeCurrencyItem = step1.querySelector('.income__currency .item'),
      incomeCurrencyModalItems = document.querySelectorAll('.currency-modal .inner .item');
   // модальное окно валюта
   let incomeCurrencySelectClass = '.income__currency',
      incomeCurrencyModal = document.querySelector('.modal-window .currency-modal'),
      incomeCurrencyModalInner = document.querySelector('.modal-window .currency-modal .inner'),
      incomeCurrencyModalInnerClass = '.modal-window .currency-modal .inner',
      incomeCurrencyModalClose = document.querySelector('.modal-window .currency-modal-close');
   mobileModal(backgroundModal, incomeCurrencySelectClass, incomeCurrencyModal, incomeCurrencyModalInner, incomeCurrencyModalInnerClass, incomeCurrencyModalClose);
   let incomePeriodItems = document.querySelectorAll('.income__period .item');

   let categories = step1.querySelector('.vacancy__categories'),
      categoriesText = step1.querySelector('.vacancy__categories-text');

   let categoriesList = backgroundList.querySelector('.categories__list'),
      categoriesListClose = backgroundList.querySelector('.categories__list .list__title button'),
      categoriesListItems = backgroundList.querySelectorAll('.categories__list .list .item input'),
      categoriesListClear = backgroundList.querySelector('.categories__list .list__bottom .clear'),
      categoriesListNext = backgroundList.querySelector('.categories__list .list__bottom .next');

   let specialisation = step1.querySelector('.vacancy__specialisation'),
      specialisationText = step1.querySelector('.vacancy__specialisation-text'),
      specialisationError = step1.querySelector('.vacancy__specialisation-error');

   let specialisationList = backgroundList.querySelector('.specialisation__list'),
      categoriesName = backgroundList.querySelector('.specialisation__list .categories__name'),
      specialisationListClose = backgroundList.querySelector('.specialisation__list .list__title button'),
      specialisationListItems,
      specialisationListClear = backgroundList.querySelector('.specialisation__list .list__bottom .clear'),
      specialisationListSave = backgroundList.querySelector('.specialisation__list .list__bottom .save');

   // функция для ввода только чисел
   function inputNumber(input) {
      // проверка на пробелы 
      if (input.value == false) {
         input.value = "";
      }

      if (input.value.length > 0) {
         let inputDataArr = input.value.split(/[- — /]/);
         let inputDataClear = inputDataArr.join('');
         let inputDataArrNew = inputDataClear.match(/.{1,1}/g);

         // отсекает первый ноль если больше 1 символа
         if (inputDataArrNew[0] == 0 && inputDataArrNew.length == 2) {
            inputDataArrNew.shift();
         }

         let inputDataArrClear = inputDataArrNew.filter(function (arr) {
            return arr.match(/^[1-9]|[0-9]|[0-9]$/g);
         });

         // фильтр на посторонние символы
         if (!inputDataArrNew[inputDataArrNew.length - 1].match(/[0-9]/)) {
            inputDataArrNew.length = inputDataArrNew.length - 1
            input.value = inputDataArrNew.join('');
         }
         input.value = inputDataArrClear.join('');
      }
   }

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
               let inputValue = careerObjectiveInput.value.replace(/[^a-zа-яё -+]/ig, '');
               careerObjectiveInput.value = inputValue;
               careerObjectiveInputListItems = careerObjectiveInputList.querySelectorAll('.item');
               let count = 0
               writeCookie('career__objective__value(new__resume__mobile)', careerObjectiveInput.value, 30);

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
                  deleteCookie('career__objective__value(new__resume__mobile)');
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
                     writeCookie('career__objective__value(new__resume__mobile)', careerObjectiveInput.value, 30);
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
            writeCookie('career__objective__value(new__resume__mobile)', careerObjectiveValue, 30);
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
            writeCookie('career__objective__value(new__resume__mobile)', careerObjectiveValue, 30);

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
            deleteCookie('career__objective__value(new__resume__mobile)');
            careerObjectiveInputClear.classList.add('hide');
         }
      }
      inputCareerObjective();

      // ввод заработной платы
      function inputIncome() {
         // ввод значения
         incomeInput.addEventListener('input', () => {
            if (incomeInput.value.length > 0) {
               inputNumber(incomeInput)
               incomeInput.parentNode.classList.add('not-empty')
               writeCookie('income(new__resume__mobile)', incomeInput.value, 30)
            } else {
               incomeInput.parentNode.classList.remove('not-empty')
               deleteCookie('income(new__resume__mobile)')
            }
         })

         // очистка поля
         if (target == incomeInputClear) {
            incomeInput.value = ''
            incomeInput.parentNode.classList.remove('not-empty')
            deleteCookie('income(new__resume__mobile)')
         }
      }
      inputIncome();

      // нажатия в модальном окне с валютой
      function clickIncomeCurrencyModal() {
         if (target.closest('.item') && target.closest('.currency-modal')) {
            incomeCurrencyModalItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            incomeCurrencyItem.textContent = target.closest('.item').textContent;
            incomeCurrencyItem.setAttribute('data-name', target.closest('.item').getAttribute('data-name'));
            writeCookie('income__currency(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30);

            incomeCurrencyModal.classList.remove('active');
            backgroundModal.classList.remove('active');
            enableScroll();
         }
      }
      clickIncomeCurrencyModal();

      // выбор периода дохода
      function clickIncomePeriod() {
         if (target.closest('.item') && target.closest('.income__period')) {
            incomePeriodItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active')
            writeCookie('income__period((new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      clickIncomePeriod();

      // выбор профобласти
      function clickCategoriesList() {
         // открытие
         if (target.closest('.vacancy__categories')) {
            backgroundList.classList.add('active');
            categoriesList.classList.add('active');
            if (!specialisationError.classList.contains('hide')) {
               specialisationError.classList.add('hide');
            }
            bg__lock();
         }

         // закрытие
         if (target == categoriesListClose) {
            categoriesList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock();
         }

         // выбор категории
         if (target.closest('.item') && target.closest('.categories__list')) {
            writeCookie('categories(new__resume__mobile)', target.closest('.item').getAttribute('data-value'));
            categoriesListNext.classList.remove('dont-click');
            specialisation.classList.remove('dont-click');
            categoriesText.textContent = target.closest('.item').querySelector('p').textContent;
            categoriesName.textContent = target.closest('.item').querySelector('p').textContent;

            specialisationListItems = document.querySelectorAll('.specialisation__list .list .item')
            specialisationListItems.forEach(item => {
               item.querySelector('input').checked = false;
            });
            deleteCookie('specialisation(new__resume__mobile)');
         }

         // нажатие кнопки сбросить
         if (target == categoriesListClear) {
            categoriesListItems.forEach(item => {
               item.checked = false;
            })
            categoriesListNext.classList.add('dont-click');
            specialisation.classList.add('dont-click');
            categoriesText.textContent = 'Выберите профобласть';
            deleteCookie('categories(new__resume__mobile)');

            specialisationListItems = document.querySelectorAll('.specialisation__list .list .item')
            specialisationListItems.forEach(item => {
               item.querySelector('input').checked = false;
            });
            specialisationText.textContent = 'Выберите специализацию';
            deleteCookie('specialisation(new__resume__mobile)');

            categoriesList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock();
         }

         // нажатие кнопки далее в списке профобластей
         if (target == categoriesListNext) {
            specialisationList.classList.add('active');
            specialisationListItems = document.querySelectorAll('.specialisation__list .list .item')
         }
      }
      clickCategoriesList();

      // выбор специализации
      function clickSpecialisationList() {
         // открытие
         if (target.closest('.vacancy__specialisation')) {
            backgroundList.classList.add('active');
            specialisationList.classList.add('active');
            specialisationListItems = document.querySelectorAll('.specialisation__list .list .item')
            if (!specialisationError.classList.contains('hide')) {
               specialisationError.classList.add('hide');
            }
            bg__lock();
         }

         // перейти обратно к профобластям
         if (target == specialisationListClose) {
            categoriesList.classList.add('active');
            specialisationList.classList.remove('active');
         }

         // выбор специализации
         if (target.closest('.item') && target.closest('.specialisation__list')) {
            writeCookie('specialisation(new__resume__mobile)', target.closest('.item').getAttribute('data-value'));
            specialisationListSave.classList.remove('dont-click');
            specialisationText.textContent = target.closest('.item').querySelector('p').textContent;
         }

         // нажатие кнопки сбросить
         if (target == specialisationListClear) {
            specialisationListItems.forEach(item => {
               item.querySelector('input').checked = false;
            })
            specialisationListSave.classList.add('dont-click');
            specialisationText.textContent = 'Выберите специализацию';
            deleteCookie('specialisation(new__resume__mobile)');

            specialisationList.classList.remove('active');
            categoriesList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock();
         }

         // нажатие кнопки сохранить
         if (target == specialisationListSave) {
            specialisationList.classList.remove('active');
            categoriesList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock();
         }
      }
      clickSpecialisationList();

      // нажатие на кнопки
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.section__bottom') && target.closest('.step-1')) {
            let validateCareerObjective = false;
            let validateSpecialisation = false;

            if (readCookie('career__objective__value(new__resume__mobile)') != undefined && readCookie('career__objective__value(new__resume__mobile)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateCareerObjective = true
            } else {
               careerObjectiveInput.classList.add('error')
               careerObjectiveError.classList.remove('hide')
            }

            if (readCookie('specialisation(new__resume__mobile)') !== undefined) {
               validateSpecialisation = true
            } else {
               specialisationError.classList.remove('hide')
            }

            if (validateCareerObjective && validateSpecialisation) {
               clickBtnNext()
            }
         }
      }
      clickBtn();
   })

   // получение при перезагрузке
   function loadCareerObjective() {
      if (readCookie('career__objective__value(new__resume__mobile)') !== undefined) {
         careerObjectiveDefaultItems.forEach(item => {
            if (item.getAttribute('data-value').toLowerCase() == readCookie('career__objective__value(new__resume__mobile)').toLowerCase()) {
               item.classList.add('active')
            }
         })
         careerObjectiveInput.value = readCookie('career__objective__value(new__resume__mobile)');
         careerObjectiveInputClear.classList.remove('hide');
         careerObjectiveInput.classList.add('not-empty');
      }
   }
   function loadIncome() {
      if (readCookie('income(new__resume__mobile)') !== undefined) {
         incomeInput.value = readCookie('income(new__resume__mobile)')
         incomeInput.parentNode.classList.add('not-empty')
      }
   }
   function loadIncomeCurrency() {
      if (readCookie('income__currency(new__resume__mobile)') !== undefined) {
         incomeCurrencyModalItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('income__currency(new__resume__mobile)')) {
               incomeCurrencyModalItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               incomeCurrencyItem.textContent = readCookie('income__currency(new__resume__mobile)');
               incomeCurrencyItem.setAttribute('data-name', readCookie('income__currency(new__resume__mobile)'))
            }
         })
      } else {
         writeCookie('income__currency(new__resume__mobile)', 'RUB', 30)
      }
   }
   function loadIncomePeriod() {
      if (readCookie('income__period((new__resume__mobile)') !== undefined) {
         incomePeriodItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('income__period((new__resume__mobile)')) {
               item.classList.add('active')
            } else {
               item.classList.remove('active')
            }
         })
      } else {
         incomePeriodItems.forEach(item => {
            if (item.getAttribute('data-name') == 'В месяц') {
               item.classList.add('active');
               writeCookie('income__period((new__resume__mobile)', item.getAttribute('data-name'), 30);
            }
         })
      }
   }
   function loadCategories() {
      if (readCookie('categories(new__resume__mobile)') !== undefined) {
         categoriesListItems.forEach(item => {
            if (item.parentNode.getAttribute('data-value') == readCookie('categories(new__resume__mobile)')) {
               item.checked = true;
               categoriesText.textContent = item.parentNode.querySelector('p').textContent;
               categoriesName.textContent = item.parentNode.querySelector('p').textContent;
               categoriesListNext.classList.remove('dont-click');
               specialisation.classList.remove('dont-click');
            }
         })
      }
   }
   function loadSpecialisation() {
      if (readCookie('specialisation(new__resume__mobile)') !== undefined) {
         specialisationListItems = document.querySelectorAll('.specialisation__list .list .item')
         specialisationListItems.forEach(item => {
            if (item.getAttribute('data-value') == readCookie('specialisation(new__resume__mobile)')) {
               item.querySelector('input').checked = true;
               specialisationText.textContent = item.querySelector('p').textContent;
               specialisationListSave.classList.remove('dont-click');
            }
         });
      }
   }

   window.addEventListener("load", function load() {
      loadCareerObjective()
      loadIncome()
      loadIncomeCurrency()
      loadIncomePeriod()
      loadCategories()
      loadSpecialisation()
   }, false);
})