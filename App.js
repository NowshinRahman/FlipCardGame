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

    // If player is selected, use GOLD color, otherwise random color
    if (selectedPlayers.includes(player)) {
      ctx.fillStyle = "gold";
    } else {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 70%)`;
    }

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    // Draw text
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(startAngle + anglePerPlayer / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#333";
    ctx.font = selectedPlayers.includes(player) ? "bold 18px Arial" : "16px Arial";
    ctx.fillText(player, center - 10, 5);
    ctx.restore();
  });
}


function FlipCard({ category }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{category}</div>
      </div>
    </div>
  );
}

function App() {
  const categories = [
    {
      name: "Settings",
      cards: [
        "Waiting for the subway after work",
        "Having coffee in a café",
        "Casual chat at the office pantry",
        "Walking out of a meeting room",
        "Sitting together at a team lunch",
        "Giving feedback after a project presentation",
        "Bumped into each other at a company networking event",
        "Preparing slides together for a client meeting",
      ],
    },
    {
      name: "Person A",
      cards: [
        "Department Leader",
        "Visitor from a Rival Company",
        "Nepo Baby",
        "HR Specialist",
        "Project Manager",
        "CEO",
        "New Employee",
        "Intern",
      ],
    },
    {
      name: "Person B",
      cards: [
        "Burnt-out Employee",
        "Gossip Starter",
        "Ambitious Newcomer",
        "Skeptical Investor",
        "Out-of-Touch Senior Executive",
        "Over-enthusiastic Intern",
        "Freelance Consultant",
        "Office Clown",
      ],
    },
    {
      name: "Tone",
      cards: [
        "Formal",
        "Friendly",
        "Direct",
        "Humble",
        "Assertive",
        "Negotiating",
        "Funny",
        "Unattentive",
      ],
    },
    {
      name: "Word",
      cards: [
        "Synergy",
        "Bandwidth",
        "Circle-back",
        "Alignment",
        "Efficiency",
        "Scalability",
        "Stakeholder",
        "Move the needle",
      ],
    },
  ];
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
      const randomExtra = 360 * 5 + Math.floor(Math.random() * 360); // always 5 full spins + random
      setRotation(prev => prev + randomExtra); // ADD to previous rotation
  
      setTimeout(() => {
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        const winners = shuffled.slice(0, 2);
        setSelectedPlayers(winners);
        setSpinning(false);
      }, 3000); // 3 seconds spin
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

  return (
    <div className="App">
      <h1>Roleplay Flip Card Game</h1>

      <div className="game-board">
        {categories.map((category, index) => (
          <div className="category-column" key={index}>
            <div className="category-title">{category.name}</div>
            {category.cards.map((cardText, cardIndex) => (
              <FlipCard key={cardIndex} category={cardText} />
            ))}
          </div>
        ))}
      </div>

      <div className="spinner-button" onClick={() => setShowModal(true)}>
        🎡 Spin
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
          <button className="close-button" onClick={() => setShowModal(false)}>
            ×
          </button>
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
