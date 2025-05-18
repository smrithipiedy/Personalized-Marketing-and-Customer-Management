import React, { useState, useEffect } from 'react';
import { BarChart, BarChart2, Users, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
}

interface AnalyticsData {
  userPreferences: DataPoint[];
  recommendationClicks: DataPoint[];
  conversionRates: DataPoint[];
  userEngagement: {
    current: number;
    previous: number;
    change: number;
  };
  recommendations: {
    current: number;
    previous: number;
    change: number;
  };
  conversions: {
    current: number;
    previous: number;
    change: number;
  };
  feedback: {
    current: number;
    previous: number;
    change: number;
  };
}

const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        const mockData: AnalyticsData = {
          userPreferences: [
            { label: 'Technology', value: 42 },
            { label: 'Fitness', value: 28 },
            { label: 'Fashion', value: 18 },
            { label: 'Home', value: 12 },
          ],
          recommendationClicks: [
            { label: 'Technology', value: 65 },
            { label: 'Fitness', value: 40 },
            { label: 'Fashion', value: 32 },
            { label: 'Home', value: 28 },
          ],
          conversionRates: [
            { label: 'Technology', value: 8.5 },
            { label: 'Fitness', value: 6.2 },
            { label: 'Fashion', value: 5.8 },
            { label: 'Home', value: 4.1 },
          ],
          userEngagement: {
            current: 4567,
            previous: 4123,
            change: 10.8
          },
          recommendations: {
            current: 12458,
            previous: 10234,
            change: 21.7
          },
          conversions: {
            current: 879,
            previous: 782,
            change: 12.4
          },
          feedback: {
            current: 342,
            previous: 301,
            change: 13.6
          }
        };

        setData(mockData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  const handlePeriodChange = (newPeriod: 'day' | 'week' | 'month') => {
    setPeriod(newPeriod);
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor the performance of your personalized marketing system
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex">
          {(['day', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                period === p
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="User Engagement"
          value={data.userEngagement.current}
          change={data.userEngagement.change}
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
        <MetricCard
          title="Recommendations"
          value={data.recommendations.current}
          change={data.recommendations.change}
          icon={<BarChart className="h-6 w-6 text-teal-600" />}
        />
        <MetricCard
          title="Conversions"
          value={data.conversions.current}
          change={data.conversions.change}
          icon={<ShoppingBag className="h-6 w-6 text-amber-600" />}
        />
        <MetricCard
          title="Feedback Collected"
          value={data.feedback.current}
          change={data.feedback.change}
          icon={<BarChart2 className="h-6 w-6 text-red-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Preferences Distribution</h2>
          </div>
          <div className="p-4">
            <div className="h-64">
              <BarChartComponent data={data.userPreferences} color="#8b5cf6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommendation Clicks by Category</h2>
          </div>
          <div className="p-4">
            <div className="h-64">
              <BarChartComponent data={data.recommendationClicks} color="#0d9488" />
            </div>
          </div>
        </div>
      </div>

      {/* More Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden lg:col-span-2">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rates by Category (%)</h2>
          </div>
          <div className="p-4">
            <div className="h-64">
              <BarChartComponent data={data.conversionRates} color="#f59e0b" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Products</h2>
          </div>
          <div className="px-4 py-2">
            {['Premium Fitness Tracker', 'Wireless Earbuds Pro', 'Smart Home Hub', 'Minimalist Leather Watch'].map((product, index) => (
              <div 
                key={index} 
                className="py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="ml-3 text-gray-800 dark:text-gray-200">{product}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium mr-1">
                    {Math.floor(Math.random() * 10) + 5}%
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</h3>
        </div>
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        <span className="text-sm font-medium">{change.toFixed(1)}%</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last {period}</span>
      </div>
    </div>
  );
};

interface BarChartComponentProps {
  data: DataPoint[];
  color: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, color }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="h-full flex flex-col justify-end">
      <div className="flex-1 flex items-end">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full px-2">
              <div
                className="w-full rounded-t-md transition-all duration-700 ease-out"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                  minHeight: '10px',
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center w-full truncate px-1">
              {item.label}
            </div>
            <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {typeof item.value === 'number' && item.value % 1 === 0 ? item.value : item.value.toFixed(1)}
              {item.label.includes('Rate') && '%'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;