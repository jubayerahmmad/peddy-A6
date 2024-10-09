const pets = [
  { petId: 1, name: "Lily", category: "dog", price: "1600" },
  { petId: 2, name: "Bily", category: "cat", price: "1700" },
  { petId: 3, name: "Aily", category: "dog", price: "1100" },
  { petId: 4, name: "Tily", category: "dog", price: "1000" },
  { petId: 5, name: "Sily", category: "cat", price: "1500" },
  { petId: 6, name: "Dily", category: "cat", price: "1650" },
  { petId: 7, name: "Tily", category: "dog", price: "1120" },
  { petId: 8, name: "Rily", category: "dog", price: null },
  { petId: 9, name: "Wily", category: "cat", price: "1350" },
  { petId: 10, name: "Wily", category: "cat", price: "1645" },
];

const sorted = [...pets].sort((a, b) => {
  if (a.price == null) return;
  if (b.price == null) return;
  return a.price - b.price;
});
console.log(sorted);

// const numbers = [19, 20, 4, 26, 12, 42, 35, 21, 14, null];
// const filterNull = numbers.filter((number) => number == null);
// const filter = numbers.filter((number) => number !== null);

// const sort = [...filter].sort((a, b) => {
//   return a - b;
// });

// const sorted = sort.concat(filterNull);

// console.log(sorted);
