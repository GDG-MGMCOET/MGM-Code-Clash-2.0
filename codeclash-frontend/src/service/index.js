export const registerService = {
  register: async ({ formData }) => {
    let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
    API_URL = API_URL.replace(/\/$/, ""); // Prevents double slash //v1/participants errs

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
