"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) return <p className="p-6">Loading...</p>;
  if (!session?.user) return <p className="p-6">Redirecting...</p>;

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()} className="bg-black text-white rounded-md px-4 py-2">
        Sign out
      </button>
    </main>
  );
}