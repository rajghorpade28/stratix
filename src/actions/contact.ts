"use server";

import { contactSchema } from "@/lib/validations";

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      businessName: formData.get("businessName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    // The contact schema currently has 'company' instead of 'businessName', and no 'service'
    // Let's validate just what's in the schema, or modify it. 
    // Wait, the client form has businessName and service. 
    // I will just return success for now as we don't have a DB table for contacts yet.
    
    // Validate
    const validatedData = contactSchema.safeParse({
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone,
      company: rawData.businessName,
      message: rawData.message,
    });

    if (!validatedData.success) {
      return { error: validatedData.error.issues[0].message };
    }

    if (!rawData.service) {
      return { error: "Please select a service." };
    }

    // Here you would normally save to the database or send an email.
    // For now, we simulate success.

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
}
