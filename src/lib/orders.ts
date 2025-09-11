
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
    const ordersJson = localStorage.getItem('user-orders-v2');
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
        localStorage.setItem('user-orders-v2', JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to save orders to localStorage", error);
    }
};

export const getOrders = (): Order[] => {
    const orders = getOrdersFromStorage();
    // Re-check and save statuses every time we get orders
    const updatedOrders = orders.map(order => {
        if (order.status === 'active' && new Date(order.completionDate) <= new Date()) {
          return { ...order, status: 'completed' };
        }
        return order;
      });
    saveOrdersToStorage(updatedOrders);
    return updatedOrders;
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
  
  return { success: true, message: 'Investment successful!' };
};

// Functions for handling user balance
export const getBalance = (): number => {
    const orders = getOrders();
    const completedOrders = orders.filter(o => o.status === 'completed');
    
    // Calculate total gains from the principal of completed orders
    const principalFromCompleted = completedOrders.reduce((acc, order) => acc + order.totalInvestment, 0);
    const gainsFromCompleted = completedOrders.reduce((acc, order) => acc + order.expectedGain, 0);
    
    const recharges = getRechargeTotal();
    
    // Total spent on all investments (active and completed)
    const totalInvestments = orders.reduce((acc, order) => acc + order.totalInvestment, 0);

    // Balance is recharges + total gains from completed orders - total investments made.
    // The principal is effectively returned on completion with the gain.
    return recharges + principalFromCompleted + gainsFromCompleted - totalInvestments;
}

export const addRecharge = (amount: number) => {
    if (typeof window === 'undefined') return;
    const recharges = JSON.parse(localStorage.getItem('user-recharges-v2') || '[]') as number[];
    recharges.push(amount);
    localStorage.setItem('user-recharges-v2', JSON.stringify(recharges));
}

export const getRechargeTotal = (): number => {
    if (typeof window === 'undefined') return 0;
    const recharges = JSON.parse(localStorage.getItem('user-recharges-v2') || '[]') as number[];
    return recharges.reduce((acc, amount) => acc + amount, 0);
}
