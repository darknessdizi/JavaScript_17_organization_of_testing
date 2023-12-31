import checkValidateCard from '../checkValidateCard';

const arrayCards = [
  '4916569301993530',
  '4485139364138315',
  '4121205825083034',
  '4128416358857206',
  '4024007175232106',
  '5343514400503236',
  '5250593230592339',
  '5457857808330195',
  '5469351877462705',
  '5320357019198288',
  '6011542509427824',
  '6011972909118899',
  '6011642568164308',
  '6011739259793880',
  '6011667567609615',
  '6221261111111111113',
  '374477613641560',
  '347014270757456',
  '349886264694383',
  '347296718906163',
  '342252840505824',
  '2201111111111116',
];

const testClass = test.each(arrayCards);

testClass('Проверка валидности карты %s', (number) => {
  const result = checkValidateCard(number);
  expect(result).toBe(true);
});

test('Проверка невалидности карты', () => {
  const result = checkValidateCard('111111111111111');
  expect(result).toBe(false);
});
