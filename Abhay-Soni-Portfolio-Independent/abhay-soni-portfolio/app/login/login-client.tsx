"use client";

import Link from "next/link";
import { useState } from "react";

export function LoginClient({ returnTo }: { returnTo: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Login failed.");
      }
      window.location.assign(returnTo);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="studio-gate owner-login">
      <form className="studio-gate-card owner-login-card" onSubmit={signIn}>
        <span className="brand-mark">AS</span>
        <p className="section-number">Private owner access</p>
        <h1>Welcome back, Abhay.</h1>
        <p>
          Sign in to manage your blogs, projects, skills, education, and
          certificates.
        </p>

        <label className="field">
          <span>Admin email</span>
          <input
            required
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            placeholder="Your private password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? <p className="editor-message error">{error}</p> : null}

        <button className="button button-dark" disabled={submitting} type="submit">
          {submitting ? "Signing in…" : "Open private studio"}
        </button>
        <Link className="text-link" href="/">
          ← Return to portfolio
        </Link>
      </form>
    </main>
  );
}
