import { useState, useEffect } from "react";
import { z, ZodTypeAny } from "zod";

// Constant Message
const MESSAGE_ERROR = (val: string) => `وارد کردن ' ${val} ' ضروری است`;
const INVALID_ERROR = (val: string) => `'${val}' وارد شده کوتاه است.`;

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
    .min(1, MESSAGE_ERROR("ایمیل"))
    .email('"ایمیل" وارد شده معتبر نمی‌باشد.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR("رمز عبور"))
    .min(4, INVALID_ERROR("رمز عبور")),
});
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, MESSAGE_ERROR("نام کاربری"))
    .min(4, INVALID_ERROR("نام کاربری")),
  email: z
    .string()
    .min(1, MESSAGE_ERROR("ایمیل"))
    .email('"ایمیل" وارد شده معتبر نمی‌باشد.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR("رمز عبور"))
    .min(4, INVALID_ERROR("رمز عبور")),
});
