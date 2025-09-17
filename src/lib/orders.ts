import { doc, setDoc, getDocs, collection, query, where, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Order {
  id?: string;
  plan: any;
  quantity: number;
  status: "active" | "completed";
  createdAt: number;
  updatedAt: number;
}

export async function addOrder(userId: string, plan: any, quantity: number) {
  try {
    const orderRef = doc(collection(db, "orders"));
    const order: Order = {
      plan,
      quantity,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await setDoc(orderRef, { ...order, userId });
    return { success: true, message: "Order placed successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const orders: Order[] = [];
  querySnapshot.forEach((docSnap) => {
    orders.push({ id: docSnap.id, ...docSnap.data() } as Order);
  });
  return orders;
}

export async function completeOrder(orderId: string) {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status: "completed",
    updatedAt: Date.now(),
  });
}

export async function getBalance(userId: string): Promise<number> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.balance || 0;
    }
    return 0;
  } catch (error) {
    console.error("Error getting balance:", error);
    return 0;
  }
}
