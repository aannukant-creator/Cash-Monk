
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AppDownloadPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/account" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Download App</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Get the Cesh Monk App</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Download size={64} className="text-red-500 mb-6" />
            <p className="mb-6 text-gray-600">
              Download our official application for a better and faster experience.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg text-lg">
              Download for Android (.apk)
            </Button>
            <p className="text-xs text-gray-400 mt-4">iOS app coming soon!</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
