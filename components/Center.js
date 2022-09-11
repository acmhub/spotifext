import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-amber-500'
];

export default function Center() {
    const [color, setColor] = useState('');

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div
                    className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-2 px-4"
                    onClick={() => signOut()}
                >
                    <h6>ACMHUB</h6>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}></section>
        </div>
    );
}
