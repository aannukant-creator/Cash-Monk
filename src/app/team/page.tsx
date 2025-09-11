
"use client";

import Link from "next/link";
import { ChevronLeft, Link as LinkIcon, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export default function TeamPage() {
  const { toast } = useToast();
  const inviteCode = "CESHMONK123";
  const inviteLink = `https://app.example.com/register?invite=${inviteCode}`; // Replace with your actual domain

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Success",
        description: message,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
       toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Team</h1>
      </header>

      <main className="p-4">
        <Card className="bg-gradient-to-r from-red-500 to-orange-400 text-white text-center p-6 rounded-xl shadow-lg mb-4">
          <h2 className="text-3xl font-bold">Invite friends to win cash</h2>
          <p className="mt-2">Multiple rewards waiting for you to claim</p>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Invite rewards</h3>
            <p className="text-sm text-gray-500 mb-4">Invest together, get rich together</p>
            <div className="bg-red-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-gray-600">Commission</p>
                <p className="font-bold text-xl">₹0</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Invite Code</p>
                <p className="font-bold text-xl">{inviteCode}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => copyToClipboard(inviteLink, "Invite link copied!")}>
                  <LinkIcon size={20} />
                </Button>
                <Button size="icon" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => alert("QR Code functionality coming soon!")}>
                  <QrCode size={20} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-bold text-lg mb-2">Team Levels</h3>
          
          <Card className="mb-3">
            <CardContent className="p-4 flex items-center space-x-4">
              <Image src="https://i.ibb.co/L8Wp5zJ/lv1.png" alt="LV1" width={48} height={48} />
              <div className="flex-1 grid grid-cols-3 text-center">
                <div>
                  <p className="font-bold text-red-600">25%</p>
                  <p className="text-xs text-gray-500">Lv 1 Rebate</p>
                </div>
                <div>
                  <p className="font-bold">0</p>
                  <p className="text-xs text-gray-500">Total Invite</p>
                </div>
                <div>
                  <p className="font-bold">0</p>
                  <p className="text-xs text-gray-500">Total Recharge</p>
                </div>
              </div>
              <Button variant="link" size="sm">Details &gt;</Button>
            </CardContent>
          </Card>

          <Card className="mb-3">
            <CardContent className="p-4 flex items-center space-x-4">
                <Image src="https://i.ibb.co/b2d0RjD/lv2.png" alt="LV2" width={48} height={48} />
                <div className="flex-1 grid grid-cols-3 text-center">
                    <div>
                        <p className="font-bold text-red-600">3%</p>
                        <p className="text-xs text-gray-500">Lv 2 Rebate</p>
                    </div>
                    <div>
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-500">Total Invite</p>
                    </div>
                    <div>
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-500">Total Recharge</p>
                    </div>
                </div>
                <Button variant="link" size="sm">Details &gt;</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
                <Image src="https://i.ibb.co/GcvD6S3/lv3.png" alt="LV3" width={48} height={48} />
                <div className="flex-1 grid grid-cols-3 text-center">
                    <div>
                        <p className="font-bold text-red-600">2%</p>
                        <p className="text-xs text-gray-500">Lv 3 Rebate</p>
                    </div>
                    <div>
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-500">Total Invite</p>
                    </div>
                    <div>
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-500">Total Recharge</p>
                    </div>
                </div>
                <Button variant="link" size="sm">Details &gt;</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
