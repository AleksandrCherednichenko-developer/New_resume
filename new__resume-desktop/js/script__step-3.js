import scrollTo from './script__scroll-to.js';
import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import { inputNumber } from "./script__input-number.js";

document.addEventListener("DOMContentLoaded", () => {
   let scrollY;
   let background = document.querySelector('.background');

   let step3 = document.querySelector('.left__content .step-3');

   let skillsStandartItem = step3.querySelectorAll('.skills__standart .item'),
      skillsInput = step3.querySelector('.skills__input input'),
      skillsInputList = step3.querySelector('.skills__input-list'),
      skillsInputListItems,
      skillsArray = [
         'способности к деловому общению',
         'организация и планирование рабочего времени',
         'внимательность к мелочам',
         'опыт работы с офисной техникой',
         'гибкость',
         'лояльность',
         'навыки делового лидерства',
         'работа с возражениями',
         'разрешение конфликтных ситуаций',
         'знание ПК',
         'обработка больших объемов информации',
         'делопроизводство',
         'работа с офисной техникой',
         'общение в соответствии с правилами этикета',
         'ведение переговоров',
         'знание соответствующего рынка',
         'выстраивание рабочих отношений',
         'навыки межличностного делового общения',
         'умение организовывать работу',
         'умение планировать',
         'умение принимать решения',
         'способность анализировать проблемы',
         'навыки управления проектами',
         'деловое лидерство',
         'управление персоналом',
         'поиск и привлечение клиентов',
         'управление продажами',
         'активные продажи',
         'аналитика продаж',
         'ведение переговоров',
         'организаторское мастерство',
         'знание кассовой дисциплины',
         'знание ресторанного бизнеса',
         'навыки обеспечения жизнедеятельности предприятия',
         'навыки общения с клиентами',
         'навыки организаторской работы',
         'знание программы 1С',
         'опыт работы с оргтехникой',
         'навыки размещения рекламы',
         'навыки управления персоналом',
         'знание основ делопроизводства',
         'владение оргтехникой',
         'тактичность, толерантность',
         'тайм-менеджмент',
         'эффективное общение',
         'грамотная речь',
         'обучаемость',
         'умение мотивировать и убеждать',
         'поиск компромиссов',
         'HTML',
         'CSS',
         'JavaScript',
         'PHP',
         'Python',
         'Adobe',
         'Adobe Photoshop ',
         'CorelDraw',
         'Adobe Illustrator',
         'Figma',
         'чтение и правка чужого кода',
         'опыт разработки ПО',
         'знание основ информационной безопасности',
         'работа с базами данных',
         'разработка приложений',
         'разработка сайтов ',
         'установка и отладка уже существующих программ',
         'знание принципов построения и работы сайтов и серверов',
         'работа с сетями и базами данных',
         'поддержка и верстка сайтов',
         'знание личных продаж',
         'знание кассы',
         'мерчандайзинг',
         'умение обучать других',
         'владение современными технологиями обучения',
         'мотивированность',
         'инициативность',
         'широкий кругозор',
         'энергичность',
         'эрудированность',
         'опыт эффективной коммуникации',
         'гибкость, терпимость в общении',
         'принятие решений',
         'организация, планирование',
         'критическое мышление',
         'способность мотивировать',
         'инициативность',
         'способность организовывать рабочий процесс',
         'умение поддеживать интерес слушателей',
         'грамотная речь',
         'умение общаться с людьми',
         'способность налаживать контакты',
         'деловая переписка',
         'стрессоустойчивость',
         'поиск информации в интернете',
         'стрессоустойчивость',
         'хорошая память',
         'оперативность',
         'ответственность',
         'внимательность',
         'опыт работы с сетью',
         'осуществление техподдержки и работа с клиентами',
         'диагностика сбоев и неполадок',
         'опыт работы с серверами',
         'проведение мониторинга работы систем',
         'установка оборудования',
         'контроль информационной безопасности',
         'работа с техническими документами',
         'знание международных стандартов',
         'знание налогового учета',
         'знание бухгалтерского учета',
         'знание управленческого учета',
         'наличие своей клиентской базы',
         'разработка аудиторских программ',
         'умение составлять и анализировать договоры',
         'представительство в судах',
         'осуществление претензионно-исковой деятельности',
         'составление юридических документов',
         'сопровождение деятельности компании',
         'правовое обеспечение работы организации',
         'опыт представления компании',
         'умение работать с правовыми документами',
         'умение работать с законодательными базами',
         'умение убеждать',
         'умение мотивировать',
         'контроль персонала на всех этапах работы',
         'стратегическое мышление',
         'критическое мышление',
         'способность к разрешению конфликтов',
         'управление временными, трудовыми ресурсами',
         'прогнозирование',
         'стратегическое планирование',
         'поиск нестандартных управленческих решений',
         'организаторские возможности',
         'стаж безаварийного вождения',
         'опыт работы на автомобилях представительского класса',
         'прекрасное знание требуемых маршрутов',
         'знание устройства автомобиля',
         'работа с путевыми документами',
         'отчетность по GAAP',
         'сертификат ACCA Dip IFR',
         'аттестат аудитора',
         'БЭСТ',
         'SUN',
         'CMS',
         'Консультант',
         'Гарант',
         'MS Office',
         'C++',
         'C#',
         'Java',
         'Go',
         'Ruby',
         'Swift',
         'MS SQL Server',
         'PostgreSQL',
         'MySQL',
         'MongoDB',
         'Docker',
         'FCE',
         'CAE',
         'TOEFL',
         'IELTS',
         'Kubernetes'
      ],
      skillsList = step3.querySelector('.skills__list'),
      skillsValueArray = [];

   let educationSwitcher = step3.querySelector('.education__switcher input'),
      educationAddBtn = step3.querySelector('.education__add'),
      educationList = step3.querySelector('.education__list'),
      educationArr = [],
      popupEducation = document.querySelector('.popup__education'),
      popupEducationInput = popupEducation.querySelectorAll('input'),
      popupEducationYearFrom = popupEducation.querySelector('.year-of-start input'),
      popupEducationYearTo = popupEducation.querySelector('.year-of-ending input');

   let additionalEducationAddBtn = step3.querySelector('.additional__education-add'),
      additionalEducationList = step3.querySelector('.additional__education-list'),
      additionalEducationArr = [],
      popupAdditionalEducation = document.querySelector('.popup__additional-education '),
      popupAdditionalEducationInput = popupAdditionalEducation.querySelectorAll('input'),
      popupAdditionalEducationYearFrom = popupAdditionalEducation.querySelector('.year-of-start input'),
      popupAdditionalEducationYearTo = popupAdditionalEducation.querySelector('.year-of-ending input');

   let languageCount = document.querySelector('.languages__list .select-language .list').querySelectorAll('.item').length,
      languagesNative = step3.querySelector('.languages__list .languages-native'),
      languagesNativeHeader = languagesNative.querySelector('.select-language .header'),
      languagesNativeList = languagesNative.querySelector('.select-language .list'),
      languagesNativeItems = languagesNative.querySelectorAll('.select-language .list .item'),
      languagesNativeClear = languagesNative.querySelector('.remove-language'),
      addLanguageBtn = step3.querySelector('.languages__list .add-language'),
      allLanguage = [],
      countLanguage = 0,
      languageValue,
      languageName,
      lavelValue,
      lavelName;

   // проверка введенного года
   popupEducationYearFrom.onblur = function () {
      if (popupEducationYearFrom.value > new Date().getFullYear() || popupEducationYearFrom.value <= new Date().getFullYear() - 70) {
         popupEducationYearFrom.value = '';
         popupEducationYearFrom.classList.remove('not-empty');
      }
      if (popupEducationYearFrom.value >= popupEducationYearTo.value && popupEducationYearTo.value.length === 4) {
         popupEducationYearFrom.value = '';
         popupEducationYearFrom.classList.remove('not-empty');
      }
   };
   popupEducationYearTo.onblur = function () {
      if (popupEducationYearTo.value >= new Date().getFullYear() + 10 || popupEducationYearTo.value <= new Date().getFullYear() - 70) {
         popupEducationYearTo.value = '';
         popupEducationYearTo.classList.remove('not-empty');
      }
      if (popupEducationYearFrom.value >= popupEducationYearTo.value && popupEducationYearFrom.value.length === 4) {
         popupEducationYearTo.value = '';
         popupEducationYearTo.classList.remove('not-empty');
      }
   };
   popupAdditionalEducationYearFrom.onblur = function () {
      if (popupAdditionalEducationYearFrom.value >= new Date().getFullYear() || popupAdditionalEducationYearFrom.value <= new Date().getFullYear() - 70) {
         popupAdditionalEducationYearFrom.value = '';
         popupAdditionalEducationYearFrom.classList.remove('not-empty');
      }
      if (popupAdditionalEducationYearFrom.value >= popupAdditionalEducationYearTo.value && popupAdditionalEducationYearTo.value.length === 4) {
         popupAdditionalEducationYearFrom.value = '';
         popupAdditionalEducationYearFrom.classList.remove('not-empty');
      }
   };
   popupAdditionalEducationYearTo.onblur = function () {
      if (popupAdditionalEducationYearTo.value >= new Date().getFullYear() + 3 || popupAdditionalEducationYearTo.value <= new Date().getFullYear() - 70) {
         popupAdditionalEducationYearTo.value = '';
         popupAdditionalEducationYearTo.classList.remove('not-empty');
      }
      if (popupAdditionalEducationYearFrom.value > popupAdditionalEducationYearTo.value && popupAdditionalEducationYearFrom.value.length === 4) {
         popupAdditionalEducationYearTo.value = '';
         popupAdditionalEducationYearTo.classList.remove('not-empty');
      }
   };

   // добавить элементы из массива в список
   skillsArray.forEach(elemArr => {
      let listItem = document.createElement('p');
      listItem.className = "item";
      listItem.innerHTML = elemArr;
      skillsInputList.append(listItem)
   })
   // создание элeмента в списке со скилами
   function createNewSkillItem(elem) {
      let removeSkillItem = document.createElement('p');
      removeSkillItem.className = 'remove-btn';
      let skillItem = document.createElement('p');
      skillItem.className = 'item';
      skillItem.textContent = elem;
      skillItem.append(removeSkillItem);
      skillsList.append(skillItem);
   }

   // очиста попапа основное образование
   function clearPopupEducation() {
      popupEducation.classList.remove('active');
      background.classList.remove('active');
      scrollTo(popupEducation, scrollY);

      popupEducation.querySelectorAll('*').forEach(elem => {
         if (elem.classList.contains('error')) {
            elem.classList.remove('error');
         }
      })

      if (popupEducation.classList.contains('error')) {
         popupEducation.classList.remove('error')
      }

      popupEducation.querySelectorAll('input').forEach(input => {
         input.value = ''
      })

      popupEducation.querySelector('.lavel__value').classList.remove('not-empty');
      popupEducation.querySelector('.lavel__value .item').setAttribute('data-name', '');
      popupEducation.querySelector('.lavel__value .item').textContent = 'Выберите уровень';
      popupEducation.querySelectorAll('.lavel__list .item').forEach(item => {
         item.classList.remove('active');
      });
   }
   // очиста попапа дополнительное образование
   function clearPopupAdditionalEducation() {
      popupAdditionalEducation.classList.remove('active');
      background.classList.remove('active');
      scrollTo(popupAdditionalEducation, scrollY);

      popupAdditionalEducation.querySelectorAll('*').forEach(elem => {
         if (elem.classList.contains('error')) {
            elem.classList.remove('error');
         }
      })

      if (popupAdditionalEducation.classList.contains('error')) {
         popupAdditionalEducation.classList.remove('error')
      }

      popupAdditionalEducation.querySelectorAll('input').forEach(input => {
         input.value = ''
      })
   }


   // клики на странице
   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод скилов
      function inputSkills() {
         // ввод значений
         if (target == skillsInput) {
            // ввод значения в поле
            skillsInput.addEventListener('input', () => {
               let inputValue = skillsInput.value.replace(/\s+/g, ' ');
               skillsInputListItems = skillsInputList.querySelectorAll('.item');
               let count = 0

               if (inputValue != '' && inputValue.length > 1) {
                  skillsInputList.classList.remove('hide');
                  skillsInputListItems.forEach(item => {
                     if (item.textContent.toLowerCase() !== inputValue.toLowerCase() && item.textContent.search(inputValue) == -1) {
                        item.classList.add('hide');
                        item.innerHTML = item.innerHTML;

                        // скрывать список если нет похожих элементов
                        count++
                        if (count == skillsInputListItems.length) {
                           skillsInputList.classList.add('hide');
                        }
                     } else {
                        item.classList.remove('hide');

                        // скрывать список если нет похожих элементов
                        count--
                        if (count == skillsInputListItems.length) {
                           skillsInputList.classList.add('hide');
                        }

                        let str = item.textContent;
                        item.innerHTML = insertMark(str, item.textContent.search(inputValue), inputValue.length)
                     }
                  })
               } else {
                  skillsInputList.classList.add('hide');
                  skillsInputListItems.forEach(function (item) {
                     item.classList.remove('hide')
                     item.innerHTML = item.innerHTML;
                  })
               }
            })
            // выделение совпавших символов при вводе данных в поле ключевых навыков
            function insertMark(str, pos, len) {
               return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark >' + str.slice(pos + len);
            }
            // добавлять элементы нажатием клавици enter
            skillsInput.addEventListener('keydown', (e) => {
               if (e.keyCode == 13 && skillsInput.value.length >= 2) {
                  if (skillsInput.value.replace(/\s+/g, ' ') !== ' ') {
                     if (skillsValueArray.indexOf(skillsInput.value.toLowerCase()) == -1 && skillsValueArray.indexOf(skillsInput.value.toUpperCase())) {
                        skillsValueArray.push(skillsInput.value.toLowerCase());
                        createNewSkillItem(skillsInput.value)
                     }
                     writeCookie('skill-value(new__resume)', JSON.stringify(skillsValueArray), 30);

                     skillsInput.value = '';
                     skillsInputList.classList.add('hide');

                     if (skillsValueArray.length > 0) {
                        skillsList.classList.remove('hide');
                     }
                  } else {
                     skillsInput.value = ''
                  }
               }
            })
         } else {
            skillsInput.value = '';
            if (!(skillsInputList.classList.contains('hide'))) {
               skillsInputListItems = skillsInputList.querySelectorAll('.item');
               skillsInputListItems.forEach(item => {
                  item.classList.remove('hide')
                  item.innerHTML = item.innerHTML;
               })
               skillsInputList.classList.add('hide');
            }
         }

         // нажатие на элементы предложенные из списка
         if (target.closest('.item') && target.parentNode == skillsInputList) {
            if (skillsValueArray.indexOf(skillsInput.textContent.toLowerCase()) == -1 && skillsValueArray.indexOf(skillsInput.textContent.toUpperCase())) {
               skillsInputList.classList.add('hide')
               if (skillsValueArray.indexOf(target.textContent) == -1) {
                  skillsValueArray.push(target.textContent.toLowerCase());
                  createNewSkillItem(target.textContent);
               }
               writeCookie('skill-value(new__resume)', JSON.stringify(skillsValueArray), 30);

               if (skillsValueArray.length > 0) {
                  skillsList.classList.remove('hide');
               }
            }
         }

         // выбор навыков из стандартного списка
         if (target.closest('.item') && target.closest('.skills__standart')) {
            target.closest('.item').classList.toggle('active');
            if (target.closest('.item').classList.contains('active')) {
               if (skillsValueArray.indexOf(skillsInput.textContent.toLowerCase()) == -1 && skillsValueArray.indexOf(skillsInput.textContent.toUpperCase())) {
                  skillsInputList.classList.add('hide')
                  if (skillsValueArray.indexOf(target.textContent) == -1) {
                     skillsValueArray.push(target.textContent.toLowerCase());
                     createNewSkillItem(target.textContent);
                  }
                  writeCookie('skill-value(new__resume)', JSON.stringify(skillsValueArray), 30);

                  if (skillsValueArray.length > 0) {
                     skillsList.classList.remove('hide');
                  }
               }
            } else {
               skillsValueArray.forEach(elemArr => {
                  if (elemArr.toLowerCase() == target.closest('.item').textContent.toLowerCase()) {
                     // удалить эжлемент из списка уже добавленных
                     skillsList.querySelectorAll('.item').forEach(item => {
                        if (elemArr.toLowerCase() == item.textContent.toLowerCase()) {
                           item.remove();
                        }
                     })
                     // удалить значение из массива
                     skillsValueArray.splice((skillsValueArray.indexOf(elemArr)), 1);
                     writeCookie('skill-value(new__resume)', JSON.stringify(skillsValueArray), 30);
                  }
               })
               if (skillsValueArray.length == 0) {
                  deleteCookie('skill-value(new__resume)');
               }
            }
         }

         // удаление элемента нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.skills__list')) {
            target.closest('.item').remove();
            skillsStandartItem.forEach(item => {
               if (target.closest('.item').textContent.toLowerCase() == item.textContent.toLowerCase()) {
                  item.classList.remove('active');
               }
            })

            skillsValueArray.forEach(elemArr => {
               if (elemArr == target.closest('.item').textContent) {
                  skillsValueArray.splice((skillsValueArray.indexOf(elemArr)), 1);
                  writeCookie('skill-value(new__resume)', JSON.stringify(skillsValueArray), 30);
               }
            })

            if (skillsValueArray.length == 0) {
               skillsList.classList.add('hide');
               deleteCookie('skill-value(new__resume)');
            }
         }
      }
      inputSkills();

      // переключение свитчера в образовании
      if (target.closest('.education__switcher input')) {
         if (educationSwitcher.checked) {
            educationAddBtn.classList.add('dont-click')
            educationList.classList.add('dont-click')
            writeCookie('education__checkbox(new__resume)', true, 30);
         } else {
            educationAddBtn.classList.remove('dont-click')
            educationList.classList.remove('dont-click')
            deleteCookie('education__checkbox(new__resume)');
         }
      }

      // нажатия в попапе образование
      function clickPopupEducation() {
         // открытие попапа добавить образование
         if (target == educationAddBtn) {
            background.classList.add('active');
            popupEducation.classList.add('active');
            scrollY = window.scrollY;
            scrollTo(popupEducation, scrollY);
         }

         // закрытие попапа добавить образоввание
         if ((target == background || target.closest('.close-popup')) && popupEducation.classList.contains('active')) {
            clearPopupEducation();
         }

         //ввод данных в инпут на попапе основное образование
         if (target.tagName == 'INPUT' && target.closest('.popup__education')) {
            if (target.parentNode.classList.contains('error')) {
               target.parentNode.classList.remove('error')
            }

            popupEducationInput.forEach(input => {
               input.addEventListener('input', () => {
                  if (input.parentNode.classList.contains('year-of-start') || input.parentNode.classList.contains('year-of-ending')) {
                     inputNumber(input)
                  }

                  if (input.value.length > 0) {
                     input.classList.add('not-empty');
                  } else {
                     input.classList.remove('not-empty');
                  }
               })
            })
         }

         // выбор уровня образования
         if (target.closest('.lavel__value')) {
            if (target.closest('.lavel').classList.contains('error')) {
               target.closest('.lavel').classList.remove('error')
            }

            popupEducation.querySelector('.lavel__list').classList.toggle('hide')
         } else if (!popupEducation.querySelector('.lavel__list').classList.contains('hide')) {
            popupEducation.querySelector('.lavel__list').classList.add('hide')
         }

         // нажатие на элементы списка с уровнем языка
         if (target.closest('.item') && target.closest('.lavel__list')) {
            popupEducation.querySelectorAll('.lavel__list .item').forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            popupEducation.querySelector('.lavel__value').classList.add('not-empty');
            popupEducation.querySelector('.lavel__value .item').textContent = target.closest('.item').textContent;
            popupEducation.querySelector('.lavel__value .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));
         }

         // нажатие на кнопку сохранить
         if (target.closest('.popup__education-save') && target.closest('.popup__education')) {
            let validateName = false;
            let validateSpecialisation = false;
            let validateLavel = false;
            let validateFaculty = false;
            let validateYearOfStart = false;
            let validateYearOfEnding = false;

            if (popupEducation.querySelector('.name input').value != '' && popupEducation.querySelector('.name input').value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
               popupEducation.querySelector('.name').classList.remove('error');
            } else {
               validateName = false
               popupEducation.querySelector('.name').classList.add('error');
            }

            if (popupEducation.querySelector('.specialisation input').value != '' && popupEducation.querySelector('.specialisation input').value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSpecialisation = true
               popupEducation.querySelector('.specialisation').classList.remove('error');
            } else {
               validateSpecialisation = false
               popupEducation.querySelector('.specialisation').classList.add('error');
            }

            if (popupEducation.querySelector('.faculty input').value != '' && popupEducation.querySelector('.faculty input').value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateFaculty = true
               popupEducation.querySelector('.faculty').classList.remove('error');
            } else {
               validateFaculty = false
               popupEducation.querySelector('.faculty').classList.add('error');
            }

            if (popupEducation.querySelector('.year-of-start input').value.length > 3) {
               validateYearOfStart = true
               popupEducation.querySelector('.year-of-start').classList.remove('error');
            } else {
               validateYearOfStart = false
               popupEducation.querySelector('.year-of-start').classList.add('error');
            }

            if (popupEducation.querySelector('.year-of-ending input').value.length > 3 && popupEducation.querySelector('.year-of-ending input').value < popupEducation.querySelector('.year-of-start input')) {
               validateYearOfEnding = true
               popupEducation.querySelector('.year-of-ending').classList.remove('error');
            } else {
               validateYearOfEnding = false
               popupEducation.querySelector('.year-of-ending').classList.add('error');
            }

            if (popupEducation.querySelector('.lavel__value').classList.contains('not-empty')) {
               validateLavel = true
               popupEducation.querySelector('.lavel').classList.remove('error')
            } else {
               validateLavel = false
               popupEducation.querySelector('.lavel').classList.add('error')
            }

            if (validateName && validateSpecialisation && validateLavel && validateFaculty && validateYearOfStart && validateYearOfEnding) {
               popupEducation.classList.remove('error');
               let period = `c ${popupEducation.querySelector('.year-of-start input').value} до ${popupEducation.querySelector('.year-of-ending input').value}`
               let educationItem = `
                  <p class="item text-s15-h18-w400" data-lavel="${popupEducation.querySelector('.lavel__value .item').textContent}" data-name="${popupEducation.querySelector('.name input').value}" data-spec="${popupEducation.querySelector('.specialisation input').value}" data-from="${popupEducation.querySelector('.year-of-start input').value}" data-to="${popupEducation.querySelector('.year-of-ending input').value}">
                     ${popupEducation.querySelector('.lavel__value .item').textContent}, ${popupEducation.querySelector('.name input').value}, ${popupEducation.querySelector('.specialisation input').value}, ${period}
                     <span class="remove-btn"></span>
                  </p>
               `
               educationArr.push(educationItem);
               educationList.classList.remove('hide');
               educationList.insertAdjacentHTML('beforeend', educationItem);
               writeCookie('education(new__resume)', JSON.stringify(educationArr), 30);

               educationAddBtn.textContent = '+ Добавить еще одно учереждение';

               clearPopupEducation();
            } else {
               popupEducation.classList.add('error');
            }
         }

         // удаление места работы нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.education__list')) {
            target.closest('.item').remove();
            educationArr.forEach(elemArr => {
               if (elemArr.trim() == target.closest('.item').outerHTML.trim()) {
                  educationArr.splice((educationArr.indexOf(elemArr)), 1)
                  writeCookie('education(new__resume)', JSON.stringify(educationArr), 30);
                  if (educationArr.length == 0) {
                     deleteCookie('education(new__resume)')
                     educationList.classList.add('hide')
                     educationAddBtn.textContent = '+ Добавить учереждение';
                  }
               }
            })
         }
      }
      clickPopupEducation();

      // нажатия в попапе дополнительное образование
      function clickAdditionalPopupEducation() {
         // открытие попапа добавить образование
         if (target == additionalEducationAddBtn) {
            background.classList.add('active');
            popupAdditionalEducation.classList.add('active');
            scrollY = window.scrollY;
            scrollTo(popupAdditionalEducation, scrollY);
         }

         // закрытие попапа добавить образоввание
         if (target == background && popupAdditionalEducation.classList.contains('active') ||
            target.closest('.close-popup') && target.closest('.popup__additional-education')) {
            clearPopupAdditionalEducation();
         }

         //ввод данных в инпут на попапе основное образование
         if (target.tagName == 'INPUT' && target.closest('.popup__additional-education')) {
            if (target.parentNode.classList.contains('error')) {
               target.parentNode.classList.remove('error')
            }

            popupAdditionalEducationInput.forEach(input => {
               input.addEventListener('input', () => {
                  if (input.parentNode.classList.contains('year-of-start') || input.parentNode.classList.contains('year-of-ending')) {
                     inputNumber(input)
                  }

                  if (input.value.length > 0) {
                     input.classList.add('not-empty');
                  } else {
                     input.classList.remove('not-empty');
                  }
               })
            })
         }

         // нажатие на кнопку сохранить
         if (target.closest('.popup__additional-education-save') && target.closest('.popup__additional-education')) {
            let validateName = false;
            let validateSpecialisation = false;
            let validateYearOfStart = false;
            let validateYearOfEnding = false;

            if (popupAdditionalEducation.querySelector('.name input').value != '' && popupAdditionalEducation.querySelector('.name input').value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
               popupAdditionalEducation.querySelector('.name').classList.remove('error');
            } else {
               validateName = false
               popupAdditionalEducation.querySelector('.name').classList.add('error');
            }

            if (popupAdditionalEducation.querySelector('.specialisation input').value != '' && popupAdditionalEducation.querySelector('.specialisation input').value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSpecialisation = true
               popupAdditionalEducation.querySelector('.specialisation').classList.remove('error');
            } else {
               validateSpecialisation = false
               popupAdditionalEducation.querySelector('.specialisation').classList.add('error');
            }

            if (popupAdditionalEducation.querySelector('.year-of-start input').value.length > 3) {
               validateYearOfStart = true
               popupAdditionalEducation.querySelector('.year-of-start').classList.remove('error');
            } else {
               validateYearOfStart = false
               popupAdditionalEducation.querySelector('.year-of-start').classList.add('error');
            }

            if (popupAdditionalEducation.querySelector('.year-of-ending input').value.length > 3) {
               validateYearOfEnding = true
               popupAdditionalEducation.querySelector('.year-of-ending').classList.remove('error');
            } else {
               validateYearOfEnding = false
               popupAdditionalEducation.querySelector('.year-of-ending').classList.add('error');
            }

            if (validateName && validateSpecialisation && validateYearOfStart && validateYearOfEnding) {
               popupAdditionalEducation.classList.remove('error');
               let period = `c ${popupAdditionalEducation.querySelector('.year-of-start input').value} до ${popupAdditionalEducation.querySelector('.year-of-ending input').value}`
               let additionalEducationItem = `
                  <p class="item text-s15-h18-w400" data-name="${popupAdditionalEducation.querySelector('.name input').value}" data-spec="${popupAdditionalEducation.querySelector('.specialisation input').value}" data-from="${popupAdditionalEducation.querySelector('.year-of-start input').value}" data-to="${popupAdditionalEducation.querySelector('.year-of-ending input').value}">
                     ${popupAdditionalEducation.querySelector('.name input').value}, ${popupAdditionalEducation.querySelector('.specialisation input').value}, ${period}
                     <span class="remove-btn"></span>
                  </p>
               `
               additionalEducationArr.push(additionalEducationItem);
               additionalEducationList.classList.remove('hide');
               additionalEducationList.insertAdjacentHTML('beforeend', additionalEducationItem);
               writeCookie('additional__education(new__resume)', JSON.stringify(additionalEducationArr), 30);

               additionalEducationAddBtn.textContent = '+ Добавить еще курс/тренинг';

               clearPopupAdditionalEducation();
            } else {
               popupAdditionalEducation.classList.add('error');
            }
         }

         // удаление места работы нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.additional__education-list')) {
            target.closest('.item').remove();
            additionalEducationArr.forEach(elemArr => {
               if (elemArr.trim() == target.closest('.item').outerHTML.trim()) {
                  additionalEducationArr.splice((additionalEducationArr.indexOf(elemArr)), 1)
                  writeCookie('additional__education(new__resume)', JSON.stringify(additionalEducationArr), 30);
                  if (additionalEducationArr.length == 0) {
                     deleteCookie('additional__education(new__resume)')
                     additionalEducationList.classList.add('hide')
                     additionalEducationAddBtn.textContent = '+ Добавить курс/тренинг';
                  }
               }
            })
         }
      }
      clickAdditionalPopupEducation();

      // выбор языков
      function clickLanguages() {
         // скрывать уже выбранные языки
         if (target.closest('.select-language') && target.closest('.languages__list')) {
            let languageItems = document.querySelectorAll('.languages__list .select-language .list .item')
            let array = []
            let languageNameArray = []
            let languageName
            if (localStorage.getItem('languages-value(new__resume)') != undefined || readCookie('languages-native(new__resume)') != undefined) {
               if (readCookie('languages-native(new__resume)') != undefined) {
                  languageNameArray.push(readCookie('languages-native(new__resume)'));
               }
               if (localStorage.getItem('languages-value(new__resume)') != undefined) {
                  array = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume)')));
                  array.forEach(elem => {
                     if (elem != null) {
                        languageName = elem[0].split(':')[0];
                        languageNameArray.push(languageName);
                     }
                  })
               }
            }

            languageItems.forEach(item => {
               if (languageNameArray.indexOf(item.getAttribute('data-name')) !== -1) {
                  item.classList.add('hide')
               } else {
                  item.classList.remove('hide')
               }
            })
         }

         // выбор родного языка
         if (target.closest('.select-language') && target.closest('.languages-native')) {
            languagesNativeList.classList.toggle('hide');

            window.scrollBy({
               top: target.closest('.languages__list').scrollHeight,
               behavior: 'auto'
            });
         } else {
            if (!(languagesNativeList.classList.contains('hide'))) {
               languagesNativeList.classList.add('hide');
            }
         }

         // нажатие в списке с родными языками
         if (target.closest('.item') && target.parentNode == languagesNativeList) {
            target.closest('.select-language').querySelector('.header .item').textContent = target.closest('.item').textContent;
            target.closest('.select-language').querySelector('.header .item').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
            target.closest('.select-language').querySelector('.header .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));

            writeCookie('languages-native(new__resume)', target.closest('.item').getAttribute('data-name'), 30)

            let countAddLanguages = document.querySelectorAll('.languages__list .languages').length;
            if (countAddLanguages + 1 == languageCount) {
               addLanguageBtn.classList.add('hide');
            }
         }

         // очистка родного языка
         if (target == languagesNativeClear) {
            if (readCookie('languages-native(new__resume)') != undefined) {
               languagesNativeHeader.querySelector('.item').textContent = 'Выберите язык';
               languagesNativeHeader.querySelector('.item').setAttribute('data-name', '');
               languagesNativeHeader.querySelector('.item').setAttribute('data-value', '');
               deleteCookie('languages-native(new__resume)');
               languagesNativeItems.forEach(item => {
                  item.classList.remove('hide');
               })

               // если кнопки добавить еще нето то показать её
               if (addLanguageBtn.classList.contains('hide')) {
                  addLanguageBtn.classList.remove('hide');
               }
            }
         }

         // нажатие на селекты вобора языка и выбора уровня языка
         if (target.closest('.header') && target.closest('.languages') && target.closest('.languages__list')) {
            if (target.closest('.select-language')) {
               // если селект языка имеет класс hide 
               if (target.closest('.select-language').querySelector('.list').classList.contains('hide')) {
                  // удалить у открытых списков класс hide
                  document.querySelectorAll('.languages__list .languages .list').forEach(list => {
                     if (!(list.classList.contains('hide'))) {
                        list.classList.add('hide');
                     }
                  })
                  // открыть тот по которому произошел клик
                  target.closest('.select-language').querySelector('.list').classList.remove('hide');
               } else {
                  target.closest('.select-language').querySelector('.list').classList.add('hide');
               }
            }
            if (target.closest('.select-lavel')) {
               // если селект уровня языка имеет класс hide 
               if (target.closest('.select-lavel').querySelector('.list').classList.contains('hide')) {
                  // удалить у открытых списков класс hide
                  document.querySelectorAll('.languages__list .languages .list').forEach(list => {
                     if (!(list.classList.contains('hide'))) {
                        list.classList.add('hide');
                     }
                  })
                  // открыть тот по которому произошел клик
                  target.closest('.select-lavel').querySelector('.list').classList.remove('hide');
               } else {
                  target.closest('.select-lavel').querySelector('.list').classList.add('hide');
               }
            }
            window.scrollBy({
               top: target.closest('.languages__list').scrollHeight,
               behavior: 'auto'
            });
         } else {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.languages__list .languages .list').forEach(list => {
               if (!(list.classList.contains('hide'))) {
                  list.classList.add('hide');
               }
            })
         }

         // нажатие на элементы из выпадающего списка
         if (target.closest('.item') && target.closest('.list') && target.closest('.languages')) {
            target.parentNode.parentNode.querySelector('.header .item').textContent = target.closest('.item').textContent;
            target.parentNode.parentNode.querySelector('.header .item').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
            target.parentNode.parentNode.querySelector('.header .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));

            // нажатие на элементы списка с языками
            if (target.closest('.select-language')) {
               let languageItem = target.closest('.select-language').querySelector('.header .item');
               let lavel = target.closest('.languages').querySelector('.select-lavel');
               let lavelItem = lavel.querySelector('.header .item');

               // разблокировать подле для ввода уровня языка и кнопку добавить еще язык
               if (languageItem.getAttribute('data-value') != '') {
                  lavel.classList.remove('dont-click');
               } else {
                  lavel.classList.add('dont-click');
               }

               // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
               let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
               if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
                  addLanguageBtn.classList.remove('dont-click');
               }

               languageValue = target.closest('.item').getAttribute('data-value');
               languageName = target.closest('.item').getAttribute('data-name');

               // при выборе языка подтавить уровень по умолчанию
               lavelItem.setAttribute('data-value', 'a1');
               lavelItem.setAttribute('data-name', 'А1 – начальный');
               lavelItem.textContent = 'А1 – начальный';
               lavelValue = lavelItem.getAttribute('data-value');
               lavelName = lavelItem.getAttribute('data-name');
            }
            // нажатие на элементы с уровнем языков
            if (target.closest('.select-lavel')) {
               let language = target.closest('.languages').querySelector('.select-language .header .item');
               let lavel = target.closest('.languages').querySelector('.select-lavel .header .item');

               languageName = language.getAttribute('data-name');
               languageValue = language.getAttribute('data-value');

               lavelValue = lavel.getAttribute('data-value');
               lavelName = lavel.getAttribute('data-name');
               // запись значений в localStorage
               let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
               allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
               localStorage.setItem('languages-value(new__resume)', encodeURIComponent(JSON.stringify(allLanguage)));
            }
            /// запись значений в localStorage
            let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
            allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
            localStorage.setItem('languages-value(new__resume)', encodeURIComponent(JSON.stringify(allLanguage)));
         }

         // нажатие кнопки добавить еще язык
         if (target == addLanguageBtn) {
            let languageClone = document.querySelector('.languages__list .languages').cloneNode(true);
            languageClone.className = 'languages';
            languageClone.querySelector('.select-language .header .item').textContent = 'Выберите язык';
            languageClone.querySelector('.select-language .header .item').setAttribute('data-name', '');
            languageClone.querySelector('.select-language .header .item').setAttribute('data-value', '');
            languageClone.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
            languageClone.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
            languageClone.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
            languageClone.querySelector('.select-lavel').classList.add('dont-click');
            target.before(languageClone);
            addLanguageBtn.classList.add('dont-click');

            // изменение индекса для поля с языком
            let lenguages = document.querySelectorAll('.languages__list .languages');
            for (let index = 0; index < lenguages.length; index++) {
               lenguages[index].setAttribute('data-count', index);
            }

            // если языков больше одного убирать класс one
            if (lenguages.length > 0) {
               lenguages.forEach(elem => {
                  elem.classList.remove('one');
               })
            }

            // скрывать кнопку добавть еще язык если кол-во полей равно кол-ву языков
            let countLanguages = document.querySelectorAll('.languages__list .languages').length;
            let countLanguageValue = document.querySelector('.languages__list .languages .select-language .list').querySelectorAll('.item').length;
            if (readCookie('languages-native(new__resume)') == undefined) {
               if (countLanguages !== countLanguageValue) {
                  addLanguageBtn.classList.add('dont-click');
               } else {
                  addLanguageBtn.classList.add('hide');
               }
            } else {
               if (countLanguages !== (countLanguageValue - 1)) {
                  addLanguageBtn.classList.add('dont-click');
               } else {
                  addLanguageBtn.classList.add('hide');
               }
            }

            // плавный скрол при нажатии на добавить еще язык
            window.scrollBy({
               top: 70,
               behavior: 'smooth'
            });
         }

         // удаление языка
         if (target.closest('.remove-language') && target.closest('.languages')) {
            let allLanguagesItem = document.querySelectorAll('.languages__list .languages');

            if (allLanguagesItem.length != 1) {
               let languagesLoadArray = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume)')));
               let languagesDataName = target.parentNode.querySelector('.select-language .header .item').getAttribute('data-name');
               let languagesDataValue = target.parentNode.querySelector('.select-language .header .item').getAttribute('data-value');
               let lavelDataName = target.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-name');
               let lavelDataValue = target.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-value');

               let languageString = languagesDataName + ":" + languagesDataValue + ";" + lavelDataName + ":" + lavelDataValue;

               languagesLoadArray.map(function (event, i) {
                  if (event == languageString) {
                     languagesLoadArray.splice(i, 1);
                  }
               })
               allLanguage.map(function (event, i) {
                  if (event[0] == languageString) {
                     allLanguage.splice(i, 1);
                  }
               })
               target.parentNode.remove();
               let languages = document.querySelectorAll('.language__list .languages');
               for (let index = 0; index < languages.length; index++) {
                  languages[index].setAttribute('data-count', index);
               }
               localStorage.setItem('languages-value(new__resume)', encodeURIComponent(JSON.stringify(allLanguage)));

               // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
               let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
               if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
                  addLanguageBtn.classList.remove('dont-click');
               }

               // если удалился последний элемент показывать кнопку добавить еще
               if (addLanguageBtn.classList.contains('hide')) {
                  addLanguageBtn.classList.remove('hide');
               }
            } else {
               target.parentNode.setAttribute('data-count', '0')
               target.parentNode.querySelector('.select-language .header .item').textContent = 'Выберите язык';
               target.parentNode.querySelector('.select-language .header .item').setAttribute('data-name', '');
               target.parentNode.querySelector('.select-language .header .item').setAttribute('data-value', '');
               target.parentNode.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
               target.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
               target.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-value', '');

               let languagesList = target.parentNode.querySelectorAll('.select-language .list .item');
               languagesList.forEach(elem => {
                  elem.classList.remove('hide');
               })

               target.parentNode.querySelector('.select-lavel').classList.add('dont-click');
               addLanguageBtn.classList.add('dont-click');

               allLanguage.length = 0;
               // localStorage.setItem('languages-value', JSON.stringify(allLanguage));

               localStorage.removeItem('languages-value(new__resume)');
            }
         }
      }
      clickLanguages();

      // нажатие на кнопки после ввода данных
      function clickBtn() {
         if (target.closest('.next') && target.closest('.step-3')) {
            clickBtnNext();
         }

         if (target.closest('.back') && target.closest('.step-3')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   // получение данных при перезагрузке
   function loadSkillItem() {
      if (readCookie('skill-value(new__resume)') !== undefined) {
         skillsValueArray = JSON.parse(readCookie('skill-value(new__resume)'))
         skillsStandartItem.forEach(item => {
            skillsValueArray.forEach(elemArr => {
               if (item.textContent.toLowerCase() == elemArr) {
                  item.classList.add('active');
               }
            })
         })

         skillsValueArray.forEach(elemArr => {
            createNewSkillItem(elemArr);
         })

         if (skillsValueArray.length > 0) {
            skillsList.classList.remove('hide');
         }
      }
   }
   function loadEducationCheckbox() {
      if (readCookie('education__checkbox(new__resume)') != undefined) {
         educationSwitcher.checked = true;
         educationAddBtn.classList.add('dont-click');
         educationList.classList.add('dont-click');
      }
   }
   function loadEducation() {
      if (readCookie('education(new__resume)') != undefined) {
         educationArr = JSON.parse(readCookie('education(new__resume)'));
         educationArr.forEach(elemArr => {
            educationList.classList.remove('hide');
            educationList.insertAdjacentHTML('beforeend', elemArr);
            educationAddBtn.textContent = '+ Добавить еще одно учереждение';
         })
      }
   }
   function loadAdditionalEducation() {
      if (readCookie('additional__education(new__resume)') != undefined) {
         additionalEducationArr = JSON.parse(readCookie('additional__education(new__resume)'));
         additionalEducationArr.forEach(elemArr => {
            additionalEducationList.classList.remove('hide');
            additionalEducationList.insertAdjacentHTML('beforeend', elemArr);
            additionalEducationAddBtn.textContent = '+ Добавить еще курс/тренинг';
         })
      }
   }
   function loadLanguagesNative() {
      if (readCookie('languages-native(new__resume)') != undefined) {
         languagesNativeItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('languages-native(new__resume)')) {
               languagesNativeHeader.querySelector('.item').textContent = item.textContent;
               languagesNativeHeader.querySelector('.item').setAttribute('data-name', item.getAttribute('data-name'));
               languagesNativeHeader.querySelector('.item').setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      }
   }
   function loadLanguages() {
      if (localStorage.getItem('languages-value(new__resume)') != undefined) {
         allLanguage = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume)')));
         if (allLanguage.length != 0) {
            let languageName = allLanguage[0][0].split(';')[0];
            let lavelName = allLanguage[0][0].split(';')[1];
            let languageNameArr = languageName.split(':');
            let lavelNameArr = lavelName.split(':');

            let languageItem = document.querySelector('.languages__list .languages');
            languageItem.querySelector('.select-language .header .item').textContent = languageNameArr[0];
            languageItem.querySelector('.select-language .header .item').setAttribute('data-name', languageNameArr[0]);
            languageItem.querySelector('.select-language .header .item').setAttribute('data-value', languageNameArr[1]);
            languageItem.querySelector('.select-lavel .header .item').textContent = lavelNameArr[0];
            languageItem.querySelector('.select-lavel .header .item').setAttribute('data-name', lavelNameArr[0]);
            languageItem.querySelector('.select-lavel .header .item').setAttribute('data-value', lavelNameArr[1]);

            if (languageItem.querySelector('.select-lavel .header .item').getAttribute('data-name') != '') {
               languageItem.querySelector('.select-lavel').classList.remove('dont-click')
            }

            for (let index = 1; index < allLanguage.length; ++index) {
               let languageName = allLanguage[index][0].split(';')[0];
               let lavelName = allLanguage[index][0].split(';')[1];
               let languageNameArr = languageName.split(':');
               let lavelNameArr = lavelName.split(':');

               countLanguage++;

               let languageClone = languageItem.cloneNode(true);
               languageClone.querySelector('.select-language .header .item').textContent = languageNameArr[0];
               languageClone.querySelector('.select-language .header .item').setAttribute('data-name', languageNameArr[0]);
               languageClone.querySelector('.select-language .header .item').setAttribute('data-value', languageNameArr[1]);
               languageClone.querySelector('.select-lavel .header .item').textContent = lavelNameArr[0];
               languageClone.querySelector('.select-lavel .header .item').setAttribute('data-name', lavelNameArr[0]);
               languageClone.querySelector('.select-lavel .header .item').setAttribute('data-value', lavelNameArr[1]);

               if (languageClone.querySelector('.select-lavel .header .item').getAttribute('data-name') != '') {
                  languageClone.querySelector('.select-lavel').classList.remove('dont-click')
               }
               languageClone.setAttribute('data-count', countLanguage);
               addLanguageBtn.before(languageClone);
            }


            let filterLanguagesItem = document.querySelectorAll('.languages__list .languages');
            if (filterLanguagesItem.length == 1) {
               filterLanguagesItem.forEach(elem => {
                  elem.classList.add('one');
               })
            } else if (filterLanguagesItem.length > 1) {
               filterLanguagesItem.forEach(elem => {
                  elem.classList.remove('one');
               })
            }

            // скрывать кнопку добавть еще язык если кол-во полей равно кол-ву языков
            let countLanguages = document.querySelectorAll('.languages__list .languages').length;
            let countLanguageValue = document.querySelector('.languages__list .languages .select-language .list').querySelectorAll('.item').length;
            if (readCookie('languages-native(new__resume)') == undefined) {
               if (countLanguages !== countLanguageValue) {
                  addLanguageBtn.classList.add('dont-click');
               } else {
                  addLanguageBtn.classList.add('hide');
               }
            } else {
               if (countLanguages !== (countLanguageValue - 1)) {
                  addLanguageBtn.classList.add('dont-click');
               } else {
                  addLanguageBtn.classList.add('hide');
               }
            }

            // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
            let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
            if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
               addLanguageBtn.classList.remove('dont-click');
            }
         }
      }
   }
   window.addEventListener('load', function load() {
      loadSkillItem();
      loadEducationCheckbox();
      loadEducation();
      loadAdditionalEducation();
      loadLanguagesNative();
      loadLanguages();
   }, false);
})