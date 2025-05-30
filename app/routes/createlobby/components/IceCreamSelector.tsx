import { useState, useEffect } from "react";

interface IceCream {
    id: number;
    name: string;
    image: string;
}

interface IceCreamSelectorProps {
    iceCreams: IceCream[];
    selectedIceCream: IceCream | null;
    onIceCreamSelect: (iceCream: IceCream) => void;
    position: "left" | "right";
    playerName: string;
    isReady: boolean;
    onReadyToggle: () => void;
    playerCustomName: string;
    onPlayerNameChange: (name: string) => void;
    isDisabled?: boolean;
}

export default function IceCreamSelector({
    iceCreams,
    selectedIceCream,
    onIceCreamSelect,
    position,
    playerName,
    isReady,
    onReadyToggle,
    playerCustomName,
    onPlayerNameChange,
    isDisabled = false
}: IceCreamSelectorProps) {
    // Set default selection when component mounts if nothing is selected
    useEffect(() => {
        if (!selectedIceCream && iceCreams.length > 0 && !isDisabled) {
            // Choose default ice cream based on position
            const defaultIndex = position === "left" ? 0 : Math.min(1, iceCreams.length - 1);
            onIceCreamSelect(iceCreams[defaultIndex]);
        }
    }, [iceCreams, onIceCreamSelect, position, selectedIceCream, isDisabled]);

    // Combine ready state with disabled prop
    const isInteractionDisabled = isReady || isDisabled;

    return (
        <div className={`ice-cream-selector ${position}-selector ${isReady ? 'player-ready' : ''} ${isDisabled ? 'disabled-player' : ''}`}>
            <h2 className="player-title">{playerName}</h2>

            <div className="character-selection">
                {iceCreams.map((iceCream) => (
                    <button
                        key={iceCream.id}
                        className={`character-button ${selectedIceCream?.id === iceCream.id ? "selected" : ""}`}
                        onClick={() => !isDisabled && onIceCreamSelect(iceCream)}
                        disabled={isInteractionDisabled}
                    >
                        <img
                            src={iceCream.image}
                            alt={iceCream.name}
                            className={`character-image ${isDisabled ? 'dimmed' : ''}`}
                        />
                        <span className="character-name">{iceCream.name}</span>
                    </button>
                ))}
            </div>

            {selectedIceCream && (
                <div className="selected-character-display">
                    <h2>Selected: {selectedIceCream.name}</h2>
                    <img
                        src={selectedIceCream.image}
                        alt={selectedIceCream.name}
                        className={`selected-character-image ${isDisabled ? 'dimmed' : ''}`}
                    />

                    {/* Player Name Input */}
                    <div className="player-name-input-container">
                        <label htmlFor={`player-${position}-name`} className="player-name-label">
                            Player Name:
                        </label>
                        <input
                            id={`player-${position}-name`}
                            type="text"
                            value={playerCustomName}
                            onChange={(e) => !isDisabled && onPlayerNameChange(e.target.value)}
                            placeholder="Enter your name"
                            className={`player-name-input ${isDisabled ? 'disabled' : ''}`}
                            maxLength={15}
                            disabled={isInteractionDisabled}
                        />
                    </div>

                    {!isDisabled && (
                        <button
                            className={`player-ready-button ${isReady ? 'ready' : ''}`}
                            onClick={onReadyToggle}
                            disabled={isDisabled}
                        >
                            {isReady ? "Not Ready" : "Ready"}
                        </button>
                    )}

                    {isDisabled && (
                        <div className="waiting-player-message">
                            Waiting for player...
                        </div>
                    )}

                    {isReady && !isDisabled && <div className="ready-indicator">Ready!</div>}
                </div>
            )}
        </div>
    );
}