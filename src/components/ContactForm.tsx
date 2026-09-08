import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function ContactForm() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client
      window.open(`mailto:bergenthalandrew@gmail.com?subject=${subject}&body=${body}`);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--surface)] p-8 rounded-2xl shadow-lg border border-[var(--border)]"
    >
      <h3 className="text-2xl font-bold text-ink mb-6">{t.contact.sendMessage}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
              {t.contact.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-ink focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
              placeholder={t.contact.namePlaceholder}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-ink focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
              placeholder={t.contact.emailPlaceholder}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-muted mb-2">
            {t.contact.subject}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-ink focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
            placeholder={t.contact.subjectPlaceholder}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">
            {t.contact.message}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-ink focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors resize-none"
            placeholder={t.contact.messagePlaceholder}
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? 'bg-slate-400 text-slate-700 cursor-not-allowed'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? t.contact.sending : t.contact.sendButton}
        </motion.button>
        
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 dark:bg-emerald-950/50 border border-green-400 dark:border-emerald-700 text-green-700 dark:text-emerald-300 rounded-lg"
          >
            {t.contact.successMessage}
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 dark:bg-rose-950/50 border border-red-400 dark:border-rose-700 text-red-700 dark:text-rose-300 rounded-lg"
          >
            {t.contact.errorMessage}
          </motion.div>
        )}
      </form>
      
      <div className="mt-6 pt-6 border-t border-[var(--border)]">
        <p className="text-sm text-muted text-center">
          {t.contact.orReachOut} <br />
          <a href="mailto:bergenthalandrew@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline">
            bergenthalandrew@gmail.com
          </a> • 
          <a href="tel:+13853472528" className="text-sky-600 dark:text-sky-400 hover:underline ml-2">
            +1 (385) 347-2528
          </a>
        </p>
      </div>
    </motion.div>
  );
}
