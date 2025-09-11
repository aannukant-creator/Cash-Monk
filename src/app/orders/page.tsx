
'use client';

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getOrders, type Order } from "@/lib/orders";
import Image from "next/image";

const OrderList = ({ orders }: { orders: Order[] }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>No orders in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      {orders.map((order) => (
        <Card key={order.id} className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Image
                src={order.plan.imageUrl}
                alt={order.plan.name}
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div className="flex-grow">
                <h4 className="font-bold">{order.plan.name}</h4>
                <p className="text-sm text-gray-500">
                  Purchased: {new Date(order.purchaseDate).toLocaleDateString()}
                </p>
                <p className={`text-sm font-semibold ${order.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                  Status: {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{order.totalInvestment}</p>
                <p className="text-sm text-gray-500">x{order.quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders from localStorage on the client side
    setOrders(getOrders());
  }, []);

  const activeOrders = orders.filter((o) => o.status === 'active');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">My Orders</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {orders.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">
                    <p>No orders yet.</p>
                    <p className="text-sm">When you invest in a plan, your order will appear here.</p>
                  </div>
                ) : <OrderList orders={orders} />}
              </TabsContent>
              <TabsContent value="active">
                <OrderList orders={activeOrders} />
              </TabsContent>
              <TabsContent value="completed">
                <OrderList orders={completedOrders} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
