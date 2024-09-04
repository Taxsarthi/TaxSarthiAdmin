import React from 'react'
import { Input } from './ui/input'
import { Copy } from 'lucide-react'

type Props = {}

const UserDetails = (props: Props) => {
  return (
    <div className='rounded-lg border h-full flex flex-col bg-blue-950 text-white p-4 m-2'>
      <h1 className='border-b mb-2 w-full text-lg'>User Details</h1>
      <form className='w-[99%] flex flex-col gap-2'>
        <Input className='bg-gray-300 border-0' type='text' placeholder='Name' />
        <Input className='bg-gray-300 border-0' type='text' placeholder='PAN' />
        <div className='flex gap-2 justify-center items-center'>
        <Input className='bg-gray-300 border-0' type='password' />
        <Copy size={24} />
        </div>
        <Input className='bg-gray-300 border-0' type='email' placeholder='Email' />
        <Input className='bg-gray-300 border-0' type='text' placeholder='Mobile' />
        <Input className='bg-gray-300 border-0' type='number' placeholder='Aadhar No.' />
        <Input className='bg-gray-300 border-0' type='number' placeholder='Bank Account No.' />
        <Input className='bg-gray-300 border-0' type='text' placeholder='IFSC Code' />
        <Input className='bg-gray-300 border-0' type='text' placeholder='Employee Id'/>
        <Input className='bg-gray-300 border-0' type='text' placeholder='Office Address'/>
        <Input className='bg-gray-300 border-0' type='text' placeholder='Area'/>
      </form>
    </div>
  )
}

export default UserDetails