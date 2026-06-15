import { AppWindow, Send, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border px-6 md:px-20 py-12">
      <div className="grid md:grid-cols-4 gap-12 items-start">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-serif font-bold">GEETBIH <span className="text-primary">LABS</span></h2>
          <p className="text-muted-foreground max-w-sm">
            A high-performance digital foundry specializing in AI automation, software engineering, and visual branding.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <Globe className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            <AppWindow className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            <Send className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-mono text-sm text-primary uppercase">Contact</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="hover:text-foreground transition-colors cursor-pointer">hello@geetbih.com</li>
            <li className="hover:text-foreground transition-colors cursor-pointer">careers@geetbih.com</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-sm text-primary uppercase">Location</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Digital Nomad</li>
            <li>Remote-First</li>
            <li>Earth // Orbit</li>
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
        <span>&copy; 2026 GEETBIH LABS PVT LTD. All rights reserved.</span>
        <span>Built with Precision.</span>
      </div>
    </footer>
  );
}
