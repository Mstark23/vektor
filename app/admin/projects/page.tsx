export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/app/lib/supabaseServer";

type Project = {
  id: string;
  status: "QUEUED" | "IN_PROGRESS" | "DELIVERED";
  created_at: string;
};

export default async function AdminProjectsPage() {
  const supabase = supabaseServer();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Error loading projects</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>
        Admin Projects
      </h1>

      <ul style={{ marginTop: 30 }}>
        {projects?.map((project) => (
          <li
            key={project.id}
            style={{
              padding: 20,
              marginBottom: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <p><strong>ID:</strong> {project.id}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(project.created_at).toLocaleString()}
            </p>

            <Link href={`/admin/projects/${project.id}`}>
              View →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
