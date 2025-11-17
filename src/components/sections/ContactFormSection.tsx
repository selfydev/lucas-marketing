import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitMarketingContact } from "@/lib/api/contact";
import type { ContactSubmissionInput } from "@/lib/api/contact";
import { isAnalyticsEnabled, posthog } from "@/lib/analytics/posthog";

type FormData = Omit<ContactSubmissionInput, "userType"> & {
  userType: ContactSubmissionInput["userType"] | "";
};

interface FormErrors {
  name?: string;
  email?: string;
  userType?: string;
  message?: string;
}

const CONTACT_FORM_SUBMISSION_EVENT = "marketing_contact_form_submission";

function captureContactFormSubmission(data: ContactSubmissionInput) {
  if (!isAnalyticsEnabled()) {
    return;
  }

  posthog.capture(CONTACT_FORM_SUBMISSION_EVENT, {
    ...data,
    submittedAt: new Date().toISOString(),
    source: "marketing_contact_form",
  });
}

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    userType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return;
      case "email":
        if (!value.trim()) return "Please enter your email address";
        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return;
      case "userType":
        if (!value) return "Please select an option";
        return;
      case "message":
        if (!value.trim()) return "Please enter a message";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return;
      default:
        return;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      userType: true,
      message: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!formData.userType) {
      return;
    }

    const submissionPayload: ContactSubmissionInput = {
      name: formData.name,
      email: formData.email,
      userType: formData.userType,
      message: formData.message,
    };
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitMarketingContact(submissionPayload);

      console.log("[CONTACT FORM] Submission:", {
        ...submissionPayload,
        timestamp: new Date().toISOString(),
      });

      captureContactFormSubmission(submissionPayload);

      setSubmitStatus("success");
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          userType: "",
          message: "",
        });
        setTouched({});
        setErrors({});
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("[CONTACT FORM] Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-white px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/10 bg-white/60 p-6 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {submitStatus === "success" ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-4 font-medium text-2xl text-neutral-800">
                Thank You!
              </h3>
              <p className="mt-2 text-neutral-600">
                We've received your message and will get back to you within 24
                hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="mb-6 font-medium text-2xl text-neutral-800 md:text-3xl">
                Send us a message
              </h2>

              {/* Name Field */}
              <div className="mb-5">
                <label
                  className="mb-2 block font-medium text-neutral-800 text-sm"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`w-full rounded-lg border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-neutral-200"
                  } bg-white px-4 py-3 text-neutral-800 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  id="name"
                  onBlur={() => handleBlur("name")}
                  onChange={(e) => handleChange("name", e.target.value)}
                  type="text"
                  value={formData.name}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label
                  className="mb-2 block font-medium text-neutral-800 text-sm"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`w-full rounded-lg border ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-neutral-200"
                  } bg-white px-4 py-3 text-neutral-800 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  id="email"
                  onBlur={() => handleBlur("email")}
                  onChange={(e) => handleChange("email", e.target.value)}
                  type="email"
                  value={formData.email}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* User Type Field */}
              <div className="mb-5">
                <label
                  className="mb-3 block font-medium text-neutral-800 text-sm"
                  htmlFor="userType"
                >
                  I am a...
                </label>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4 transition-all hover:border-primary hover:bg-primary/5">
                    <input
                      checked={formData.userType === "student"}
                      className="mt-0.5 accent-primary"
                      name="userType"
                      onBlur={() => handleBlur("userType")}
                      onChange={(e) => {
                        if (e.target.checked)
                          handleChange("userType", "student");
                      }}
                      type="radio"
                      value="student"
                    />
                    <div className="flex-1">
                      <span className="block font-medium text-neutral-800 text-sm">
                        Student
                      </span>
                      <span className="block text-neutral-600 text-xs">
                        Looking for college admissions help
                      </span>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4 transition-all hover:border-primary hover:bg-primary/5">
                    <input
                      checked={formData.userType === "university"}
                      className="mt-0.5 accent-primary"
                      name="userType"
                      onBlur={() => handleBlur("userType")}
                      onChange={(e) => {
                        if (e.target.checked)
                          handleChange("userType", "university");
                      }}
                      type="radio"
                      value="university"
                    />
                    <div className="flex-1">
                      <span className="block font-medium text-neutral-800 text-sm">
                        University/College Representative
                      </span>
                      <span className="block text-neutral-600 text-xs">
                        Interested in partnering with Lucas
                      </span>
                    </div>
                  </label>
                </div>
                {touched.userType && errors.userType && (
                  <p className="mt-1 text-red-500 text-sm">{errors.userType}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-neutral-800 text-sm"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className={`w-full rounded-lg border ${
                    touched.message && errors.message
                      ? "border-red-500"
                      : "border-neutral-200"
                  } bg-white px-4 py-3 text-neutral-800 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  id="message"
                  onBlur={() => handleBlur("message")}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={5}
                  value={formData.message}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>

              {submitStatus === "error" && (
                <p className="mt-3 text-center text-red-500 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>

        {/* Decorative sticky note */}
        <div className="absolute top-4 right-4 hidden md:block lg:right-8">
          <img
            alt=""
            className="-rotate-12 h-auto w-20 lg:w-24"
            src="/assets/sticky-note-cross.png"
          />
        </div>
      </div>
    </section>
  );
}
