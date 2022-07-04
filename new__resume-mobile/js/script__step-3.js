import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';
import mobileModal from './script__modal-mobile.js';
import { enableScroll } from './script__enableScroll.js';
import { inputNumber } from "./script__input-number.js";
import { bg__lock, bg__unlock } from './script__body-lock.js';

document.addEventListener("DOMContentLoaded", () => {
   let step3 = document.querySelector('.step__inner .step-3');
   let backgroundList = document.querySelector('.background-list');
   let backgroundModal = document.querySelector('.background-modal');

   let skillsText = step3.querySelector('.skills .skills-text'),
      skillsList = backgroundList.querySelector('.skills__list'),
      skillsListBtnBack = skillsList.querySelector('.skills__list .list__title button'),
      skillsListClear = skillsList.querySelector('.skills__list .list__bottom .clear'),
      skillsListSave = skillsList.querySelector('.skills__list .list__bottom .save'),
      skillsStandartItem = skillsList.querySelectorAll('.skills__standart .item'),
      skillsInput = skillsList.querySelector('.skills__list .skills__input input'),
      skillsInputList = skillsList.querySelector('.skills__list .skills__input .list'),
      skillsInputListItems,
      skillsAddList = skillsList.querySelector('.skills__list .skills__add-list'),
      skillsArray = [
         'Способности к деловому общению',
         'организация и планирование рабочего времени',
         'опыт переговоров и продаж',
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
         'выстраивание стабильных отношений с клиентами, поставщиками, кадрами',
         'навыки межличностного делового общения',
         'умение организовывать работу',
         'умение планировать',
         'умение принимать решения',
         'внимание к деталям',
         'способность анализировать проблемы',
         'навыки управления проектами',
         'деловое лидерство',
         'управление продажами',
         'управление персоналом',
         'поиск и привлечение клиентов',
         'активные продажи',
         'ведение переговоров',
         'аналитика продаж',
         'Организаторское мастерство',
         'знание иностранных языков',
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
         'опыт продаж',
         'тактичность, толерантность',
         'тайм-менеджмент',
         'эффективное общение',
         'грамотная речь',
         'обучаемость, легкое усвоение новой информации',
         'умение мотивировать и убеждать',
         'работа с возражениями, поиск компромиссов',
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
         'успешный опыт разработки программного обеспечения',
         'знание основ информационной безопасности',
         'работа с базами данных',
         'разработка программного обеспечения',
         'разработка приложений',
         'разработка сайтов ',
         'установка и отладка уже существующих программ',
         'знание принципов построения и работы сайтов и серверов',
         'умение прочесть документацию на английском языке',
         'работа с сетями и базами данных',
         'поддержка и верстка сайтов',
         'знание личных продаж',
         'знание кассы',
         'мерчандайзинг',
         'работа в команде',
         'умение обучать других',
         'опытный пользователь ПК',
         'владение современными технологиями обучения',
         'мотивированность',
         'опыт репетиторства, индивидуальных занятий',
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
         'обладание высоким уровнем инициативности',
         'способность организовывать рабочий процесс',
         'умение удерживать интерес слушателей ',
         'обладание грамотной речью',
         'умение общаться с людьми',
         'способность налаживать контакты',
         'деловая переписка',
         'стрессоустойчивость',
         'поиск информации в интернетеделовая переписка',
         'стрессоустойчивость',
         'поиск информации в интернете',
         'хорошая память',
         'оперативность',
         'ответственность',
         'внимательность',
         'практический опыт прокладки и диагностики сетей',
         'осуществление техподдержки и работа с клиентами',
         'диагностика сбоев и неполадок',
         'опыт работы с серверами',
         'проведение мониторинга работы систем',
         'технический английский',
         'установка оборудования',
         'контроль надлежащего уровня информационной безопасности',
         'работа с техническими документами',
         'знание международных стандартов',
         'знание нормативной базы',
         'знание принципов налогового учета',
         'знание принципов бухгалтерского учета',
         'знание управленческого учета',
         'наличие своей клиентской базы',
         'разработка аудиторских программ',
         'умение составлять и анализировать предоставленные договоры',
         'ведение переговоров',
         'представительство в судах',
         'осуществление претензионно-исковой деятельности',
         'составление юридических документов',
         'сопровождение деятельности компании',
         'правовое обеспечение работы организации',
         'представление компании в государственных органах',
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
      skillsAddArray = [];

   // добавить элементы из массива в список
   skillsArray.forEach(elemArr => {
      let listItem = document.createElement('p');
      listItem.className = "item";
      listItem.innerHTML = elemArr;
      skillsInputList.append(listItem)
   })
   // создание элнмента в списке со скилами
   function createNewSkillItem(elem) {
      let removeSkillItem = document.createElement('p');
      removeSkillItem.className = 'remove-btn';
      let skillItem = document.createElement('p');
      skillItem.className = 'item';
      skillItem.textContent = elem;
      skillItem.append(removeSkillItem);
      skillsAddList.append(skillItem);
   }

   let languagesValue = step3.querySelector('.languages .languages-text'), // блок для значений фильтра "Языки"
      listLang = backgroundList.querySelector('.language__list'), // окно для выбора языков
      languageCount = document.querySelector('.language__list .select-language .list').querySelectorAll('.item').length,
      listLangBtnBack = listLang.querySelector('.language__list .list__title button'),
      languagesNative = listLang.querySelector('.language__list .languages-native'),
      languagesNativeHeader = languagesNative.querySelector('.select-language .header'),
      languagesNativeList = languagesNative.querySelector('.select-language .list'),
      languagesNativeItems = languagesNative.querySelectorAll('.select-language .list .item'),
      languagesNativeClear = languagesNative.querySelector('.clear-language'),
      addLanguageBtn = listLang.querySelector('.language__list .add-language'),
      allLanguage = [], // массив для значений "Языков"
      languagesAdd, // полякоторые уже выбранны
      nameLanguages = [], // массив для названий "Языков"
      countLanguage = 0,
      languageValue,
      languageName,
      lavelValue,
      lavelName;
   function printLanguagesName() {
      languagesAdd = document.querySelectorAll('.language__list .select-language .header .item')

      setTimeout(() => {
         nameLanguages = []
         languagesAdd.forEach(item => {
            if (item.getAttribute('data-name') != '') {
               nameLanguages.push(item.getAttribute('data-name'))
            }
         })
         if (nameLanguages.length > 0) {
            writeCookie('languages__name(new__vacancy__mobile)', JSON.stringify(nameLanguages), 30);
            languagesValue.textContent = nameLanguages.join(', ');
         } else {
            deleteCookie('languages__name(new__vacancy__mobile)');
            languagesValue.textContent = 'Выберите языки и уровень';
         }
      }, 100)
   }

   let educationSwitcher = step3.querySelector('.education__switcher input'),
      educationAddList = step3.querySelector('.education__add-list'),
      educatinAddBtn = step3.querySelector('.education__add'),
      educationList = backgroundList.querySelector('.education__list'),
      educationName = backgroundList.querySelector('.education__name input'),
      educationLavel = backgroundList.querySelector('.education__lavel p'),
      educationLavelItems = document.querySelectorAll('.modal-window .education__lavel-modal .item'),
      educationSpecialisation = backgroundList.querySelector('.education__specialization input'),
      educationFaculty = backgroundList.querySelector('.education__faculty input'),
      educationYearFrom = backgroundList.querySelector('.education__year .year__from input'),
      educationYearTo = backgroundList.querySelector('.education__year .year__to input'),
      educationListClose = educationList.querySelector('.list__title button'),
      educationListClear = educationList.querySelector('.list__bottom .clear'),
      educationListSave = educationList.querySelector('.list__bottom .apply'),
      educationArr = [];
   // // модальное окно с уровнем образования
   let educationLavelBtnClass = '.education__lavel',
      educationLavelModal = document.querySelector('.modal-window .education__lavel-modal'),
      educationLavelModalInner = document.querySelector('.modal-window .education__lavel-modal .inner'),
      educationLavelModalInnerClass = '.modal-window .education__lavel-modal .inner',
      educationLavelModalClose = document.querySelector('.modal-window .education__lavel-modal-close');
   mobileModal(backgroundModal, educationLavelBtnClass, educationLavelModal, educationLavelModalInner, educationLavelModalInnerClass, educationLavelModalClose);

   let additionalEducationAddBtn = document.querySelector('.additional__education-add'),
      additionalEducationAddList = document.querySelector('.additional__education-add-list'),
      additionalEducationList = backgroundList.querySelector('.additional__education-list'),
      additionalEducationName = additionalEducationList.querySelector('.additional__education-name input'),
      additionalEducationOrganization = additionalEducationList.querySelector('.additional__education-organization input'),
      additionalEducationSpecialisation = additionalEducationList.querySelector('.additional__education-specialisation input'),
      additionalEducationYearFrom = additionalEducationList.querySelector('.additional__education-year .year__from input'),
      additionalEducationYearTo = additionalEducationList.querySelector('.additional__education-year .year__to input'),
      additionalEducationClose = additionalEducationList.querySelector('.list__title button'),
      additionalEducationClear = additionalEducationList.querySelector('.list__bottom .clear'),
      additionalEducationSave = additionalEducationList.querySelector('.list__bottom .apply'),
      additionalEducationArr = [];


   // проверка данных при вводе года на приемлемые значения
   function validateYearEducationOnblur(inputFrom, inputTo) {
      inputFrom.onblur = function () {
         if (inputFrom.value > new Date().getFullYear() || inputFrom.value <= new Date().getFullYear() - 70) {
            inputFrom.value = '';
            inputFrom.classList.remove('not-empty');
         }
         if (inputFrom.value >= inputTo.value && inputTo.value.length === 4) {
            inputFrom.value = '';
            inputFrom.classList.remove('not-empty');
         }
      };

      inputTo.onblur = function () {
         if (inputTo.value >= new Date().getFullYear() + 10 || inputTo.value <= new Date().getFullYear() - 70) {
            inputTo.value = '';
            inputTo.classList.remove('not-empty');
         }
         if (inputFrom.value >= inputTo.value && inputFrom.value.length === 4) {
            inputTo.value = '';
            inputTo.classList.remove('not-empty');
         }
      };
   }
   validateYearEducationOnblur(educationYearFrom, educationYearTo)
   function validateYearAdditionalEducationOnblur(inputFrom, inputTo) {
      inputFrom.onblur = function () {
         if (inputFrom.value >= new Date().getFullYear() || inputFrom.value <= new Date().getFullYear() - 70) {
            inputFrom.value = '';
            inputFrom.classList.remove('not-empty');
         }
         if (inputFrom.value >= inputTo.value && inputTo.value.length === 4) {
            inputFrom.value = '';
            inputFrom.classList.remove('not-empty');
         }
      };
      inputTo.onblur = function () {
         if (inputTo.value >= new Date().getFullYear() + 3 || inputTo.value <= new Date().getFullYear() - 70) {
            inputTo.value = '';
            inputTo.classList.remove('not-empty');
         }
         if (inputFrom.value > inputTo.value && inputFrom.value.length === 4) {
            inputTo.value = '';
            inputTo.classList.remove('not-empty');
         }
      };

   }
   validateYearAdditionalEducationOnblur(additionalEducationYearFrom, additionalEducationYearTo)

   // очистка панели с добавлением образования
   function clearEducation() {
      educationList.querySelectorAll('input').forEach(input => {
         input.value = ''
         input.classList.remove('not-empty')
         input.classList.remove('error')
      })
      educationLavel.textContent = 'Выберите уровень'
      educationLavel.removeAttribute('data-value')
      educationLavel.classList.remove('error')
      educationLavelItems.forEach(item => item.classList.remove('active'))
   }

   // очистка панели с добавлением дополнительного образования
   function clearAdditionalEducation() {
      additionalEducationList.querySelectorAll('input').forEach(input => {
         input.value = ''
         input.classList.remove('not-empty')
         input.classList.remove('error')
      })
   }

   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод ключевых навыков
      function clickSkillsList() {
         // открытие
         if (target.closest('.skills') && target.closest('.step-3')) {
            backgroundList.classList.add('active');
            skillsList.classList.add('active');
            bg__lock()
         }

         // закрытие
         if (target == skillsListBtnBack) {
            skillsList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock()
         }

         // ввод значений
         if (target == skillsInput) {
            // ввод значения в поле
            skillsInput.addEventListener('input', () => {
               let inputValue = skillsInput.value.replace(/\s/g, '');
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
                     if (skillsAddArray.indexOf(skillsInput.value.toLowerCase()) == -1 && skillsAddArray.indexOf(skillsInput.value.toUpperCase())) {
                        skillsAddArray.push(skillsInput.value.toLowerCase());
                        createNewSkillItem(skillsInput.value)
                     }
                     writeCookie('skill-value(new__resume__mobile)', JSON.stringify(skillsAddArray), 30);

                     skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');

                     skillsInput.value = '';
                     skillsInputList.classList.add('hide');

                     if (skillsAddArray.length > 0) {
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

         // выбор навыков из стандартного списка
         if (target.closest('.item') && target.closest('.skills__standart')) {
            target.closest('.item').classList.toggle('active');
            if (target.closest('.item').classList.contains('active')) {
               if (skillsAddArray.indexOf(skillsInput.textContent.toLowerCase()) == -1 && skillsAddArray.indexOf(skillsInput.textContent.toUpperCase())) {
                  skillsInputList.classList.add('hide')
                  if (skillsAddArray.indexOf(target.textContent) == -1) {
                     skillsAddArray.push(target.textContent.toLowerCase());
                     createNewSkillItem(target.textContent);
                  }
                  writeCookie('skill-value(new__resume__mobile)', JSON.stringify(skillsAddArray), 30);

                  skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');

                  if (skillsAddArray.length > 0) {
                     skillsList.classList.remove('hide');
                  }
               }
            } else {
               skillsAddArray.forEach(elemArr => {
                  if (elemArr.toLowerCase() == target.closest('.item').textContent.toLowerCase()) {
                     // удалить эжлемент из списка уже добавленных
                     skillsAddList.querySelectorAll('.item').forEach(item => {
                        if (elemArr.toLowerCase() == item.textContent.toLowerCase()) {
                           item.remove();
                        }
                     })
                     // удалить значение из массива
                     skillsAddArray.splice((skillsAddArray.indexOf(elemArr)), 1);
                     writeCookie('skill-value(new__resume__mobile)', JSON.stringify(skillsAddArray), 30);

                     skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');
                  }
               })
               if (skillsAddArray.length == 0) {
                  deleteCookie('skill-value(new__resume__mobile)');

                  skillsText.textContent = 'Выберите ключевые навыки';
               }
            }
         }

         // нажатие на элементы предложенные из списка
         if (target.closest('.item') && target.parentNode == skillsInputList) {
            if (skillsAddArray.indexOf(skillsInput.textContent.toLowerCase()) == -1 && skillsAddArray.indexOf(skillsInput.textContent.toUpperCase())) {
               skillsInputList.classList.add('hide')
               if (skillsAddArray.indexOf(target.textContent) == -1) {
                  skillsAddArray.push(target.textContent.toLowerCase());
                  createNewSkillItem(target.textContent);
               }
               writeCookie('skill-value(new__resume__mobile)', JSON.stringify(skillsAddArray), 30);

               skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');

               if (skillsAddArray.length > 0) {
                  skillsList.classList.remove('hide');
               }
            }
         }

         // удаление элемента нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.skills__list')) {
            target.closest('.item').remove();
            skillsAddArray.forEach(elemArr => {
               if (elemArr.toLowerCase() === target.closest('.item').textContent.toLowerCase()) {
                  skillsAddArray.splice((skillsAddArray.indexOf(elemArr)), 1);
                  writeCookie('skill-value(new__resume__mobile)', JSON.stringify(skillsAddArray), 30);
                  skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');
               }
            })

            skillsStandartItem.forEach(item => {
               if (target.closest('.item').textContent.toLowerCase() == item.textContent.toLowerCase()) {
                  item.classList.remove('active');
               }
            })

            if (skillsAddArray.length == 0) {
               deleteCookie('skill-value(new__resume__mobile)');
               skillsText.textContent = 'Выберите ключевые навыки';
            }
         }

         // нажатие кнопки сбросить
         if (target == skillsListClear) {
            skillsAddList.querySelectorAll('.item').forEach(item => {
               item.remove();
            })
            skillsStandartItem.forEach(item => {
               item.classList.remove('active')
            })
            skillsAddArray = [];
            skillsText.textContent = 'Выберите ключивые навыки';
            deleteCookie('skill-value(new__resume__mobile)');
            skillsText.textContent = 'Выберите ключевые навыки';

            skillsList.classList.remove('active')
            backgroundList.classList.remove('active')
            bg__unlock()
         }

         // нажатие кнопки сохранить
         if (target == skillsListSave) {
            skillsList.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__lock()
         }
      }
      clickSkillsList();

      // функционал "Знание языков"
      function clickLanguages() {
         // открытие
         if (target.closest('.languages') && target.closest('.step-3')) {
            backgroundList.classList.add('active');
            listLang.classList.add('active');
            bg__lock()
         }

         // закрытие
         if (target == listLangBtnBack) {
            listLang.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock()
         }

         // скрывать уже выбранные языки
         if (target.closest('.select-language') && target.closest('.language__list')) {
            let languageItems = document.querySelectorAll('.language__list .select-language .list .item')
            let array = []
            let languageNameArray = []

            let languageName
            if (localStorage.getItem('languages-value(new__resume__mobile)') != undefined || readCookie('languages-native(new__resume__mobile)') !== undefined) {
               if (readCookie('languages-native(new__resume__mobile)') !== undefined) {
                  languageNameArray.push(readCookie('languages-native(new__resume__mobile)'));
               }
               if (localStorage.getItem('languages-value(new__resume__mobile)') != undefined) {
                  array = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume__mobile)')));
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

         // вывод названий выбранных языков в оновном блоке
         if (target.closest('.item') && target.parentNode.classList.contains('list') && target.closest('.select-language') && target.closest('.language__list')) {
            printLanguagesName();
         }

         // выбор родного языка
         if (target.closest('.select-language') && target.closest('.languages-native')) {
            languagesNativeList.classList.toggle('hide');
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

            writeCookie('languages-native(new__resume__mobile)', target.closest('.item').getAttribute('data-name'), 30)

            let countAddLanguages = document.querySelectorAll('.language__list .list .languages').length;
            if (countAddLanguages + 1 == languageCount) {
               addLanguageBtn.classList.add('hide');
            }
         }

         // очистка родного языка
         if (target == languagesNativeClear) {
            if (readCookie('languages-native(new__resume__mobile)') !== undefined) {
               languagesNativeHeader.querySelector('.item').textContent = 'Выберите язык';
               languagesNativeHeader.querySelector('.item').setAttribute('data-name', '');
               languagesNativeHeader.querySelector('.item').setAttribute('data-value', '');
               deleteCookie('languages-native(new__resume__mobile)');
               languagesNativeItems.forEach(item => {
                  item.classList.remove('hide');
               })
               printLanguagesName();

               // если кнопки добавить еще нето то показать её
               if (addLanguageBtn.classList.contains('hide')) {
                  addLanguageBtn.classList.remove('hide');
               }
            }
         }

         // нажатие на селекты вобора языка и выбора уровня языка 
         if (target.closest('.header') && target.closest('.languages') && target.closest('.language__list')) {
            if (target.closest('.select-language')) {
               // если селект языка имеет класс hide 
               if (target.closest('.select-language').querySelector('.list').classList.contains('hide')) {
                  // удалить у открытых списков класс hide
                  document.querySelectorAll('.language__list .languages .list').forEach(list => {
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
                  document.querySelectorAll('.language__list .languages .list').forEach(list => {
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
         } else {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.language__list .languages .list').forEach(list => {
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
               let lastItem = document.querySelectorAll('.language__list .languages')[document.querySelectorAll('.language__list .languages').length - 1]
               if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
                  addLanguageBtn.classList.remove('dont-click');
               }

               languageValue = target.closest('.item').getAttribute('data-value');
               languageName = target.closest('.item').getAttribute('data-name');

               // при выборе языка подставить уровень по умолчанию
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
               // // запись значений в localStorage
               let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
               allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
               localStorage.setItem('languages-value(new__resume__mobile)', encodeURIComponent(JSON.stringify(allLanguage)));
            }
            // // запись значений в localStorage
            let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
            allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
            localStorage.setItem('languages-value(new__resume__mobile)', encodeURIComponent(JSON.stringify(allLanguage)));

            printLanguagesName();
         }

         // нажатие кнопки добавить еще язык
         if (target == addLanguageBtn) {
            let languageClone = document.querySelector('.language__list .languages').cloneNode(true);
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
            let lenguages = document.querySelectorAll('.language__list .languages');
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
            let countLanguages = document.querySelectorAll('.language__list .languages').length;
            let countLanguageValue = document.querySelector('.language__list .languages .select-language .list').querySelectorAll('.item').length;
            if (readCookie('languages-native(new__resume__mobile)') == undefined) {
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
               top: 140,
               behavior: 'smooth'
            });
         }

         // удаление языка
         if (target.closest('.remove-language') && target.closest('.languages')) {
            let allLanguagesItem = document.querySelectorAll('.language__list .languages');

            let languagesLoadArray = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume__mobile)')));
            let languagesDataName = target.parentNode.querySelector('.select-language .header .item').getAttribute('data-name');
            let languagesDataValue = target.parentNode.querySelector('.select-language .header .item').getAttribute('data-value');
            let lavelDataName = target.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-name');
            let lavelDataValue = target.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-value');

            let languageString = languagesDataName + ":" + languagesDataValue + ";" + lavelDataName + ":" + lavelDataValue;

            languagesLoadArray.map(function (event, i) {
               if (event[0] == languageString) {
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
            localStorage.setItem('languages-value(new__resume__mobile)', encodeURIComponent(JSON.stringify(languagesLoadArray)));

            // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
            let lastItem = document.querySelectorAll('.language__list .languages')[document.querySelectorAll('.language__list .languages').length - 1]
            if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
               addLanguageBtn.classList.remove('dont-click');
            }

            // если удалился последний элемент показывать кнопку добавить еще
            if (addLanguageBtn.classList.contains('hide')) {
               addLanguageBtn.classList.remove('hide');
            }
            if (allLanguagesItem.length == 2) {
               allLanguagesItem.forEach(item => {
                  item.classList.add('one');
               })
            }

            printLanguagesName();
         }

         // нажатие кнопки очистить
         if (target.closest('.clear-language') && target.closest('.languages')) {
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

            localStorage.removeItem('languages-value(new__resume__mobile)');

            printLanguagesName();
         }

         // нажатие кнопки сбросить всё
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.language__list')) {
            let filterLanguagesItem = document.querySelectorAll('.language__list .languages');
            filterLanguagesItem.forEach((item, index) => {
               if (index !== 0) {
                  item.remove();
               }
               if (index == 0) {
                  item.classList.add('one');
                  item.querySelector('.select-language .header .item').textContent = 'Выберите язык';
                  item.querySelector('.select-language .header .item').setAttribute('data-name', '');
                  item.querySelector('.select-language .header .item').setAttribute('data-value', '');
                  item.querySelector('.select-lavel').classList.add('dont-click');
                  item.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
                  item.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
                  item.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
               }
            })

            nameLanguages = [];
            languagesValue.textContent = 'Выберите языки и уровень';
            deleteCookie('languages__name(new__resume__mobile)');

            languagesNativeHeader.querySelector('.item').textContent = 'Выберите язык'
            deleteCookie('languages-native(new__resume__mobile)')

            allLanguage = [];
            localStorage.removeItem('languages-value(new__resume__mobile)');

            addLanguageBtn.style.display = 'block'
            addLanguageBtn.classList.add('dont-click');

            listLang.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock()
         }

         // нажатие кнопки применить
         if (target.closest('.apply') && target.closest('.list__bottom') && target.closest('.language__list')) {
            listLang.classList.remove('active');
            backgroundList.classList.remove('active');
            bg__unlock()
         }
      };
      clickLanguages();

      // функционал добавления образования
      function addEducation() {
         // нажатие на свитчер
         if (target === educationSwitcher) {
            if (educationSwitcher.checked) {
               educationAddList.classList.add('dont-click')
               educatinAddBtn.classList.add('dont-click')
               writeCookie('education__switcher(new__resume__mobile)', true, 30)
            } else {
               educationAddList.classList.remove('dont-click')
               educatinAddBtn.classList.remove('dont-click')
               deleteCookie('education__switcher(new__resume__mobile)')
            }
         }

         // открытие
         if (target === educatinAddBtn) {
            bg__lock()
            backgroundList.classList.add('active')
            educationList.classList.add('active')
         }

         // закрытие
         if (target === educationListClose || target === educationListClear) {
            bg__unlock()
            backgroundList.classList.remove('active')
            educationList.classList.remove('active')
            clearEducation()
         }

         // ввод значений в поля
         if (target.tagName === 'INPUT' && target.closest('.education__list')) {
            if (target.classList.contains('error')) {
               target.classList.remove('error')
               target.value = ''
            }

            target.addEventListener('input', () => {
               if (target.closest('.year__to')) {
                  inputNumber(educationYearTo)
               } else if (target.closest('.year__from')) {
                  inputNumber(educationYearFrom)
               }

               if (target.value.length !== 0) {
                  target.classList.add('not-empty')
               } else {
                  target.classList.remove('not-empty')
               }

               target.setAttribute('data-value', target.value)
            })
         }

         // нажате на поле для выбора уровня образования
         if (target === educationLavel && educationLavel.classList.contains('error')) {
            educationLavel.classList.remove('error')
         }

         // выбор уровня образования
         if (target.closest('.item') && target.closest('.education__lavel-modal')) {
            educationLavelItems.forEach(item => {
               item.classList.remove('active');
            })
            target.closest('.item').classList.add('active');

            educationLavel.textContent = target.closest('.item').getAttribute('data-value')
            educationLavel.setAttribute('data-value', target.closest('.item').getAttribute('data-value'))
            educationLavelModal.classList.remove('active');
            backgroundModal.classList.remove('active');
            enableScroll();
         }

         // нажатие кнопки сохранить
         if (target === educationListSave) {
            let validateName = false
            let validateLavel = false
            let validateSpecialisation = false
            let validateFaculty = false
            let validateYearFrom = false
            let validateYearTo = false

            if (educationName.value != '' && educationName.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
            } else {
               educationName.classList.add('error')
            }

            if (educationLavel.getAttribute('data-value') != null) {
               validateLavel = true
            } else {
               educationLavel.classList.add('error')
            }

            if (educationSpecialisation.value != '' && educationSpecialisation.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSpecialisation = true
            } else {
               educationSpecialisation.classList.add('error')
            }

            if (educationFaculty.value != '' && educationFaculty.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateFaculty = true
            } else {
               educationFaculty.classList.add('error')
            }

            if (educationYearFrom.value != '') {
               validateYearFrom = true
            } else {
               educationYearFrom.classList.add('error')
            }

            if (educationYearTo.value != '') {
               validateYearTo = true
            } else {
               educationYearTo.classList.add('error')
            }

            if (validateName && validateLavel && validateSpecialisation && validateFaculty && validateYearFrom && validateYearTo) {
               let period = `c ${educationYearFrom.value} до ${educationYearTo.value}`
               let item = `
                  <p class="item text-s15-h18-w400" data-lavel="${educationLavel.getAttribute('data-value')}" data-name="${educationName.value.trim()}" data-specialisation="${educationSpecialisation.value.trim()}" data-faculty="${educationFaculty.value.trim()}" data-from="${educationYearFrom.value}" data-to="${educationYearTo.value}">
                     ${educationLavel.getAttribute('data-value')}, ${educationName.value.trim()}, ${educationSpecialisation.value.trim()}, ${period}
                     <span class="remove-btn"></span>
                  </p>
               `
               educationArr.push(item);
               educationAddList.classList.remove('hide')
               educationAddList.insertAdjacentHTML('beforeend', item);
               writeCookie('education(new__resume__mobile)', JSON.stringify(educationArr), 30);

               educatinAddBtn.textContent = '+ Добавить еще одно учреждение';

               bg__unlock()
               backgroundList.classList.remove('active')
               educationList.classList.remove('active')
               clearEducation()
            }
            enableScroll();
         }

         // удаление элемента нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.education__add-list')) {
            target.closest('.item').remove();
            educationArr.forEach(elemArr => {
               if (elemArr.trim() === target.closest('.item').outerHTML.trim()) {
                  educationArr.splice((educationArr.indexOf(elemArr)), 1)
                  writeCookie('education(new__resume__mobile)', JSON.stringify(educationArr), 30)
                  if (educationArr.length == 0) {
                     deleteCookie('education(new__resume__mobile)')
                     educationAddList.classList.add('hide')
                     educatinAddBtn.textContent = '+ Добавить учреждение';
                  }
               }
            })
         }
      }
      addEducation();


      // функционал добавления образования
      function addAditionalEducation() {
         // открытие
         if (target === additionalEducationAddBtn) {
            bg__lock()
            backgroundList.classList.add('active')
            additionalEducationList.classList.add('active')
         }

         // закрытие
         if (target === additionalEducationClose || target === additionalEducationClear) {
            bg__unlock()
            backgroundList.classList.remove('active')
            additionalEducationList.classList.remove('active')
            clearAdditionalEducation()
         }

         // ввод значений в поля
         if (target.tagName === 'INPUT' && target.closest('.additional__education-list')) {
            if (target.classList.contains('error')) {
               target.classList.remove('error')
               target.value = ''
            }

            target.addEventListener('input', () => {
               if (target.closest('.year__from')) {
                  inputNumber(additionalEducationYearFrom)
               } else if (target.closest('.year__to')) {
                  inputNumber(additionalEducationYearTo)
               }

               if (target.value.length !== 0) {
                  target.classList.add('not-empty')
               } else {
                  target.classList.remove('not-empty')
               }

               target.setAttribute('data-value', target.value)
            })
         }

         // нажатие кнопки сохранить
         if (target === additionalEducationSave) {
            let validateName = false
            let validateSpecialisation = false
            let validateYearFrom = false
            let validateYearTo = false

            if (additionalEducationName.value != '' && additionalEducationName.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateName = true
            } else {
               additionalEducationName.classList.add('error')
            }

            if (additionalEducationSpecialisation.value != '' && additionalEducationSpecialisation.value.replace(/^ +| +$|( ) +/g, "$1").length !== 0) {
               validateSpecialisation = true
            } else {
               additionalEducationSpecialisation.classList.add('error')
            }

            if (additionalEducationYearFrom.value != '') {
               validateYearFrom = true
            } else {
               additionalEducationYearFrom.classList.add('error')
            }

            if (additionalEducationYearTo.value != '') {
               validateYearTo = true
            } else {
               additionalEducationYearTo.classList.add('error')
            }

            if (validateName && validateSpecialisation && validateYearFrom && validateYearTo) {
               let period = `c ${additionalEducationYearFrom.value} до ${additionalEducationYearTo.value}`
               let item = `
                  <p class="item text-s15-h18-w400" data-name="${additionalEducationName.value.trim()}" data-specialisation="${additionalEducationSpecialisation.value.trim()}" data-organization="${additionalEducationOrganization.value.trim()}" data-from="${additionalEducationYearFrom.value}" data-to="${additionalEducationYearTo.value}">
                        ${additionalEducationSpecialisation.value.trim()}, ${additionalEducationName.value.trim()}, ${period}
                     <span class="remove-btn"></span>
                  </p>
               `
               additionalEducationArr.push(item);
               additionalEducationAddList.classList.remove('hide')
               additionalEducationAddList.insertAdjacentHTML('beforeend', item);
               writeCookie('additional__education(new__resume__mobile)', JSON.stringify(additionalEducationArr), 30);

               additionalEducationAddBtn.textContent = '+ Добавить еще курс/тренинг';

               bg__unlock()
               backgroundList.classList.remove('active')
               additionalEducationList.classList.remove('active')
               clearAdditionalEducation()
            }
         }

         // удаление элемента нажатием на крестик
         if (target.closest('.remove-btn') && target.closest('.additional__education-add-list')) {
            target.closest('.item').remove();
            additionalEducationArr.forEach(elemArr => {
               if (elemArr.trim() === target.closest('.item').outerHTML.trim()) {
                  additionalEducationArr.splice((additionalEducationArr.indexOf(elemArr)), 1)
                  writeCookie('additional__education(new__resume__mobile)', JSON.stringify(additionalEducationArr), 30)
                  if (additionalEducationArr.length == 0) {
                     deleteCookie('additional__education(new__resume__mobile)')
                     additionalEducationAddList.classList.add('hide')
                     additionalEducationAddBtn.textContent = '+ Добавить курс/тренинг';
                  }
               }
            })
         }
      }
      addAditionalEducation()

      // нажатие на кнопки внизу блока
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.section__bottom') && target.closest('.step-3')) {
            clickBtnNext();
         }
         if (target.closest('.back-btn') && target.closest('.section__bottom') && target.closest('.step-3')) {
            clickBtnBack();
         }
      }
      clickBtn();
   })


   // получение данных при перезагрузке
   function loadSkillItem() {
      if (readCookie('skill-value(new__resume__mobile)') !== undefined) {
         skillsAddArray = JSON.parse(readCookie('skill-value(new__resume__mobile)'))

         skillsStandartItem.forEach(item => {
            skillsAddArray.forEach(elemArr => {
               if (item.textContent.toLowerCase() == elemArr) {
                  item.classList.add('active');
               }
            })
         })

         skillsAddArray.forEach(elemArr => {
            createNewSkillItem(elemArr);
         })

         skillsText.textContent = skillsAddArray.map(n => n.replace(/./, m => m.toUpperCase())).join('; ');
      }
   }
   function loadLanguagesNative() {
      if (readCookie('languages-native(new__resume__mobile)') !== undefined) {
         languagesNativeItems.forEach(item => {
            if (item.getAttribute('data-name') == readCookie('languages-native(new__resume__mobile)')) {
               languagesNativeHeader.querySelector('.item').textContent = item.textContent;
               languagesNativeHeader.querySelector('.item').setAttribute('data-name', item.getAttribute('data-name'));
               languagesNativeHeader.querySelector('.item').setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      }
   };
   function loadLanguages() {
      if (localStorage.getItem('languages-value(new__resume__mobile)') != undefined) {
         allLanguage = JSON.parse(decodeURIComponent(localStorage.getItem('languages-value(new__resume__mobile)')));
         if (allLanguage.length != 0) {
            let languageName = allLanguage[0][0].split(';')[0];
            let lavelName = allLanguage[0][0].split(';')[1];
            let languageNameArr = languageName.split(':');
            let lavelNameArr = lavelName.split(':');

            let languageItem = document.querySelector('.language__list .languages');
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


            let filterLanguagesItem = document.querySelectorAll('.language__list .languages');
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
            let countLanguages = document.querySelectorAll('.language__list .languages').length;
            let countLanguageValue = document.querySelector('.language__list .languages .select-language .list').querySelectorAll('.item').length;
            if (readCookie('languages-native(new__resume__mobile)') == undefined) {
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
            let lastItem = document.querySelectorAll('.language__list .languages')[document.querySelectorAll('.language__list .languages').length - 1]
            if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
               addLanguageBtn.classList.remove('dont-click');
            }
         }
      }
   };
   function loadLanguagesName() {
      printLanguagesName()
   };
   function loadEducationSwitcher() {
      if (readCookie('education__switcher(new__resume__mobile)') !== undefined) {
         educationSwitcher.checked = true
         educatinAddBtn.classList.add('dont-click')
         educationAddList.classList.add('dont-click')
      }
   }
   function loadEducation() {
      if (readCookie('education(new__resume__mobile)') !== undefined) {
         educationArr = JSON.parse(readCookie('education(new__resume__mobile)'))

         educationAddList.classList.remove('hide')

         educationArr.forEach(item => {
            educationAddList.insertAdjacentHTML('beforeend', item);
         })

         educatinAddBtn.textContent = '+ Добавить еще одно учреждение';
      }
   }
   function loadAdditionalEducation() {
      if (readCookie('additional__education(new__resume__mobile)') !== undefined) {
         additionalEducationArr = JSON.parse(readCookie('additional__education(new__resume__mobile)'))

         additionalEducationAddList.classList.remove('hide')

         additionalEducationArr.forEach(item => {
            additionalEducationAddList.insertAdjacentHTML('beforeend', item);
         })

         additionalEducationAddBtn.textContent = '+ Добавить еще курс/тренинг';
      }
   }

   window.addEventListener("load", function load() {
      loadSkillItem();
      loadLanguagesNative();
      loadLanguages();
      loadLanguagesName();
      loadEducationSwitcher();
      loadEducation();
      loadAdditionalEducation();
   }, false);
})