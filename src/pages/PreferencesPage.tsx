import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';
import { toast } from 'react-toastify';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const PreferencesPage: React.FC = () => {
  const { preferences, togglePreference, selectedPreferences, savePreferences, loading } = usePreferences();
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const getPreferencesByCategory = (category: string) => {
    return preferences.filter(pref => pref.category === category);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedPreferences.length === 0) {
        toast.warning('Please select at least one preference');
        return;
      }

      await savePreferences();
      toast.success('Preferences saved successfully!');
      navigate('/recommendations');
    } catch (error) {
      toast.error('Failed to save preferences. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What are your interests?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Select your interests to help us provide personalized recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {getPreferencesByCategory('interest').map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`flex items-center p-4 rounded-lg border transition-all ${
                    pref.selected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  {pref.selected ? (
                    <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                  )}
                  <span className="ml-3 text-gray-800 dark:text-gray-200">{pref.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                disabled={loading}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What lifestyle do you prefer?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Tell us about your lifestyle preferences for better recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {getPreferencesByCategory('lifestyle').map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`flex items-center p-4 rounded-lg border transition-all ${
                    pref.selected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  {pref.selected ? (
                    <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                  )}
                  <span className="ml-3 text-gray-800 dark:text-gray-200">{pref.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                disabled={loading}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What are your hobbies?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Let us know your hobbies to tailor product recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {getPreferencesByCategory('hobby').map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`flex items-center p-4 rounded-lg border transition-all ${
                    pref.selected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  {pref.selected ? (
                    <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                  )}
                  <span className="ml-3 text-gray-800 dark:text-gray-200">{pref.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  step >= i
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {i}
              </div>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {i === 1 ? 'Interests' : i === 2 ? 'Lifestyle' : 'Hobbies'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-1 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        {renderStepContent()}
      </div>

      {/* Selected Preferences */}
      <div className="mt-8 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Selected Preferences ({selectedPreferences.length})
        </h3>
        {selectedPreferences.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedPreferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-700 dark:text-purple-300"
              >
                {pref.name}
                <button
                  onClick={() => togglePreference(pref.id)}
                  className="ml-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No preferences selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default PreferencesPage;