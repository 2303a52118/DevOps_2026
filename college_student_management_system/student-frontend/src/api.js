const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || `Request failed (${response.status}).`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const getStudents = (options) => request("/students", options);
export const createStudent = (student) =>
  request("/students", { method: "POST", body: JSON.stringify(student) });
export const updateStudent = (id, student) =>
  request(`/students/${id}`, { method: "PUT", body: JSON.stringify(student) });
export const deleteStudent = (id) =>
  request(`/students/${id}`, { method: "DELETE" });
