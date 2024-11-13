'use client';
import Button from '@/components/common/button';
import { Checkbox } from '@/components/common/input/checkbox';
import TextField from '@/components/common/input/text-field';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const toggleRemember = () => setRememberMe(!rememberMe);

  return (
    <section className="mt-5">
      <h1 className="text-[1.8rem]">Login to your account</h1>
      <p className="text-[.9rem] font-light">
        Access your school document management dashboard 📜
      </p>

      <form className="mt-7 space-y-4" onSubmit={(e) => {}}>
        <TextField
          label="Email Address"
          InputProps={{
            placeholder: 'Enter your school registered email address',
            type: 'email',
          }}
        />

        <TextField
          label="Password"
          InputProps={{
            placeholder: 'Enter your password',
            type: 'password',
          }}
        />

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

        <Button variant="filled" fullWidth={true} size="medium">
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default Login;
