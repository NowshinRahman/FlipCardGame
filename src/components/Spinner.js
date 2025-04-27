import React, { useState } from "react";
import SpinnerModal from "./SpinnerModal";

function Spinner() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl"
        onClick={handleOpen}
      >
        🎡
      </button>

      {showModal && <SpinnerModal closeModal={() => setShowModal(false)} />}
    </div>
  );
}

export default Spinner;
