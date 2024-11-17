'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import { DEFAULT_MATCHERS } from '@/lib/constants';
import { AuthPages } from '@/lib/schemas/types';
import { authService } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  setPage(page: AuthPages): void;
  setPageParams(pageParams: string): void;
}

type Inputs = {
  email: string;
};

const ForgotPassword: FC<Props> = ({ setPage, setPageParams }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const email = watch('email');

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['useForgotPassword'],
    mutationFn: authService.forgotPassword,
    onSuccess() {
      toast.success('Password reset Otp sent successfully');
      setPageParams(email);
      setPage('confirm-password-otp');
    },
  });

  const submit = async (e: Inputs) => {
    mutateAsync(e.email);
  };

  return (
    <section className="mt-5">
      <h1 className="text-[1.8rem]">Password Reset</h1>
      <p className="text-[.9rem] font-light">
        Reset your password with your school registered email address
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
                value: DEFAULT_MATCHERS.email,
                message: 'enter a valid school email',
              },
            }),
          }}
          helperText={errors.email && errors.email.message}
        />

        <Button
          loading={isPending}
          variant="filled"
          fullWidth={true}
          size="medium"
        >
          Request OTP
        </Button>
      </form>
    </section>
  );
};

export default ForgotPassword;
