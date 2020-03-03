import React, { useState, useRef, useEffect } from 'react';
import { PlayCircleFilled, PauseCircleFilled, Stop, VolumeUp, AddCircle, RemoveCircle } from '@material-ui/icons';
import audio from '../Assets/Audio/song.mp3';

export const AudioApp = () => {
    const playerRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false); 
    const renderAudio = () => (
        <audio
            src={audio}
            id='player'
            controls
            ref={playerRef}
        />
    );

    useEffect(() => {
        isPlaying ? playerRef.current.play() : playerRef.current.pause() ;
    },[isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const stopAudio = () => {
        playerRef.current.currentTime = 0;
        setIsPlaying(false);
    }

    const renderPlayerControls = () => (
        <div id='player-controls'>
            <div id='play-pause' onClick={togglePlay}>
                {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </div>
            <div id='stop' onClick={stopAudio}>
                <Stop />
            </div>
            <div id='mute'>
                <VolumeUp />
            </div>
            <div id='volume-plus'>
                <AddCircle />
            </div>
            <div id='volume-minus'>
                <RemoveCircle />
            </div>
        </div>
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
