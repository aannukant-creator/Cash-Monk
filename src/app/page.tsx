
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomePage from "./welcome/page";

export default function Home() {
    const [isWelcoming, setIsWelcoming] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWelcoming(false);
            router.push('/home');
        }, 3000); // 3 seconds for the splash screen

        return () => clearTimeout(timer);
    }, [router]);

    return isWelcoming ? <WelcomePage /> : null;
}
