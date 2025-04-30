// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function drawWheel(players, selectedPlayers = []) {
  const canvas = document.getElementById("wheel");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const center = size / 2;
  const numPlayers = players.length;
  const anglePerPlayer = (2 * Math.PI) / numPlayers;

  ctx.clearRect(0, 0, size, size);

  players.forEach((player, index) => {
    const startAngle = index * anglePerPlayer;
    const endAngle = startAngle + anglePerPlayer;

    ctx.fillStyle = selectedPlayers.includes(player)
      ? "gold"
      : `hsl(${Math.random() * 360}, 70%, 70%)`;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(startAngle + anglePerPlayer / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#333";
    ctx.font = selectedPlayers.includes(player)
      ? "bold 18px Arial"
      : "16px Arial";
    ctx.fillText(player, center - 10, 5);
    ctx.restore();
  });
}

function FlipCard({ scenario, situation, inappropriateAnswer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front">
          <h3>{scenario}</h3>
        </div>
        <div className="card-back">
          <div className="card-details">
            <p><strong>Situation:</strong> {situation}</p>
            <p><strong>Inappropriate Answer:</strong> {inappropriateAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleAddPlayer = () => {
    if (newPlayer.trim() !== "") {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const handleSpin = () => {
    if (players.length >= 2) {
      setSpinning(true);
      const randomExtra = 360 * 5 + Math.floor(Math.random() * 360);
      setRotation(prev => prev + randomExtra);

      setTimeout(() => {
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        const winners = shuffled.slice(0, 2);
        setSelectedPlayers(winners);
        setSpinning(false);
      }, 3000);
    } else {
      alert("Add at least 2 players!");
    }
  };

  const handleWheelDoubleClick = () => {
    if (players.length === 0) return;

    const nameToDelete = window.prompt('Type the name you want to delete:');
    if (nameToDelete) {
      setPlayers(players.filter((player) => player.toLowerCase() !== nameToDelete.toLowerCase()));
    }
  };

  useEffect(() => {
    drawWheel(players, selectedPlayers);
  }, [players, selectedPlayers]);

  const scenarios = [
    {
      scenario: "Scenario 1",
      situation: "You’re the new hire and feeling overwhelmed with your first project. You ask a coworker for help.",
      inappropriateAnswer: "Uh, I have no idea what I’m doing. Can you just help me figure it out real quick?"
    },
    {
      scenario: "Scenario 2",
      situation: "Your boss calls after hours and asks for quick help on a presentation issue.",
      inappropriateAnswer: "You should’ve told me earlier. I’m not doing it now."
    },
    {
      scenario: "Scenario 3",
      situation: "You share an idea in a meeting, and a coworker repeats it and gets praised.",
      inappropriateAnswer: "Oh wow, nice of you to steal my idea and act like it was yours."
    },
    {
      scenario: "Scenario 4",
      situation: "A coworker drops work on you last minute and expects you to do it quickly.",
      inappropriateAnswer: "Absolutely not. I don’t work overtime for people who can’t manage theirs."
    },
    {
      scenario: "Scenario 5",
      situation: "You’re trying to focus but a coworker keeps gossiping at your desk.",
      inappropriateAnswer: "Hey, I really can’t deal with this right now, can we talk later or something?"
    },
    {
      scenario: "Scenario 6",
      situation: "Your manager gives you three overlapping tasks without help.",
      inappropriateAnswer: "Okay, but three big tasks with no help? I’m going to need more time or resources."
    },
    {
      scenario: "Scenario 7",
      situation: "One group member never responds but gets equal credit.",
      inappropriateAnswer: "Hey, it’d be nice if we could all pitch in. It feels like we’re doing most of the work here."
    },
    {
      scenario: "Scenario 8",
      situation: "Your boss micromanages and checks in every 20 minutes.",
      inappropriateAnswer: "I’d appreciate a little more space to focus without so many check-ins."
    },
    {
      scenario: "Scenario 9",
      situation: "You’re constantly interrupted by unnecessary pings during a deadline.",
      inappropriateAnswer: "I can’t keep doing this. Can you just stop messaging me for a bit?"
    },
    {
      scenario: "Scenario 10",
      situation: "Your coworker critiques your work loudly in front of others.",
      inappropriateAnswer: "You didn’t need to embarrass me like that. Ever heard of private feedback?"
    }
  ];

  return (
    <div className="App">
      <h1>Roleplay Flip Card Game</h1>

      <div className="game-board">
        {scenarios.map((s, i) => (
          <FlipCard key={i} {...s} />
        ))}
      </div>

      <div className="spinner-button" onClick={() => setShowModal(true)}>
        🎡 Spin
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-header">
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
          </div>
          <div className="modal-content">
            <h2>🎯 Add Players</h2>

            <div className="player-input">
              <input
                type="text"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                placeholder="Enter player name"
              />
              <button onClick={handleAddPlayer}>➕ Add</button>
            </div>

            <div className="player-list">
              {players.map((player, index) => (
                <div
                  key={index}
                  onDoubleClick={() => {
                    if (window.confirm(`Delete ${player}?`)) {
                      setPlayers(players.filter((_, i) => i !== index));
                    }
                  }}
                  className={`player-name ${selectedPlayers.includes(player) ? "highlight" : ""}`}
                >
                  {player}
                </div>
              ))}
            </div>

            <div 
              className="wheel-container"
              onDoubleClick={handleWheelDoubleClick}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 3s ease-out" : "none",
              }}
            >
              <canvas id="wheel" width="300" height="300"></canvas>
            </div>

            <button className="spin-btn" onClick={handleSpin}>
              🌀 Spin!
            </button>

            {selectedPlayers.length > 0 && (
              <div className="result">
                🎯 {selectedPlayers[0]} and {selectedPlayers[1]}!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
