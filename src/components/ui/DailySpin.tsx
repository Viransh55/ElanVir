import React, { useState } from 'react';
import { Gift, Sparkles, X } from 'lucide-react';

interface SpinReward {
  type: 'discount' | 'points' | 'shipping';
  value: string;
  description: string;
  color: string;
}

const DailySpin: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [reward, setReward] = useState<SpinReward | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);

  const rewards: SpinReward[] = [
    { type: 'discount', value: '10%', description: '10% off your next order', color: 'text-accent-600' },
    { type: 'points', value: '50', description: '50 ElanVir Points', color: 'text-primary-600' },
    { type: 'discount', value: '15%', description: '15% off luxury items', color: 'text-accent-600' },
    { type: 'points', value: '100', description: '100 ElanVir Points', color: 'text-primary-600' },
    { type: 'shipping', value: 'Free', description: 'Free express shipping', color: 'text-success-600' },
    { type: 'discount', value: '20%', description: '20% off featured items', color: 'text-accent-600' },
    { type: 'points', value: '25', description: '25 ElanVir Points', color: 'text-primary-600' },
    { type: 'discount', value: '5%', description: '5% off everything', color: 'text-accent-600' }
  ];

  const handleSpin = () => {
    if (hasSpun || isSpinning) return;

    setIsSpinning(true);
    
    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const randomRotation = 1440 + Math.random() * 720;
    setRotation(prev => prev + randomRotation);
    
    setTimeout(() => {
      const rewardIndex = Math.floor(Math.random() * rewards.length);
      const selectedReward = rewards[rewardIndex];
      
      setReward(selectedReward);
      setIsSpinning(false);
      setHasSpun(true);
      setShowModal(true);
      
      // Store in localStorage to prevent multiple spins per day
      localStorage.setItem('elanvir_daily_spin', new Date().toDateString());
    }, 3000);
  };

  // Check if user has already spun today
  React.useEffect(() => {
    const lastSpin = localStorage.getItem('elanvir_daily_spin');
    const today = new Date().toDateString();
    
    if (lastSpin === today) {
      setHasSpun(true);
    }
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg shadow-card p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gift className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-2">
            Daily Curator's Spin
          </h3>
          <p className="text-sm text-secondary-600">
            {hasSpun ? 'Come back tomorrow for another spin!' : 'Spin for exclusive rewards'}
          </p>
        </div>

        {/* Spin Wheel */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-accent-200 bg-white shadow-lg overflow-hidden">
            <div
              className="w-full h-full transition-transform duration-3000 ease-out"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(
                  from 0deg,
                  #fef3c7 0deg 45deg,
                  #ddd6fe 45deg 90deg,
                  #fecaca 90deg 135deg,
                  #bbf7d0 135deg 180deg,
                  #fed7aa 180deg 225deg,
                  #e0e7ff 225deg 270deg,
                  #fde68a 270deg 315deg,
                  #f3e8ff 315deg 360deg
                )`
              }}
            >
              {/* Reward segments */}
              {rewards.map((reward, index) => {
                const angle = (360 / rewards.length) * index;
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full flex items-center justify-center text-xs font-medium text-secondary-800"
                    style={{
                      transform: `rotate(${angle + 22.5}deg)`,
                      transformOrigin: 'center'
                    }}
                  >
                    <div
                      className="text-center"
                      style={{ transform: `rotate(-${angle + 22.5}deg)` }}
                    >
                      <div className="font-bold">{reward.value}</div>
                      <div className="text-xs">{reward.type}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-secondary-800"></div>
          </div>
        </div>

        <button
          onClick={handleSpin}
          disabled={hasSpun || isSpinning}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            hasSpun || isSpinning
              ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              : 'bg-accent-600 text-white hover:bg-accent-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSpinning ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Spinning...
            </div>
          ) : hasSpun ? (
            'Already Spun Today'
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Spin Now
            </div>
          )}
        </button>
      </div>

      {/* Reward Modal */}
      {showModal && reward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-luxury p-8 max-w-md w-full text-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-accent-600" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-secondary-800 mb-2">
              Congratulations!
            </h3>
            
            <p className="text-lg font-semibold mb-2 ${reward.color}">
              You won {reward.description}!
            </p>
            
            <p className="text-secondary-600 mb-6">
              Your reward has been added to your account and will be automatically applied at checkout.
            </p>
            
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 px-6 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              Claim Reward
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DailySpin;