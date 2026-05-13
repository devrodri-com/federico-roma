// src/pages/Contact.tsx

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success") === "true") {
        setSubmitted(true);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = t("contact.validation.required");
    if (!formData.email) newErrors.email = t("contact.validation.required");
    if (!formData.phone) newErrors.phone = t("contact.validation.required");
    if (!formData.message) newErrors.message = t("contact.validation.required");
    setErrors({ name: "", email: "", phone: "", message: "", ...newErrors });
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Helmet>
        <title>{t("nav.contact")} | Federico Roma</title>
        <meta name="description" content={t("contact.description")} />
      </Helmet>
      <main className="flex-grow px-4 pt-[120px] pb-12 max-w-3xl mx-auto">
        <h1 className="whitespace-pre-line text-3xl font-bold mb-4">
          {t("contact.title")}
        </h1>
        <p className="whitespace-pre-line mb-6 text-lg text-gray-300">
          {t("contact.subtitle")}
        </p>

        {submitted && (
          <div className="bg-green-600 text-white rounded px-4 py-3 mb-6 animate-fade-in">
            {t("contact.success")}
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            try {
              const response = await fetch("https://formspree.io/f/xyzpejqd", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(formData)
              });

              if (response.ok) {
                setSubmitted(true);
                setFormData({ name: "", phone: "", email: "", message: "" });
              } else {
                console.error("Error sending form");
              }
            } catch (error) {
              console.error("Error submitting form:", error);
            }
          }}
        >

          <div>
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name") || ""}
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <input
            type="text"
            name="phone"
            placeholder={t("contact.form.phone") || ""}
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          <div>
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email") || ""}
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder={t("contact.form.message") || ""}
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
          >
            {t("contact.form.submit")}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
