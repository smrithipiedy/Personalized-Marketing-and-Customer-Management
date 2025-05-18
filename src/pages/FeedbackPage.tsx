import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CheckCircle, Star } from 'lucide-react';

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [recommendationQuality, setRecommendationQuality] = useState<string>('');
  const [usability, setUsability] = useState<string>('');
  const [improvements, setImprovements] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const improvementOptions = [
    'More diverse recommendations',
    'Better UI/UX design',
    'Faster loading times',
    'More detailed product information',
    'Better filtering options',
    'Improved chatbot responses',
    'More personalization options'
  ];

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const toggleImprovement = (improvement: string) => {
    if (improvements.includes(improvement)) {
      setImprovements(improvements.filter(item => item !== improvement));
    } else {
      setImprovements([...improvements, improvement]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.warning('Please provide a rating');
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const feedbackData = {
        rating,
        feedbackText,
        recommendationQuality,
        usability,
        improvements
      };

      console.log('Feedback submitted:', feedbackData);
      
      setSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setHoveredRating(0);
    setFeedbackText('');
    setRecommendationQuality('');
    setUsability('');
    setImprovements([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
        <div className="text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You for Your Feedback!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your input helps us improve our personalized marketing recommendations and overall user experience.
          </p>
          <button 
            onClick={handleReset} 
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Help Us Improve</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We value your feedback to enhance our personalized marketing recommendations.
          Please share your thoughts with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Overall Rating */}
          <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              How would you rate your overall experience?
            </label>
            <div 
              className="flex items-center justify-center space-x-2"
              onMouseLeave={handleRatingLeave}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => handleRatingHover(value)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      (hoveredRating > 0 ? value <= hoveredRating : value <= rating)
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <div className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
              {rating > 0 && (
                <span>
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Recommendation Quality */}
          <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              How would you rate the quality of recommendations?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Not helpful', 'Somewhat helpful', 'Very helpful'].map((option) => (
                <label 
                  key={option} 
                  className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
                    recommendationQuality === option 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="recommendationQuality"
                    value={option}
                    checked={recommendationQuality === option}
                    onChange={(e) => setRecommendationQuality(e.target.value)}
                  />
                  <div className={`w-4 h-4 rounded-full border ${
                    recommendationQuality === option 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-400 dark:border-gray-600'
                  }`}>
                    {recommendationQuality === option && (
                      <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Usability */}
          <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              How easy was it to use our platform?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Difficult', 'Moderate', 'Very easy'].map((option) => (
                <label 
                  key={option} 
                  className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
                    usability === option 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="usability"
                    value={option}
                    checked={usability === option}
                    onChange={(e) => setUsability(e.target.value)}
                  />
                  <div className={`w-4 h-4 rounded-full border ${
                    usability === option 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-400 dark:border-gray-600'
                  }`}>
                    {usability === option && (
                      <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              What areas would you like to see improvements in? (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {improvementOptions.map((option) => (
                <label 
                  key={option} 
                  className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
                    improvements.includes(option) 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={improvements.includes(option)}
                    onChange={() => toggleImprovement(option)}
                  />
                  <div className={`w-4 h-4 rounded border ${
                    improvements.includes(option) 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-400 dark:border-gray-600'
                  }`}>
                    {improvements.includes(option) && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Comments */}
          <div>
            <label htmlFor="feedback" className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              Additional comments or suggestions
            </label>
            <textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
              placeholder="Share your thoughts, suggestions, or experiences..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;