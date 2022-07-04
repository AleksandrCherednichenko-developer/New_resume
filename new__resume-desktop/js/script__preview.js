import scrollTo from './script__scroll-to.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let scrollY;

   let previewBtn = document.querySelector('.step-7 .button .preview');
   let background = document.querySelector('.background');
   let popupPreview = document.querySelector('.popup__preview');
   let closePopupPreview = popupPreview.querySelector('.close-popup');

   let previewImage = popupPreview.querySelector('.basic__information-left .image__picture'),
      previewImagePlaseholder = popupPreview.querySelector('.basic__information-left .image__plaseholder')

   let fullName = popupPreview.querySelector('.basic__information-left .info__name'),
      dopInfo = popupPreview.querySelector('.basic__information-left .info__dopinfo')

   let income = popupPreview.querySelector('.basic__information-right .income'),
      incomeValue = income.querySelector('.income__value'),
      incomeInfo = income.querySelector('.income__info')

   let careerObject = popupPreview.querySelector('.career-object__name')

   let workingFormat = popupPreview.querySelector('.working__format'),
      workingFormatValue = workingFormat.querySelector('.value'),
      workingFormatArr = []

   let employmentFormat = popupPreview.querySelector('.employment'),
      employmentFormatValue = employmentFormat.querySelector('.value'),
      employmentFormateArr = []

   let workingMode = popupPreview.querySelector('.working__mode'),
      workingModeValue = workingMode.querySelector('.value'),
      workingModeArr = []

   let bisnessTripMode = popupPreview.querySelector('.bisness__trip'),
      bisnessTripModeValue = bisnessTripMode.querySelector('.value')

   let relocation = popupPreview.querySelector('.relocation'),
      relocationValue = relocation.querySelector('.value')

   let haveExperienceBlock = document.querySelector('.have__experience-block'),
      noExperienceBlock = document.querySelector('.no__experience-block'),
      haveExperiencePopup = popupPreview.querySelector('.have__experience'),
      haveExperiencePopupValue = popupPreview.querySelector('.have__experience-value'),
      noExperiencePopup = popupPreview.querySelector('.no__experience'),
      noExperiencePopupValue = popupPreview.querySelector('.no__experience-value')

   let skill = popupPreview.querySelector('.skill'),
      skillArr = []

   let educationBlock = popupPreview.querySelector('.education'),
      educationValueStandart = popupPreview.querySelector('.education__value-standart'),
      educationValue = popupPreview.querySelector('.education__value')

   let additionalEducationBlock = popupPreview.querySelector('.additional-education'),
      additionalEducationValue = popupPreview.querySelector('.additional-education__value')

   let languages = popupPreview.querySelector('.languages')

   let personalInformationBlock = popupPreview.querySelector('.personal__information'),
      citizenship = popupPreview.querySelector('.citizenship'),
      workPermit = popupPreview.querySelector('.work-permit'),
      driverLicense = popupPreview.querySelector('.driver__license'),
      carClass = popupPreview.querySelector('.car__class')

   let description = popupPreview.querySelector('.description'),
      descriptionValue = popupPreview.querySelector('.description__value')

   let resumePhoto = popupPreview.querySelector('.resume__photo'),
      resumePhotoPreview = popupPreview.querySelector('.resume__photo-preview')

   let contactBlock = popupPreview.querySelector('.contact')

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

      // открытие попапа Предпросмотр
      if (target == previewBtn) {
         background.classList.add('active');
         popupPreview.classList.add('active');
         scrollY = window.scrollY;
         scrollTo(popupPreview, scrollY);

         // загрузка изображения
         if (document.querySelector('.initials__inner-image .image__picture').getAttribute('src') !== '') {
            previewImage.setAttribute('src', document.querySelector('.initials__inner-image .image__picture').getAttribute('src'));
            previewImage.style.display = 'block';
            previewImagePlaseholder.style.display = 'none';
         }

         // имя и фамилия
         if (readCookie('initial-surname(new__resume)') != undefined && readCookie('initial-name(new__resume)') != undefined) {
            if (readCookie('iinitial-patronymic(new__resume)') != undefined) {
               fullName.textContent = `${readCookie('initial-surname(new__resume)')} ${readCookie('initial-name(new__resume)')} ${readCookie('iinitial-patronymic(new__resume)')}`
            } else {
               fullName.textContent = `${readCookie('initial-surname(new__resume)')} ${readCookie('initial-name(new__resume)')}`
            }
         } else {
            fullName.textContent = 'Данные указаны не верно'
         }

         // дополнительная информация
         let age
         if (readCookie('day-of-birth__year(new__resume)') != undefined) {
            age = `${new Date().getFullYear() - (+readCookie('day-of-birth__year(new__resume)'))} ${declOfNum(new Date().getFullYear() - (+readCookie('day-of-birth__year(new__resume)')), ['год', 'года', 'лет'])}, `
         } else {
            age = ''
         }
         let city
         if (readCookie('city(new__resume)') != undefined) {
            city = `${readCookie('city(new__resume)')}`
         } else {
            city = ''
         }
         let underground
         let undergroundArr = []
         if (readCookie('underground(new__resume)') != undefined) {
            undergroundArr = JSON.parse(readCookie('underground(new__resume)'))
            underground = `, ${undergroundArr.join(', ')}`
         } else {
            underground = ''
         }
         dopInfo.textContent = `${age}${city}${underground}`

         // вывод зарплаты
         if (readCookie('income(new__resume)') != undefined) {
            income.classList.remove('hide');
            incomeValue.textContent = `${parseInt(readCookie('income(new__resume)')).toLocaleString('ru')} ${readCookie('income__currency(new__resume)')}`;
            incomeInfo.textContent = readCookie('income-period(new__resume)');
         }

         // вывод должности
         if (readCookie('career__objective__value(new__resume)') != undefined) {
            careerObject.textContent = readCookie('career__objective__value(new__resume)');
         } else {
            careerObject.textContent = 'Должность не указана';
         }

         // вывод форматов работы
         if (readCookie('work__format-checkbox(new__resume)') != undefined) {
            workingFormat.classList.remove('hide');
            let item = `<p class="item" data-name="Удалённо">Удалённо</p>`;
            workingFormatValue.insertAdjacentHTML('beforeend', item);
         } else {
            if (readCookie('working__format(new__resume)') != undefined) {
               workingFormatArr = JSON.parse(readCookie('working__format(new__resume)'));
               workingFormat.classList.remove('hide');

               workingFormatArr.forEach(elemArr => {
                  let item = `<p class="item" data-name="${elemArr}">${elemArr}</p>`;
                  workingFormatValue.insertAdjacentHTML('beforeend', item);
               });
            }
         }

         // вывод занятости
         if (readCookie('employment(new__resume)') != undefined) {
            employmentFormateArr = JSON.parse(readCookie('employment(new__resume)'));
            employmentFormat.classList.remove('hide');

            employmentFormateArr.forEach(elemArr => {
               let item = `<p class="item" data-name="${elemArr}">${elemArr}</p>`;
               employmentFormatValue.insertAdjacentHTML('beforeend', item);
            });
         }

         // вывод режимов работы
         if (readCookie('schedule(new__resume)') != undefined) {
            workingModeArr = JSON.parse(readCookie('schedule(new__resume)'));

            workingMode.classList.remove('hide');
            workingModeArr.forEach(elemArr => {
               let item = `<p class="item" data-name="${elemArr}">${elemArr}</p>`;
               workingModeValue.insertAdjacentHTML('beforeend', item);
            });
         }

         // вывод готовность к командировкам
         if (readCookie('bisness-trip(new__resume)') != undefined) {
            bisnessTripMode.classList.remove('hide');

            let item = `<p class='item' data-name='${readCookie('bisness-trip(new__resume)')}'>${readCookie('bisness-trip(new__resume)')}</p>`;
            bisnessTripModeValue.insertAdjacentHTML('beforeend', item);
         }

         // вывод готовность к перезду
         if (readCookie('relocation-possible(new__resume)') != undefined) {
            relocation.classList.remove('hide');

            let item = `<p class="item" data-name="${readCookie('relocation-possible(new__resume)')}">Возможен переезд</p>`;
            relocationValue.insertAdjacentHTML('beforeend', item);
         }

         // вывод опыта работы
         if (noExperienceBlock.classList.contains('active')) {
            if (readCookie('no_experience-block(new__resume)') != undefined) {
               haveExperiencePopup.classList.add('hide')
               noExperiencePopup.classList.remove('hide')
               noExperiencePopupValue.textContent = readCookie('no_experience-block(new__resume)')
            }
         } else {
            if (readCookie('place_work(new__resume)') != undefined) {
               haveExperiencePopup.classList.remove('hide')
               noExperiencePopup.classList.add('hide')

               let valueArr = JSON.parse(readCookie('place_work(new__resume)'))
               let item
               valueArr.forEach(elemArr => {
                  let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('p'),
                     responsibilitiesData = newStrObject.getAttribute('data-responsibilities'),
                     achievementsData = newStrObject.getAttribute('data-achievements'),
                     reasonForLeavingData = newStrObject.getAttribute('data-reason-for-leaving'),
                     dataMonthFrom = newStrObject.getAttribute('data-month-from'),
                     dataYearFrom = newStrObject.getAttribute('data-year-from'),
                     dataMonthUpto = newStrObject.getAttribute('data-month-upto'),
                     dataYearUpto = newStrObject.getAttribute('data-year-upto')

                  let responsibilities
                  if (responsibilitiesData != null && responsibilitiesData != '') {
                     // responsibilities = buildHTMLList(responsibilitiesData.split(','))
                     responsibilities = responsibilitiesData
                  } else {
                     responsibilities = 'Обязанности не указаны'
                  }

                  let achievements
                  if (achievementsData != null && achievementsData != '') {
                     // achievements = buildHTMLList(achievementsData.split(','))
                     achievements = achievementsData
                  } else {
                     achievements = 'Достижения не указаны'
                  }

                  let reasonForLeaving
                  if (reasonForLeavingData != null && reasonForLeavingData != '') {
                     // reasonForLeaving = buildHTMLList(reasonForLeavingData.split(','))
                     reasonForLeaving = reasonForLeavingData
                  } else {
                     reasonForLeaving = 'Причина ухода не указана'
                  }

                  let period
                  if (dataMonthUpto != null && dataMonthUpto != '') {
                     function passed(d, m, g, dd, mm, gg) {
                        var a = new Date(g, m - 1, d, 0, 0, 0, 0), b = new Date(gg, mm - 1, dd, 0, 0, 0, 0);
                        for (m = 0; ; m++) {
                           g = new Date(a.getFullYear(), a.getMonth() + 2, 0);
                           g.getDate() > d && g.setDate(d);
                           if (g > b) break;
                           a = g
                        }
                        g = Math.floor(m / 12);//сколько полных лет в подсчитанных месяцах
                        m = m % 12;//оставшиеся месяцы от полных лет
                        // return [g, m, d]
                        if (g < 1) {
                           period = `
                              ${m} ${declOfNum((m), ['месяц', 'месяца', 'месяцев'])}
                           `
                        } else {
                           period = `
                              ${g} ${declOfNum((g), ['год', 'года', 'лет'])} ${m} ${declOfNum((m), ['месяц', 'месяца', 'месяцев'])}
                           `
                        }
                        return period;
                     };
                     period = passed('1', `${dataMonthFrom} `, `${dataYearFrom} `, '1', `${dataMonthUpto} `, `${dataYearUpto} `)
                  } else {
                     if (new Date().getFullYear() - dataYearFrom !== 0) {
                        period = `
                           ${new Date().getFullYear() - dataYearFrom} ${declOfNum((new Date().getFullYear() - dataYearFrom), ['год', 'года', 'лет'])}
                           ${new Date().getMonth() + 1 - dataMonthFrom} ${declOfNum((new Date().getMonth() + 1 - dataMonthFrom), ['месяц', 'месяца', 'месяцев'])}
                        `
                     } else {
                        period = `
                           ${new Date().getMonth() + 1 - dataMonthFrom} ${declOfNum((new Date().getMonth() + 1 - dataMonthFrom), ['месяц', 'месяца', 'месяцев'])}
                        `
                     }
                  }

                  item = `
                     <div class="item">
                        <div class="period">
                           <p>${newStrObject.querySelector('.work__period').textContent}</p>
                           <p class="period__exact text-s12-h14-w400">${period}</p>
                        </div>
                        <div class="info">
                           <p class="info__position text-s14-h20-w500">${newStrObject.querySelector('.company__position').textContent}</p>
                           <p class="info__company text-s12-h14-w400">${newStrObject.querySelector('.company__name').textContent}</p>
                           <ul class="responsibilities">
                              <p>Обязанности</p>
                              ${responsibilities}
                           </ul>
                           <ul class="achievements">
                              <p>Достижения</p>
                              ${achievements}
                           </ul>
                           <ul class="reason-for-leaving">
                              <p>Причина ухода</p>
                              ${reasonForLeaving}
                           </ul>
                        </div>
                     </div>
                  `

                  haveExperiencePopupValue.insertAdjacentHTML('beforeend', item);
               })
            }
         }

         // вывод ключевых навыков
         if (readCookie('skill-value(new__resume)') != undefined) {
            skill.classList.remove('hide');
            skillArr = JSON.parse(readCookie('skill-value(new__resume)'));
            let skillItem
            skillArr.forEach(elemArr => {
               skillItem = `<p class="item text-s14-h20-w400" data-name="${elemArr}">${elemArr}</p>`;
               skill.querySelector('.skill__value').insertAdjacentHTML('beforeend', skillItem);
            });
         }

         // вывод образования
         if (readCookie('education__checkbox(new__resume)') != undefined) {
            educationBlock.classList.remove('hide');
            educationValueStandart.classList.remove('hide');
            educationValue.classList.add('hide');
         } else if (readCookie('education(new__resume)')) {
            educationBlock.classList.remove('hide');
            educationValueStandart.classList.add('hide');
            educationValue.classList.remove('hide');

            let valueArr = JSON.parse(readCookie('education(new__resume)'))
            let item
            valueArr.forEach(elemArr => {
               let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('p')

               item = `
                  <div class="item">
                     <p class="education__value-year text-s14-h20-w400">${newStrObject.getAttribute('data-from')} - ${newStrObject.getAttribute('data-to')}</p>
                     <div class="education__value-inner">
                        <p class="education__value-name">${newStrObject.getAttribute('data-name')}</p>
                        <p class="education__value-speciality">${newStrObject.getAttribute('data-spec')}</p>
                     </div>
                  </div>
               `

               educationValue.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод дополнитнльного образования
         if (readCookie('additional__education(new__resume)')) {
            additionalEducationBlock.classList.remove('hide');

            let valueArr = JSON.parse(readCookie('additional__education(new__resume)'))
            let item
            valueArr.forEach(elemArr => {
               let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('p')

               item = `
                  <div class="item">
                     <p class="additional-education__value-year text-s14-h20-w400">${newStrObject.getAttribute('data-from')} - ${newStrObject.getAttribute('data-to')}</p>
                     <div class="additional-education__value-inner">
                        <p class="additional-education__value-name">${newStrObject.getAttribute('data-name')}</p>
                        <p class="additional-education__value-speciality">${newStrObject.getAttribute('data-spec')}</p>
                     </div>
                  </div>
               `

               additionalEducationValue.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод родного языка
         if (readCookie('languages-native(new__resume)') != undefined) {
            let languagesItem = `
                     <div class="languages__value-item">
                        <p class="name">${readCookie('languages-native(new__resume)')}</p>
                        <p class="lavel">Родной</p>
                     </div>
                     `;
            languages.querySelector('.languages__value').insertAdjacentHTML('beforeend', languagesItem);
         }

         // вывод языков
         if (localStorage.getItem('languages-value(new__resume)') != undefined) {
            additionalEducationBlock.classList.remove('hide');
            languages.classList.remove('hide');
            let languagesArr = []
            languagesArr = (JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume)'))))

            let languagesName;
            let languagesLavel;
            let languagesItem;

            languagesArr.forEach(elemArr => {
               languagesName = elemArr[0].split(';')[0].split(':')[0]
               languagesLavel = elemArr[0].split(';')[1].split(':')[0]

               languagesItem = `
                  <div class="languages__value-item">
                     <p class="name">${languagesName}</p>
                     <p class="lavel">${languagesLavel}</p>
                  </div>
               `;
               languages.querySelector('.languages__value').insertAdjacentHTML('beforeend', languagesItem);
            })
         }

         // вывод описания
         if (readCookie('description-text(new__resume)') != undefined) {
            description.classList.remove('hide')
            descriptionValue.textContent = readCookie('description-text(new__resume)')
         }

         // вывод гражданства
         if (readCookie('citizenship(new__resume)') != undefined) {
            if (personalInformationBlock.classList.contains('hide')) {
               personalInformationBlock.classList.remove('hide');
            }
            citizenship.classList.remove('hide');

            let valueArr = []
            valueArr = JSON.parse(readCookie('citizenship(new__resume)'));
            let item;

            valueArr.forEach(elemArr => {
               item = `
                  <p class="item">${elemArr}</p>
               `;
               citizenship.querySelector('.value').insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод разрешения на работу
         if (readCookie('work-permit(new__resume)') != undefined) {
            if (personalInformationBlock.classList.contains('hide')) {
               personalInformationBlock.classList.remove('hide');
            }
            workPermit.classList.remove('hide');

            let valueArr = []
            valueArr = JSON.parse(readCookie('work-permit(new__resume)'));
            let item;

            valueArr.forEach(elemArr => {
               item = `<p class="item">${elemArr}</p>`;
               workPermit.querySelector('.value').insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод категории прав
         if (readCookie('driver__license-list1(new__resume)') != undefined) {
            if (personalInformationBlock.classList.contains('hide')) {
               personalInformationBlock.classList.remove('hide');
            }
            driverLicense.classList.remove('hide');

            let valueArr = []
            valueArr = JSON.parse(readCookie('driver__license-list1(new__resume)'));
            let item;

            valueArr.forEach(elemArr => {
               item = `<p class="item">${elemArr}</p>`;
               driverLicense.querySelector('.value').insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод категории автомобиля
         if (readCookie('driver__license-list2(new__resume)') != undefined) {
            if (personalInformationBlock.classList.contains('hide')) {
               personalInformationBlock.classList.remove('hide');
            }
            carClass.classList.remove('hide');

            let valueArr = []
            valueArr = JSON.parse(readCookie('driver__license-list2(new__resume)'));
            let item;

            valueArr.forEach(elemArr => {
               item = `<p class="item">${elemArr}</p>`;
               carClass.querySelector('.value').insertAdjacentHTML('beforeend', item);
            })
         }

         if (!document.querySelector('.select-already-downloaded').classList.contains('hide')) {
            let item
            document.querySelectorAll('.select-already-downloaded input').forEach(input => {
               if (input.checked) {
                  resumePhoto.classList.remove('hide');
                  item = `<p class="preview__item">${input.parentNode.querySelector('img').outerHTML}</p>`
                  resumePhotoPreview.insertAdjacentHTML('beforeend', item);
               }
            })
         }

         // вывод картинок
         if (document.querySelectorAll('.load__image-preview .preview__item').length > 0) {
            resumePhoto.classList.remove('hide');
            let item
            document.querySelectorAll('.load__image-preview .preview__item img').forEach(img => {
               item = `<p class="preview__item">${img.outerHTML}</p>`
               resumePhotoPreview.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод контактов рекомендателей
         if (readCookie('contact(new__resume)') != undefined) {
            contactBlock.classList.remove('hide');

            let valueArr = []
            valueArr = JSON.parse(readCookie('contact(new__resume)'))
            let item;

            valueArr.forEach(elemArr => {
               item = `
                  <div class="item text-s14-h20-w400">
                     <p class="contac__company text-s14-h20-w500">${elemArr.company}</p>
                     <p class="contact__name">${elemArr.fullName}</p>
                  </div>
               `;
               contactBlock.querySelector('.value').insertAdjacentHTML('beforeend', item);
            })
         }
      }

      // закрытие попапа Предпросмотр нажатием на крестик или фон
      if (target == closePopupPreview || target == background && popupPreview.classList.contains('active')) {
         background.classList.remove('active');
         popupPreview.classList.remove('active');
         scrollTo(popupPreview, scrollY);

         previewImage.setAttribute('src', '');
         previewImage.style.display = 'none';
         previewImagePlaseholder.style.display = 'block';

         fullName.textContent = '';

         dopInfo.textContent = '';

         income.classList.add('hide');
         incomeValue.textContent = '';
         incomeInfo.textContent = '';

         careerObject.textContent = '';

         workingFormat.classList.add('hide');
         workingFormatValue.textContent = '';

         employmentFormat.classList.add('hide');
         employmentFormatValue.textContent = '';

         workingMode.classList.add('hide');
         workingModeValue.textContent = '';

         bisnessTripMode.classList.add('hide');
         bisnessTripModeValue.textContent = '';

         relocation.classList.add('hide');
         relocationValue.textContent = '';

         haveExperiencePopup.classList.add('hide');
         noExperiencePopup.classList.add('hide');
         haveExperiencePopupValue.textContent = '';

         skill.classList.add('hide');
         skill.querySelector('.skill__value').textContent = '';

         educationBlock.classList.add('hide');
         educationValueStandart.classList.add('hide');
         educationValue.classList.add('hide');
         educationValue.textContent = '';

         additionalEducationBlock.classList.add('hide');
         additionalEducationValue.textContent = '';

         languages.classList.add('hide');
         languages.querySelector('.languages__value').textContent = '';

         description.classList.add('hide');
         descriptionValue.textContent = '';

         personalInformationBlock.classList.add('hide');

         citizenship.classList.add('hide');
         citizenship.querySelector('.value').textContent = '';

         workPermit.classList.add('hide');
         workPermit.querySelector('.value').textContent = '';

         driverLicense.classList.add('hide');
         driverLicense.querySelector('.value').textContent = '';

         carClass.classList.add('hide');
         carClass.querySelector('.value').textContent = '';

         resumePhoto.classList.add('hide');
         // if (resumePhotoPreview.querySelector('.image-preview') != null) {
         //    resumePhotoPreview.querySelector('.image-preview').remove();
         // };
         resumePhotoPreview.textContent = ''

         contactBlock.classList.add('hide');
         contactBlock.querySelector('.value').textContent = '';
      }

   })

})