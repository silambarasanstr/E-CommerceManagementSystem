type FormState = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export const Validation = (values: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};
