
"use client";

import { Home, ListTodo, FileText, User, Wallet, Landmark, Users, ClipboardList, Send, Headphones, Headset, CircleHelp, Gem } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plans } from "@/lib/plans";

export default function Page() {
  const manufacturerPlans = plans.filter(p => p.category === 'manufacturer');
  const retailerPlans = plans.filter(p => p.category === 'retailer');

  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-20">
      <div className="bg-red-600 text-white">
        <div className="p-4 flex items-center space-x-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
             <Gem className="w-10 h-10 text-red-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Cesh Monk</h1>
            <p className="text-sm">0000000000 ID: 00000</p>
          </div>
        </div>

        <div className="flex justify-around p-4">
          <div className="text-center">
            <p className="text-sm">Your Balance</p>
            <p className="font-bold text-xl">₹ 0.00</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Product Income</p>
            <div className="flex items-center space-x-2">
                <p className="font-bold text-xl">₹ 0.00</p>
                <div className="flex space-x-1">
                    <CircleHelp size={20} className="text-white"/>
                    <div className="relative">
                        <Headset size={20} className="text-white"/>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center py-3 px-1 text-xs">
          <Link href="/recharge" className="flex flex-col items-center">
            <Wallet className="mb-1" />
            <span>Recharge</span>
          </Link>
          <Link href="/withdraw" className="flex flex-col items-center">
            <Landmark className="mb-1" />
            <span>Withdraw</span>
          </Link>
          <Link href="/team" className="flex flex-col items-center">
            <Users className="mb-1" />
            <span>Team</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center">
            <ClipboardList className="mb-1" />
            <span>Orders</span>
          </Link>
          <Link href="/telegram" className="flex flex-col items-center">
            <Send className="mb-1" />
            <span>Telegram</span>
          </Link>
        </div>
      </div>

      <div className="m-4">
        <Tabs defaultValue="manufacturer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
            <TabsTrigger value="retailer">Retailer</TabsTrigger>
            <TabsTrigger value="distributor">Distributor</TabsTrigger>
          </TabsList>
          <TabsContent value="manufacturer">
            <div className="p-4 bg-red-600 text-white text-sm rounded-b-lg -m-2 mt-0 rounded-t-none">
              <h3 className="font-bold mb-1">Daily Earnings Introductory</h3>
              <p>Investing in the first cycle product of each group qualifies you to invest in the second benefit product.</p>
            </div>
            <div className="space-y-4 mt-4">
              {manufacturerPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow-md p-4 relative">
                  <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">VIP {plan.vipLevel}</div>
                  <div className="flex items-center space-x-4">
                    <Image 
                      src={plan.imageUrl}
                      alt={plan.name}
                      width={100} 
                      height={100}
                      data-ai-hint="cereal box"
                      className="rounded-lg" 
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{plan.name}</h4>
                      <div className="text-sm space-y-1 mt-2 text-gray-600">
                        <div className="flex justify-between"><span>Each Price</span> <span className="font-bold text-black">₹ {plan.price}</span></div>
                        <div className="flex justify-between"><span>Days</span> <span className="font-bold text-black">{plan.days} Days</span></div>
                        <div className="flex justify-between"><span>Daily Earnings</span> <span className="font-bold text-black">₹ {plan.dailyIncome}</span></div>
                        <div className="flex justify-between"><span>Total Gain</span> <span className="font-bold text-black">₹ {plan.totalGain}</span></div>
                      </div>
                    </div>
                  </div>
                   <Link href={`/invest/${plan.id}`} className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-lg mt-4 text-center">
                    Invest Now &gt;
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="retailer">
            <div className="space-y-4 mt-4">
              {retailerPlans.map(plan => (
                <div key={plan.id} className="bg-white rounded-lg shadow-md p-4 relative">
                  <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">VIP {plan.vipLevel}</div>
                  <div className="flex items-center space-x-4">
                    <Image 
                      src={plan.imageUrl}
                      alt={plan.name} 
                      width={100} 
                      height={100}
                      data-ai-hint="cereal box"
                      className="rounded-lg" 
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{plan.name}</h4>
                      <div className="text-sm space-y-1 mt-2 text-gray-600">
                        <div className="flex justify-between"><span>Each Price</span> <span className="font-bold text-black">₹ {plan.price}</span></div>
                        <div className="flex justify-between"><span>Days</span> <span className="font-bold text-black">{plan.days} Days</span></div>
                        <div className="flex justify-between"><span>Daily Earnings</span> <span className="font-bold text-black">₹ {plan.dailyIncome}</span></div>
                        <div className="flex justify-between"><span>Total Gain</span> <span className="font-bold text-black">₹ {plan.totalGain}</span></div>
                      </div>
                    </div>
                  </div>
                  <Link href={`/invest/${plan.id}`} className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-lg mt-4 text-center">
                    Invest Now &gt;
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="distributor">
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg font-semibold">New VIP plans coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>


      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center text-gray-600 py-2">
        <Link href="/" className="flex flex-col items-center text-red-600">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <a href="#" className="flex flex-col items-center">
          <ListTodo />
          <span className="text-xs">Tasks</span>
        </a>
        <button className="bg-red-600 text-white rounded-full p-4 -mt-8 shadow-lg">
          <Headphones size={28} />
        </button>
        <a href="#" className="flex flex-col items-center">
          <FileText />
          <span className="text-xs">Blog</span>
        </a>
        <a href="#" className="flex flex-col items-center">
          <User />
          <span className="text-xs">Account</span>
        </a>
      </div>
    </div>
  );
}
