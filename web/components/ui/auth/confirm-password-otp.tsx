'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import { AuthPages } from '@/lib/schemas/types';
import { authService } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  email: string;
  setPage(page: AuthPages): void;
  setPageParams(pageParams: string): void;
}

type Inputs = {
  email: string;
  code: string;
};

const ConfirmPasswordResetOtp: FC<Props> = ({
  email,
  setPage,
  setPageParams,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email,
    },
  });

  const {
    mutateAsync: _confirmPasswordOtp,
    isPending: _confirmingPasswordOtp,
  } = useMutation({
    mutationKey: ['useConfirmPasswordOtp'],
    mutationFn: authService.confirmForgotPasswordOtp,
    onSuccess(data) {
      toast.success('Password Otp confirmed successfully');
      setPageParams(data?.tempToken!);
      setPage('reset-password');
    },
  });

  const submit = async (e: Inputs) => {
    await _confirmPasswordOtp(e);
  };

  useEffect(() => {
    if (!email) {
      toast.error('Session not found, retry');
      setPage('forgot-password');
      setPageParams('');
    }
  }, [email, setPage, setPageParams]);

  return (
    <section className="mt-5">
      <h1 className="text-[1.8rem]">Confirm Otp</h1>
      <p className="text-[.9rem] font-light">
        Confirm the password reset otp sent to your email address ({email})
      </p>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit(submit)}>
        <TextField
          label=""
          InputProps={{
            placeholder: 'Enter OTP',
            type: 'number',
            ...register('code', {
              required: {
                value: true,
                message: 'email is required',
              },
              minLength: {
                value: 4,
                message: 'Otp must be 4 characters',
              },
              maxLength: {
                value: 4,
                message: 'Otp must be 4 characters',
              },
            }),
          }}
          helperText={errors.code && errors.code.message}
        />

        <Button
          loading={_confirmingPasswordOtp}
          variant="filled"
          fullWidth={true}
          size="medium"
        >
          Confirm OTP
        </Button>
      </form>
    </section>
  );
};

export default ConfirmPasswordResetOtp;
