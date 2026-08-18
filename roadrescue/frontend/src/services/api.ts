import type {
  User,
  Mechanic,
  AssistanceRequest,
  Vehicle,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API Error ${response.status}: ${text}`
    );
  }

  return response.json();
}

export const api = {
  getUsers: async (): Promise<User[]> => {
    return request<User[]>("/api/users");
  },

  getMechanics: async (): Promise<Mechanic[]> => {
    return request<Mechanic[]>("/api/mechanics");
  },

  getAssistanceRequests: async (): Promise<AssistanceRequest[]> => {
    return request<AssistanceRequest[]>("/api/rescue-requests");
  },

  getVehicles: async (): Promise<Vehicle[]> => {
    return request<Vehicle[]>("/api/vehicles");
  },

  createAssistanceRequest: async (
    data: Omit<
      AssistanceRequest,
      "id" | "submittedAt" | "status"
    >
  ): Promise<AssistanceRequest> => {
    return request<AssistanceRequest>(
      "/api/rescue-requests",
      {
        method: "POST",
        body: JSON.stringify({
          customer_name: data.name,
          phone: data.phone,
          vehicle_type: data.vehicle,
          problem: data.problem,
          location: data.location,
        }),
      }
    );
  },
};

export default api;