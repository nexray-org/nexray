import { jsonfinder } from '../';
import { expect } from 'expect';
import { examples } from './testValues';

describe('Checking various json strings', () => {
  for (const example of examples()) {
    it(example[0], () => {
      let index = 0;
      for (const found of jsonfinder(example[1], true)) {
        if (Object.keys(found[2]).length > 0) {
          expect(example[2][index]).toStrictEqual(found[2]);
          index++;
        }
      }
    })
  }
});

