import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Allowed file types
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req) {
  return new Promise((resolve) => {
    const form = new IncomingForm({
      maxFileSize: MAX_FILE_SIZE,
      filter: ({ mimetype }) => {
        // Only allow PDF and DOCX files
        return ALLOWED_TYPES.includes(mimetype);
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        resolve(new Response(JSON.stringify({ error: 'Error parsing form data' }), { status: 500 }));
        return;
      }

      const { name, email, phone, coverLetter } = fields;
      const cvFile = files.cv;

      // Additional server-side validation
      if (!cvFile || !cvFile[0]) {
        resolve(new Response(JSON.stringify({ error: 'Resume file is required' }), { status: 400 }));
        return;
      }

      const file = cvFile[0];
      
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.mimetype)) {
        resolve(new Response(JSON.stringify({ error: 'Invalid file type. Only PDF and DOCX files are allowed.' }), { status: 400 }));
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        resolve(new Response(JSON.stringify({ error: 'File size exceeds 5MB limit' }), { status: 400 }));
        return;
      }

      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // Prepare mail options
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to yourself
        subject: 'New Job Application',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCover Letter: ${coverLetter}`,
        attachments: [],
      };

      let tempFilePath = null;

      try {
        tempFilePath = file.filepath;
        
        // Create a read stream with no execute permissions
        const fileStream = fs.createReadStream(tempFilePath, { flags: 'r' });
        
        mailOptions.attachments.push({
          filename: file.originalFilename || 'resume.pdf',
          content: fileStream,
        });

        await transporter.sendMail(mailOptions);
        
        // Clean up: Remove temporary file
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
        
        resolve(new Response(JSON.stringify({ message: 'Application sent successfully!' }), { status: 200 }));
      } catch (error) {
        // Clean up even if email fails
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
        
        console.error('Nodemailer error:', error);
        resolve(new Response(JSON.stringify({ error: 'Failed to send email', details: error.message }), { status: 500 }));
      }
    });
  });
} 