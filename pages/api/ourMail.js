import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received data:', req.body);

    const { subject, to, html } = req.body;

    console.log(req.body.html);

    let transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return res.status(500).json({ error: 'SMTP Verification Error' });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: 'carlo_ettisberger@hotmail.com',
        subject: subject,
        html: html,
      });
      return res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.error('Send Email Error:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
