import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subject, to, html } = req.body;

    let transporter = nodemailer.createTransport({
      host: 'www19.servertown.ch',
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
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
        to: to,
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
