import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>({
    defaultValues: { remember: true },
  });

  const onSubmit = (data: FieldType) => {
    console.log('Success:', data);
  };

  const onError = (errors: unknown) => {
    console.log('Failed:', errors);
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
        <FormField>
          <Label htmlFor='username'>Username</Label>
          <Controller
            name='username'
            control={control}
            rules={{ required: 'Please input your username!' }}
            render={({ field }) => <StyledInput {...field} />}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </FormField>

        <FormField>
          <Label htmlFor='password'>Password</Label>
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Please input your password!' }}
            render={({ field }) => <StyledInput type='password' {...field} />}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormField>

        <FormField>
          <Controller
            name='remember'
            control={control}
            render={({ field }) => (
              <StyledCheckboxWrapper>
                <StyledCheckbox
                  {...field}
                  checked={field.value}
                  value={undefined}
                />
                <StyledCheckboxLabel>Remember me</StyledCheckboxLabel>
              </StyledCheckboxWrapper>
            )}
          />
        </FormField>

        <ButtonWrapper>
          <StyledButton type='submit'>Submit</StyledButton>
        </ButtonWrapper>
      </LoginForm>
    </LoginWrapper>
  );
};

export default LoginPage;

// Styled components for the page
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const LoginForm = styled.form`
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

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  margin-right: 8px;
`;

const StyledCheckboxLabel = styled.label`
  font-size: 14px;
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
