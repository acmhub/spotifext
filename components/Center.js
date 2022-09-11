import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-amber-500'
];

export default function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => setPlaylist(data.body))
            .catch((error) => console.log(error));
    }, [spotifyApi, playlistId]);

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

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}>
                <img src={playlist?.images?.[0]?.url} alt="" className="h44- w-44 shadow-2xl" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
        </div>
    );
}
