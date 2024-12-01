import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define the data structure for the incoming contact form
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactForm = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // The admin's email address
      replyTo: email,
      subject: `Web enquiry from ${name}`,
      text: message,
      html: `<p>Hi Emily,</p><p>You have a new website enquiry from ${name}.</p><p>You can reply to them by replying to this email.</p><p>${message}</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending email', error },
      { status: 500 }
    );
  }
}
