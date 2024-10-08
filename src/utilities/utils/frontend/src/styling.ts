import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isSmallScreen() {
    return (typeof window != 'undefined') && (window.screen.width <= 1024);
}