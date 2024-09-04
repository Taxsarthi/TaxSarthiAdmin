'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = {}

const UserDetails = (props: Props) => {
  const user = {
    name: 'John Doe',
    pan: 'ABCD1234E',
    password: 'password123',
    email: 'john.doe@example.com',
    mobile: '9876543210',
    aadharNo: '123456789012',
    bankAccountNo: '9876543210',
    ifscCode: 'XYZB0001234',
    employeeId: 'EMP123456',
    officeAddress: '1234 Elm Street, Springfield',
    area: 'Downtown'
  }

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(user.password).then(() => {
      toast.success('Password copied to clipboard!')
    }, (err) => {
      console.error('Failed to copy password: ', err)
    })
  }

  return (
    <div className='rounded-lg border h-full flex flex-col bg-slate-900 text-white p-4 m-2'>
      <h1 className='border-b mb-2 w-full text-lg'>User Details</h1>
      <form className='w-[99%] flex flex-col gap-2'>
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='Name'
          value={user.name}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='PAN'
          value={user.pan}
        />
        <div className='flex gap-2 justify-center items-center'>
          <Input
            className='bg-gray-300 text-black border-0'
            type='password'
            value={user.password}
            placeholder='Password'
          />
          <Copy size={24} className='cursor-pointer' onClick={copyPasswordToClipboard} />
        </div>
        <Input
          className='bg-gray-300 text-black border-0'
          type='email'
          placeholder='Email'
          value={user.email}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='Mobile'
          value={user.mobile}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='number'
          placeholder='Aadhar No.'
          value={user.aadharNo}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='number'
          placeholder='Bank Account No.'
          value={user.bankAccountNo}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='IFSC Code'
          value={user.ifscCode}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='Employee Id'
          value={user.employeeId}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='Office Address'
          value={user.officeAddress}
        />
        <Input
          className='bg-gray-300 text-black border-0'
          type='text'
          placeholder='Area'
          value={user.area}
        />
      </form>
    </div>
  )
}

export default UserDetails
