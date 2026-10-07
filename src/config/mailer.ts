import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpPort === 465,
  auth: { user: env.smtpUser, pass: env.smtpPass },
});

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${env.smtpUser}>`,
    to: env.contactReceiverEmail,
    replyTo: data.email,
    subject: `New contact form submission from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Message:</strong></p><p>${data.message.replace(/\n/g, "<br>")}</p>`,
  });
}
