export const registerService = {
  register: async ({ formData }) => {
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });

    return res.json();
  },
};
