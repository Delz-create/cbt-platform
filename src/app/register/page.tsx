"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const res = await signUp.email({
      name: `${firstName} ${lastName}`,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create your account</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input name="firstName" placeholder="First name" required className="w-1/2 rounded-md border border-gray-300 px-3 py-2" />
          <input name="lastName" placeholder="Last name" required className="w-1/2 rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
        <input name="password" type="password" placeholder="Password" required minLength={8} className="w-full rounded-md border border-gray-300 px-3 py-2" />
        <button type="submit" disabled={loading} className="w-full bg-black text-white rounded-md px-4 py-2 disabled:opacity-50">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </main>
  );
}