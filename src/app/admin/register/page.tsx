"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.ok) {
          router.push("/admin/dashboard"); // Change to your protected page
        } else {
          alert("Invalid credentials");
        }
      } else {
        // Sign up: create user in your backend
        await axios.post("/api/admin/register", {
          email,
          password,
        });

        // Then log in
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleAuth} className="space-y-4 max-w-sm mx-auto mt-10">
        <h2 className="text-xl font-semibold">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </form>
    </div>
  );
}
