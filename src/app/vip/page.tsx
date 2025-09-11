
import Link from 'next/link';
import { ChevronLeft, Gem } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VipPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/account" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">VIP Levels</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gem className="text-red-500" />
              <span>Your VIP Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg">You are currently at <span className="font-bold text-red-600">VIP 0</span>.</p>
              <p className="mt-2">Invest more to unlock higher VIP levels and exclusive rewards!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
