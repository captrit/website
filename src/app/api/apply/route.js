import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Not provided';
    const linkedin = formData.get('linkedin') || 'Not provided';
    const portfolio = formData.get('portfolio') || 'Not provided';
    const coverLetter = formData.get('coverLetter') || 'Not provided';
    const experience = formData.get('experience') || 'Not provided';
    const whyJoin = formData.get('whyJoin') || 'Not provided';
    
    // Extract job information
    const jobTitle = formData.get('jobTitle');
    const jobId = formData.get('jobId');
    const jobCategory = formData.get('jobCategory');
    const jobLocation = formData.get('jobLocation');
    
    // Get resume file
    const resumeFile = formData.get('resume');

    if (!name || !email || !jobTitle || !resumeFile) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailSubject = `📋 New Job Application - ${jobTitle} (ID: ${jobId})`;
    
    const mailText = `
🚀 NEW JOB APPLICATION RECEIVED

📋 JOB DETAILS:
Position: ${jobTitle}
Job ID: ${jobId}
Category: ${jobCategory}
Location: ${jobLocation}

👤 APPLICANT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin}
Portfolio: ${portfolio}

📝 APPLICATION DETAILS:
Cover Letter: ${coverLetter}
Relevant Experience: ${experience}
Why Join Captrit: ${whyJoin}

---
This application was submitted through the careers portal.
Please review and respond within 48 hours.

Generated on: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Dubai',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
  `;

    const mailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #e5e5e5;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .header h1 {
            margin: 0;
            color: #2c3e50;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 5px 0 0 0;
            color: #7f8c8d;
            font-size: 14px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h3 {
            margin: 0 0 10px 0;
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
        }
        .field {
            margin-bottom: 8px;
        }
        .label {
            font-weight: 600;
            color: #34495e;
            display: inline-block;
            width: 140px;
        }
        .value {
            color: #2c3e50;
        }
        .content-box {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #7f8c8d;
        }
        .urgent {
            background: #fff3cd;
            border-left-color: #ffc107;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Job Application</h1>
            <p>Position: ${jobTitle} (ID: ${jobId})</p>
        </div>

        <div class="section">
            <h3>Job Details</h3>
            <div class="field"><span class="label">Position:</span><span class="value">${jobTitle}</span></div>
            <div class="field"><span class="label">Job ID:</span><span class="value">${jobId}</span></div>
            <div class="field"><span class="label">Category:</span><span class="value">${jobCategory}</span></div>
            <div class="field"><span class="label">Location:</span><span class="value">${jobLocation}</span></div>
        </div>

        <div class="section">
            <h3>Applicant Information</h3>
            <div class="field"><span class="label">Name:</span><span class="value">${name}</span></div>
            <div class="field"><span class="label">Email:</span><span class="value">${email}</span></div>
            <div class="field"><span class="label">Phone:</span><span class="value">${phone}</span></div>
            <div class="field"><span class="label">LinkedIn:</span><span class="value">${linkedin}</span></div>
            <div class="field"><span class="label">Portfolio:</span><span class="value">${portfolio}</span></div>
        </div>

        <div class="section">
            <h3>Cover Letter</h3>
            <div class="content-box">
                ${coverLetter}
            </div>
        </div>

        <div class="section">
            <h3>Relevant Experience</h3>
            <div class="content-box">
                ${experience}
            </div>
        </div>

        <div class="section">
            <h3>Why Join Captrit</h3>
            <div class="content-box urgent">
                ${whyJoin}
            </div>
        </div>

        <div class="footer">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
              timeZone: 'Asia/Dubai',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>This application was submitted through the careers portal.</p>
            <p><strong>Response Time:</strong> 48 hours</p>
        </div>
    </div>
</body>
</html>
  `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
      attachments: resumeFile ? [
        {
          filename: resumeFile.name,
          content: Buffer.from(await resumeFile.arrayBuffer()),
          contentType: resumeFile.type
        }
      ] : []
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Application submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Job application error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit application', details: error.message }), { status: 500 });
  }
} 