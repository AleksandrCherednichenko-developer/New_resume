import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';
import { inputNumber } from "./script__input-number.js";
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let step4 = document.querySelector('.step__inner .step-4');
   let backgroundList = document.querySelector('.background-list');
   let backgroundModal = document.querySelector('.background-modal');

   // поле с изображением пользователя
   let userImageInputLoad = step4.querySelector('.image__upload'),
      userImage = step4.querySelector('.image__picture'),
      userImagePlaseholder = step4.querySelector('.image__plaseholder'),
      userImageAddMenu = step4.querySelector('.image__add-menu'),
      userImageLoadBtn = userImageAddMenu.querySelector('.load'),
      userImageRemoveBtn = userImageAddMenu.querySelector('.remove');
   // // модальное окно с кропом изображения
   let userImageBtnClass = '.crop__image',
      userImageModal = document.querySelector('.modal-window .crop__image-modal'),
      userImageModalInner = document.querySelector('.modal-window .crop__image-modal .inner'),
      userImageModalInnerClass = '.modal-window .crop__image-modal .inner',
      userImageModalClose = document.querySelector('.modal-window .crop__image-modal-close');
   mobileModal(backgroundModal, userImageBtnClass, userImageModal, userImageModalInner, userImageModalInnerClass, userImageModalClose);
   // кнопки в модальном окне с кропом изображения
   let userImageModalSave = userImageModal.querySelector('.modal__button .save'),
      userImageModalClear = userImageModal.querySelector('.modal__button .clear')

   // блок ввода основной информации
   let inputSurname = step4.querySelector('.surname'),
      inputName = step4.querySelector('.name'),
      inputPatronymic = step4.querySelector('.patronymic');

   // блок для ввод даты рождения
   let dayOfBirthDay = step4.querySelector('.date-of-birth__input .day'),
      dayOfBirthMonth = step4.querySelector('.date-of-birth__input .month'),
      dayOfBirthYear = step4.querySelector('.date-of-birth__input .year');
   // модальное окно с выбором месяца
   let monthBtnClass = '.date-of-birth__input .month',
      monthModal = document.querySelector('.modal-window .month-modal'),
      monthModalInner = document.querySelector('.modal-window .month-modal .inner'),
      monthModalInnerClass = '.modal-window .month-modal .inner',
      monthModalClose = document.querySelector('.modal-window .month-modal-close');
   mobileModal(backgroundModal, monthBtnClass, monthModal, monthModalInner, monthModalInnerClass, monthModalClose);
   // список месяцев
   let monthModalItems = monthModal.querySelectorAll('.item')

   // блок ввода пола
   let genderItems = step4.querySelectorAll('.gender .item');

   // блок с описанием
   let descriptionText = step4.querySelector('.description__text'),
      descriptionTextLenth = step4.querySelector('.description__text-count span');

   // блок с выбором города
   let cityValue = step4.querySelector('.city p');
   let cityList = backgroundList.querySelector('.city__list'),
      cityListClose = cityList.querySelector('.list__title button'),
      cityListClear = cityList.querySelector('.list__bottom .clear'),
      cityListSave = cityList.querySelector('.list__bottom .save'),
      cityInput = cityList.querySelector('.city__input input'),
      cityInputList = cityList.querySelector('.city__input .list'),
      cityAddItem = cityList.querySelector('.city__add-item');

   // блок с выбором метро
   let undergroundBlock = step4.querySelector('.underground'),
      undergroundValue = step4.querySelector('.underground p'),
      undergroundList = backgroundList.querySelector('.underground__list'),
      undergroundListClose = undergroundList.querySelector('.list__title button'),
      undergroundListClear = undergroundList.querySelector('.list__bottom .clear'),
      undergroundListSave = undergroundList.querySelector('.list__bottom .save'),
      undergroundInput = undergroundList.querySelector('.underground__input input'),
      undergroundInputList = undergroundList.querySelector('.underground__input .list'),
      undergroundAddList = undergroundList.querySelector('.underground__add-list'),
      undergroundArr = [];

   // блок с гражданством
   let citizenshipAddValue = step4.querySelector('.citizenship p');
   let citizenshipList = backgroundList.querySelector('.citizenship__list'),
      citizenshipListClose = citizenshipList.querySelector('.list__title button'),
      citizenshipListClear = citizenshipList.querySelector('.list__bottom .clear'),
      citizenshipListSave = citizenshipList.querySelector('.list__bottom .apply'),
      citizenshipListItems,
      citizenshipArr = [];

   // блок с гражданством
   let workpermitAddValue = step4.querySelector('.work-permit p');
   let workpermitList = backgroundList.querySelector('.work-permit__list'),
      workpermitListClose = workpermitList.querySelector('.list__title button'),
      workpermitListClear = workpermitList.querySelector('.list__bottom .clear'),
      workpermitListSave = workpermitList.querySelector('.list__bottom .apply'),
      workpermitListItems,
      workpermitArr = [];

   // блок выбора личного транспорта 
   let driverLicenseList1 = step4.querySelector('.driver__license .driver__license-list1'),
      driverLicenseList1Item = step4.querySelectorAll('.driver__license .driver__license-list1 .item'),
      driverLicenseArray1 = [],

      driverLicenseCheckbox = step4.querySelector('.driver__license .driver__license-checkbox input'),

      driverLicenseList2 = step4.querySelector('.driver__license .driver__license-list2'),
      driverLicenseList2Item = step4.querySelectorAll('.driver__license .driver__license-list2 .item'),
      driverLicenseArray2 = [];

   // загрузка изображения
   function loadUserImage() {

      var resize = $('.upload-demo').croppie({
         enableExif: true,
         enableOrientation: true,
         viewport: { // Default { width: 100, height: 100, type: 'square' } 
            width: 200,
            height: 200,
            type: 'circle' //square
         },
         boundary: {
            width: 336,
            height: 300
         }
      });

      function previewFile() {
         var reader = new FileReader();
         let imageLoad = userImageInputLoad.files[0];

         if (((imageLoad.size / 1024) / 1024) < 10) {
            reader.onloadend = function (e) {
               backgroundModal.classList.add('active')
               userImageModal.classList.add('active')

               resize.croppie('bind', {
                  url: e.target.result
               });
            }

            if (imageLoad) {
               reader.readAsDataURL(imageLoad);
               setTimeout(() => {
                  userImagePlaseholder.style.display = 'none';
                  userImage.style.display = 'block';
               }, 10)
            } else {
               userImage.src = "";
               userImage.style.display = 'none';
               userImagePlaseholder.style.display = 'block';
            }
         }

      }

      userImageInputLoad.addEventListener('change', () => {
         previewFile();
      })

      function closeModalSwipe(swipeElem) {
         swipeElem.addEventListener('swiped-down', function (e) {
            backgroundModal.classList.remove('active')
            userImageModal.classList.remove('active')
            if (userImage.getAttribute('src') == '') {
               userImage.style.display = 'none';
               userImagePlaseholder.style.display = 'block';
            }
            userImageInputLoad.value = '';
         });
      }
      closeModalSwipe(userImageModalClose)
      closeModalSwipe(userImageModal)

      document.addEventListener('click', (event) => {
         let target = event.target;

         // нажатие на меню добавления изображения
         if (target.closest('.user__image')) {
            userImageAddMenu.classList.toggle('active');
         } else if (!target.closest('.user__image') && userImageAddMenu.classList.contains('active')) {
            userImageAddMenu.classList.remove('active');
         }

         // нажатие загрузить изображение
         if (target == userImageLoadBtn) {
            userImageInputLoad.click();
         }

         // нажатие кнопки сохранить
         if (target === userImageModalSave) {
            resize.croppie('result', {
               type: 'canvas',
               size: 'viewport'
            }).then(function (img) {
               backgroundModal.classList.remove('active')
               userImageModal.classList.remove('active')
               userImage.style.display = 'block';
               userImage.src = img;
               userImagePlaseholder.style.display = 'none';
            });
            enableScroll()
         }

         // нажатие кнопки отмена
         if (target === userImageModalClear || target === backgroundModal || target === userImageModalClose) {
            backgroundModal.classList.remove('active')
            userImageModal.classList.remove('active')
            if (userImage.getAttribute('src') == '') {
               userImage.style.display = 'none';
               userImagePlaseholder.style.display = 'block';
            }
            userImageInputLoad.value = '';
            enableScroll()
         }

         // нажатие удалить изображение 
         if (target == userImageRemoveBtn) {
            userImageInputLoad.value = '';
            userImage.style.display = 'none';
            userImage.src = '';
            userImagePlaseholder.style.display = 'block';
         }
      })

   }
   loadUserImage();


   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод персональной информации
      function inputPersonalInfo() {
         if (target.closest('.personal__information')) {
            if (target == inputSurname) {
               if (inputSurname.classList.contains('error')) {
                  inputSurname.classList.remove('error')
               }
               inputSurname.addEventListener('input', () => {
                  inputSurname.value = inputSurname.value.replace(/( |^)[а-яёa-z]/g, function (u) { return u.toUpperCase(); });
                  if (inputSurname.value.length > 0) {
                     inputSurname.classList.add('not-empty');
                     writeCookie('initial-surname(new__resume__mobile)', inputSurname.value, 30);
                  } else {
                     inputSurname.classList.remove('not-empty');
                     deleteCookie('initial-surname(new__resume__mobile)');
                  }
               })
            }

            if (target == inputName) {
               if (inputName.classList.contains('error')) {
                  inputName.classList.remove('error')
               }
               inputName.addEventListener('input', () => {
                  inputName.value = inputName.value.replace(/( |^)[а-яёa-z]/g, function (u) { return u.toUpperCase(); });
                  if (inputName.value.length > 0) {
                     inputName.classList.add('not-empty');
                     writeCookie('initial-name(new__resume__mobile)', inputName.value, 30);
                  } else {
                     inputName.classList.remove('not-empty');
                     deleteCookie('initial-name(new__resume__mobile)');
                  }
               })
            }

            if (target == inputPatronymic) {
               if (inputPatronymic.classList.contains('error')) {
                  inputPatronymic.classList.remove('error')
               }
               inputPatronymic.addEventListener('input', () => {
                  inputPatronymic.value = inputPatronymic.value.replace(/( |^)[а-яёa-z]/g, function (u) { return u.toUpperCase(); });
                  if (inputPatronymic.value.length > 0) {
                     inputPatronymic.classList.add('not-empty');
                     writeCookie('initial-patronymic(new__resume__mobile)', inputPatronymic.value, 30);
                  } else {
                     inputPatronymic.classList.remove('not-empty');
                     deleteCookie('initial-patronymic(new__resume__mobile)');
                  }
               })
            }
         }
      }
      inputPersonalInfo();

      // ввод даты рождения
      function clickDayOfBirth() {
         // ввод дня
         if (target === dayOfBirthDay) {
            let dayMonth = Number(dayOfBirthMonth.getAttribute('data-day'))

            dayOfBirthDay.addEventListener('input', () => {
               if (+(dayOfBirthDay.value) > (dayMonth != 0 ? dayMonth = Number(dayOfBirthMonth.getAttribute('data-day')) : 31)) {
                  dayOfBirthDay.value = '';
               }
               inputNumber(dayOfBirthDay);
               if (dayOfBirthDay.value != '') {
                  dayOfBirthDay.classList.add('not-empty');
                  writeCookie('day-of-birth__day(new__resume__mobile)', dayOfBirthDay.value, 30);
               } else {
                  dayOfBirthDay.classList.remove('not-empty');
                  deleteCookie('day-of-birth__day(new__resume__mobile)');
               }
            })
         }

         // выбор месяца
         if (target === dayOfBirthMonth) {
            if (dayOfBirthMonth.classList.contains('error')) {
               dayOfBirthMonth.classList.remove('error');
            }
         }

         // нажатия в модальном окне с выбором месяца
         if (target.closest('.item') && target.closest('.month-modal')) {
            monthModalItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            dayOfBirthMonth.classList.add('not-empty');
            dayOfBirthMonth.textContent = target.closest('.item').textContent;
            dayOfBirthMonth.setAttribute('data-name', target.closest('.item').getAttribute('data-name'));
            dayOfBirthMonth.setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
            dayOfBirthMonth.setAttribute('data-day', target.closest('.item').getAttribute('data-day'));
            writeCookie('day-of-birth__month(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30);

            if (dayOfBirthDay.value > target.closest('.item').getAttribute('data-day')) {
               dayOfBirthDay.value = target.closest('.item').getAttribute('data-day')

               writeCookie('day-of-birth__day(new__resume__mobile)', target.closest('.item').getAttribute('data-day'), 30);
            }
            backgroundModal.classList.remove('active')
            monthModal.classList.remove('active')
            enableScroll()
         }

         // ввод года
         if (target == dayOfBirthYear) {
            dayOfBirthYear.addEventListener('input', () => {
               inputNumber(dayOfBirthYear);
               if (dayOfBirthYear.value != '' && dayOfBirthYear.value.length == 4) {
                  dayOfBirthYear.classList.add('not-empty');
                  writeCookie('day-of-birth__year(new__resume__mobile)', dayOfBirthYear.value, 30);
               } else {
                  dayOfBirthYear.classList.remove('not-empty');
                  deleteCookie('day-of-birth__year(new__resume__mobile)');
               }
            })

            // проверка данных при вводе года (нынешний год - 70 лет)
            dayOfBirthYear.onblur = function () {
               if (dayOfBirthYear.value >= new Date().getFullYear() - 14 || dayOfBirthYear.value <= new Date().getFullYear() - 70) {
                  dayOfBirthYear.value = '';
                  dayOfBirthYear.classList.remove('not-empty');
                  deleteCookie('day-of-birth__year(new__resume__mobile)');
               }
            };
         }
      }
      clickDayOfBirth()

      // выбор пола
      function clickGender() {
         if (target.closest('.item') && target.closest('.gender')) {
            genderItems.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.item').classList.add('active');
            writeCookie('gender-value(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      clickGender();

      // ввод описания о пользователе
      function inputDescription() {
         if (target == descriptionText) {
            descriptionText.addEventListener('input', () => {
               if (descriptionText.value.length > 0) {
                  descriptionText.classList.add('not-empty');
                  descriptionTextLenth.textContent = descriptionText.value.length;
                  writeCookie('description-text(new__resume__mobile)', descriptionText.value, 30);
               } else {
                  descriptionTextLenth.textContent = descriptionText.value.length;
                  descriptionText.classList.remove('not-empty');
                  deleteCookie('description-text(new__resume__mobile)');
               }
            })
         }
      }
      inputDescription();

      // выбор города проживания
      function addCity() {
         // открытие
         if (target.closest('.city') && target.closest('.step-4')) {
            backgroundList.classList.add('active')
            cityList.classList.add('active')
            bg__lock()
         }

         // закрытие
         if (target === cityListClose || target === cityListSave) {
            backgroundList.classList.remove('active')
            cityList.classList.remove('active')
            bg__unlock()
         }

         // нажатие кнопки сбросить
         if (target === cityListClear) {
            cityAddItem.classList.add('hide')
            cityAddItem.querySelector('.value').textContent = ''
            cityValue.textContent = 'Выберите город'
            deleteCookie('user-city(new__resume__mobile)')
            backgroundList.classList.remove('active')
            cityList.classList.remove('active')

            if (!undergroundBlock.classList.contains('hide')) {
               undergroundBlock.classList.add('hide')
            }
            undergroundValue.textContent = 'Выберите станции'
            undergroundArr = []
            deleteCookie('underground(new__resume__mobile)')
         }

         // ввод города
         if (target === cityInput) {
            cityInput.addEventListener('input', () => {
               if (cityInput.value.length > 2) {
                  cityInputList.classList.remove('hide')
               } else {
                  cityInputList.classList.add('hide')
               }
            })
         } else if (!cityInputList.classList.contains('hide')) {
            cityInputList.classList.add('hide')
            cityInput.value = ''
         }

         // выбор элемента из списка
         if (target.closest('.item') && target.closest('.city__input .list')) {
            cityAddItem.classList.remove('hide')
            cityAddItem.querySelector('.value').textContent = target.closest('.item').getAttribute('data-value')

            cityValue.textContent = target.closest('.item').getAttribute('data-value')

            writeCookie('user-city(new__resume__mobile)', target.closest('.item').getAttribute('data-value'), 30)

            if (readCookie('user-city(new__resume__mobile)') == 'Казань' || readCookie('user-city(new__resume__mobile)') == 'Москва' || readCookie('user-city(new__resume__mobile)') == 'Санкт-Петербург' ||
               readCookie('user-city(new__resume__mobile)') == 'Алма-Ата' || readCookie('user-city(new__resume__mobile)') == 'Баку' || readCookie('user-city(new__resume__mobile)') == 'Новосибирск' ||
               readCookie('user-city(new__resume__mobile)') == 'Киев' || readCookie('user-city(new__resume__mobile)') == 'Тбилиси' || readCookie('user-city(new__resume__mobile)') == 'Ереван' ||
               readCookie('user-city(new__resume__mobile)') == 'Самара' || readCookie('user-city(new__resume__mobile)') == 'Харьков' || readCookie('user-city(new__resume__mobile)') == 'Минск' ||
               readCookie('user-city(new__resume__mobile)') == 'Нижний Новгород' || readCookie('user-city(new__resume__mobile)') == 'Екатеринбург' || readCookie('user-city(new__resume__mobile)') == 'Днепр') {
               if (undergroundBlock.classList.contains('hide')) {
                  undergroundBlock.classList.remove('hide')
               }
               undergroundValue.textContent = 'Выберите станции'
               undergroundArr = []
               deleteCookie('underground(new__resume__mobile)')
            } else {
               if (!undergroundBlock.classList.contains('hide')) {
                  undergroundBlock.classList.add('hide')
               }
               undergroundValue.textContent = 'Выберите станции'
               undergroundArr = []
               deleteCookie('underground(new__resume__mobile)')
            }
         }

         // удаление элемента нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.city__add-item')) {
            cityAddItem.classList.add('hide')
            cityAddItem.querySelector('.value').textContent = ''
            cityValue.textContent = 'Выберите город'
            deleteCookie('user-city(new__resume__mobile)')

            if (!undergroundBlock.classList.contains('hide')) {
               undergroundBlock.classList.add('hide')
            }
            undergroundValue.textContent = 'Выберите станции'
            undergroundArr = []
            deleteCookie('underground(new__resume__mobile)')
         }
      }
      addCity()

      // выбор метро
      function addUnderground() {
         // открытие
         if (target.closest('.underground') && target.closest('.step-4')) {
            backgroundList.classList.add('active')
            undergroundList.classList.add('active')
            bg__lock()
         }

         // закрытие
         if (target == undergroundListClose || target == undergroundListSave) {
            backgroundList.classList.remove('active')
            undergroundList.classList.remove('active')
            bg__unlock()
         }

         // ввод названия метро
         if (target == undergroundInput) {
            undergroundInput.addEventListener('input', () => {
               if (undergroundInput.value.length > 2) {
                  undergroundInputList.classList.remove('hide')
               } else {
                  undergroundInputList.classList.add('hide')
               }
            })
         } else if (!undergroundInputList.classList.contains('hide')) {
            undergroundInputList.classList.add('hide')
            undergroundInput.value = ''
         }

         // выбор элемента из предложенного списка
         if (target.closest('.item') && target.parentNode === undergroundInputList) {
            if (undergroundArr.length < 3) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (undergroundArr.indexOf(target.getAttribute('data-value')) == -1) {
                  undergroundArr.push(target.getAttribute('data-value'));
                  cloneItem.append(removeBtn);
                  undergroundAddList.append(cloneItem);
                  writeCookie('underground(new__resume__mobile)', JSON.stringify(undergroundArr), 30);
                  undergroundValue.textContent = undergroundArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
               }
            }
         }

         // нажатие кнопки сбросить
         if (target == undergroundListClear) {
            undergroundAddList.textContent = ''
            undergroundArr = []
            undergroundValue.textContent = 'Выберите станции'
            deleteCookie('underground(new__resume__mobile)')

            backgroundList.classList.remove('active')
            undergroundList.classList.remove('active')
            bg__unlock()
         }

         // удаление элементов нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.underground__add-list')) {
            target.closest('.item').remove();
            undergroundArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-value')) {
                  undergroundArr.splice((undergroundArr.indexOf(elemArr)), 1);
               }
            })

            if (undergroundArr.length !== 0) {
               undergroundValue.textContent = undergroundArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
               writeCookie('underground(new__resume__mobile)', JSON.stringify(undergroundArr), 30);
            } else {
               undergroundValue.textContent = 'Выберите станции'
               deleteCookie('underground(new__resume__mobile)');
            }
         }
      }
      addUnderground()

      // выбор гражданства
      function addCitizenship() {
         // открытие
         if (target.closest('.citizenship')) {
            backgroundList.classList.add('active')
            citizenshipList.classList.add('active')
            citizenshipListItems = citizenshipList.querySelectorAll('.item')
            bg__lock()
         }

         // закрытие
         if (target === citizenshipListClose || target === citizenshipListSave) {
            backgroundList.classList.remove('active')
            citizenshipList.classList.remove('active')
            bg__unlock()
         }

         // нажатие на элементы 
         if (target.tagName == 'INPUT' && target.closest('.item') && target.closest('.citizenship__list')) {
            if (target.checked) {
               citizenshipArr.push(target.closest('.item').getAttribute('data-value'))
               citizenshipAddValue.textContent = citizenshipArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
               writeCookie('citizenship(new__resume__mobile)', JSON.stringify(citizenshipArr), 30)
            } else {
               citizenshipArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     citizenshipArr.splice((citizenshipArr.indexOf(elemArr)), 1);
                  }
               })

               if (citizenshipArr.length !== 0) {
                  citizenshipAddValue.textContent = citizenshipArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
                  writeCookie('citizenship(new__resume__mobile)', JSON.stringify(citizenshipArr), 30)
               } else {
                  citizenshipAddValue.textContent = 'Выберите страны'
                  deleteCookie('citizenship(new__resume__mobile)')
               }
            }
         }

         // нажатие кнопки очистить
         if (target === citizenshipListClear) {
            citizenshipListItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            citizenshipArr = []
            citizenshipAddValue.textContent = 'Выберите страны'
            deleteCookie('citizenship(new__resume__mobile)')
            backgroundList.classList.remove('active')
            citizenshipList.classList.remove('active')
            bg__unlock()
         }
      }
      addCitizenship()

      // выбор разрешения на работу
      function addWorkpermit() {
         // открытие
         if (target.closest('.work-permit')) {
            backgroundList.classList.add('active')
            workpermitList.classList.add('active')
            workpermitListItems = citizenshipList.querySelectorAll('.item')
            bg__lock()
         }

         // закрытие
         if (target === workpermitListClose || target === workpermitListSave) {
            backgroundList.classList.remove('active')
            workpermitList.classList.remove('active')
            bg__unlock()
         }

         // нажатие на элементы 
         if (target.tagName == 'INPUT' && target.closest('.item') && target.closest('.work-permit__list')) {
            if (target.checked) {
               workpermitArr.push(target.closest('.item').getAttribute('data-value'))
               workpermitAddValue.textContent = workpermitArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
               writeCookie('work-permit(new__resume__mobile)', JSON.stringify(workpermitArr), 30)
            } else {
               workpermitArr.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-value')) {
                     workpermitArr.splice((workpermitArr.indexOf(elemArr)), 1);
                  }
               })

               if (workpermitArr.length !== 0) {
                  workpermitAddValue.textContent = workpermitArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
                  writeCookie('work-permit(new__resume__mobile)', JSON.stringify(workpermitArr), 30)
               } else {
                  workpermitAddValue.textContent = 'Выберите страны'
                  deleteCookie('work-permit(new__resume__mobile)')
               }
            }
         }

         // нажатие кнопки очистить
         if (target === workpermitListClear) {
            workpermitListItems.forEach(item => {
               item.querySelector('input').checked = false
            })
            workpermitArr = []
            workpermitAddValue.textContent = 'Выберите страны'
            deleteCookie('work-permit(new__resume__mobile)')
            backgroundList.classList.remove('active')
            workpermitList.classList.remove('active')
            bg__unlock()
         }
      }
      addWorkpermit()

      // нажатие на списки
      function clickList(parent, arrayName, cookieName) {
         if (target.closest('.item') && target.parentNode == parent) {
            target.closest('.item').classList.toggle('active');
            if (target.closest('.item').classList.contains('active')) {
               arrayName.push(target.closest('.item').getAttribute('data-name'));
               writeCookie(cookieName, JSON.stringify(arrayName), 30);
            } else {
               arrayName.forEach(elemArr => {
                  if (elemArr == target.closest('.item').getAttribute('data-name')) {
                     arrayName.splice((arrayName.indexOf(elemArr)), 1);
                     if (arrayName.length > 0) {
                        writeCookie(cookieName, JSON.stringify(arrayName), 30);
                     } else {
                        deleteCookie(cookieName);
                     }
                  }
               })
            }
         }
      }
      clickList(driverLicenseList1, driverLicenseArray1, 'driver__license-list1(new__resume__mobile)');
      clickList(driverLicenseList2, driverLicenseArray2, 'driver__license-list2(new__resume__mobile)');

      // нажатие на чекбокс "Есть личный автомобиль"
      function clickDriverLicenseCheckbox() {
         if (target == driverLicenseCheckbox && target.closest('.driver__license-checkbox')) {
            if (driverLicenseCheckbox.checked) {
               writeCookie('driver__license-checkbox(new__resume__mobile)', true, 30);
               driverLicenseList2.classList.remove('dont-click');
            } else {
               deleteCookie('driver__license-checkbox(new__resume__mobile)');
               deleteCookie('driver__license-list2(new__resume__mobile)');
               driverLicenseList2.classList.add('dont-click');
               driverLicenseList2.querySelectorAll('.item').forEach(item => {
                  item.classList.remove('active');
               })
            }
         }
      }
      clickDriverLicenseCheckbox();

      // нажатие на кнопки внизу блока
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.section__bottom') && target.closest('.step-4')) {
            let validateSurname = false
            let validateName = false

            if (readCookie('initial-surname(new__resume__mobile)') !== undefined && readCookie('initial-surname(new__resume__mobile)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSurname = true
            } else {
               inputSurname.classList.add('error')
               inputSurname.value = ''
            }

            if (readCookie('initial-name(new__resume__mobile)') !== undefined && readCookie('initial-name(new__resume__mobile)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
            } else {
               inputName.classList.add('error')
               inputName.value = ''
            }

            if (validateSurname && validateName) {
               clickBtnNext();
            }
         }
         if (target.closest('.back-btn') && target.closest('.section__bottom') && target.closest('.step-4')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   // получение данных при перезагрузке
   function loadSurname() {
      if (readCookie('initial-surname(new__resume__mobile)') !== undefined) {
         inputSurname.value = readCookie('initial-surname(new__resume__mobile)');
         inputSurname.classList.add('not-empty');
      }
   }
   function loadName() {
      if (readCookie('initial-name(new__resume__mobile)') !== undefined) {
         inputName.value = readCookie('initial-name(new__resume__mobile)');
         inputName.classList.add('not-empty');
      }
   }
   function loadPatronymic() {
      if (readCookie('initial-patronymic(new__resume__mobile)') !== undefined) {
         inputPatronymic.value = readCookie('initial-patronymic(new__resume__mobile)');
         inputPatronymic.classList.add('not-empty');
      }
   }
   function loadDayOfBith() {
      if (readCookie('day-of-birth__day(new__resume__mobile)') !== undefined) {
         dayOfBirthDay.value = readCookie('day-of-birth__day(new__resume__mobile)')
         dayOfBirthDay.classList.add('not-empty');
      }

      if (readCookie('day-of-birth__month(new__resume__mobile)') !== undefined) {
         dayOfBirthMonth.classList.add('not-empty');
         monthModalItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('day-of-birth__month(new__resume__mobile)')) {
               item.classList.add('active');
               dayOfBirthMonth.textContent = item.textContent;
               dayOfBirthMonth.setAttribute('data-value', item.getAttribute('data-value'));
               dayOfBirthMonth.setAttribute('data-name', item.getAttribute('data-name'));
               dayOfBirthMonth.setAttribute('data-day', item.getAttribute('data-day'));
            }
         });
      }

      if (readCookie('day-of-birth__year(new__resume__mobile)') !== undefined) {
         dayOfBirthYear.value = readCookie('day-of-birth__year(new__resume__mobile)')
         dayOfBirthYear.classList.add('not-empty');
      }
   }
   function loadGender() {
      if (readCookie('gender-value(new__resume__mobile)') !== undefined) {
         genderItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('gender-value(new__resume__mobile)')) {
               item.classList.add('active')
            };
         })
      }
   }
   function loadCityAndUnderground() {
      if (readCookie('user-city(new__resume__mobile)') !== undefined) {
         cityAddItem.classList.remove('hide')
         cityAddItem.querySelector('.value').textContent = readCookie('user-city(new__resume__mobile)')

         cityValue.textContent = readCookie('user-city(new__resume__mobile)')

         if (readCookie('user-city(new__resume__mobile)') == 'Казань' || readCookie('user-city(new__resume__mobile)') == 'Москва' || readCookie('user-city(new__resume__mobile)') == 'Санкт-Петербург' ||
            readCookie('user-city(new__resume__mobile)') == 'Алма-Ата' || readCookie('user-city(new__resume__mobile)') == 'Баку' || readCookie('user-city(new__resume__mobile)') == 'Новосибирск' ||
            readCookie('user-city(new__resume__mobile)') == 'Киев' || readCookie('user-city(new__resume__mobile)') == 'Тбилиси' || readCookie('user-city(new__resume__mobile)') == 'Ереван' ||
            readCookie('user-city(new__resume__mobile)') == 'Самара' || readCookie('user-city(new__resume__mobile)') == 'Харьков' || readCookie('user-city(new__resume__mobile)') == 'Минск' ||
            readCookie('user-city(new__resume__mobile)') == 'Нижний Новгород' || readCookie('user-city(new__resume__mobile)') == 'Екатеринбург' || readCookie('user-city(new__resume__mobile)') == 'Днепр') {
            if (undergroundBlock.classList.contains('hide')) {
               undergroundBlock.classList.remove('hide')
            }
            undergroundValue.textContent = 'Выберите станции'

            if (readCookie('underground(new__resume__mobile)') !== undefined) {
               undergroundArr = JSON.parse(readCookie('underground(new__resume__mobile)'))
               undergroundArr.forEach(elemArr => {
                  let undergroundItem = `
                     <p class="item" data-value="${elemArr}">
                        ${elemArr}<span class="remove-btn"></span>
                     </p>
                     `;
                  undergroundAddList.insertAdjacentHTML('beforeend', undergroundItem);
               })
               undergroundValue.textContent = undergroundArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
            }
         }
      }
   }
   function loadCitizenship() {
      if (readCookie('citizenship(new__resume__mobile)') !== undefined) {
         citizenshipArr = JSON.parse(readCookie('citizenship(new__resume__mobile)'))
         citizenshipListItems = citizenshipList.querySelectorAll('.item')

         citizenshipArr.forEach(elemArr => {
            citizenshipListItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         citizenshipAddValue.textContent = citizenshipArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
      }
   }
   function loadWorkpermit() {
      if (readCookie('work-permit(new__resume__mobile)') !== undefined) {
         workpermitArr = JSON.parse(readCookie('work-permit(new__resume__mobile)'))
         workpermitListItems = workpermitList.querySelectorAll('.item')

         workpermitArr.forEach(elemArr => {
            workpermitListItems.forEach(item => {
               if (elemArr === item.getAttribute('data-value')) {
                  item.querySelector('input').checked = true
               }
            })
         })

         workpermitAddValue.textContent = workpermitArr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
      }
   }
   function loadDescriptionText() {
      if (readCookie('description-text(new__resume__mobile)') !== undefined) {
         descriptionText.value = readCookie('description-text(new__resume__mobile)');
         descriptionText.classList.add('not-empty');
         descriptionTextLenth.textContent = descriptionText.value.length;
      }
   }
   function loadList1() {
      if (readCookie('driver__license-list1(new__resume__mobile)') !== undefined) {
         driverLicenseArray1 = JSON.parse(readCookie('driver__license-list1(new__resume__mobile)'))
         driverLicenseArray1.forEach(elemArr => {
            driverLicenseList1Item.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   function loadDriverLicenseCheckbox() {
      if (readCookie('driver__license-checkbox(new__resume__mobile)') !== undefined) {
         if (readCookie('driver__license-checkbox(new__resume__mobile)') == 'true') {
            driverLicenseCheckbox.checked = true;
            driverLicenseList2.classList.remove('dont-click');
         }
      }
   }
   function loadList2() {
      if (readCookie('driver__license-list2(new__resume__mobile)') !== undefined) {
         driverLicenseArray2 = JSON.parse(readCookie('driver__license-list2(new__resume__mobile)'))
         driverLicenseArray2.forEach(elemArr => {
            driverLicenseList2Item.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   window.addEventListener("load", function load() {
      loadSurname();
      loadName();
      loadPatronymic();
      loadDayOfBith();
      loadGender();
      loadCityAndUnderground();
      loadCitizenship();
      loadWorkpermit()
      loadDescriptionText();
      loadList1();
      loadDriverLicenseCheckbox();
      loadList2();
   });
})