import { clickBtnBack, clickBtnNext } from './script__click-btn.js';
import { writeCookie, readCookie, deleteCookie } from './script__work-cookie.js';

document.addEventListener("DOMContentLoaded", () => {
   let step6 = document.querySelector('.step__inner .step-6'),
      loadImageInput = step6.querySelector('.load__image-input'),
      errorMessage = step6.querySelector('.error-message');

   let contactAdd = step6.querySelector('.contact .contact__add'),
      contactList = step6.querySelector('.contact .contact__items .inner'),
      contactArr = [];


   // поле для загрузки картинок
   function loadFiles() {
      let fileInput = document.querySelector('#file-input');
      let arrFile = [];
      let arrResult = [];
      let previewList = document.querySelector('.step-6 .load__image-preview');
      let previewListItems;

      function addFiles(files) {
         if (!(errorMessage.classList.contains('hide'))) {
            errorMessage.classList.add('hide');
         }
         for (let i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files[i], 'UTF-8');
            if (((files[i].size / 1024) / 1024) < 10) {
               reader.onload = function (event) {
                  var result = event.target.result;
                  if (arrFile.indexOf(result) == -1) {
                     arrResult.push(files);
                     arrFile.push(result);
                     createPreview(result);
                  }
               }
            } else {
               if (files.length > 1) {
                  errorMessage.classList.remove('hide');
                  errorMessage.textContent = 'Некоторые из загружаемых файлов превышают допустимый размер'
               } else {
                  errorMessage.classList.remove('hide');
                  errorMessage.textContent = 'Загружаемый файл превышает допустимый размер'
               }
            }
         }
         loadImageInput.value = '';
      }

      function createPreview(result) {
         setTimeout(() => {
            let previewItem =
               `<div class="preview__item" data-value="">
                  <div class="inner">
                     <img src="${result}" alt="image">
                     <p class="preview__item-del"></p>
                  </div>
               </div>`;

            previewList.insertAdjacentHTML('beforeend', previewItem);
            previewList.classList.remove('hide')

            previewListItems = document.querySelectorAll('.step-6 .load__image-preview .preview__item');
            previewListItems.forEach((item, index) => {
               item.setAttribute('data-value', index);
            })
         }, 10)
      }

      fileInput.onchange = function (e) {
         let files = this.files;
         addFiles(files);
      }

      function dragAccept(e) {
         stop(e);
         addFiles(e.dataTransfer.files);
         document.querySelector('.load__image').classList.remove('dragover');
      }

      function init() {
         var dd = document.getElementById("dragdrop");
         dd.ondragover = stop;
         dd.ondragleave = stop;
         if ('FileReader' in window) {
            document.ondrop = dragAccept;
         }
      }

      function stop(e) {
         e.stopPropagation();
         e.preventDefault();
         document.querySelector('.load__image').classList.add('dragover');
      }

      // удаление загруженного файла
      function deleteFile() {
         let loadImagePreview = document.querySelector('.step-6 .load__image-preview');
         loadImagePreview.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('preview__item-del')) {
               target.closest('.preview__item').remove();

               let itemIndex = target.closest('.preview__item').getAttribute('data-value');

               arrFile.forEach((elemArr, index) => {
                  if (index == itemIndex) {
                     arrFile.splice(index, 1);
                  }
               })

               setTimeout(() => {
                  let previewListItems = document.querySelectorAll('.step-6 .load__image-preview .preview__item');
                  previewListItems.forEach((item, index) => {
                     item.setAttribute('data-value', index);
                  })
               }, 10)
            }
         })
      }
      deleteFile();

      window.addEventListener("load", init);
   }
   loadFiles();

   document.addEventListener('click', (event) => {
      let target = event.target;

      // выбор уже загруженных картинок
      if (target.tagName == 'INPUT' && target.closest('.select-already-downloaded__items')) {
         if (target.closest('.item').querySelector('input').checked) {
            target.closest('.item').classList.add('active');
         } else {
            target.closest('.item').classList.remove('active');
         }
      }

      // заполнение полей контактов рекомендателей
      function clickContact() {
         // ввод данных в поля для контактов
         if (target.tagName == 'INPUT' && target.closest('.contact__items')) {
            let allInput = step6.querySelectorAll('.contact .contact__items .inner input');

            if (target.closest('.contact__telephone')) {
               let inputDateOption = {
                  mask: '+{7}(000)000-00-00',
               }
               IMask(target, inputDateOption)
            }

            target.addEventListener('input', () => {
               if (target.value.length > 0) {
                  target.classList.add('not-empty')

                  allInput.forEach(input => {
                     if (input.classList.contains('not-empty')) {
                        contactAdd.classList.remove('dont-click');
                     } else {
                        contactAdd.classList.add('dont-click');
                     }
                  })
               } else {
                  target.classList.remove('not-empty')

                  allInput.forEach(input => {
                     if (input.classList.contains('not-empty')) {
                        contactAdd.classList.remove('dont-click');
                     } else {
                        contactAdd.classList.add('dont-click');
                     }
                  })
               }
            })
         }

         // нажатие кнопки добавить
         if (target == contactAdd) {
            // убрать класс one для того что бы показать кнопку удалить
            let contactItem = step6.querySelector('.contact__items .inner .item');
            contactItem.classList.remove('one');

            // создать дубликат первого элемента, задать ему клас и очистить поля
            let cloneItem = contactItem.cloneNode(true);
            cloneItem.className = "item";
            cloneItem.querySelectorAll('input').forEach(input => {
               input.value = '';
               input.classList.remove('not-empty');
            })
            contactList.append(cloneItem);

            // добавить всем элементам порядковый номер
            let contactItemAll = step6.querySelectorAll('.contact__items .inner .item');
            for (let i = 0; i < contactItemAll.length; i++) {
               contactItemAll[i].setAttribute('data-order', [i]);
            }

            contactItemAll.forEach(item => {
               if (item.querySelector('.contact__full-name').value.length != 0 &&
                  item.querySelector('.contact__name-company').value.length != 0 &&
                  item.querySelector('.contact__telephone').value.length != 0) {
                  contactArr[item.getAttribute('data-order')] = {
                     fullName: item.querySelector('.contact__full-name').value,
                     company: item.querySelector('.contact__name-company').value,
                     phone: item.querySelector('.contact__telephone').value
                  }

                  writeCookie('contact(new__resume__mobile)', JSON.stringify(contactArr), 30);
               }
            })

            // плавный скрол при нажатии на добавить еще язык
            window.scrollBy({
               top: 250,
               behavior: 'smooth'
            });

            if (contactArr.length == 4) {
               contactAdd.classList.add('hide');
            } else {
               contactAdd.classList.add('dont-click');
            }
         }

         // нажатие кнопки удалить
         if (target.closest('.contact__remove')) {
            let contactItems = step6.querySelectorAll('.contact__items .inner .item')
            if (contactItems.length != 1) {
               // удалять данные из массива со значениями
               contactArr.forEach((elemArr, index) => {
                  if (index == target.closest('.item').getAttribute('data-order')) {
                     contactArr.splice((contactArr.indexOf(elemArr)), 1);
                  }
               })

               target.closest('.item').remove();
               writeCookie('contact(new__resume__mobile)', JSON.stringify(contactArr), 30);
            }
            if (contactItems.length == 2) {
               let contactItem = step6.querySelector('.contact__items .inner .item');
               contactItem.classList.add('one');
            }
            // добавить всем элементам порядковый номер
            let contactItemAll = step6.querySelectorAll('.contact__items .inner .item');
            for (let i = 0; i < contactItemAll.length; i++) {
               contactItemAll[i].setAttribute('data-order', [i]);
            }

            if (contactArr.length < 4) {
               contactAdd.classList.remove('hide');
               contactAdd.classList.remove('dont-click');
            }
         }

         // нажатие кнопки сбросить
         if (target.closest('.contact__clear')) {
            let contactItem = step6.querySelector('.contact__items .inner .item');
            contactItem.querySelectorAll('input').forEach(input => {
               input.value = '';
               input.classList.remove('not-empty');
            })

            contactAdd.classList.add('dont-click');
            contactArr = [];
            deleteCookie('contact(new__resume__mobile)');
         }
      }
      clickContact();

      // нажатие на кнопки поле ввода данных
      function clickBtn() {
         if (target.closest('.next-btn') && target.closest('.step-6')) {
            // записывать значения контактов рекомендателей
            let contactItemAll = step6.querySelectorAll('.contact__items .inner .item');
            contactItemAll.forEach(item => {
               if (item.querySelector('.contact__full-name').value.length != 0 &&
                  item.querySelector('.contact__name-company').value.length != 0 &&
                  item.querySelector('.contact__telephone').value.length != 0) {
                  contactArr[item.getAttribute('data-order')] = {
                     fullName: item.querySelector('.contact__full-name').value,
                     company: item.querySelector('.contact__name-company').value,
                     phone: item.querySelector('.contact__telephone').value
                  }

                  writeCookie('contact(new__resume__mobile)', JSON.stringify(contactArr), 30);
               }
            })

            clickBtnNext();
         }

         if (target.closest('.back-btn') && target.closest('.step-6')) {
            clickBtnBack();
         }
      }
      clickBtn();
   });


   function loadContact() {
      if (readCookie('contact(new__resume__mobile)') !== undefined) {
         contactArr = JSON.parse(readCookie('contact(new__resume__mobile)'))
         if (contactArr[0].fullName != undefined) {
            let contactItem = step6.querySelector('.contact__items .inner .item');

            contactArr.forEach(elemArr => {
               // создать дубликат первого элемента, задать ему клас и очистить поля
               let cloneItem = contactItem.cloneNode(true);
               cloneItem.className = "item";
               if (contactArr.length > 1) {
                  cloneItem.className = "item";
               } else {
                  cloneItem.className = "item one";
               }
               cloneItem.querySelector('.contact__full-name').value = elemArr.fullName;
               cloneItem.querySelector('.contact__full-name').classList.add('not-empty');
               cloneItem.querySelector('.contact__name-company').value = elemArr.company;
               cloneItem.querySelector('.contact__name-company').classList.add('not-empty');
               cloneItem.querySelector('.contact__telephone').value = elemArr.phone;
               cloneItem.querySelector('.contact__telephone').classList.add('not-empty');
               contactList.append(cloneItem);
               // contactItem.remove();
            })
            contactItem.remove();
            contactAdd.classList.remove('dont-click');

            // добавить всем элементам порядковый номер
            let contactItemAll = step6.querySelectorAll('.contact__items .inner .item');
            for (let i = 0; i < contactItemAll.length; i++) {
               contactItemAll[i].setAttribute('data-order', [i]);
            }
         }
      }
   }
   window.addEventListener('load', function load() {
      loadContact();
   }, false);
})