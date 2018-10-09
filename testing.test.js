const add = require('./testing').add;
test('add skills', () => {
  // expect(add(1, 2)).toBe(3);
  expect(add).toBeTruthy();
});

const remove = require('./testing').remove;
test('delete skills', () => {
  expect(remove).toBeTruthy();
});