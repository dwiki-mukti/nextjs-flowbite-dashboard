'use client'

import { Button, Modal } from "flowbite-react"
import { ReactNode } from "react"
import { HiOutlineExclamationCircle, HiSparkles } from "react-icons/hi";


type typeConfirmProps = {
    question?: ReactNode,
    onApproved?: () => any,
    approvedLabel?: string,
    deniedLabel?: string,
    show: boolean,
    toHide: () => void,
    isLoading?: boolean,
}

export default function Confirm({
    question,
    onApproved,
    approvedLabel,
    deniedLabel,
    show,
    toHide,
    isLoading,
}: typeConfirmProps) {
    return (
        <>

            <Modal show={show} onClose={toHide} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center relative">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {question ?? 'Anda benar ingin melakukan hal ini?'}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onApproved}>
                                {approvedLabel ?? 'Ya, Tentu saja'}
                            </Button>
                            <Button color="gray" onClick={toHide}>
                                {deniedLabel ?? 'Tidak, Batalkan'}
                            </Button>
                        </div>
                        {Boolean(isLoading) && (
                            <div className="absolute inset-0 flex bg-white">
                                <div className="m-auto flex items-center gap-1">
                                    <HiSparkles className="w-4 h-4" />
                                    <span>Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}