import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    image: string;
    tags: string[];
  }[];
}

const StyleQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which aesthetic speaks to your soul?",
      options: [
        {
          id: "minimalist",
          text: "Clean & Minimalist",
          image: "https://images.pexels.com/photos/6707413/pexels-photo-6707413.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["timeless", "sustainable"]
        },
        {
          id: "luxurious",
          text: "Rich & Luxurious",
          image: "https://images.pexels.com/photos/1454047/pexels-photo-1454047.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["luxury", "handcrafted"]
        },
        {
          id: "artisanal",
          text: "Artisanal & Unique",
          image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["handcrafted", "limited edition"]
        }
      ]
    },
    {
      id: 2,
      question: "What defines your ideal living space?",
      options: [
        {
          id: "serene",
          text: "Serene & Peaceful",
          image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["sustainable", "timeless"]
        },
        {
          id: "sophisticated",
          text: "Sophisticated & Elegant",
          image: "https://images.pexels.com/photos/6344231/pexels-photo-6344231.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["luxury", "timeless"]
        },
        {
          id: "eclectic",
          text: "Eclectic & Personal",
          image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["handcrafted", "limited edition"]
        }
      ]
    },
    {
      id: 3,
      question: "Which texture draws you in?",
      options: [
        {
          id: "smooth",
          text: "Smooth & Refined",
          image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["luxury", "timeless"]
        },
        {
          id: "natural",
          text: "Natural & Organic",
          image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["sustainable", "handcrafted"]
        },
        {
          id: "textured",
          text: "Rich & Textured",
          image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["handcrafted", "luxury"]
        }
      ]
    },
    {
      id: 4,
      question: "What occasion inspires your style choices?",
      options: [
        {
          id: "everyday",
          text: "Everyday Elegance",
          image: "https://images.pexels.com/photos/7679442/pexels-photo-7679442.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["timeless", "sustainable"]
        },
        {
          id: "special",
          text: "Special Moments",
          image: "https://images.pexels.com/photos/1454047/pexels-photo-1454047.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["luxury", "limited edition"]
        },
        {
          id: "creative",
          text: "Creative Expression",
          image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["handcrafted", "limited edition"]
        }
      ]
    },
    {
      id: 5,
      question: "Which color palette resonates with you?",
      options: [
        {
          id: "neutral",
          text: "Neutral & Earthy",
          image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["timeless", "sustainable"]
        },
        {
          id: "rich",
          text: "Rich & Deep",
          image: "https://images.pexels.com/photos/6344231/pexels-photo-6344231.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["luxury", "handcrafted"]
        },
        {
          id: "warm",
          text: "Warm & Inviting",
          image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
          tags: ["handcrafted", "timeless"]
        }
      ]
    }
  ];

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = () => {
    // Analyze answers to determine style preferences
    const tagCounts: { [key: string]: number } = {};
    
    Object.values(answers).forEach(answerId => {
      questions.forEach(question => {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          option.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
    });

    // Store results in localStorage for shop filtering
    const styleProfile = {
      preferences: tagCounts,
      completedAt: new Date().toISOString(),
      answers
    };
    
    localStorage.setItem('elanvir_style_profile', JSON.stringify(styleProfile));
    setIsCompleted(true);
  };

  const getStyleRecommendation = () => {
    const tagCounts: { [key: string]: number } = {};
    
    Object.values(answers).forEach(answerId => {
      questions.forEach(question => {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          option.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
    });

    const topTag = Object.entries(tagCounts).sort(([,a], [,b]) => b - a)[0];
    
    const recommendations = {
      'luxury': {
        title: 'Luxury Connoisseur',
        description: 'You appreciate the finest things in life, with an eye for exceptional quality and sophisticated design.',
        color: 'accent'
      },
      'handcrafted': {
        title: 'Artisan Appreciator',
        description: 'You value unique, handmade pieces that tell a story and showcase exceptional craftsmanship.',
        color: 'primary'
      },
      'timeless': {
        title: 'Classic Curator',
        description: 'You prefer enduring elegance and pieces that transcend trends, building a lasting collection.',
        color: 'secondary'
      },
      'sustainable': {
        title: 'Conscious Collector',
        description: 'You prioritize ethical and sustainable choices, seeking beauty that aligns with your values.',
        color: 'success'
      },
      'limited edition': {
        title: 'Exclusive Explorer',
        description: 'You seek rare and unique pieces that set you apart, building a truly distinctive collection.',
        color: 'accent'
      }
    };

    return recommendations[topTag?.[0] as keyof typeof recommendations] || recommendations.timeless;
  };

  if (isCompleted) {
    const recommendation = getStyleRecommendation();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-luxury p-8 mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-primary-700" />
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-secondary-800 mb-4">
              Your Style Profile: {recommendation.title}
            </h1>
            
            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              {recommendation.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h3 className="font-semibold text-secondary-800 mb-2">Personalized Curation</h3>
                <p className="text-sm text-secondary-600">
                  Your shop experience is now tailored to your unique style preferences.
                </p>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h3 className="font-semibold text-secondary-800 mb-2">Exclusive Recommendations</h3>
                <p className="text-sm text-secondary-600">
                  Discover pieces that perfectly match your aesthetic vision.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/shop?personalized=true')}
                className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              >
                Shop Your Style
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-secondary-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-luxury p-8 mb-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-secondary-800 text-center mb-8">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                  answers[currentQuestion] === option.id
                    ? 'ring-4 ring-primary-500 scale-105'
                    : 'hover:scale-102 hover:shadow-lg'
                }`}
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={option.image}
                    alt={option.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif text-lg font-semibold text-white mb-2">
                      {option.text}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {option.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {answers[currentQuestion] === option.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="flex items-center px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;