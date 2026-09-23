import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  showText?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 72,
  strokeWidth = 6,
  color = '#1e40af', // primary blue
  trackColor = '#e2e8f0',
  label,
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        {showText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-bold text-slate-800 tracking-tight leading-none">
              {Math.round(percentage)}%
            </span>
            {label && <span className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
