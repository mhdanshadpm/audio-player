import React, { useState, useRef, useEffect } from 'react';
import { PlayCircleFilled, PauseCircleFilled, Stop, VolumeUp, AddCircle, RemoveCircle, VolumeOff } from '@material-ui/icons';
import audio from '../Assets/Audio/song.mp3';
import moment from 'moment';

export const AudioApp = () => {
    const playerRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false); 
    const [isMuted, setIsMuted] = useState(false); 
    const [duration, setDuration] = useState(0); 
    const [currentTime, setCurrentTime] = useState(0); 

    useEffect(() => {
        isPlaying ? playerRef.current.play() : playerRef.current.pause() ;
        const duration = playerRef.current.duration || 0 ;
        setDuration(duration);
    },[isPlaying, duration, currentTime]);

    useEffect(() => {
        const time = setInterval(()=>{
            const currentTime = playerRef.current.currentTime || 0;
            setCurrentTime(currentTime)
        },1000);
        return () => {
            clearInterval(time);
        };
    }, [currentTime])

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
    
    const getFormattedTime = (seconds) => moment.utc(seconds*1000).format('mm:ss');
    const getTimePercentage = () => ( currentTime / duration * 100).toFixed(2);

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
            muted={isMuted}
            ref={playerRef}
            onLoadedData = {()=>setDuration(playerRef.current.duration)}
        />
    );
    const renderPlaybackTime = () => (
        <div id="time-percentage-wrapper">
            <div id="time">
                {getFormattedTime(currentTime)}/
                {getFormattedTime(duration)}
            </div>
            <div id="percentage">
                {currentTime ? getTimePercentage(): '0.00'}%
            </div>
        </div>
    )
    return (
        <div className='audio-app'>
            <div id='audio-player-card'>
                {renderPlaybackTime()}
                {renderAudio()}
                {renderPlayerControls()}
            </div>
        </div>
    );
};
