import { Suspense } from 'react';
import { summarizeFirebaseStudioContent } from '@/ai/flows/summarize-firebase-studio-content';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ContactForm } from '@/components/contact-form';
import { Header } from '@/components/header';
import { WebViewEmbed } from '@/components/webview-embed';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const WEBSITE_URL = 'https://studio.firebase.google.com/studio-1720065114';

async function SummaryContent() {
  let summary: string | null = null;
  let error: string | null = null;

  try {
    const result = await summarizeFirebaseStudioContent({ url: WEBSITE_URL });
    summary = result.summary;
  } catch (e) {
    console.error("AI Summary Error:", e);
    error = "Failed to generate summary. The AI model may be temporarily unavailable or the content could not be accessed.";
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const summaryPoints = summary
    ?.split('\n')
    .map(p => p.trim())
    .filter(p => p.startsWith('*'))
    .map(p => p.substring(1).trim());

  return (
    <ul className="space-y-3 list-disc list-inside text-sm text-foreground/80">
      {summaryPoints?.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}

function SummarySkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Summary</CardTitle>
                <CardDescription>Key features of Firebase Studio, summarized by GenAI.</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<SummarySkeleton />}>
                  <SummaryContent />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Have questions? Reach out to us.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 lg:h-[calc(100vh-150px)]">
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>An interactive embed of the Firebase Studio homepage.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <WebViewEmbed url={WEBSITE_URL} />
                </CardContent>
             </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
