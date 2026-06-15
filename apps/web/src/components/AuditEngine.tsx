'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Send } from 'lucide-react';

const STEPS = [
  {
    id: 'intro',
    question: "Ready to automate your factory?",
    options: ["Yes, let's audit my workflow", "I just want to say hi"],
  },
  {
    id: 'pain-point',
    question: "What's the biggest manual bottleneck in your business right now?",
    options: ["Content Generation", "Ad Management", "Idea Research", "Custom Software"],
  },
  {
    id: 'scale',
    question: "What is your target scale for this automation?",
    options: ["Just starting out", "Mid-size agency", "Enterprise scale"],
  },
];

export function AuditEngine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async (option: string) => {
    const stepId = STEPS[currentStep].id;
    const newAnswers = { ...answers, [stepId]: option };
    setAnswers(newAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Send data to Nest.js API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        await fetch(`${apiUrl}/audits`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bottleneck: newAnswers['pain-point'] || 'General',
            scale: newAnswers['scale'] || 'Unknown',
            email: 'user@example.com', // Would normally collect this in an extra step
          }),
        });
      } catch (error) {
        console.error('Failed to submit audit:', error);
      } finally {
        setIsSubmitting(false);
        setIsFinished(true);
      }
    }
  };

  return (
    <section className="min-h-screen bg-card flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="font-mono text-primary text-sm uppercase tracking-tighter">
                  Step 0{currentStep + 1} // Audit Engine
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight text-foreground">
                  {STEPS[currentStep].question}
                </h2>
              </div>

              <div className="grid gap-4 opacity-100">
                {STEPS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(option)}
                    disabled={isSubmitting}
                    className="group flex items-center justify-between p-6 bg-background border border-border rounded-sm hover:border-primary transition-all duration-300 text-left disabled:opacity-50"
                  >
                    <span className="text-xl md:text-2xl font-light text-foreground">{option}</span>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Send className="w-12 h-12" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-foreground">Transmission Received.</h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                The AI Factory is analyzing your data. Our lead engineer will be in touch within 24 cycles.
              </p>
              <button 
                onClick={() => {setCurrentStep(0); setIsFinished(false); setAnswers({});}}
                className="text-primary font-mono text-sm uppercase hover:underline"
              >
                Restart Audit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
