import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let step7 = document.querySelector('.step__inner .step-7');
   let previewOpenBtn = step7.querySelector('.section__bottom .preview-btn');
   let backgroundList = document.querySelector('.background-list'),
      previewList = backgroundList.querySelector('.preview__list'),
      previewListClose = previewList.querySelector('.list__title button'),
      previewListPublication = previewList.querySelector('.list__bottom .publicate');

   // блок для изображения пользователя
   let previewImage = previewList.querySelector('.basic__information .image__picture'),
      previewImagePlaseholder = previewList.querySelector('.basic__information .image__plaseholder')

   // блок с полным именем
   let fullName = previewList.querySelector('.basic__information .name'),
      dopInfo = previewList.querySelector('.basic__information .dopinfo')

   // название вакансии и доход
   let careerObjectName = previewList.querySelector('.career-object__name'),
      incomeValue = previewList.querySelector('.income-value');

   // блок требований
   let requirementsBlock = previewList.querySelector('.requirements'),
      workingFormatBlock = requirementsBlock.querySelector('.working__format'),
      workingFormatValue = requirementsBlock.querySelector('.working__format .value'),
      scheduleBlock = requirementsBlock.querySelector('.schedule'),
      scheduleValue = requirementsBlock.querySelector('.schedule .value'),
      workingModeBlock = requirementsBlock.querySelector('.working__mode'),
      workingModeValue = requirementsBlock.querySelector('.working__mode .value'),
      bisnessTripBlock = requirementsBlock.querySelector('.bisness__trip'),
      bisnessTripValue = requirementsBlock.querySelector('.bisness__trip .value'),
      relocationBlock = requirementsBlock.querySelector('.relocation'),
      relocationValue = requirementsBlock.querySelector('.relocation .value');

   // блок опыта работы
   let noExperienceBlock = previewList.querySelector('.no__experience'),
      noExperienceValue = previewList.querySelector('.no__experience .value'),
      haveExperienceBlock = previewList.querySelector('.have__experience'),
      haveExperienceValue = previewList.querySelector('.have__experience .value')

   // блок ключевых навыков
   let skillsBlock = previewList.querySelector('.skills'),
      skillsValue = previewList.querySelector('.skills .value');

   // блок с основным образованием
   let educationBlock = previewList.querySelector('.education'),
      educationValue = previewList.querySelector('.education .value');

   // блок с дополнительным образованием
   let additionalEducationBlock = previewList.querySelector('.additional-education'),
      additionalEducationValue = previewList.querySelector('.additional-education__value'),
      languagesBlock = previewList.querySelector('.languages'),
      languagesValue = previewList.querySelector('.languages__value');

   // блок с описанием
   let descriptionBlock = previewList.querySelector('.description'),
      descriptionValue = previewList.querySelector('.description .value');

   // блок с персональной информации
   let personalInfoBlock = previewList.querySelector('.personal__information'),
      citizenshipBlock = previewList.querySelector('.citizenship'),
      citizenshipValue = previewList.querySelector('.citizenship .value'),
      workPermitBlock = previewList.querySelector('.work-permit'),
      workPermitValue = previewList.querySelector('.work-permit .value'),
      driverLicenseBlock = previewList.querySelector('.driver__license'),
      driverLicenseValue = previewList.querySelector('.driver__license .value'),
      carClassBlock = previewList.querySelector('.car__class'),
      carClassValue = previewList.querySelector('.car__class .value');

   // блок с примерами работ
   let resumePhoto = previewList.querySelector('.resume__photo'),
      resumePhotoPreview = previewList.querySelector('.resume__photo-preview')

   // блок с контактами рекомендателей
   let contactBlock = previewList.querySelector('.contact'),
      contactValue = previewList.querySelector('.contact .value')

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
   function ucFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
   };

   document.addEventListener('click', (event) => {
      let target = event.target;

      // открытие
      if (target == previewOpenBtn) {
         backgroundList.classList.add('active')
         previewList.classList.add('active')
         bg__lock()


         // вывод изображения
         if (document.querySelector('.user__image .image__picture').getAttribute('src') !== '') {
            previewImage.setAttribute('src', document.querySelector('.user__image .image__picture').getAttribute('src'));
            previewImage.style.display = 'block';
            previewImagePlaseholder.style.display = 'none';
         }

         // имя и фамилия
         if (readCookie('initial-surname(new__resume__mobile)') !== undefined && readCookie('initial-name(new__resume__mobile)') != undefined) {
            if (readCookie('initial-patronymic(new__resume__mobile)') != undefined) {
               fullName.textContent = `${readCookie('initial-surname(new__resume__mobile)')} ${readCookie('initial-name(new__resume__mobile)')} ${readCookie('initial-patronymic(new__resume__mobile)')}`
            } else {
               fullName.textContent = `${readCookie('initial-surname(new__resume__mobile)')} ${readCookie('initial-name(new__resume__mobile)')}`
            }
         } else {
            fullName.textContent = 'Данные указаны не верно'
         }

         // вывод дополнительной информации
         if (readCookie('day-of-birth__year(new__resume__mobile)') !== undefined ||
            readCookie('user-city(new__resume__mobile)') !== undefined ||
            readCookie('underground(new__resume__mobile)') !== undefined) {
            // дополнительная информация
            let age
            if (readCookie('day-of-birth__year(new__resume__mobile)') != undefined) {
               age = `${new Date().getFullYear() - (+readCookie('day-of-birth__year(new__resume__mobile)'))} ${declOfNum(new Date().getFullYear() - (+readCookie('day-of-birth__year(new__resume__mobile)')), ['год', 'года', 'лет'])}`
            } else {
               age = ''
            }
            let city
            if (readCookie('user-city(new__resume__mobile)') != undefined) {
               city = `, ${readCookie('user-city(new__resume__mobile)')}`
            } else {
               city = ''
            }
            let underground
            let undergroundArr = []
            if (readCookie('underground(new__resume__mobile)') != undefined) {
               undergroundArr = JSON.parse(readCookie('underground(new__resume__mobile)'))
               underground = `, ${undergroundArr.join(', ')}`
            } else {
               underground = ''
            }
            dopInfo.textContent = `${age}${city}${underground}`
         }

         // вывод названия вакансии
         if (readCookie('career__objective__value(new__resume__mobile)') !== undefined) {
            careerObjectName.textContent = readCookie('career__objective__value(new__resume__mobile)')[0].toUpperCase() + readCookie('career__objective__value(new__resume__mobile)').slice(1);
         } else {
            careerObjectName.textContent = 'Должность не указана';
         }

         // вывод дохода
         if (readCookie('income(new__resume__mobile)') !== undefined) {
            incomeValue.textContent = `${parseInt(readCookie('income(new__resume__mobile)')).toLocaleString('ru')} ${readCookie('income__currency(new__resume__mobile)')}`
         } else {
            incomeValue.textContent = 'Доход не указан'
         }

         // вывод требований
         if (readCookie('only-remote-work(new__resume__mobile)') !== undefined ||
            readCookie('work-format(new__resume__mobile)') !== undefined ||
            readCookie('schedule(new__resume__mobile)') !== undefined ||
            readCookie('working-mode(new__resume__mobile)') !== undefined ||
            readCookie('business-trips(new__resume__mobile)') !== undefined ||
            readCookie('relocate(new__resume__mobile)') !== undefined ||
            readCookie('relocate-value(new__resume__mobile)') != undefined) {
            requirementsBlock.classList.remove('hide')

            // вывод формата работы
            if (readCookie('only-remote-work(new__resume__mobile)') !== undefined) {
               workingFormatBlock.classList.remove('hide')
               workingFormatValue.textContent = '- Только удалённый формат работы'
            } else if (readCookie('work-format(new__resume__mobile)') !== undefined) {
               workingFormatBlock.classList.remove('hide')
               let arr = []
               arr = JSON.parse(readCookie('work-format(new__resume__mobile)'))
               workingFormatValue.textContent = `- ${arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')}`
            }

            // вывод занятости
            if (readCookie('schedule(new__resume__mobile)') !== undefined) {
               scheduleBlock.classList.remove('hide')
               let arr = []
               arr = JSON.parse(readCookie('schedule(new__resume__mobile)'))
               scheduleValue.textContent = `- ${arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')}`
            }

            // вывод режимов работы
            if (readCookie('working-mode(new__resume__mobile)') !== undefined) {
               workingModeBlock.classList.remove('hide')
               let arr = []
               arr = JSON.parse(readCookie('working-mode(new__resume__mobile)'))
               workingModeValue.textContent = `- ${arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')}`
            }

            // вывод готовности к командировкам
            if (readCookie('business-trips(new__resume__mobile)') !== undefined) {
               bisnessTripBlock.classList.remove('hide')
               bisnessTripValue.textContent = `- ${readCookie('business-trips(new__resume__mobile)')}`
            }

            // вывод формата работы
            if (readCookie('relocate(new__resume__mobile)') !== undefined) {
               relocationBlock.classList.remove('hide')
               if (readCookie('relocate-value(new__resume__mobile)') !== undefined) {
                  relocationBlock.classList.remove('hide')
                  let arr = []
                  arr = JSON.parse(readCookie('relocate-value(new__resume__mobile)'))
                  relocationValue.textContent = `- ${arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')}`
               } else {
                  relocationValue.textContent = '- Готов(а) к переезду'
               }
            }
         }

         // вывод опыта работы
         if (readCookie('experience(new__resume__mobile)') == 'no__experience' && readCookie('no__experience__block(new__resume__mobile)') !== undefined) {
            noExperienceBlock.classList.remove('hide')
            haveExperienceBlock.classList.add('hide')

            noExperienceValue.textContent = readCookie('no__experience__block(new__resume__mobile)')
         } else if (readCookie('experience(new__resume__mobile)') == 'have__experience' && readCookie('place_work(new__resume__mobile)') !== undefined) {
            noExperienceBlock.classList.add('hide')
            haveExperienceBlock.classList.remove('hide')

            let arr = JSON.parse(readCookie('place_work(new__resume__mobile)'))
            let item
            arr.forEach(elemArr => {
               let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('.item'),
                  companyName = newStrObject.getAttribute('data-company-name'),
                  companyPosition = newStrObject.getAttribute('data-company-position'),
                  periodFrom = newStrObject.getAttribute('data-period-from'),
                  periodTo = newStrObject.getAttribute('data-period-to'),
                  workPeriod = `${periodFrom} - ${periodTo !== '' ? periodTo : 'по настоящее время'}`,
                  responsibilitiesData = newStrObject.getAttribute('data-responsibilities'),
                  achievementsData = newStrObject.getAttribute('data-achievements'),
                  reasonForLeavingData = newStrObject.getAttribute('data-reason-for-leavin'),
                  notesData = newStrObject.getAttribute('data-notes');

               let responsibilities
               if (responsibilitiesData != null && responsibilitiesData != '') {
                  responsibilities = responsibilitiesData
               } else {
                  responsibilities = 'Обязанности не указаны'
               }

               let achievements
               if (achievementsData != null && achievementsData != '') {
                  achievements = achievementsData
               } else {
                  achievements = 'Достижения не указаны'
               }

               let reasonForLeaving
               if (reasonForLeavingData != null && reasonForLeavingData != '') {
                  reasonForLeaving = reasonForLeavingData
               } else {
                  reasonForLeaving = 'Причина ухода не указана'
               }

               let notes
               if (notesData != null && notesData != '') {
                  notes = notesData
               } else {
                  notes = 'Примечания не указанны'
               }

               let period
               if (periodTo.split('.')[1] != null && periodTo.split('.')[1] != '') {
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
                  period = passed('1', `${periodFrom.split('.')[1]} `, `${periodFrom.split('.')[2]} `, '1', `${periodTo.split('.')[1]} `, `${periodTo.split('.')[2]} `)
               } else {
                  if (new Date().getFullYear() - periodFrom.split('.')[2] !== 0) {
                     period = `
                        ${new Date().getFullYear() - periodFrom.split('.')[2]} ${declOfNum((new Date().getFullYear() - periodFrom.split('.')[2]), ['год', 'года', 'лет'])}
                        ${new Date().getMonth() + 1 - periodFrom.split('.')[1]} ${declOfNum((new Date().getMonth() + 1 - periodFrom.split('.')[1]), ['месяц', 'месяца', 'месяцев'])}
                     `
                  } else {
                     period = `
                        ${new Date().getMonth() + 1 - periodFrom.split('.')[1]} ${declOfNum((new Date().getMonth() + 1 - periodFrom.split('.')[1]), ['месяц', 'месяца', 'месяцев'])}
                     `
                  }
               }

               item = `
                  <div class="item">
                     <p class="company text-s16-h22-w600">${ucFirst(companyPosition)}</p>
                     <p class="period">${workPeriod} (${period})</p>
                     <p class="position">${companyName}</p>
                     <div class="responsibilities">
                        <p class="text-s14-h20-w500">Обязанности</p>
                        ${ucFirst(responsibilities)}
                     </div>
                     <div class="achievements">
                        <p class="text-s14-h20-w500">Достижения</p>
                        ${ucFirst(achievements)}
                     </div>
                     <div class="reason-for-leaving">
                        <p class="text-s14-h20-w500">Причина ухода</p>
                        ${ucFirst(reasonForLeaving)}
                     </div>
                     <div class="notes">
                        <p class="text-s14-h20-w500">Примечания</p>
                        ${ucFirst(notes)}
                     </div>
                  </div>
               `
               haveExperienceValue.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод ключевых навыков
         if (readCookie('skill-value(new__resume__mobile)') !== undefined) {
            skillsBlock.classList.remove('hide');
            let arr = JSON.parse(readCookie('skill-value(new__resume__mobile)'));
            let item
            arr.forEach(elemArr => {
               item = `<p class="item text-s14-h20-w400" data-name="${elemArr}">${elemArr}</p>`;
               skillsValue.insertAdjacentHTML('beforeend', item);
            });
         }

         // вывод основного образования
         if (readCookie('education__switcher(new__resume__mobile)') !== undefined) {
            educationBlock.classList.remove('hide')
            educationValue.textContent = 'Только среднее образование'
         } else if (readCookie('education(new__resume__mobile)') !== undefined) {
            educationBlock.classList.remove('hide')

            let valueArr = JSON.parse(readCookie('education(new__resume__mobile)'))
            let item
            valueArr.forEach(elemArr => {
               let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('p')

               item = `
                  <div class="item">
                     <p class="education__value-year text-s14-h20-w400">c ${newStrObject.getAttribute('data-from')} - до ${newStrObject.getAttribute('data-to')}</p>
                     <div class="education__value-inner">
                        <p class="education__value-name">${newStrObject.getAttribute('data-name')}</p>
                        <p class="education__value-speciality">${newStrObject.getAttribute('data-specialisation')}</p>
                     </div>
                  </div>
               `

               educationValue.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод дополнитнльного образования
         if (readCookie('additional__education(new__resume__mobile)')) {
            additionalEducationBlock.classList.remove('hide');

            let arr = JSON.parse(readCookie('additional__education(new__resume__mobile)'))
            let item
            arr.forEach(elemArr => {
               let newStrObject = new DOMParser().parseFromString(elemArr, "text/html").querySelector('p')

               item = `
                  <div class="item">
                     <p class="additional-education__value-year text-s14-h20-w400">с ${newStrObject.getAttribute('data-from')} - по ${newStrObject.getAttribute('data-to')}</p>
                     <div class="additional-education__value-inner">
                        <p class="additional-education__value-name">${newStrObject.getAttribute('data-name')}</p>
                        <p class="additional-education__value-speciality">${newStrObject.getAttribute('data-specialisation')}</p>
                     </div>
                  </div>
               `

               additionalEducationValue.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод родного языка
         if (readCookie('languages-native(new__resume__mobile)') !== undefined) {
            additionalEducationBlock.classList.remove('hide');
            languagesBlock.classList.remove('hide')

            let languagesItem = `
                     <div class="languages__value-item">
                        <p class="name">${readCookie('languages-native(new__resume__mobile)')}</p>
                        <p class="lavel">Родной</p>
                     </div>
                     `;
            languagesValue.insertAdjacentHTML('beforeend', languagesItem);
         }

         // вывод языков
         if (localStorage.getItem('languages-value(new__resume__mobile)') != undefined) {
            additionalEducationBlock.classList.remove('hide');
            languagesBlock.classList.remove('hide')
            let languagesArr = []
            languagesArr = (JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume__mobile)'))))

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
               languagesValue.insertAdjacentHTML('beforeend', languagesItem);
            })
         }

         // вывод описания пользователя
         if (readCookie('description-text(new__resume__mobile)') !== undefined) {
            descriptionBlock.classList.remove('hide')
            descriptionValue.textContent = readCookie('description-text(new__resume__mobile)')
         }

         // вывод персональной информации
         if (readCookie('citizenship(new__resume__mobile)') !== undefined ||
            readCookie('work-permit(new__resume__mobile)') !== undefined ||
            readCookie('driver__license-list1(new__resume__mobile)') !== undefined ||
            readCookie('driver__license-list2(new__resume__mobile)') !== undefined) {
            personalInfoBlock.classList.remove('hide')

            if (readCookie('citizenship(new__resume__mobile)') !== undefined) {
               citizenshipBlock.classList.remove('hide')
               let arr = JSON.parse(readCookie('citizenship(new__resume__mobile)'))
               citizenshipValue.textContent = arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
            }
            if (readCookie('work-permit(new__resume__mobile)') !== undefined) {
               workPermitBlock.classList.remove('hide')
               let arr = JSON.parse(readCookie('work-permit(new__resume__mobile)'))
               workPermitValue.textContent = arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
            }
            if (readCookie('driver__license-list1(new__resume__mobile)') !== undefined) {
               driverLicenseBlock.classList.remove('hide')
               let arr = JSON.parse(readCookie('driver__license-list1(new__resume__mobile)'))
               driverLicenseValue.textContent = arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
            }
            if (readCookie('driver__license-list2(new__resume__mobile)') !== undefined) {
               carClassBlock.classList.remove('hide')
               let arr = JSON.parse(readCookie('driver__license-list2(new__resume__mobile)'))
               carClassValue.textContent = arr.map(n => n.replace(/./, m => m.toUpperCase())).join(', ')
            }
         }

         // вывод картинок
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
         if (document.querySelectorAll('.load__image-preview .preview__item').length > 0) {
            resumePhoto.classList.remove('hide');
            let item
            document.querySelectorAll('.load__image-preview .preview__item img').forEach(img => {
               item = `<p class="preview__item">${img.outerHTML}</p>`
               resumePhotoPreview.insertAdjacentHTML('beforeend', item);
            })
         }

         // вывод контактов рекомендателей
         if (readCookie('contact(new__resume__mobile)') !== undefined) {
            contactBlock.classList.remove('hide');

            let arr = []
            let item
            arr = JSON.parse(readCookie('contact(new__resume__mobile)'))

            arr.forEach(elemArr => {
               item = `
                  <div class="item text-s14-h20-w400">
                     <p class="contac__company text-s14-h20-w500">${elemArr.company}</p>
                     <p class="contact__name">${elemArr.fullName}</p>
                  </div>
               `;
               contactValue.insertAdjacentHTML('beforeend', item);
            })
         }
      }

      // нажатие кнопки опубликовать
      if (target == previewListPublication) {
         backgroundList.classList.remove('active')
         previewList.classList.remove('active')
         bg__unlock()
      }

      // закрытие
      if (target == previewListClose) {
         backgroundList.classList.remove('active')
         previewList.classList.remove('active')
         bg__unlock()

         // очистка изображения
         previewImage.setAttribute('src', '')
         previewImage.style.display = 'none'
         previewImagePlaseholder.style.display = 'block'

         // очистить полное имя
         fullName.textContent = ''
         // очистка поля с дополнительной информацией
         dopInfo.textContent = ''
         // очистка названия вакансии
         careerObjectName.textContent = ''
         // очистка значения дохода
         incomeValue.textContent = ''
         // очистка требований
         requirementsBlock.classList.add('hide')
         workingFormatBlock.classList.add('hide')
         workingFormatValue.textContent = ''
         scheduleBlock.classList.add('hide')
         scheduleValue.textContent = ''
         workingModeBlock.classList.add('hide')
         workingModeValue.textContent = ''
         bisnessTripBlock.classList.add('hide')
         bisnessTripValue.textContent = ''
         relocationBlock.classList.add('hide')
         relocationValue.textContent = ''
         // очистить блок с опытом
         noExperienceBlock.classList.add('hide')
         haveExperienceBlock.classList.add('hide')
         noExperienceValue.textContent = ''
         haveExperienceValue.textContent = ''
         // очистка блока с навыками
         skillsBlock.classList.add('hide')
         skillsValue.textContent = ''
         // очистить блок с образованием
         educationBlock.classList.add('hide')
         educationValue.textContent = ''
         // очитстка блока с дополнительным образованием
         additionalEducationBlock.classList.add('active')
         additionalEducationValue.textContent = ''
         languagesBlock.classList.add('active')
         languagesValue.textContent = ''
         // очистка блока с описанием
         descriptionBlock.classList.add('hide')
         descriptionValue.textContent = ''
         // очиcnrf блока с персональной информацией
         personalInfoBlock.classList.add('hide')
         citizenshipBlock.classList.add('hide')
         citizenshipValue.textContent = ''
         workPermitBlock.classList.add('hide')
         workPermitValue.textContent = ''
         driverLicenseBlock.classList.add('hide')
         driverLicenseValue.textContent = ''
         carClassBlock.classList.add('hide')
         carClassValue.textContent = ''
         // очистка блока с изображениями
         resumePhoto.classList.add('hide');
         resumePhotoPreview.textContent = ''
         // очистка блока с рекомендателями
         contactBlock.classList.add('hide');
         contactValue.textContent = ''
      }
   })
});