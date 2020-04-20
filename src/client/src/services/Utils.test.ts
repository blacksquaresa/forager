import { slug } from './Utils';

describe('Utils', () => {
  describe('slug', () => {
    it.each([
      ['a normal string with spaces', 'anormalstringwithspaces'],
      ['A String With UpperCase Words', 'astringwithuppercasewords'],
      ['A #string @with ^chars', 'astringwithchars']
    ])('converts a string into a slug', (str, expected) => {
      expect(slug(str)).toBe(expected);
    });
  });
});
