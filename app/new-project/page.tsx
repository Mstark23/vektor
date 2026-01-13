"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export default function NewProjectPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("projects")
      .insert({
        email,
        business_name: businessName,
        industry,
        style,
        plan: "basic",
        status: "QUEUED",
        paid: false,
      } as any); // 👈 THIS LINE IS THE FIX

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={containerStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h1 style={titleStyle}>Start a new project</h1>

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          placeholder="Business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          placeholder="Style (modern, luxury, minimal...)"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          required
        />

        {error && <p style={errorStyle}>{error}</p>}

        <button style={buttonStyle} disabled={loading}>
          {loading ? "Submitting..." : "Continue"}
        </button>
      </form>
    </main>
  );
}

/* ================= STYLES ================= */

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f7f7f7",
};

const cardStyle: React.CSSProperties = {
  width: 420,
  padding: 32,
  borderRadius: 12,
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const titleStyle: React.CSSProperties = {
  marginBottom: 20,
  fontSize: 26,
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
};

const errorStyle: React.CSSProperties = {
  color: "red",
  marginBottom: 12,
};
