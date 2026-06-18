'use client';

import { useState } from 'react';
import { Play, Activity, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';

export default function DashboardPage() {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [plan, setPlan] = useState<any>(null);

  const triggerPipeline = async (mode: 'dry-run' | 'live') => {
    setStatus('running');
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Initiating pipeline (${mode})...`]);
    setPlan(null);

    try {
      const res = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, mode })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Success: ${data.message}`]);
      if (data.plan) {
        setPlan(data.plan);
      }
      setStatus('success');
    } catch (err: any) {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Error: ${err.message}`]);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 px-6 md:px-20 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground">Instagram Automation</h1>
          <p className="text-muted-foreground font-mono mt-4 uppercase tracking-widest text-sm">
            Control Center // Pipeline Status: <span className={status === 'running' ? 'text-primary animate-pulse' : ''}>{status.toUpperCase()}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="md:col-span-1 space-y-6 bg-card border border-border p-6 rounded-sm">
            <h2 className="font-mono text-primary text-sm uppercase tracking-widest mb-4">Command Input</h2>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Topic Override (Optional)</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Next.js 16 Trends"
                className="w-full bg-background border border-border p-3 text-foreground rounded-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={() => triggerPipeline('dry-run')}
                disabled={status === 'running'}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground p-3 hover:bg-secondary/80 transition-colors disabled:opacity-50"
              >
                <Activity className="w-4 h-4" /> Dry Run (Generate Plan)
              </button>
              
              <button 
                onClick={() => triggerPipeline('live')}
                disabled={status === 'running'}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground p-3 hover:bg-primary/80 transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4" /> Execute Live Pipeline
              </button>
            </div>
          </div>

          {/* Terminal / Logs */}
          <div className="md:col-span-2 bg-[#050505] border border-border p-6 rounded-sm flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-4">
              <h2 className="font-mono text-primary text-sm uppercase tracking-widest">System Logs</h2>
              <button onClick={() => setLogs([])} className="text-muted-foreground hover:text-foreground">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2">
              {logs.length === 0 && (
                <p className="text-muted-foreground/50 italic">Waiting for pipeline trigger...</p>
              )}
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('Error') ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Preview */}
        {plan && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-serif text-3xl">Generated Plan Preview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {plan.slides.map((slide: any, idx: number) => (
                <div key={idx} className="bg-card border border-border p-6 space-y-4 rounded-sm">
                  <div className="text-primary font-mono text-xs uppercase tracking-widest">Slide 0{idx + 1} // {slide.type}</div>
                  <p className="text-foreground font-serif text-xl leading-tight">{slide.content}</p>
                  <div className="bg-background p-3 border border-border text-xs text-muted-foreground font-mono">
                    <strong>Visual:</strong> {slide.imagery}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
