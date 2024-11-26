'use client'

import React, { useContext } from 'react';
import { Trophy, CircleDot,ClockAlert, AlertCircle, Code2, Target } from 'lucide-react';
import LeetcodeContext from '../context/leetcodeContext';

const profileData = {
  username: "leetcoder_pro",
  totalSolved: 387,
  stats: {
    easy: { solved: 145, total: 836, color: "emerald" },
    medium: { solved: 201, total: 1755, color: "orange" },
    hard: { solved: 41, total: 766, color: "rose" }
  }
};
function formatTime(minutes: number) {
  const timeUnits = {
    decades: Math.floor(minutes / (60 * 24 * 365 * 10)),
    years: Math.floor((minutes % (60 * 24 * 365 * 10)) / (60 * 24 * 365)),
    months: Math.floor((minutes % (60 * 24 * 365)) / (60 * 24 * 30)),
    days: Math.floor((minutes % (60 * 24 * 30)) / (60 * 24)),
    hours: Math.floor((minutes % (60 * 24)) / 60),
  };
  return Object.entries(timeUnits).map(([unit, value]) => `${value || 0} ${unit}`).join(', ');
}

function ProblemCard({ 
  difficulty, 
  solved, 
  total, 
  time,
  icon: Icon 
}: { 
  difficulty: string; 
  solved: number; 
  total: number; 
  time: number;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-purple-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-700/30 hover:border-orange-500/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="text-orange-400" size={20} />
        <h3 className="text-lg font-medium text-orange-100">{difficulty}</h3>
      </div>
      <p className="text-3xl font-bold text-orange-400">{solved}</p>
      <p className="text-sm text-purple-200/70">out of {total} problems</p>
      <p className="text-sm text-white">{time} minutes spent</p>
      <div className="mt-3 w-full bg-purple-950/50 rounded-full h-2">
        <div 
          className={`h-full rounded-full bg-orange-500`}
          style={{ width: `${(solved/total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function App() {

    const context = useContext(LeetcodeContext);
    if( context === undefined ){
        throw new Error("Context not correctly defined");
    }

    const { leetcodeData, setLeetcodeData, username, setUsername } = context;
    console.log(leetcodeData);

    const easyTime = leetcodeData.easySolved * 15;
    const mediumTime = leetcodeData.mediumSolved * 30;
    const hardTime = leetcodeData.hardSolved * 60;

    const totalTime = easyTime + mediumTime + hardTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-400 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-purple-950 flex items-center justify-center">
                <Code2 size={32} className="text-orange-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-orange-100 mb-2">@{username}</h1>
            
          </div>

          {/* Total Solved Badge */}
          <div className="mb-12 text-center">
            <div className=" inline-block bg-purple-900/40 rounded-full px-6 py-2 backdrop-blur-sm border border-purple-700/30">
              <div className="mb-2 flex justify-center items-center gap-2">
                <Target className="text-orange-400" size={20} />
                <span className="text-lg sm:text-2xl text-purple-100">
                  Total Solved: <span className="text-orange-400 font-bold">{leetcodeData.totalSolved} questions</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockAlert className="text-orange-400" size={20} />
                <span className="text-lg sm:text-2xl text-purple-100">
                  Time wasted: <span className="text-orange-400 font-bold">{formatTime(totalTime)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Problem Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard 
              difficulty="Easy" 
              solved={leetcodeData.easySolved} 
              total={profileData.stats.easy.total} 
              time={easyTime}
              icon={CircleDot}
            />
            <ProblemCard 
              difficulty="Medium" 
              solved={leetcodeData.mediumSolved} 
              total={profileData.stats.medium.total} 
              time={mediumTime}
              icon={AlertCircle}
            />
            <ProblemCard 
              difficulty="Hard" 
              solved={leetcodeData.hardSolved} 
              total={profileData.stats.hard.total} 
              time={hardTime}
              icon={Trophy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;