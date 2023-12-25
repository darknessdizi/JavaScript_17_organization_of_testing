export default function indetifyCard(value, array) {
  // Идентифицирует карту по учреждению и длине номера ()
  if (value.length >= 6) {
    const number = value.slice(0, 6);
    for (let item of array) {
      const diapazon = parseDiapazon(number, item.diapazon);
      const lengthNumber = parseLength(value, item.lengthNumber);
      if ((diapazon) && (lengthNumber)) {
        return item.title;
      }
    }
  }
  return false;
}

function parseDiapazon(number, string) {
  // Парсит диапазон начала карты и сравнивает его с началом номера карты 
  const text = string.replaceAll(' ', '');
  const array = text.split(',');
  for (let item of array) {
    if (!isNaN(Number(item))) {
      if (number.startsWith(item)) {
        return true;
      }
    } else {
        const diapazon = item.split('-');
        const minNumber = Number(diapazon[0]);
        const maxNumber = Number(diapazon[1]);
        if ((!isNaN(minNumber)) && (!isNaN(maxNumber))) {
          const index = diapazon[1].length;
          let num = number.slice(0, index);
          num = Number(num);
          if ((num >= minNumber) && (num <= maxNumber)){
            return true;
          }
        }
    }
  }
  return false;
}

function parseLength(value, string) {
  // Парсит длину карты из строки и сравнивает его с текущей длиной карты 
  const number = Number(string);
  if (!isNaN(number)) {
    if (value.length === number) {
      return true;
    }
  } else {
    if (string.includes('-')) {
      const diapazon = string.split('-');
      const minNumber = Number(diapazon[0]);
      const maxNumber = Number(diapazon[1]);
      if ((value.length >= minNumber) && (value.length <= maxNumber)) {
        return true;
      }
    }
    if (string.includes(',')) {
      const arrayLength = string.split(',');
      for (const num of arrayLength) {
        if (value.length === Number(num)) {
          return true;
        }
      }
    }
  }
  return false;
}
