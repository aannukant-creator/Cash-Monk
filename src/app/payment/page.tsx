
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronLeft, ClipboardCopy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addRecharge } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";

const UpiId = "apngrou@ptyes";
const PayeeName = "Cesh Monk"; // You can change this to the actual payee name

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return <div className="text-2xl font-mono">00:{minutes}:{seconds}</div>;
}

export default function PaymentPage() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount') || "0";
    const [utr, setUtr] = useState("");

    const copyToClipboard = (e: React.MouseEvent, text: string) => {
        e.preventDefault(); // Prevent the link from being followed
        e.stopPropagation(); // Stop the event from bubbling up
        navigator.clipboard.writeText(text).then(() => {
            toast({ title: "Copied!", description: `Copied: ${text}` });
        });
    };
    
    const handleSubmitUtr = () => {
        if (utr.trim() === "") {
            toast({
                title: "Error",
                description: "Please enter the UTR number.",
                variant: "destructive",
            });
            return;
        }
        // In a real app, you would verify the UTR with your backend.
        addRecharge(parseFloat(amount));
        toast({
          title: "Success",
          description: "Your recharge request has been submitted successfully!",
        });
        router.push('/account');
    };

    const upiLink = `upi://pay?pa=${UpiId}&pn=${encodeURIComponent(PayeeName)}&am=${amount}&cu=INR&tn=Recharge`;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-purple-600 text-white p-6 text-center relative">
                <button onClick={() => router.back()} className="absolute left-4 top-1/2 -translate-y-1/2">
                    <ChevronLeft size={24} />
                </button>
                <p className="text-lg">Payment Amount</p>
                <p className="text-5xl font-bold my-2">₹{amount}</p>
                <CountdownTimer />
            </header>

            <main className="p-4">
                <div className="flex justify-center mb-4 border-b-2">
                    <Button variant="ghost" className="text-purple-600 font-bold border-b-2 border-purple-600 rounded-none">Direct Transfer</Button>
                    <Button variant="ghost" className="text-gray-500">Scan QRCode</Button>
                </div>
                
                <Card className="mb-4">
                    <CardContent className="p-4">
                        <p className="font-semibold mb-3">Select Payment Method</p>
                        <div className="grid grid-cols-2 gap-4">
                            <a href={upiLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 border-purple-600 border-2">
                                    <Image src="https://i.ibb.co/bF0W1S1/paytm-logo.png" alt="Paytm" width={24} height={24} />
                                    <span>Paytm</span>
                                </Button>
                            </a>
                            <a href={upiLink} target="_blank" rel="noopener noreferrer">
                                 <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12">
                                    <Image src="https://i.ibb.co/YcXW9S3/phonepe-logo.png" alt="PhonePe" width={24} height={24} />
                                    <span>Phonepe</span>
                                 </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-purple-100 text-purple-800 p-3 rounded-lg flex items-center gap-3 mb-4">
                    <AlertCircle className="h-5 w-5"/>
                    <p className="text-sm font-medium">Payment can only be made once. Multiple payments are not valid!!!</p>
                </div>

                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div>
                            <p className="font-semibold mb-2">1. Transfer {amount} RS to the following upi</p>
                            <a href={upiLink} target="_blank" rel="noopener noreferrer" className="block">
                                <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200">
                                    <span>{UpiId}</span>
                                    <Button size="icon" variant="ghost" onClick={(e) => copyToClipboard(e, UpiId)}>
                                        <ClipboardCopy size={18}/>
                                    </Button>
                                </div>
                            </a>
                             <a href={upiLink} target="_blank" rel="noopener noreferrer" className="block">
                                <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-200">
                                    <span>{amount} RS</span>
                                    <Button size="icon" variant="ghost" onClick={(e) => copyToClipboard(e, amount)}>
                                        <ClipboardCopy size={18}/>
                                    </Button>
                                </div>
                             </a>
                        </div>

                        <div>
                             <p className="font-semibold mb-2">2. Submit Ref No/Reference No/UTR</p>
                             <div className="flex gap-2">
                                <Input 
                                    placeholder="UTR(UPI Ref.ID)" 
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                />
                                <Button onClick={handleSubmitUtr} className="bg-purple-600 hover:bg-purple-700 text-white">Submit</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
