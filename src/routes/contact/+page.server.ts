import { fail } from '@sveltejs/kit';

export const actions = {
  submit: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const contact = data.get('contact');
    const remarks = data.get('remarks');

    if (!name || !contact || !remarks) {
      return fail(400, { error: 'All fields are required.' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set in .env. Emulating success.");
      // Simulating a network request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    }

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Acme <onboarding@resend.dev>', // Recommended default for Resend without verified domain
          to: ['sales@seyonflo.in'],
          subject: `New Inquiry from ${name}`,
          html: `
            <h3>New Website Inquiry</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact Info:</strong> ${contact}</p>
            <p><strong>Remarks:</strong></p>
            <p>${remarks}</p>
          `
        })
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Resend error:", err);
        return fail(500, { error: 'Failed to send email. Please try again later.' });
      }

      return { success: true };
    } catch (e) {
      console.error(e);
      return fail(500, { error: 'Failed to send email. Please try again later.' });
    }
  }
};
