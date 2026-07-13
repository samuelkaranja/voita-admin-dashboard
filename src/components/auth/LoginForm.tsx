"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench } from "lucide-react";
import PhoneInput from "@/components/forms/PhoneInput";
import PasswordInput from "@/components/ui/PasswordInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginThunk } from "@/store/slices/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(loginThunk({ phone, password }));
    if (loginThunk.fulfilled.match(result)) {
      router.push("/");
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-voita-accent flex items-center justify-center">
          <Wrench size={22} className="text-voita-bg" />
        </div>
        <div className="text-center">
          <h1 className="text-white font-bold text-xl">Voita Admin</h1>
          <p className="text-voita-text-muted text-sm mt-0.5">
            Automotive Service Management
          </p>
        </div>
      </div>

      <div className="w-full bg-voita-card border border-voita-border rounded-xl p-6 sm:p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-voita-text font-semibold text-lg">
            Welcome back
          </h2>
          <p className="text-voita-text-secondary text-sm mt-1">
            Sign in to your admin account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-voita-text-muted uppercase tracking-wide">
              Phone Number
            </label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="e.g. 0704391679"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-voita-text-muted uppercase tracking-wide">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-voita-accent text-voita-bg font-semibold text-sm rounded-lg py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-voita-text-muted text-xs">
        Restricted access only
      </p>
    </div>
  );
}
