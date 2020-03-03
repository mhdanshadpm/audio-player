import React from "react";
import audio from '../Assets/Audio/song.mp3';

export const AudioApp = () => {
    const renderAudio = () => (
        <audio
            src={audio}
            id='player'
            controls
        />
    )
    return (
        <div className="audio-app">
            <div id="audio-player-card">{renderAudio()}</div>
        </div>
    );
};
