
'use client';

import type { Plan } from './plans';

export type OrderStatus = 'active' | 'completed';

export type Order = {
  id: string;
  plan: Plan;
  quantity: number;
  purchaseDate: string; // ISO string
  completionDate: string; // ISO string
  status: OrderStatus;
  totalInvestment: number;
  expectedGain: number;
};

// Functions for handling user balance
const getBalanceFromStorage = (): number => {
    if (typeof window === 'undefined') return 0;
    const balance = localStorage.getItem('user-balance');
    return balance ? parseFloat(balance) : 0;
}

const saveBalanceToStorage = (balance: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user-balance', balance.toString());
}

export const getBalance = (): number => {
    const orders = getOrders();
    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalGains = completedOrders.reduce((acc, order) => acc + order.expectedGain, 0);
    const recharges = getRechargeTotal();
    const investments = orders.reduce((acc, order) => acc + order.totalInvestment, 0);
    return recharges + totalGains - investments;
}

export const addRecharge = (amount: number) => {
    if (typeof window === 'undefined') return;
    const recharges = JSON.parse(localStorage.getItem('user-recharges') || '[]') as number[];
    recharges.push(amount);
    localStorage.setItem('user-recharges', JSON.stringify(recharges));
}

export const getRechargeTotal = (): number => {
    if (typeof window === 'undefined') return 0;
    const recharges = JSON.parse(localStorage.getItem('user-recharges') || '[]') as number[];
    return recharges.reduce((acc, amount) => acc + amount, 0);
}


// We will use localStorage to persist orders on the client side.
const getOrdersFromStorage = (): Order[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const ordersJson = localStorage.getItem('user-orders');
    if (ordersJson) {
      const orders = JSON.parse(ordersJson) as Order[];
      // Check status based on completion date
      const now = new Date();
      return orders.map(order => {
        if (order.status === 'active' && new Date(order.completionDate) <= now) {
          return { ...order, status: 'completed' };
        }
        return order;
      });
    }
    return [];
  } catch (error) {
    console.error("Failed to parse orders from localStorage", error);
    return [];
  }
};

const saveOrdersToStorage = (orders: Order[]) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.setItem('user-orders', JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to save orders to localStorage", error);
    }
};

export const getOrders = (): Order[] => {
    const orders = getOrdersFromStorage();
    // Re-check and save statuses every time we get orders
    saveOrdersToStorage(orders);
    return orders;
};

export const addOrder = (plan: Plan, quantity: number): { success: boolean, message: string } => {
  const currentBalance = getBalance();
  const investmentCost = plan.price * quantity;

  if (currentBalance < investmentCost) {
    return { success: false, message: 'Insufficient balance to make this investment.' };
  }

  const orders = getOrdersFromStorage();
  const now = new Date();
  const completionDate = new Date(now);
  completionDate.setDate(now.getDate() + plan.days);

  const newOrder: Order = {
    id: `order-${Date.now()}-${Math.random()}`,
    plan,
    quantity,
    purchaseDate: now.toISOString(),
    completionDate: completionDate.toISOString(),
    status: 'active',
    totalInvestment: investmentCost,
    expectedGain: plan.totalGain * quantity,
  };

  const newOrders = [...orders, newOrder];
  saveOrdersToStorage(newOrders);
  
  // No direct balance saving, it's calculated dynamically
  // const newBalance = currentBalance - investmentCost;
  // saveBalanceToStorage(newBalance);

  return { success: true, message: 'Investment successful!' };
};
