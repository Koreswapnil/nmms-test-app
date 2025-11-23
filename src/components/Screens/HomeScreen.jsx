import React from 'react';

const HomeScreen = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-800 flex flex-col items-center">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome in NMMS Test App
        </h1>

        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          Update About Exam
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg">
          NMMS परीक्षा दि. 21 डिसेंबर 2025 ऐवजी दि. 28 डिसेंबर 2025 रोजी आयोजित
          केली आहे.
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
