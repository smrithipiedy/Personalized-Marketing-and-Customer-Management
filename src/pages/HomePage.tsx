import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ThumbsUp, Sparkles, Shield, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">Personalized Marketing</span>
            <span className="block mt-1">Powered by AI</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Enhance customer engagement with personalized product recommendations 
            based on individual preferences and interests.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/preferences"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/recommendations"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-purple-600 bg-white border border-purple-600 hover:bg-gray-50 rounded-md shadow-sm transition duration-300 ease-in-out"
            >
              View Demos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Everything you need to create personalized marketing experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Preference Personalization</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Capture user interests and preferences to tailor marketing content specifically for them.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Leverage AI algorithms to provide smart product suggestions based on user behavior.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Feedback Integration</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Collect and analyze user feedback to continuously improve recommendation accuracy.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Security</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Robust security measures to protect user data and maintain confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Simple steps to get personalized recommendations
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Set Your Preferences</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your interests, hobbies, and product preferences.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI examines your preferences and matches them with relevant products.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive personalized product suggestions and marketing content.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/preferences"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Start Personalizing Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Hear from businesses that have transformed their marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-700 font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "The personalized marketing platform has increased our customer engagement by 45% and boosted sales conversions significantly."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-teal-200 flex items-center justify-center">
                  <span className="text-teal-700 font-bold">JS</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Jane Smith</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Director, FashionHub</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "We've seen a 60% increase in repeat customers since implementing this AI-powered recommendation system. Worth every penny!"
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
                  <span className="text-amber-700 font-bold">RJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Robert Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Owner, Fitness First</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "Our customers love the personalized workout recommendations. It's helped us build a loyal community around our fitness products."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Transform Your Marketing?</h2>
          <p className="mt-4 text-xl">
            Join thousands of businesses that are leveraging AI-powered personalization to boost engagement and sales.
          </p>
          <div className="mt-8">
            <Link
              to="/preferences"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white text-purple-600 hover:bg-gray-100 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;