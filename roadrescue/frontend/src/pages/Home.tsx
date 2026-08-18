import React, { useCallback, useState } from "react";
import { api } from "../services/api";
import { TopNav, type Role } from '../components/top-nav'
import { UserView } from '../components/user-view'
import { AdminView } from '../components/admin-view'
import { INITIAL_REQUESTS, generateRequestId, type RescueRequest, type RequestStatus } from '../lib/road-rescue'

export default function Home() {
  const [role, setRole] = useState<Role>('user')
  const [requests, setRequests] = useState<RescueRequest[]>(INITIAL_REQUESTS)

const createRequest = useCallback(
  async (
    data: Omit<RescueRequest, "id" | "submittedAt" | "status">
  ) => {
    try {
      const created = await api.createAssistanceRequest(data);

      setRequests((prev) => [created, ...prev]);

      console.log("Request created:", created);

      return created;
    } catch (error) {
      console.error("Failed to create request:", error);
      alert("Request create nahi ho paayi.");
      throw error;
    }
  },
  []
);

  const updateStatus = useCallback((id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }, [])

  return (
    <main className="min-h-dvh bg-background">
      <TopNav role={role} onRoleChange={setRole} />
      {role === 'user' ? (
        <UserView onCreate={createRequest} />
      ) : (
        <AdminView requests={requests} onStatusChange={updateStatus} />
      )}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">RoadRescue — 24/7 Emergency Roadside Assistance · Demo dispatch console</footer>
    </main>
  )
}
