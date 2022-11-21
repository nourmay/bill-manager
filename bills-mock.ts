import { of } from 'rxjs';

export const firstInput = of([
  {
    price: 12.49,
    label: 'livres',
    isImported: false,
    appliedTax: 10,
    quantity: 2,
    finalPrice: '0',
  },
  {
    price: 14.99,
    label: 'CD musical',
    isImported: false,
    appliedTax: 20,
    quantity: 1,
    finalPrice: '0',
  },
  {
    price: 0.85,
    label: 'Barre de chocolat',
    isImported: false,
    appliedTax: 20,
    quantity: 3,
    finalPrice: '0',
  },
]);
export const secondInput = of([
  {
    price: 10,
    label: 'boîtes de chocolats importée',
    isImported: true,
    appliedTax: 25,
    quantity: 2,
    finalPrice: '0',
  },
  {
    price: 47.5,
    label: 'flacons de parfum importé',
    isImported: true,
    appliedTax: 25,
    quantity: 3,
    finalPrice: '0',
  },
]);
export const thirdInput = of([
  {
    price: 27.99,
    label: 'flacons de parfum importé',
    isImported: true,
    appliedTax: 25,
    quantity: 2,
    finalPrice: '0',
  },
  {
    price: 18.99,
    label: 'flacon de parfum ',
    isImported: false,
    appliedTax: 20,
    quantity: 1,
    finalPrice: '0',
  },
  {
    price: 9.75,
    label: 'boîtes de pilules contre la migraine',
    isImported: false,
    appliedTax: 0,
    quantity: 3,
    finalPrice: '0',
  },
  {
    price: 11.25,
    label: 'boîtes de chocolats importés',
    isImported: true,
    appliedTax: 25,
    quantity: 2,
    finalPrice: '0',
  },
]);
