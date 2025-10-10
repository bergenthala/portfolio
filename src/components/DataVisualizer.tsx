import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  year: number;
  value: number;
  category: string;
}

interface ChartData {
  name: string;
  data: DataPoint[];
  color: string;
}

export default function DataVisualizer() {
  const [selectedDataset, setSelectedDataset] = useState('tech');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated datasets representing real-world data
  const datasets = {
    tech: {
      name: 'Tech Industry Growth',
      description: 'Simulated data showing technology sector growth over time',
      data: [
        { name: 'Software Development', data: [
          { year: 2020, value: 85, category: 'Software Development' },
          { year: 2021, value: 92, category: 'Software Development' },
          { year: 2022, value: 98, category: 'Software Development' },
          { year: 2023, value: 105, category: 'Software Development' },
          { year: 2024, value: 112, category: 'Software Development' }
        ], color: '#3B82F6' },
        { name: 'AI/ML', data: [
          { year: 2020, value: 45, category: 'AI/ML' },
          { year: 2021, value: 58, category: 'AI/ML' },
          { year: 2022, value: 72, category: 'AI/ML' },
          { year: 2023, value: 88, category: 'AI/ML' },
          { year: 2024, value: 105, category: 'AI/ML' }
        ], color: '#10B981' },
        { name: 'Cybersecurity', data: [
          { year: 2020, value: 65, category: 'Cybersecurity' },
          { year: 2021, value: 72, category: 'Cybersecurity' },
          { year: 2022, value: 80, category: 'Cybersecurity' },
          { year: 2023, value: 89, category: 'Cybersecurity' },
          { year: 2024, value: 98, category: 'Cybersecurity' }
        ], color: '#F59E0B' }
      ]
    },
    climate: {
      name: 'Climate Data Trends',
      description: 'Simulated environmental data showing temperature and CO2 trends',
      data: [
        { name: 'Global Temperature (°C)', data: [
          { year: 2020, value: 14.8, category: 'Temperature' },
          { year: 2021, value: 14.9, category: 'Temperature' },
          { year: 2022, value: 15.1, category: 'Temperature' },
          { year: 2023, value: 15.3, category: 'Temperature' },
          { year: 2024, value: 15.5, category: 'Temperature' }
        ], color: '#EF4444' },
        { name: 'CO2 Levels (ppm)', data: [
          { year: 2020, value: 412, category: 'CO2' },
          { year: 2021, value: 415, category: 'CO2' },
          { year: 2022, value: 418, category: 'CO2' },
          { year: 2023, value: 421, category: 'CO2' },
          { year: 2024, value: 424, category: 'CO2' }
        ], color: '#8B5CF6' }
      ]
    },
    finance: {
      name: 'Financial Markets',
      description: 'Simulated stock market performance data',
      data: [
        { name: 'Tech Stocks', data: [
          { year: 2020, value: 100, category: 'Tech Stocks' },
          { year: 2021, value: 125, category: 'Tech Stocks' },
          { year: 2022, value: 95, category: 'Tech Stocks' },
          { year: 2023, value: 110, category: 'Tech Stocks' },
          { year: 2024, value: 135, category: 'Tech Stocks' }
        ], color: '#06B6D4' },
        { name: 'Energy Sector', data: [
          { year: 2020, value: 80, category: 'Energy' },
          { year: 2021, value: 85, category: 'Energy' },
          { year: 2022, value: 120, category: 'Energy' },
          { year: 2023, value: 105, category: 'Energy' },
          { year: 2024, value: 115, category: 'Energy' }
        ], color: '#F97316' }
      ]
    }
  };

  useEffect(() => {
    loadDataset(selectedDataset);
  }, [selectedDataset]);

  const loadDataset = async (dataset: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setChartData(datasets[dataset as keyof typeof datasets].data);
    setIsLoading(false);
  };

  const getMaxValue = () => {
    return Math.max(...chartData.flatMap(d => d.data.map(point => point.value)));
  };

  const getMinValue = () => {
    return Math.min(...chartData.flatMap(d => d.data.map(point => point.value)));
  };

  const getYears = () => {
    return chartData.length > 0 ? chartData[0].data.map(point => point.year) : [];
  };

  const renderBarChart = () => {
    const maxValue = getMaxValue();
    const minValue = getMinValue();
    const years = getYears();

    return (
      <div className="space-y-6">
        {chartData.map((dataset, index) => (
          <motion.div
            key={dataset.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-sm font-medium text-gray-700">{dataset.name}</span>
            </div>
            
            <div className="flex items-end gap-3 h-40 bg-gray-50 p-4 rounded-lg">
              {dataset.data.map((point, pointIndex) => {
                const height = ((point.value - minValue) / (maxValue - minValue)) * 100;
                return (
                  <motion.div
                    key={pointIndex}
                    className="flex-1 flex flex-col items-center justify-end"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + pointIndex * 0.05 }}
                  >
                    <div
                      className="w-full rounded-t-lg shadow-sm hover:shadow-md transition-shadow"
                      style={{
                        backgroundColor: dataset.color,
                        height: `${Math.max(height, 8)}%`,
                        minHeight: '8px'
                      }}
                    />
                    <div className="mt-2 text-center">
                      <div className="text-xs text-gray-600 font-medium">{point.year}</div>
                      <div className="text-xs text-gray-500">{point.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = getMaxValue();
    const minValue = getMinValue();
    const years = getYears();

    return (
      <div className="space-y-6">
        {chartData.map((dataset, index) => (
          <motion.div
            key={dataset.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-sm font-medium text-gray-700">{dataset.name}</span>
            </div>
            
            <div className="relative h-32 bg-gray-50 rounded-lg p-4">
              <svg className="w-full h-full">
                <motion.polyline
                  points={dataset.data.map((point, pointIndex) => {
                    const x = (pointIndex / (dataset.data.length - 1)) * 100;
                    const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 100;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke={dataset.color}
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                />
                
                {dataset.data.map((point, pointIndex) => {
                  const x = (pointIndex / (dataset.data.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 100;
                  return (
                    <motion.circle
                      key={pointIndex}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={dataset.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + pointIndex * 0.05 }}
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Data Visualization Dashboard</h3>
      
      {/* Dataset Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Dataset:
        </label>
        <div className="flex gap-2 mb-4">
          {Object.entries(datasets).map(([key, dataset]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedDataset(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDataset === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {dataset.name}
            </motion.button>
          ))}
        </div>
        
        <p className="text-sm text-gray-600">
          {datasets[selectedDataset as keyof typeof datasets].description}
        </p>
      </div>

      {/* Chart Type Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          <motion.button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Bar Chart
          </motion.button>
          <motion.button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📈 Line Chart
          </motion.button>
        </div>
      </div>

      {/* Chart Display */}
      <div className="bg-gray-50 p-6 rounded-lg min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            key={`${selectedDataset}-${chartType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {chartType === 'bar' ? renderBarChart() : renderLineChart()}
          </motion.div>
        )}
      </div>

      {/* Data Insights */}
      {!isLoading && chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg"
        >
          <h4 className="font-semibold text-blue-800 mb-2">Data Insights:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Dataset contains {chartData.reduce((acc, d) => acc + d.data.length, 0)} data points</li>
            <li>• Time range: {getYears()[0]} - {getYears()[getYears().length - 1]}</li>
            <li>• Value range: {getMinValue()} - {getMaxValue()}</li>
            <li>• {chartData.length} different categories tracked</li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
