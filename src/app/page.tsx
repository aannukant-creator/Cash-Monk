"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "🔑 लॉगिन करें" : "📝 नया खाता बनाएँ"}
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="✉️ अपना ईमेल डालें"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          <input
            type="password"
            placeholder="🔑 पासवर्ड डालें"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-full">
            {isLogin ? "लॉगिन" : "खाता बनाएँ"}
          </button>
        </form>

        <p
          className="text-center text-blue-600 font-semibold mt-4 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "खाता नहीं है? यहाँ क्लिक करें"
            : "पहले से खाता है? लॉगिन करें"}
        </p>
      </motion.div>

      {/* Recharge Page Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mt-6"
      >
        <h2 className="text-xl font-bold text-center mb-4">💰 रिचार्ज पेज</h2>
        <Image
          src="https://i.ibb.co/6r5Kc7d/sample-qr.png"
          alt="Recharge QR"
          width={192}
          height={192}
          className="mx-auto mb-4 object-contain border rounded-xl"
        />
        <p className="text-center font-bold text-lg mb-3">UPI: apngrou@ptyes</p>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-full">
          UPI App में खोलें
        </button>
      </motion.div>
    </div>
  );
}