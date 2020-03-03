import React from "react";
import { PlayCircleFilled, Stop, VolumeUp, AddCircle, RemoveCircle } from '@material-ui/icons';
import audio from '../Assets/Audio/song.mp3';

export const AudioApp = () => {
    const renderAudio = () => (
        <audio
            src={audio}
            id='player'
            controls
        />
    );

    const renderPlayerControls = () => (
        <div id="player-controls">
            <div id="play-pause">
                <PlayCircleFilled />
            </div>
            <div id="stop">
                <Stop />
            </div>
            <div id="mute">
                <VolumeUp />
            </div>
            <div id="volume-plus">
                <AddCircle />
            </div>
            <div id="volume-minus">
                <RemoveCircle />
            </div>
        </div>
    );

    return (
        <div className="audio-app">
            <div id="audio-player-card">
                {renderAudio()}
                {renderPlayerControls()}
            </div>
        </div>
    );
};
