export const registerService = {
  register: async ({ formData }) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    const res = await fetch(`${API_URL}/v1/participants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return res.json();
  },
};
