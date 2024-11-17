'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import { AuthPages } from '@/lib/schemas/types';
import { authService } from '@/lib/services/auth.service';
import { errorHandler } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  tempToken: string;
  setPage(page: AuthPages): void;
  setPageParams(pageParams: string): void;
}

type Inputs = {
  tempToken: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword: FC<Props> = ({ tempToken, setPage, setPageParams }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      tempToken,
    },
  });

  const password = watch('password');

  const { mutateAsync: _resetPassword, isPending: _resettingPassword } =
    useMutation({
      mutationKey: ['useResetPassword'],
      mutationFn: authService.resetPassword,
      onSuccess() {
        toast.success('Password reset successful');
        setPage('login');
        setPageParams('');
      },
    });

  const submit = async (e: Inputs) => {
    await _resetPassword(e);
  };

  useEffect(() => {
    if (!tempToken) {
      toast.error('Session not found, retry');
      setPage('forgot-password');
      setPageParams('');
    }
  }, [tempToken, setPage, setPageParams]);

  return (
    <section className="mt-5">
      <h1 className="text-[1.8rem]">Reset Password</h1>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit(submit)}>
        <TextField
          label="Password"
          InputProps={{
            placeholder: 'Enter your password',
            type: 'password',
            ...register('password', {
              required: {
                value: true,
                message: 'password is required',
              },
              minLength: {
                value: 8,
                message: 'password must not be less than 8 characters',
              },
            }),
          }}
          helperText={errors.password && errors.password.message}
        />

        <TextField
          label="Confirm Password"
          InputProps={{
            placeholder: 'Confirm your password',
            type: 'password',
            ...register('confirmPassword', {
              required: {
                value: true,
                message: 'password is required',
              },
              minLength: {
                value: 8,
                message: 'password must not be less than 8 characters',
              },
              validate(value) {
                if (value != password && password != '') {
                  return 'passwords do not match';
                }
              },
            }),
          }}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />

        <Button
          loading={_resettingPassword}
          variant="filled"
          fullWidth={true}
          size="medium"
        >
          Reset Password
        </Button>
      </form>
    </section>
  );
};

export default ResetPassword;
