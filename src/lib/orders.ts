
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

export const addOrder = (plan: Plan, quantity: number) => {
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
    totalInvestment: plan.price * quantity,
    expectedGain: plan.totalGain * quantity,
  };

  const newOrders = [...orders, newOrder];
  saveOrdersToStorage(newOrders);
};
