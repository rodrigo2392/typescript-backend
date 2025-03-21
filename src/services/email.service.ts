import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

class EmailService {
  async sendEmail(email: string, body: string) {
    const { data, error } = await resend.emails.send({
      from: "Mi empresa <onboarding@resend.dev>",
      to: [email],
      subject: "Código de verificación",
      html: body,
    });

    if (error) {
      console.log({ error });
      throw new Error(error.message);
    }

    return data;
  }
}

const emailService = new EmailService();

export default emailService;
