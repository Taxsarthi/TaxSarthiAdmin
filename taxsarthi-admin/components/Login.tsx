'use client';

import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      
      <div className="space-y-4">
        <Input className="bg-gray-50 dark:bg-slate-900" type="email" placeholder="Email" />
        <Input className="bg-gray-50 dark:bg-slate-900" type="password" placeholder="Password" />
      </div>

      <div className="flex justify-between mt-6">
        <Button className="bg-green-500 dark:bg-green-700 text-white">Login</Button>
      </div>
    </div>
  );
};

export default Login;
