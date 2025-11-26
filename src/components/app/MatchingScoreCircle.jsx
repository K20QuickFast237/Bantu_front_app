import React from 'react';

const MatchingScoreCircle = ({ score, size = 60 }) => {
  const strokeWidth = 5; // Épaisseur du trait
  // Le rayon est calculé pour que le cercle entier (trait inclus) tienne dans la 'size'
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  // L'offset est calculé pour que le cercle se remplisse dans le bon sens
  const offset = circumference - (score / 100) * circumference;

  // Déterminer la couleur en fonction du score
  const getColor = () => {
    if (score < 40) {
      return 'text-red-500'; // Rouge pour les scores bas
    }
    if (score < 75) {
      return 'text-orange-500'; // Orange pour les scores moyens
    }
    return 'text-green-500'; // Vert pour les scores élevés
  };

  const colorClass = getColor();

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorClass} transition-all duration-500 ease-in-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className={`absolute text-sm font-bold ${colorClass}`}>{`${Math.round(score)}%`}</span>
    </div>
  );
};

export default MatchingScoreCircle;