"use client"

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ClipboardCopy, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

function PaymentPageComponent() {
    const router = useRouter();
    const { toast } = useToast();
    const [utr, setUtr] = useState("");
    const amount = "500"; 

    const UpiId = "your-upi-id@upi";
    const upiLink = `upi://pay?pa=${UpiId}&pn=Test&am=${amount}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=250x250`;

    const copyToClipboard = (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            toast({ title: "Copied!", description: text });
        });
    };

    const handleSubmitUtr = () => {
        if (utr.trim() === "") {
            toast({
                title: "Error",
                description: "Please enter the UTR number",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Success",
            description: "Your recharge request has been submitted!",
        });
        router.push("/account");
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-purple-600 text-white flex items-center p-4">
                <button onClick={() => router.back()}>
                    <ChevronLeft size={24}/>
                </button>
                <p className="text-lg ml-2">Payment Amount: ₹{amount}</p>
            </header>

            <main className="p-4">
                <Tabs defaultValue="direct">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="direct">Direct Pay</TabsTrigger>
                        <TabsTrigger value="qrcode">Scan QR</TabsTrigger>
                    </TabsList>

                    <TabsContent value="direct">
                        <Card className="mb-4 mt-4">
                            <CardContent className="p-4">
                                <p className="font-semibold mb-2">Pay using UPI</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <a href={upiLink}>
                                        <Button variant="secondary" className="w-full">Paytm</Button>
                                    </a>
                                    <a href={upiLink}>
                                        <Button variant="secondary" className="w-full">PhonePe</Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-purple-100 text-purple-700 flex items-center p-2 rounded">
                            <AlertCircle className="h-5 w-5 mr-2"/>
                            <p className="text-sm">Please complete the payment and enter the UTR below.</p>
                        </div>

                        <Card className="mt-4">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <span>{UpiId}</span>
                                    <Button size="sm" variant="outline" onClick={(e) => copyToClipboard(e, UpiId)}>
                                        <ClipboardCopy className="h-4 w-4"/>
                                    </Button>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Input placeholder="Enter UTR Number" value={utr} onChange={(e) => setUtr(e.target.value)} />
                                    <Button onClick={handleSubmitUtr}>Submit</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="qrcode">
                        <Card className="mt-4">
                            <CardContent className="p-4 flex flex-col items-center">
                                <p className="font-semibold mb-2">Scan & Pay</p>
                                <Image src={qrCodeUrl} alt="UPI QR Code" width={250} height={250}/>
                                <p className="text-sm text-gray-600 mt-2">{UpiId}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageComponent />
        </Suspense>
    );
}
