import React, { useState, useRef, useEffect } from 'react';
import { PlayCircleFilled, PauseCircleFilled, Stop, VolumeUp, AddCircle, RemoveCircle, VolumeOff } from '@material-ui/icons';
import audio from '../Assets/Audio/song.mp3';

export const AudioApp = () => {
    const playerRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false); 
    const [isMuted, setIsMuted] = useState(false); 

    useEffect(() => {
        isPlaying ? playerRef.current.play() : playerRef.current.pause() ;
    },[isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
    }

    const stopAudio = () => {
        playerRef.current.currentTime = 0;
        setIsPlaying(false);
    }

    const plusAudioVolume = () => {
        const currentVolume = playerRef.current.volume;
        const shouldUpdateVolume = currentVolume < 1;
        if ( shouldUpdateVolume ) {
            playerRef.current.volume = (currentVolume + 0.1).toFixed(2);
        }
    }

    const minusAudioVolume = () => {
        const currentVolume = playerRef.current.volume;
        const shouldUpdateVolume = currentVolume > 0;
        if ( shouldUpdateVolume ) {
            playerRef.current.volume = (currentVolume - 0.1).toFixed(2);
        }
    }

    const renderPlayerControls = () => (
        <div id='player-controls'>
            <div id='play-pause' onClick={togglePlay}>
                {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </div>
            <div id='stop' onClick={stopAudio}>
                <Stop />
            </div>
            <div id='mute' onClick={toggleMute}>
                {isMuted ? <VolumeOff /> : <VolumeUp/>}
            </div>
            <div id='volume-plus' onClick={plusAudioVolume}>
                <AddCircle />
            </div>
            <div id='volume-minus' onClick={minusAudioVolume}>
                <RemoveCircle />
            </div>
        </div>
    );
    const renderAudio = () => (
        <audio
            src={audio}
            id='player'
            controls
            muted={isMuted}
            ref={playerRef}
        />
    );
    return (
        <div className='audio-app'>
            <div id='audio-player-card'>
                {renderAudio()}
                {renderPlayerControls()}
            </div>
        </div>
    );
};
