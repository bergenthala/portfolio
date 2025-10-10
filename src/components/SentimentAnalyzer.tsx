import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SentimentResult {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keywords: string[];
}

export default function SentimentAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Enhanced sentiment analysis with more comprehensive word lists and context awareness
  const analyzeSentiment = (text: string): SentimentResult => {
    // Expanded positive words with intensity scoring
    const positiveWords = {
      // High intensity positive
      'amazing': 3, 'fantastic': 3, 'outstanding': 3, 'brilliant': 3, 'excellent': 3,
      'perfect': 3, 'wonderful': 3, 'marvelous': 3, 'superb': 3, 'incredible': 3,
      'phenomenal': 3, 'exceptional': 3, 'magnificent': 3, 'spectacular': 3,
      
      // Medium intensity positive
      'great': 2, 'good': 2, 'awesome': 2, 'love': 2, 'enjoy': 2, 'happy': 2,
      'pleased': 2, 'satisfied': 2, 'delighted': 2, 'thrilled': 2, 'excited': 2,
      'impressed': 2, 'content': 2, 'grateful': 2, 'blessed': 2,
      
      // Low intensity positive
      'like': 1, 'nice': 1, 'decent': 1, 'acceptable': 1,
      'adequate': 1, 'satisfactory': 1, 'reasonable': 1, 'fair': 1
    };
    
    // Expanded negative words with intensity scoring
    const negativeWords = {
      // High intensity negative
      'terrible': 3, 'awful': 3, 'horrible': 3, 'disgusting': 3, 'hate': 3,
      'worst': 3, 'pathetic': 3, 'useless': 3, 'ridiculous': 3, 'disgusted': 3,
      'furious': 3, 'outraged': 3, 'appalled': 3, 'revolting': 3, 'atrocious': 3,
      
      // Medium intensity negative
      'bad': 2, 'disappointed': 2, 'frustrated': 2, 'angry': 2, 'upset': 2,
      'annoyed': 2, 'sad': 2, 'unhappy': 2, 'displeased': 2, 'dissatisfied': 2,
      'concerned': 2, 'worried': 2, 'bothered': 2, 'troubled': 2, 'distressed': 2,
      
      // Low intensity negative
      'dislike': 1, 'uncomfortable': 1, 'unpleasant': 1, 'boring': 1, 'dull': 1,
      'mediocre': 1, 'subpar': 1, 'lacking': 1, 'inadequate': 1, 'poor': 1
    };

    // Negation words that flip sentiment
    const negationWords = ['not', 'no', 'never', 'none', 'nothing', 'nobody', 'nowhere', 'neither', 'nor', 'cannot', "can't", "won't", "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't", "weren't"];
    
    // Intensifiers that amplify sentiment
    const intensifiers = ['very', 'extremely', 'incredibly', 'absolutely', 'totally', 'completely', 'utterly', 'really', 'quite', 'rather', 'somewhat', 'slightly', 'barely', 'hardly'];
    
    // Neutral words that should not strongly influence sentiment
    const neutralWords = ['okay', 'fine', 'alright', 'average', 'mediocre', 'ordinary', 'standard', 'typical', 'normal', 'regular', 'moderate', 'middle', 'neutral', 'balanced', 'mixed'];

    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 1);
    
    let positiveScore = 0;
    let negativeScore = 0;
    const foundKeywords: string[] = [];
    let negationCount = 0;
    let intensifierCount = 0;

    // Analyze each word and its context
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const prevWord = i > 0 ? words[i - 1] : '';
      const nextWord = i < words.length - 1 ? words[i + 1] : '';
      
      // Check for negations
      if (negationWords.includes(word)) {
        negationCount++;
        continue;
      }
      
      // Check for intensifiers
      if (intensifiers.includes(word)) {
        intensifierCount++;
        continue;
      }
      
      // Check for neutral words (skip them to avoid bias)
      if (neutralWords.includes(word)) {
        continue;
      }
      
      // Check positive words
      if (word in positiveWords) {
        let score = positiveWords[word as keyof typeof positiveWords];
        
        // Apply negation if previous word is negation
        if (negationWords.includes(prevWord)) {
          score = -score;
          negativeScore += Math.abs(score);
          foundKeywords.push(`not ${word}`);
        } else {
          positiveScore += score;
          foundKeywords.push(word);
        }
      }
      
      // Check negative words
      if (word in negativeWords) {
        let score = negativeWords[word as keyof typeof negativeWords];
        
        // Apply negation if previous word is negation
        if (negationWords.includes(prevWord)) {
          score = -score;
          positiveScore += Math.abs(score);
          foundKeywords.push(`not ${word}`);
        } else {
          negativeScore += score;
          foundKeywords.push(word);
        }
      }
    }

    // Apply intensifier multiplier
    const intensifierMultiplier = 1 + (intensifierCount * 0.2);
    positiveScore *= intensifierMultiplier;
    negativeScore *= intensifierMultiplier;

    // Calculate sentiment and confidence with better neutral detection
    const totalScore = positiveScore + negativeScore;
    const scoreDifference = Math.abs(positiveScore - negativeScore);
    const scoreRatio = totalScore > 0 ? scoreDifference / totalScore : 0;
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    let confidence: number;

    // If scores are very close or both low, classify as neutral
    if (totalScore === 0 || scoreRatio < 0.4) {
      sentiment = 'neutral';
      confidence = 0.7;
    } else if (positiveScore > negativeScore) {
      sentiment = 'positive';
      confidence = Math.min(0.95, 0.6 + scoreRatio * 0.35);
    } else if (negativeScore > positiveScore) {
      sentiment = 'negative';
      confidence = Math.min(0.95, 0.6 + scoreRatio * 0.35);
    } else {
      sentiment = 'neutral';
      confidence = 0.8;
    }

    // Special case: if we have both positive and negative negations, lean neutral
    const hasPositiveNegation = foundKeywords.some(k => k.startsWith('not ') && 
      (k.includes('terrible') || k.includes('bad') || k.includes('awful') || k.includes('horrible')));
    const hasNegativeNegation = foundKeywords.some(k => k.startsWith('not ') && 
      (k.includes('good') || k.includes('great') || k.includes('amazing') || k.includes('wonderful')));
    
    if (hasPositiveNegation && hasNegativeNegation) {
      sentiment = 'neutral';
      confidence = Math.max(confidence, 0.8);
    }

    // Special case: phrases with neutral indicators should lean neutral
    const neutralPhrases = ['nothing special', 'not bad', 'not great', 'okay', 'fine', 'alright', 'average'];
    const hasNeutralPhrase = neutralPhrases.some(phrase => text.toLowerCase().includes(phrase));
    
    if (hasNeutralPhrase && totalScore < 3) {
      sentiment = 'neutral';
      confidence = Math.max(confidence, 0.75);
    }

    // Boost confidence for longer texts with more keywords
    const keywordDensity = foundKeywords.length / words.length;
    confidence = Math.min(0.95, confidence + (keywordDensity * 0.1));

    return {
      text,
      sentiment,
      confidence: Math.round(confidence * 100),
      keywords: [...new Set(foundKeywords)]
    };
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate processing time for more realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeSentiment(inputText);
    setResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
    setInputText('');
    setIsAnalyzing(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const sampleTexts = [
    "This product is absolutely amazing! I love it so much.",
    "The service was terrible and I'm very disappointed.",
    "It's okay, nothing special but not bad either.",
    "I'm so happy with this purchase, it exceeded my expectations!",
    "This is the worst experience I've ever had.",
    "I'm not happy with this at all, it's completely useless.",
    "The quality is outstanding and I'm extremely satisfied!",
    "It's not terrible, but it's not great either.",
    "It's okay, nothing special but not bad either.",
    "I absolutely hate this, it's the most disappointing thing ever.",
    "This is fantastic! I couldn't be more pleased with the results."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI Sentiment Analyzer</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter text to analyze:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here to analyze its sentiment..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <motion.button
        onClick={handleAnalyze}
        disabled={!inputText.trim() || isAnalyzing}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          !inputText.trim() || isAnalyzing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        whileHover={!isAnalyzing && inputText.trim() ? { scale: 1.02 } : {}}
        whileTap={!isAnalyzing && inputText.trim() ? { scale: 0.98 } : {}}
      >
        {isAnalyzing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Analyzing...
          </div>
        ) : (
          'Analyze Sentiment'
        )}
      </motion.button>

      {/* Sample Texts */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Try these sample texts:</p>
        <div className="space-y-2">
          {sampleTexts.map((text, index) => (
            <motion.button
              key={index}
              onClick={() => setInputText(text)}
              className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              "{text}"
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results:</h4>
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSentimentEmoji(result.sentiment)}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(result.sentiment)}`}>
                      {result.sentiment.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {result.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-2">"{result.text}"</p>
                
                {result.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-gray-500">Keywords:</span>
                    {result.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>How it works:</strong> This demo uses keyword-based sentiment analysis with confidence scoring. 
          In a real implementation, this would use machine learning models like BERT or RoBERTa for more accurate results.
        </p>
      </div>
    </motion.div>
  );
}
