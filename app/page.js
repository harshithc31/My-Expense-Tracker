"use client"
import Header from "./_component/Header";
import Hero from "./_component/Hero";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user, isLoaded, router]);

  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  );
}
