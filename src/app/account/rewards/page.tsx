
import Link from "next/link";
import { ChevronLeft, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/account" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Receive Gift</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-10 flex flex-col items-center">
              <Gift size={48} className="text-red-500 mb-4" />
              <p>Waiting for your action, purchase new plan and take gift.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
