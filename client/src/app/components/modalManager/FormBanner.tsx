import React from 'react';

interface Props {
    text: string;
    status?: 'neutral' | 'success' | 'error'
}

export function FormBanner({ text, status = 'neutral' }: Props) {
    let color = '';
    
    if (status === 'neutral') {
        color = 'bg-blue-500 border-blue-500';
    } else if (status === 'success') {
        color = 'bg-green-500 border-green-500';
    } else if (status === 'error') {
        color = 'bg-red-500 border-red-500';
    }

    return (
        <div className={`border ${color} bg-opacity-30 rounded-md px-3 py-2`}>
            <p className='text-gray-100 text-sm'>{text}</p>
        </div>
    )
}