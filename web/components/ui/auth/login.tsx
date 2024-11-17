'use client';
import Button from '@/components/common/button';
import { Checkbox } from '@/components/common/input/checkbox';
import TextField from '@/components/common/input/text-field';
import { DEFAULT_MATCHERS } from '@/lib/constants';
import { AuthPages } from '@/lib/schemas/types';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Input = {
  email: string;
  password: string;
  remember_me: boolean;
};

interface Props {
  setPage(page: AuthPages): void;
}

const Login: FC<Props> = ({ setPage }) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Input>({});

  const toggleRemember = () => setRememberMe(!rememberMe);

  const { mutateAsync: _login, isPending: _loggingIn } = useMutation({
    mutationKey: ['useLogin'],
    mutationFn: async (e: Input) =>
      await signIn('credentials', {
        email: e.email,
        remember_me: e.remember_me,
        password: e.password,
        redirect: false,
      }),
  });

  const submit = async (e: Input) => {
    const response = await _login(e);
    if (!response?.ok) {
      toast.error('Login Failed');
      return;
    } else {
      toast.success('Login Successful');
      window.location.href = '/dashboard';
    }
  };

  useEffect(() => {
    setValue('remember_me', rememberMe);
  }, [rememberMe, setValue]);

  return (
    <section className="mt-5">
      <h1 className="text-[1.8rem]">Login to your account</h1>
      <p className="text-[.9rem] font-light">
        Access your school document management dashboard 📜
      </p>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit(submit)}>
        <TextField
          label="Email Address"
          InputProps={{
            placeholder: 'Enter your school registered email address',
            type: 'email',
            ...register('email', {
              required: {
                value: true,
                message: 'email is required',
              },
              pattern: {
                value: DEFAULT_MATCHERS.schoolEmail,
                message: 'enter a valid school email',
              },
            }),
          }}
          helperText={errors.email && errors.email.message}
        />

        <TextField
          label="Password"
          InputProps={{
            placeholder: 'Enter your password',
            type: 'password',
            disabled: _loggingIn,
            ...register('password', {
              required: true,
            }),
          }}
          helperText={errors?.password?.message && 'password is required'}
        />
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-device"
              checked={rememberMe}
              onCheckedChange={toggleRemember}
            />
            <label
              htmlFor="remember-device"
              className="text-[.8rem] inline-block cursor-pointer"
            >
              Remember Me
            </label>
          </div>

          <p
            onClick={() => setPage('forgot-password')}
            className="text-mainLight text-[.8rem]"
          >
            Forgot Password
          </p>
        </div>

        <Button
          variant="filled"
          fullWidth={true}
          size="medium"
          loading={_loggingIn}
        >
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default Login;
