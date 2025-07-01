import nodemailer from 'nodemailer';

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, company, service, message, formType } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const getServiceLabel = (serviceValue) => {
    const services = {
      'vapt': 'Vulnerability Assessment & Penetration Testing',
      'network-security': 'Network Security',
      'devsecops': 'DevSecOps Integration',
      'compliance': 'Compliance & Audit',
      'consultation': 'Security Consultation',
      'other': 'Other Services'
    };
    return services[serviceValue] || serviceValue;
  };

  const mailSubject = formType === 'assessment' 
    ? `🔒 New Security Assessment Request - ${company || 'Unknown Company'}`
    : `📧 New Contact Form Submission - ${name}`;
  
  const mailText = `
${formType === 'assessment' ? '🔒 SECURITY ASSESSMENT REQUEST' : '📧 NEW CONTACT FORM SUBMISSION'}

👤 CONTACT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}

${service ? `🔧 SERVICE INTEREST:
${getServiceLabel(service)}

` : ''}💬 MESSAGE:
${message}

---
This request was submitted through the ${formType === 'assessment' ? 'Security Assessment' : 'Contact'} form.
Please respond within ${formType === 'assessment' ? '2 hours' : '15 minutes'} as promised.

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
            width: 120px;
        }
        .value {
            color: #2c3e50;
        }
        .message-box {
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
            <h1>${formType === 'assessment' ? 'Security Assessment Request' : 'New Contact Form Submission'}</h1>
            <p>${formType === 'assessment' ? `Company: ${company || 'Unknown Company'}` : `From: ${name}`}</p>
        </div>

        <div class="section">
            <h3>Contact Information</h3>
            <div class="field"><span class="label">Name:</span><span class="value">${name}</span></div>
            <div class="field"><span class="label">Email:</span><span class="value">${email}</span></div>
            <div class="field"><span class="label">Phone:</span><span class="value">${phone || 'Not provided'}</span></div>
            <div class="field"><span class="label">Company:</span><span class="value">${company || 'Not provided'}</span></div>
        </div>

        ${service ? `
        <div class="section">
            <h3>Service Interest</h3>
            <div class="field"><span class="label">Service:</span><span class="value">${getServiceLabel(service)}</span></div>
        </div>
        ` : ''}

        <div class="section">
            <h3>Message</h3>
            <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
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
            <p>This request was submitted through the ${formType === 'assessment' ? 'Security Assessment' : 'Contact'} form.</p>
            <p><strong>Response Time:</strong> ${formType === 'assessment' ? '2 hours' : '15 minutes'}</p>
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email', details: error.message }), { status: 500 });
  }
} 