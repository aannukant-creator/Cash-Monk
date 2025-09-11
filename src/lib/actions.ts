'use server';

import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // In a real app, you would integrate with an email sending service.
    console.log("New contact form submission:", data);

    // Simulate network delay for UI feedback
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
