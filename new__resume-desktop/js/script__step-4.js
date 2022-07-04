import scrollTo from './script__scroll-to.js';
import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import { inputNumber } from "./script__input-number.js";

document.addEventListener("DOMContentLoaded", () => {
   let scrollY;
   let background = document.querySelector('.background');

   let step4 = document.querySelector('.left__content .step-4');

   let inputSurname = step4.querySelector('.initials__inner-input-surname'),
      inputName = step4.querySelector('.initials__inner-input-name'),
      inputPatronymic = step4.querySelector('.initials__inner-input-patronymic');

   let descriptionText = step4.querySelector('.description__text'),
      descriptionTextLenth = step4.querySelector('.description__text-count span');

   let dayOfBirthDay = step4.querySelector('.date-of-birth__input .day'),
      dayOfBirthMonth = step4.querySelector('.month__value'),
      dayOfBirthMonthValue = step4.querySelector('.month__value .item'),
      dayOfBirthMonthItems = step4.querySelectorAll('.month__list .item'),
      dayOfBirthYear = step4.querySelector('.date-of-birth__input .year');

   let locationBlock = step4.querySelector('.location');

   let cityInput = step4.querySelector('.city__input input'),
      cityInputList = step4.querySelector('.city__input-list');

   let genderItems = step4.querySelectorAll('.gender__items .item');

   let undergroundInput = step4.querySelector('.underground__input input'),
      undergroundInputList = step4.querySelector('.underground__input-list'),
      undergroundArr = [],
      undergroundList = step4.querySelector('.underground__list');

   let citizenshipInput = step4.querySelector('.citizenship__input input'),
      citizenshipInputList = step4.querySelector('.citizenship__input-list'),
      citizenshipArr = [],
      citizenshipList = step4.querySelector('.citizenship__list');

   let workPermitInput = step4.querySelector('.work-permit__input input'),
      workPermitInputList = step4.querySelector('.work-permit__input-list'),
      workPermitArr = [],
      workPermitList = step4.querySelector('.work-permit__list');

   let driverLicenseList1 = step4.querySelector('.driver__license .driver__license-list1'),
      driverLicenseList1Item = step4.querySelectorAll('.driver__license .driver__license-list1 .item'),
      driverLicenseArray1 = [],

      driverLicenseCheckbox = step4.querySelector('.driver__license .driver__license-checkbox input'),

      driverLicenseList2 = step4.querySelector('.driver__license .driver__license-list2'),
      driverLicenseList2Item = step4.querySelectorAll('.driver__license .driver__license-list2 .item'),
      driverLicenseArray2 = [];


   // загрузка изображения
   function imagePreview() {
      let popupCropImage = document.querySelector('.popup__crop-image'),
         popupCropImageSave = popupCropImage.querySelector('.btn-upload-image');

      let companyImageInputLoad = step4.querySelector('.image__upload'),
         companyImage = step4.querySelector('.image__picture'),
         companyImagePlaseholder = step4.querySelector('.image__plaseholder'),
         companyImageAddButton = step4.querySelector('.image__add'),
         companyImageAddMenu = step4.querySelector('.image__add-menu'),
         companyImageLoadBtn = step4.querySelector('.image__add-menu .load'),
         companyImageRemoveBtn = step4.querySelector('.image__add-menu .remove');

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
         let imageLoad = companyImageInputLoad.files[0];

         if (((imageLoad.size / 1024) / 1024) < 10) {
            reader.onloadend = function (e) {
               background.classList.add('active');
               popupCropImage.classList.add('active');
               scrollY = window.scrollY;
               scrollTo(popupCropImage, scrollY);

               resize.croppie('bind', {
                  url: e.target.result
               });
            }

            if (imageLoad) {
               reader.readAsDataURL(imageLoad);
               setTimeout(() => {
                  companyImagePlaseholder.style.display = 'none';
                  companyImage.style.display = 'block';
               }, 10)
            } else {
               companyImage.src = "";
               companyImage.style.display = 'none';
               companyImagePlaseholder.style.display = 'block';
            }
         }

      }

      companyImageInputLoad.addEventListener('change', () => {
         previewFile();
      })

      popupCropImageSave.addEventListener('click', () => {
         resize.croppie('result', {
            type: 'canvas',
            size: 'viewport'
         }).then(function (img) {
            popupCropImage.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupCropImage, scrollY);
            companyImage.style.display = 'block';
            companyImage.src = img;
            companyImagePlaseholder.style.display = 'none';
         });
      })

      document.addEventListener('click', (event) => {
         let target = event.target;

         // нажатие на меню добавления изображения
         if (target == companyImageAddButton) {
            companyImageAddMenu.classList.toggle('active');
         } else if (target !== companyImageAddButton && companyImageAddMenu.classList.contains('active')) {
            companyImageAddMenu.classList.remove('active');
         }

         // нажатие загрузить изображение
         if (target == companyImageLoadBtn) {
            companyImageInputLoad.click();
         }

         // закрыте попапа
         if (target.closest('.close-popup') && target.closest('.popup__crop-image')) {
            popupCropImage.classList.remove('active');
            background.classList.remove('active');
            scrollTo(popupCropImage, scrollY);
            if (companyImage.getAttribute('src') == '') {
               companyImage.style.display = 'none';
               companyImagePlaseholder.style.display = 'block';
            }
         }

         // нажатие удалить изображение 
         if (target == companyImageRemoveBtn) {
            companyImageInputLoad.value = '';
            companyImage.style.display = 'none';
            companyImage.src = '';
            companyImagePlaseholder.style.display = 'block';
         }
      })

   }
   imagePreview();


   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод имени отчества и фамилии
      function clickSurname() {
         if (target == inputSurname && target.closest('.initials')) {
            if (inputSurname.classList.contains('error')) {
               inputSurname.classList.remove('error')
            }
            inputSurname.addEventListener('input', () => {
               inputSurname.value = inputSurname.value.replace(/[^a-zа-яё -]/ig, '');
               if (inputSurname.value.length > 0) {
                  inputSurname.classList.add('not-empty');
                  writeCookie('initial-surname(new__resume)', inputSurname.value, 30);
               } else {
                  inputSurname.classList.remove('not-empty');
                  deleteCookie('initial-surname(new__resume)');
               }
            })
         }

         if (target == inputName && target.closest('.initials')) {
            if (inputName.classList.contains('error')) {
               inputName.classList.remove('error')
            }
            inputName.addEventListener('input', () => {
               inputName.value = inputName.value.replace(/[^a-zа-яё -]/ig, '');
               if (inputName.value.length > 0) {
                  inputName.classList.add('not-empty');
                  writeCookie('initial-name(new__resume)', inputName.value, 30);
               } else {
                  inputName.classList.remove('not-empty');
                  deleteCookie('initial-name(new__resume)');
               }
            })
         }

         if (target == inputPatronymic && target.closest('.initials')) {
            if (inputPatronymic.classList.contains('error')) {
               inputPatronymic.classList.remove('error')
            }
            inputPatronymic.addEventListener('input', () => {
               inputPatronymic.value = inputPatronymic.value.replace(/[^a-zа-яё -]/ig, '');
               if (inputPatronymic.value.length > 0) {
                  inputPatronymic.classList.add('not-empty');
                  writeCookie('iinitial-patronymic(new__resume)', inputPatronymic.value, 30);
               } else {
                  inputPatronymic.classList.remove('not-empty');
                  deleteCookie('iinitial-patronymic(new__resume)');
               }
            })
         }
      }
      clickSurname();

      // ввод описания о пользователе
      function inputDescription() {
         if (target == descriptionText && target.closest('.personal-information')) {
            descriptionText.addEventListener('input', () => {
               if (descriptionText.value.length > 0) {
                  descriptionText.classList.add('not-empty');
                  descriptionTextLenth.textContent = descriptionText.value.length;
                  writeCookie('description-text(new__resume)', descriptionText.value, 30);
               } else {
                  descriptionText.classList.remove('not-empty');
                  descriptionTextLenth.textContent = descriptionText.value.length;
                  deleteCookie('description-text(new__resume)');
               }
            })
         }
      }
      inputDescription();

      // ввод даты рождения
      function clickDayOfBirth() {
         // ввод дня
         if (target == dayOfBirthDay) {
            let dayMonth = Number(dayOfBirthMonthValue.getAttribute('data-day'))

            dayOfBirthDay.addEventListener('input', () => {
               inputNumber(dayOfBirthDay);
               if (+(dayOfBirthDay.value) > (dayMonth != undefined ? dayMonth = dayOfBirthMonthValue.getAttribute('data-day') : 31)) {
                  dayOfBirthDay.value = '';
               }
               if (dayOfBirthDay.value != '') {
                  dayOfBirthDay.classList.add('not-empty');
                  writeCookie('day-of-birth__day(new__resume)', dayOfBirthDay.value, 30);
               } else {
                  dayOfBirthDay.classList.remove('not-empty');
                  deleteCookie('day-of-birth__day(new__resume)');
               }
            })
         }

         // выбор месяца
         if (target.closest('.month__value') && target.closest('.date-of-birth__input')) {
            if (target.closest('.month__value').classList.contains('error')) {
               target.closest('.month__value').classList.remove('error');
            }

            if (target.closest('.month').querySelector('.month__list').classList.contains('hide')) {
               step4.querySelectorAll('.month__list').forEach(list => {
                  list.classList.add('hide');
               })
               target.closest('.month').querySelector('.month__list').classList.remove('hide');
            } else {
               step4.querySelectorAll('.month__list').forEach(list => {
                  list.classList.add('hide');
               })
               target.closest('.month').querySelector('.month__list').classList.add('hide');
            }
         } else {
            step4.querySelectorAll('.month__list').forEach(list => {
               if (!list.classList.contains('hide')) {
                  list.classList.add('hide');
               }
            })
         }

         // нажатие на элементы выпадющего списка
         if (target.closest('.item') && target.closest('.month__list') && target.closest('.date-of-birth__input')) {
            target.closest('.month__list').querySelectorAll('.item').forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            target.closest('.month').querySelector('.month__value').classList.add('not-empty');
            target.closest('.month').querySelector('.month__value .item').textContent = target.closest('.item').textContent;
            target.closest('.month').querySelector('.month__value .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));
            target.closest('.month').querySelector('.month__value .item').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
            target.closest('.month').querySelector('.month__value .item').setAttribute('data-day', target.closest('.item').getAttribute('data-day'));
            writeCookie('day-of-birth__month(new__resume)', target.closest('.item').getAttribute('data-name'), 30);

            if (dayOfBirthDay.value > target.closest('.item').getAttribute('data-day')) {
               dayOfBirthDay.value = target.closest('.item').getAttribute('data-day')
            }
         }

         // ввод года
         if (target == dayOfBirthYear) {
            dayOfBirthYear.addEventListener('input', () => {
               inputNumber(dayOfBirthYear);
               if (dayOfBirthYear.value != '' && dayOfBirthYear.value.length == 4) {
                  dayOfBirthYear.classList.add('not-empty');
                  writeCookie('day-of-birth__year(new__resume)', dayOfBirthYear.value, 30);
               } else {
                  dayOfBirthYear.classList.remove('not-empty');
                  deleteCookie('day-of-birth__year(new__resume)');
               }
            })

            // проверка данных при вводе года (нынешний год - 70 лет)
            dayOfBirthYear.onblur = function () {
               if (dayOfBirthYear.value >= new Date().getFullYear() - 14 || dayOfBirthYear.value <= new Date().getFullYear() - 70) {
                  dayOfBirthYear.value = '';
                  dayOfBirthYear.classList.remove('not-empty');
                  deleteCookie('day-of-birth__year(new__resume)');
               }
            };
         }
      }
      clickDayOfBirth();

      // выбор пола
      function clickGender() {
         if (target.closest('.item') && target.closest('.gender__items')) {
            genderItems.forEach(item => {
               item.classList.remove('active')
            })
            target.closest('.item').classList.add('active');
            writeCookie('gender-value(new__resume)', target.closest('.item').getAttribute('data-name'), 30)
         }
      }
      clickGender();

      // ввод города
      function inputCity() {
         // ввод местоположения
         if (target == cityInput) {
            cityInput.addEventListener('input', () => {
               cityInput.value = cityInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (cityInput.value.length >= 3) {
                  cityInputList.classList.remove('hide');
               } else {
                  cityInputList.classList.add('hide');
                  deleteCookie('city(new__resume)');

                  locationBlock.classList.add('dont-show-metro');
                  undergroundList.classList.add('hide');
                  undergroundArr = []
                  undergroundList.classList.add('hide');
                  undergroundList.querySelectorAll('.item').forEach(item => {
                     item.remove();
                  })
                  deleteCookie('underground(new__resume)');
               }

               if (cityInput.value.length > 0) {
                  cityInput.classList.add('not-empty')
               } else {
                  cityInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == cityInputList) {
            cityInput.value = target.closest('.item').textContent;
            cityInputList.classList.add('hide');
            writeCookie('city(new__resume)', target.closest('.item').getAttribute('data-name'), 30);
            // показать/скрыть инпут для ввод метро
            if (readCookie('city(new__resume)') == 'Казань' || readCookie('city(new__resume)') == 'Москва' || readCookie('city(new__resume)') == 'Санкт-Петербург' ||
               readCookie('city(new__resume)') == 'Алма-Ата' || readCookie('city(new__resume)') == 'Баку' || readCookie('city(new__resume)') == 'Новосибирск' ||
               readCookie('city(new__resume)') == 'Киев' || readCookie('city(new__resume)') == 'Тбилиси' || readCookie('city(new__resume)') == 'Ереван' ||
               readCookie('city(new__resume)') == 'Самара' || readCookie('city(new__resume)') == 'Харьков' || readCookie('city(new__resume)') == 'Минск' ||
               readCookie('city(new__resume)') == 'Нижний Новгород' || readCookie('city(new__resume)') == 'Екатеринбург' || readCookie('city(new__resume)') == 'Днепр') {
               locationBlock.classList.remove('dont-show-metro');
               undergroundList.classList.add('hide');
               undergroundArr = []
               undergroundList.classList.add('hide');
               undergroundList.querySelectorAll('.item').forEach(item => {
                  item.remove();
               })
               deleteCookie('underground(new__resume)');
            } else {
               locationBlock.classList.add('dont-show-metro');
               undergroundList.classList.add('hide');
               undergroundArr = []
               undergroundList.classList.add('hide');
               undergroundList.querySelectorAll('.item').forEach(item => {
                  item.remove();
               })
               deleteCookie('underground(new__resume)');
            }
         } else if (!(target.closest('.item')) && target.parentNode !== cityInputList && !(cityInputList.classList.contains('hide'))) {
            cityInput.value = '';
            cityInputList.classList.add('hide');
         }
      }
      inputCity();

      // ввод метро
      function inputUnderground() {
         // ввод местоположения
         if (target == undergroundInput) {
            undergroundInput.addEventListener('input', () => {
               undergroundInput.value = undergroundInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (undergroundInput.value.length >= 3) {
                  undergroundInputList.classList.remove('hide');
               } else {
                  undergroundInputList.classList.add('hide');
               }

               if (undergroundInput.value.length > 0) {
                  undergroundInput.classList.add('not-empty')
               } else {
                  undergroundInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == undergroundInputList) {
            undergroundInput.value = '';
            undergroundInputList.classList.add('hide');
            if (undergroundArr.length < 3) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);

               // не добавлять в массив одинаковые значения
               if (undergroundArr.indexOf(target.getAttribute('data-name')) == -1) {
                  undergroundArr.push(target.getAttribute('data-name'));
                  writeCookie('underground(new__resume)', JSON.stringify(undergroundArr), 30);
                  cloneItem.append(removeBtn);
                  undergroundList.append(cloneItem);
               }
               if (undergroundArr != 0) {
                  undergroundList.classList.remove('hide');
               } else {
                  undergroundList.classList.add('hide');
               }
            }

            undergroundInput.classList.remove('not-empty')
         } else if (!(target.closest('.item')) && target.parentNode !== undergroundInputList && !(undergroundInputList.classList.contains('hide'))) {
            undergroundInput.value = '';
            undergroundInputList.classList.add('hide');
         }

         // удаление элемента из выбранных
         if (target.closest('.remove-btn') && target.closest('.item') && target.closest('.underground__list')) {
            target.closest('.item').remove();
            undergroundArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  undergroundArr.splice((undergroundArr.indexOf(elemArr)), 1);
                  writeCookie('underground(new__resume)', JSON.stringify(undergroundArr), 30);
               }

               if (undergroundArr == 0) {
                  undergroundList.classList.add('hide');
                  deleteCookie('underground(new__resume)');
               }
            })
         }
      }
      inputUnderground();

      // ввод гражданства
      function inputCitizenship() {
         // ввод гражданства
         if (target == citizenshipInput) {
            citizenshipInput.addEventListener('input', () => {
               citizenshipInput.value = citizenshipInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (citizenshipInput.value.length >= 3) {
                  citizenshipInputList.classList.remove('hide');
               } else {
                  citizenshipInputList.classList.add('hide');
               }

               if (citizenshipInput.value.length > 0) {
                  citizenshipInput.classList.add('not-empty')
               } else {
                  citizenshipInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == citizenshipInputList) {
            citizenshipInput.value = '';
            citizenshipInputList.classList.add('hide');

            if (citizenshipArr.length < 5) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (citizenshipArr.indexOf(target.getAttribute('data-name')) == -1) {
                  citizenshipArr.push(target.getAttribute('data-name'));
                  writeCookie('citizenship(new__resume)', JSON.stringify(citizenshipArr), 30);
                  cloneItem.append(removeBtn);
                  citizenshipList.append(cloneItem);
               }
               if (citizenshipArr != 0) {
                  citizenshipList.classList.remove('hide');
               } else {
                  citizenshipList.classList.add('hide');
               }
            }

            citizenshipInput.classList.remove('not-empty')
         } else if (!(target.closest('.item')) && target.parentNode !== citizenshipInputList && !(citizenshipInputList.classList.contains('hide'))) {
            citizenshipInput.value = '';
            citizenshipInputList.classList.add('hide');
         }

         // удаление элемента из выбранных
         if (target.closest('.remove-btn') && target.closest('.item') && target.closest('.citizenship__list')) {
            target.closest('.item').remove();
            citizenshipArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  citizenshipArr.splice((citizenshipArr.indexOf(elemArr)), 1);
                  writeCookie('citizenship(new__resume)', JSON.stringify(citizenshipArr), 30);
               }

               if (citizenshipArr == 0) {
                  citizenshipList.classList.add('hide');
                  deleteCookie('citizenship(new__resume)');
               }
            })
         }
      }
      inputCitizenship();

      // ввод разрешения на работу
      function inputPermit() {
         // ввод гражданства
         if (target == workPermitInput) {
            workPermitInput.addEventListener('input', () => {
               workPermitInput.value = workPermitInput.value.replace(/[^a-zа-яё,.-]/ig, '');
               if (workPermitInput.value.length >= 3) {
                  workPermitInputList.classList.remove('hide');
               } else {
                  workPermitInputList.classList.add('hide');
               }

               if (workPermitInput.value.length > 0) {
                  workPermitInput.classList.add('not-empty')
               } else {
                  workPermitInput.classList.remove('not-empty')
               }
            })
         }

         // добавление элемента из списка
         if (target.closest('.item') && target.parentNode == workPermitInputList) {
            workPermitInput.value = '';
            workPermitInputList.classList.add('hide');

            if (workPermitArr.length < 5) {
               let removeBtn = document.createElement('span');
               removeBtn.className = 'remove-btn'
               let cloneItem = target.cloneNode(true);
               // не добавлять в массив одинаковые значения
               if (workPermitArr.indexOf(target.getAttribute('data-name')) == -1) {
                  workPermitArr.push(target.getAttribute('data-name'));
                  writeCookie('work-permit(new__resume)', JSON.stringify(workPermitArr), 30);
                  cloneItem.append(removeBtn);
                  workPermitList.append(cloneItem);
               }
               if (workPermitArr != 0) {
                  workPermitList.classList.remove('hide');
               } else {
                  workPermitList.classList.add('hide');
               }
            }

            workPermitInput.classList.remove('not-empty')
         } else if (!(target.closest('.item')) && target.parentNode !== workPermitInputList && !(workPermitInputList.classList.contains('hide'))) {
            workPermitInput.value = '';
            workPermitInputList.classList.add('hide');
         }

         // удаление элемента из выбранных
         if (target.closest('.remove-btn') && target.closest('.item') && target.closest('.work-permit__list')) {
            target.closest('.item').remove();
            workPermitArr.forEach(elemArr => {
               if (elemArr == target.closest('.item').getAttribute('data-name')) {
                  workPermitArr.splice((workPermitArr.indexOf(elemArr)), 1);
                  writeCookie('work-permit(new__resume)', JSON.stringify(workPermitArr), 30);
               }

               if (workPermitArr == 0) {
                  workPermitList.classList.add('hide');
                  deleteCookie('work-permit(new__resume)');
               }
            })
         }
      }
      inputPermit();

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
      clickList(driverLicenseList1, driverLicenseArray1, 'driver__license-list1(new__resume)');
      clickList(driverLicenseList2, driverLicenseArray2, 'driver__license-list2(new__resume)');

      // нажатие на чекбокс "Есть личный автомобиль"
      function clickDriverLicenseCheckbox() {
         if (target == driverLicenseCheckbox && target.closest('.driver__license-checkbox')) {
            if (driverLicenseCheckbox.checked) {
               writeCookie('driver__license-checkbox(new__resume)', true, 30);
               driverLicenseList2.classList.remove('dont-click');
            } else {
               deleteCookie('driver__license-checkbox(new__resume)');
               deleteCookie('driver__license-list2(new__resume)');
               driverLicenseList2.classList.add('dont-click');
               driverLicenseList2.querySelectorAll('.item').forEach(item => {
                  item.classList.remove('active');
               })
            }
         }
      }
      clickDriverLicenseCheckbox();

      // нажатие на кнопки после ввода данных
      function clickBtn() {

         if (target.closest('.next') && target.closest('.step-4')) {
            let validateSurname = false
            let validateName = false

            if (readCookie('initial-surname(new__resume)') !== undefined && readCookie('initial-surname(new__resume)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSurname = true
            } else {
               inputSurname.classList.add('error')
            }

            if (readCookie('initial-name(new__resume)') !== undefined && readCookie('initial-name(new__resume)').replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
            } else {
               inputName.classList.add('error')
            }

            if (validateSurname && validateName) {
               clickBtnNext();
            }
         }

         if (target.closest('.back') && target.closest('.step-4')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });

   // получение данных при перезагрузке страници
   function loadSurname() {
      if (readCookie('initial-surname(new__resume)') != undefined) {
         inputSurname.value = readCookie('initial-surname(new__resume)');
         inputSurname.classList.add('not-empty');
      }
   }
   function loadName() {
      if (readCookie('initial-name(new__resume)') != undefined) {
         inputName.value = readCookie('initial-name(new__resume)');
         inputName.classList.add('not-empty');
      }
   }
   function loadPatronymic() {
      if (readCookie('iinitial-patronymic(new__resume)') != undefined) {
         inputPatronymic.value = readCookie('iinitial-patronymic(new__resume)');
         inputPatronymic.classList.add('not-empty');
      }
   }
   function loadDescriptionText() {
      if (readCookie('description-text(new__resume)') != undefined) {
         descriptionText.value = readCookie('description-text(new__resume)');
         descriptionText.classList.add('not-empty');
         descriptionTextLenth.textContent = descriptionText.value.length;
      }
   }
   function loadDayOfBith() {
      if (readCookie('day-of-birth__day(new__resume)') != undefined) {
         dayOfBirthDay.value = readCookie('day-of-birth__day(new__resume)')
         dayOfBirthDay.classList.add('not-empty');
      }

      if (readCookie('day-of-birth__month(new__resume)') != undefined) {
         dayOfBirthMonth.classList.add('not-empty');
         dayOfBirthMonthItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('day-of-birth__month(new__resume)')) {
               item.classList.add('active');
               dayOfBirthMonthValue.textContent = item.textContent;
               dayOfBirthMonthValue.setAttribute('data-value', item.getAttribute('data-value'));
               dayOfBirthMonthValue.setAttribute('data-name', item.getAttribute('data-name'));
               dayOfBirthMonthValue.setAttribute('data-day', item.getAttribute('data-day'));
            }
         });
      }

      if (readCookie('day-of-birth__year(new__resume)') != undefined) {
         dayOfBirthYear.value = readCookie('day-of-birth__year(new__resume)')
         dayOfBirthYear.classList.add('not-empty');
      }
   }
   function loadGender() {
      if (readCookie('gender-value(new__resume)') != undefined) {
         genderItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('gender-value(new__resume)')) {
               item.classList.add('active')
            };
         })
      }
   }
   function loadCity() {
      if (readCookie('city(new__resume)') != undefined) {
         cityInput.value = readCookie('city(new__resume)')
         cityInput.classList.add('not-empty')
         if (readCookie('city(new__resume)') == 'Казань' || readCookie('city(new__resume)') == 'Москва' || readCookie('city(new__resume)') == 'Санкт-Петербург' ||
            readCookie('city(new__resume)') == 'Алма-Ата' || readCookie('city(new__resume)') == 'Баку' || readCookie('city(new__resume)') == 'Новосибирск' ||
            readCookie('city(new__resume)') == 'Киев' || readCookie('city(new__resume)') == 'Тбилиси' || readCookie('city(new__resume)') == 'Ереван' ||
            readCookie('city(new__resume)') == 'Самара' || readCookie('city(new__resume)') == 'Харьков' || readCookie('city(new__resume)') == 'Минск' ||
            readCookie('city(new__resume)') == 'Нижний Новгород' || readCookie('city(new__resume)') == 'Екатеринбург' || readCookie('city(new__resume)') == 'Днепр') {
            locationBlock.classList.remove('dont-show-metro');
         } else {
            locationBlock.classList.add('dont-show-metro');
         }
      }

   }
   function loadUnderground() {
      if (readCookie('underground(new__resume)') !== undefined) {
         undergroundArr = JSON.parse(readCookie('underground(new__resume)'))
         if (undergroundArr.length != 0) {
            undergroundList.classList.remove('hide')
            undergroundArr.forEach(elemArr => {
               let undergroundItem = `
               <p class="item" data-value="" data-name="${elemArr}">
                  ${elemArr}<span class="remove-btn"></span>
               </p>
               `;
               undergroundList.insertAdjacentHTML('beforeend', undergroundItem);
            })
         }
      }
   }
   function loadСitizenship() {
      if (readCookie('citizenship(new__resume)') !== undefined) {
         citizenshipArr = JSON.parse(readCookie('citizenship(new__resume)'))
         if (citizenshipArr.length != 0) {
            citizenshipList.classList.remove('hide')
            citizenshipArr.forEach(elemArr => {
               let citizenshipItem = `
               <p class="item" data-value="" data-name="${elemArr}">
                  ${elemArr}<span class="remove-btn"></span>
               </p>
               `;
               citizenshipList.insertAdjacentHTML('beforeend', citizenshipItem);
            })
         }
      }
   }
   function loadPermit() {
      if (readCookie('work-permit(new__resume)') !== undefined) {
         workPermitArr = JSON.parse(readCookie('work-permit(new__resume)'))
         if (workPermitArr.length != 0) {
            workPermitList.classList.remove('hide')
            workPermitArr.forEach(elemArr => {
               let permitItem = `
               <p class="item" data-value="" data-name="${elemArr}">
                  ${elemArr}<span class="remove-btn"></span>
               </p>
               `;
               workPermitList.insertAdjacentHTML('beforeend', permitItem);
            })
         }
      }
   }
   function loadList1() {
      if (readCookie('driver__license-list1(new__resume)') !== undefined) {
         driverLicenseArray1 = JSON.parse(readCookie('driver__license-list1(new__resume)'))
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
      if (readCookie('driver__license-checkbox(new__resume)') != undefined) {
         if (readCookie('driver__license-checkbox(new__resume)') == 'true') {
            driverLicenseCheckbox.checked = true;
            driverLicenseList2.classList.remove('dont-click');
         }
      }
   }
   function loadList2() {
      if (readCookie('driver__license-list2(new__resume)') !== undefined) {
         driverLicenseArray2 = JSON.parse(readCookie('driver__license-list2(new__resume)'))
         driverLicenseArray2.forEach(elemArr => {
            driverLicenseList2Item.forEach(item => {
               if (elemArr == item.getAttribute('data-name')) {
                  item.classList.add('active');
               }
            })
         })
      }
   }
   window.addEventListener('load', function load() {
      loadSurname();
      loadName();
      loadPatronymic();
      loadDescriptionText();
      loadDayOfBith();
      loadGender();
      loadCity();
      loadUnderground();
      loadСitizenship();
      loadPermit();
      loadList1();
      loadDriverLicenseCheckbox();
      loadList2();
   }, false);
})