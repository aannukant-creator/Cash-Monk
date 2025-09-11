
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WithdrawRecordPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/account" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Withdraw Record</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-10">
              <p>No withdrawal records found.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
