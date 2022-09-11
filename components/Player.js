import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import {
    ArrowRightIcon,
    ArrowsRightLeftIcon,
    ArrowUturnLeftIcon,
    BackwardIcon,
    ForwardIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { debounce } from 'lodash';

export default function Player() {
    const spotifyApi = useSpotify();
    const songInfo = useSongInfo();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => setCurrentTrackId(data.body?.item?.id));
            spotifyApi.getMyCurrentPlaybackState().then((data) => setIsPlaying(data.body?.is_playing));
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
        }
    }, [currentTrackId, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustedVolume(volume);
        }
    }, [volume]);

    const debounceAdjustedVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume);
        }, 500),
        []
    );
    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xm md:text-base px-2 md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images?.[0].url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.arists?.[0]?.name}</p>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center justify-evenly">
                <BackwardIcon className="button" />
                <ArrowsRightLeftIcon className="button" />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}

                <ForwardIcon className="button" />
                <ArrowUturnLeftIcon className="button" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <SpeakerXMarkIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-14 md:w-28"
                />
                <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
            </div>
        </div>
    );
}
