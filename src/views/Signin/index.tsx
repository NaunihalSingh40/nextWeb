// pages/signup.tsx

import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { usePostSiginMutation } from "services/NextWeb/SignupApi";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  confirmPassword?: string;
};

const SignupPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldType>({
    defaultValues: { role: "customer" },
  });
  const router = useRouter();

  const [postSignin] = usePostSiginMutation();

  const onSubmit = async (data: FieldType) => {
    // Add logic here to handle user registration, e.g., API call
    // Redirect based on the selected role
    const payLoad = {
      role: data.role,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await postSignin(payLoad);
    if (response) {
      reset();
      alert("User registered successfully");
      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.role === "seller") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const onError = (errors: unknown) => {
    console.log("Form submission failed with:", errors);
  };

  return (
    <SignupWrapper>
      <SignupForm onSubmit={handleSubmit(onSubmit, onError)}>
        <FormField>
          <Label htmlFor="username">Username</Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Please input your username!" }}
            render={({ field }) => <StyledInput {...field} />}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </FormField>

        <FormField>
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please input your email!",
              pattern: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
            }}
            render={({ field }) => <StyledInput type="email" {...field} />}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormField>

        <FormField>
          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please input your password!",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
            }}
            render={({ field }) => <StyledInput type="password" {...field} />}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormField>

        <FormField>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password!",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            }}
            render={({ field }) => <StyledInput type="password" {...field} />}
          />
          {errors.confirmPassword && (
            <Error>{errors.confirmPassword.message}</Error>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <StyledSelect {...field}>
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </StyledSelect>
            )}
          />
        </FormField>

        <ButtonWrapper>
          <StyledButton type="submit">Sign Up</StyledButton>
        </ButtonWrapper>
      </SignupForm>
    </SignupWrapper>
  );
};

export default SignupPage;

// Styled components for the page
const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const SignupForm = styled.form`
  background: white;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 8px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  background-color: #1890ff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #40a9ff;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;
