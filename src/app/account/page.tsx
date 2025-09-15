'use client';

import Link from 'next/link';
import { Home, ListTodo, FileText, User, Headphones, ChevronRight, Download, Gift, History, Landmark, Wallet, Gem, Shield, LogOut } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getBalance } from '@/lib/orders';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [balance, setBalance] = useState(0);
  const [userMobile, setUserMobile] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const mobile = localStorage.getItem('userMobile') || '0000000000';
        const id = localStorage.getItem('userId') || '00000';
        setUserMobile(mobile);
        setUserId(id);
        setBalance(getBalance());
    }
  }, []);

  const formatMobile = (mobile: string) => {
    if (mobile.length > 6) {
        return `${mobile.substring(0,3)}***${mobile.substring(mobile.length - 3)}`;
    }
    return mobile;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userMobile');
      localStorage.removeItem('userId');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={40} className="text-gray-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg">{userMobile}</h1>
            <p className="text-sm">{formatMobile(userMobile)} ID: {userId}</p>
          </div>
        </div>
        <div className="mt-4 bg-white/20 p-3 rounded-lg">
            <div className='flex justify-between items-center'>
                <div className="flex items-center space-x-2">
                    <Gem size={20} className="text-yellow-300" />
                    <span className="font-bold">VIP LEVEL</span>
                    <span className="bg-gray-500 text-white px-2 py-0.5 rounded text-xs">VIP 0</span>
                </div>
                <div className='bg-white/30 rounded-full p-1'>
                    <Shield size={24} className="text-green-300" />
                </div>
            </div>
          <Progress value={0} className="mt-2 h-2" />
          <p className="text-xs mt-1">Current progress 0/500</p>
        </div>
      </div>

      <main className="p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500">Account Balance</p>
            <p className="font-bold text-2xl">₹{balance.toFixed(2)}</p>
          </div>
          <Link href="/recharge">
            <Button className="bg-red-600 hover:bg-red-700">Recharge &gt;</Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <Link href="/withdraw" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <Wallet className="text-red-500 mb-2" size={28}/>
            <span className="font-semibold">Withdrawal</span>
            <span className="text-xs text-gray-500">₹{balance.toFixed(2)}</span>
          </Link>
          <Link href="/vip" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <Gem className="text-red-500 mb-2" size={28}/>
            <span className="font-semibold">VIP</span>
          </Link>
          <Link href="/add-card" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <Landmark className="text-red-500 mb-2" size={28}/>
            <span className="font-semibold">Bank Card</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
            <h3 className="font-bold p-4 border-b">Fund entry</h3>
            <div className="divide-y">
                <Link href="/account/withdraw-record" className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <Wallet size={20} className="text-red-500" />
                        <span>Withdraw Record</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <Link href="/account/recharge-record" className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <History size={20} className="text-red-500" />
                        <span>Recharge Record</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <Link href="/account/rewards" className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <Gift size={20} className="text-red-500" />
                        <span>Reward Records</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </Link>
                 <Link href="/app-download" className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <Download size={20} className="text-red-500" />
                        <span>APP download</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                        <LogOut size={20} className="text-red-500" />
                        <span>Logout</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
            </div>
        </div>

      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center text-gray-600 py-2">
        <Link href="/home" className="flex flex-col items-center">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center">
          <ListTodo />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link href="/support" className="flex flex-col items-center text-xs">
          <Headphones className="mb-1 h-5 w-5" />
          <span>Support</span>
        </Link>
        <Link href="/blog" className="flex flex-col items-center">
          <FileText />
          <span className="text-xs">Blog</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center text-red-600">
          <User />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </div>
  );
}
