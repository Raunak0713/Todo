'use client'
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {  ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center bg-black text-white py-32 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-extrabold text-red-600 mb-4">Welcome to Your New Adventure</h1>
          <p className="text-lg text-gray-400 mb-6">
            Dive into a world of possibilities. Manage your tasks and projects effortlessly with a simple, intuitive interface. Let's make productivity fun!
          </p>
          <div className="flex justify-center gap-6 mt-8">
            {user?.id ? (
              <div>
                <Button onClick={() => router.push("/dashboard")} className="bg-red-600 text-white">
                  Dashboard
                  <ArrowRight />
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => router.push("/dashboard")} className="bg-red-600 text-white py-3 px-6 rounded-md text-lg hover:bg-red-700 transition-colors duration-300">
                  Get Started
                </Button>
                <Button onClick={() => router.push("/dashboard")} className="bg-transparent  text-white py-3 px-6 rounded-md text-lg hover:bg-red-600 hover:text-black transition-all duration-300">
                  Learn More
                </Button>
              </div>
            )}
            
          </div>
        </div>
      </section>
      <footer className="bg-black text-center text-gray-400 py-6">
        <p>&copy; 2025 TaskNinja. All rights reserved.</p>
      </footer>
    </div>
  );
}
