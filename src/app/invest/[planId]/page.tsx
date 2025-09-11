
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { plans } from '@/lib/plans';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export default function InvestPage() {
  const router = useRouter();
  const params = useParams();
  const { planId } = params;
  const plan = plans.find((p) => p.id === planId);

  const [quantity, setQuantity] = useState(1);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Plan not found.</p>
        <Link href="/">
          <Button>Go Back</Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= plan.maxInvestment) {
      setQuantity(newQuantity);
    }
  };

  const payMoney = plan.price * quantity;
  const expectedTotalGain = plan.totalGain * quantity;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white text-gray-800 p-4 flex items-center relative shadow-sm">
        <button onClick={() => router.back()} className="absolute left-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Plan Details</h1>
      </header>
      <main className="p-4 pb-24">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={plan.imageUrl}
              alt={plan.name}
              width={80}
              height={80}
              className="rounded-lg"
              data-ai-hint="cereal box"
            />
            <div>
              <h2 className="font-bold text-xl">{plan.name}</h2>
              <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full inline-block mt-1">
                VIP {plan.vipLevel}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between items-center border-b pb-3">
              <span>Each Price</span>
              <span className="font-bold text-black">₹ {plan.price}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Days</span>
              <span className="font-bold text-black">{plan.days}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Daily Income</span>
              <span className="font-bold text-black">₹ {plan.dailyIncome}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Total Gain</span>
              <span className="font-bold text-black">₹ {plan.totalGain}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Max Investment</span>
              <span className="font-bold text-black">{plan.maxInvestment}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Buy Share</span>
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-8 w-8"
                >
                  <Minus size={16} />
                </Button>
                <Input
                  type="number"
                  className="w-16 h-8 text-center mx-2"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Pay Money</span>
              <span className="font-bold text-black">₹ {payMoney}</span>
            </div>
            <div className="flex justify-between items-center pb-3">
              <span>Expected Total Gain</span>
              <span className="font-bold text-black">₹ {expectedTotalGain}</span>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg text-lg">
          Invest Now
        </Button>
      </div>
    </div>
  );
}
