'use client'

import InputCheck from '@/utilities/components/globals/inputs/InputCheck'
import InputText from '@/utilities/components/globals/inputs/InputText'
import { Button, Card } from 'flowbite-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter();
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Card className='w-full max-w-lg pt-4 pb-8'>
                    <div className="mb-4">
                        <div className="text-xl font-bold leading-none text-gray-900 dark:text-white">Login ke Akun Pengguna</div>
                        <div className="text-sm leading-8 text-gray-600 dark:text-white">Gunakan Usrname dan Password anda</div>
                    </div>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        router.push('/panel');
                    }}>
                        <div>
                            <InputText name='email' type="email" required />
                        </div>
                        <div className='mt-4'>
                            <InputText name='password' type="password" required />
                        </div>
                        <div className='mt-4'>
                            <InputCheck name='remember' label="Remember Me" />
                        </div>
                        <Button type="submit" className='w-full mt-4'>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}
