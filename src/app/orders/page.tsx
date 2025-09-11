
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrdersPage() {
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
          <CardHeader>
            <CardTitle>Your Investment Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="text-center text-gray-500 py-10">
                  <p>No orders yet.</p>
                  <p className="text-sm">When you invest in a plan, your order will appear here.</p>
                </div>
              </TabsContent>
              <TabsContent value="active">
                <div className="text-center text-gray-500 py-10">
                  <p>No active orders.</p>
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="text-center text-gray-500 py-10">
                  <p>No completed orders.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
