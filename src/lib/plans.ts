
export type Plan = {
  id: string;
  name: string;
  category: 'manufacturer' | 'retailer' | 'distributor';
  vipLevel: number;
  price: number;
  days: number;
  dailyIncome: number;
  totalGain: number;
  maxInvestment: number;
  imageUrl: string;
};

export const plans: Plan[] = [
  {
    id: 'plan-1-1',
    name: 'PLAN-1.1',
    category: 'manufacturer',
    vipLevel: 0,
    price: 500,
    days: 3,
    dailyIncome: 300,
    totalGain: 900,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/crunchy-nut/200/200',
  },
  {
    id: 'plan-1',
    name: 'PLAN-1',
    category: 'manufacturer',
    vipLevel: 0,
    price: 100,
    days: 2,
    dailyIncome: 100,
    totalGain: 200,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/coco-pops/200/200',
  },
  {
    id: 'plan-2',
    name: 'PLAN-2',
    category: 'manufacturer',
    vipLevel: 0,
    price: 799,
    days: 38,
    dailyIncome: 260,
    totalGain: 9880,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/vector/200/200',
  },
  {
    id: 'plan-3',
    name: 'PLAN-3',
    category: 'manufacturer',
    vipLevel: 0,
    price: 2150,
    days: 38,
    dailyIncome: 670,
    totalGain: 25460,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/all-bran/200/200',
  },
  {
    id: 'plan-4',
    name: 'PLAN-4',
    category: 'manufacturer',
    vipLevel: 0,
    price: 4500,
    days: 38,
    dailyIncome: 1450,
    totalGain: 55100,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/corn-flakes/200/200',
  },
  {
    id: 'retail-1',
    name: 'RETAIL-1',
    category: 'retailer',
    vipLevel: 1,
    price: 200,
    days: 4,
    dailyIncome: 100,
    totalGain: 400,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/apple-jacks/200/200',
  },
  {
    id: 'retail-2',
    name: 'RETAIL-2',
    category: 'retailer',
    vipLevel: 2,
    price: 500,
    days: 5,
    dailyIncome: 200,
    totalGain: 1000,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/frosted-flakes/200/200',
  },
  {
    id: 'retail-3',
    name: 'RETAIL-3',
    category: 'retailer',
    vipLevel: 3,
    price: 1200,
    days: 5,
    dailyIncome: 500,
    totalGain: 2500,
    maxInvestment: 1,
    imageUrl: 'https://picsum.photos/seed/krave/200/200',
  },
];
