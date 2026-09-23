"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error.message || "Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
        <input name="password" type="password" placeholder="Password" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
        <button type="submit" disabled={loading} className="w-full bg-black text-white rounded-md px-4 py-2 disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}