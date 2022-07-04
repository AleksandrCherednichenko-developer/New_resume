export function inputNumber(input) {
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
      input.setAttribute('data-number', inputDataArrClear.join(''))
   }
}