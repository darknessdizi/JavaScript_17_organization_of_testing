export default function checkValidateCard(number) {
  // Функция проверяет номер кредитной карты по алгоритму Луна
  const checksum = number.slice(-1);
  let total = 0;
  let statusMulti = true;
  for (let i = number.length - 2; i >= 0; i -= 1) {
    let sum = 0;
    let digit = (number.charAt(i));
    if (statusMulti) {
      digit *= 2;
    }

    statusMulti = statusMulti ? false : true;
    sum = Math.trunc(digit / 10) + digit % 10;
    total += sum;
  }
  const result = (10 - (total % 10)) % 10;
  return result == checksum;
}
