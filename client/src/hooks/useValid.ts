import { useState, useEffect } from "react";
import { z, ZodTypeAny } from "zod";

// Constant Message
const MESSAGE_ERROR = (val: string) => `The '${val}' field is required.`;
const ENGLISH_ERROR = `The text entered is not 'English'`;
const INVALID_ERROR = (val: string) => `The '${val}' entered is too short.`;

export function useValid<T extends ZodTypeAny>(
  initialValues: z.infer<T>,
  schema: T
) {
  type ZodForm = z.infer<T>;

  const [values, setValues] = useState<ZodForm>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Object.keys(values).forEach((field) => {
      validateField(field as keyof ZodForm);
    });
  }, [values]);

  function validateForm() {
    const res = schema.safeParse(values);
    if (res.success) {
      setErrors({});
      return true;
    } else {
      const formErrors: Record<string, string> = {};
      for (const [key, val] of Object.entries(
        res.error.formErrors.fieldErrors || {}
      )) {
        formErrors[key] = Array.isArray(val) ? val[0] : "";
      }
      setErrors(formErrors);
      return false;
    }
  }

  function validateField(field: keyof ZodForm) {
    try {
      const res = schema.safeParse(values);
      const error = res.success ? "" : res.error.formErrors.fieldErrors[field];
      setErrors((prev) => ({
        ...prev,
        [field]: Array.isArray(error) ? error[0] : (error as string),
      }));
    } catch {
      console.log("error");
    }
  }

  function handleChange(field: keyof ZodForm, value: unknown) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return {
    values,
    errors,
    validateField,
    validateForm,
    handleChange,
  };
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, MESSAGE_ERROR("Email"))
    .email('The "Email" entered is not valid.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR("Password"))
    .min(4, INVALID_ERROR("Password")),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, MESSAGE_ERROR("Username"))
    .min(4, INVALID_ERROR("Username"))
    .regex(/^[a-zA-Z0-9_.]+$/, ENGLISH_ERROR),
  email: z
    .string()
    .min(1, MESSAGE_ERROR("Email"))
    .email('The "Email" entered is not valid.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR("password"))
    .min(4, INVALID_ERROR("Password")),
});
