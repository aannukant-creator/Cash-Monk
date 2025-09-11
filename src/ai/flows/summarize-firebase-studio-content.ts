'use server';

/**
 * @fileOverview This file defines a Genkit flow that summarizes the content of the Firebase Studio website.
 *
 * - summarizeFirebaseStudioContent - A function that takes a URL and returns a bullet-point summary of the website content.
 * - SummarizeFirebaseStudioContentInput - The input type for the summarizeFirebaseStudioContent function.
 * - SummarizeFirebaseStudioContentOutput - The return type for the summarizeFirebaseStudioContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFirebaseStudioContentInputSchema = z.object({
  url: z.string().url().describe('The URL of the Firebase Studio website to summarize.'),
});
export type SummarizeFirebaseStudioContentInput = z.infer<typeof SummarizeFirebaseStudioContentInputSchema>;

const SummarizeFirebaseStudioContentOutputSchema = z.object({
  summary: z.string().describe('A bullet-point summary of the key features and offerings of Firebase Studio.'),
});
export type SummarizeFirebaseStudioContentOutput = z.infer<typeof SummarizeFirebaseStudioContentOutputSchema>;

export async function summarizeFirebaseStudioContent(
  input: SummarizeFirebaseStudioContentInput
): Promise<SummarizeFirebaseStudioContentOutput> {
  return summarizeFirebaseStudioContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFirebaseStudioContentPrompt',
  input: {schema: SummarizeFirebaseStudioContentInputSchema},
  output: {schema: SummarizeFirebaseStudioContentOutputSchema},
  prompt: `You are an AI expert in summarizing website content into a concise bullet-point list.

  Summarize the key features and benefits of Firebase Studio from the content of the following website:
  
  URL: {{{url}}}

  Summary:
  `,
});

const summarizeFirebaseStudioContentFlow = ai.defineFlow(
  {
    name: 'summarizeFirebaseStudioContentFlow',
    inputSchema: SummarizeFirebaseStudioContentInputSchema,
    outputSchema: SummarizeFirebaseStudioContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
