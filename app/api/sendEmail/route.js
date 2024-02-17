import nodemailer from 'nodemailer';
import { emailStore } from '@/app/form/page';
import { formInformation } from '@/app/components/ContactForm/ContactForm';

export async function POST(request) {
  let formData;
  try {
    // Assuming you've parsed the JSON body from the request
    formData = await request.json(); // Adjust based on your server setup
  } catch (parseError) {
    console.error('Error parsing request body:', parseError);
    return { message: 'Bad Request', status: 400 };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.email',
      port: 587,
      auth: {
        user: 'carlo_ettisberger@hotmail.com',
        pass: 'dqC#4jpfX?Lqk6py1',
      },
    });

    const mailOptions = {
      from: 'carlo_ettisberger@hotmail.com',
      to: formData.email, // Adjust based on actual form data structure
      subject: 'Herzlichen Dank für Ihre Anfrage!',
      text: `Message details: ${formData.text}`, // Example, adjust as needed
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return { message: 'Email sent successfully', status: 200 };
  } catch (error) {
    console.error('Email send error:', error);
    return { message: 'Internal Server Error', status: 500 };
  }
}
