import React, { useState } from "react";

function SpinnerModal({ closeModal }) {
  const [players, setPlayers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleAddPlayer = () => {
    if (inputName.trim() !== "") {
      setPlayers([...players, inputName]);
      setInputName("");
    }
  };

  const handleSpin = () => {
    if (players.length >= 2) {
      const shuffled = [...players].sort(() => 0.5 - Math.random());
      setSelectedPlayers(shuffled.slice(0, 2));

      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Add Players</h2>

        <div className="flex mb-4">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter player name"
            className="border p-2 flex-1 rounded-l"
          />
          <button
            onClick={handleAddPlayer}
            className="bg-green-500 text-white p-2 rounded-r"
          >
            Add
          </button>
        </div>

        <div className="mb-4">
          {players.map((name, idx) => (
            <div key={idx} className="text-gray-700">{name}</div>
          ))}
        </div>

        <button
          onClick={handleSpin}
          className="bg-blue-500 text-white px-6 py-2 rounded mb-4"
        >
          Spin!
        </button>

        {selectedPlayers.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-lg">Selected Players:</h3>
            <p>{selectedPlayers[0]} and {selectedPlayers[1]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpinnerModal;
