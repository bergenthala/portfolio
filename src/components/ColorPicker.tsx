import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ColorPicker() {
  const [color, setColor] = useState('#3B82F6');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorValue = () => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    switch (colorFormat) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return color.toUpperCase();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getColorValue());
    // You could add a toast notification here
  };

  const presetColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
    '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Color Picker</h3>
      
      {/* Color Display */}
      <motion.div
        className="w-full h-32 rounded-xl mb-6 shadow-lg"
        style={{ backgroundColor: color }}
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.3 }}
      />

      {/* Color Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a color:
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>

      {/* Format Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Format:
        </label>
        <div className="flex gap-2">
          {(['hex', 'rgb', 'hsl'] as const).map((format) => (
            <motion.button
              key={format}
              onClick={() => setColorFormat(format)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                colorFormat === format
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {format.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Color Value Display */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Value:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={getColorValue()}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono"
          />
          <motion.button
            onClick={copyToClipboard}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Copy
          </motion.button>
        </div>
      </div>

      {/* Preset Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preset Colors:
        </label>
        <div className="grid grid-cols-6 gap-2">
          {presetColors.map((presetColor) => (
            <motion.button
              key={presetColor}
              onClick={() => setColor(presetColor)}
              className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-500 transition-colors"
              style={{ backgroundColor: presetColor }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
