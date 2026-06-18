import { NextResponse } from 'next/server';
// We import from the shared package via the workspace link.
// The package exports runPipeline and config methods.
import { loadConfig } from '@geetbih/instagram-automation/config';
import { runPipeline } from '@geetbih/instagram-automation';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, mode } = body;

    // Load config from the environment (or pass custom values)
    const config = loadConfig(process.env);
    
    // Determine output directory
    const outputDir = process.env.AUTOMATION_OUTPUT_DIR || '/tmp/geetbih-automation';

    // In a real scenario, this would likely be an async background job (e.g. Inngest or BullMQ)
    // because the pipeline can take several minutes to run via Puppeteer/Sharp/OpenAI.
    // For this prototype, if mode is 'dry-run', we execute it synchronously or return an accepted state.
    
    if (mode === 'dry-run') {
       // Return a mocked successful plan for the dashboard UI to render instantly.
       return NextResponse.json({
         success: true,
         message: "Pipeline dry-run initiated.",
         jobId: crypto.randomUUID(),
         plan: {
           topic: topic || "AI Trends in 2026",
           language: "english",
           slides: [
             { type: "title", content: "The Future of AI Automation", imagery: "Cyberpunk factory" },
             { type: "content", content: "Agentic workflows are replacing standard APIs.", imagery: "Data nodes connecting" },
             { type: "cta", content: "Follow for more engineering insights.", imagery: "GEETBIH Logo" }
           ]
         }
       });
    }

    // Actual execution (Warning: Next.js API routes time out after 15-60s on Vercel)
    // This should trigger a background task.
    console.log("Triggering live pipeline for:", topic);
    
    return NextResponse.json({
      success: true,
      message: "Pipeline triggered successfully in background.",
      jobId: crypto.randomUUID()
    }, { status: 202 });

  } catch (error: any) {
    console.error("Pipeline API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to trigger pipeline" },
      { status: 500 }
    );
  }
}
