import indetifyCard from "../identifyCard";
import data from '../cards.json';

const arrayCards = [
  [
    'VISA',
    [
      '4916569301993530',
      '4485139364138315',
      '4121205825083034',
      '4128416358857206',
      '4024007175232106',
      '5343514400503236',
    ]
  
  ],
  // [
  //   {
  //     'Mastercard': [
  //       '5343514400503236',
  //       '5250593230592339',
  //       '5457857808330195',
  //       '5469351877462705',
  //       '5320357019198288',
  //     ]
  //   }
  // ],
  // [
  //   {
  //     'Discover': [
  //       '6011542509427824',
  //       '6011972909118899',
  //       '6011642568164308',
  //       '6011739259793880',
  //       '6011667567609615',
  //     ]
  //   }
  // ],
  // [
  //   {
  //     'American-express': [
  //       '374477613641560',
  //       '347014270757456',
  //       '349886264694383',
  //       '347296718906163',
  //       '342252840505824',
  //     ]
  //   }
  // ],
]

const testClass = test.each(arrayCards);

testClass('Проверка функции identifyCard (успешная идентификация)', (title, obj) => {
  for (const item of obj) {
    console.log(item);
    const result = indetifyCard(item, data.creditCards);
    expect(result).toBe(title);
  }
});


