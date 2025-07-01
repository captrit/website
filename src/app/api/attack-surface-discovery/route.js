import nodemailer from 'nodemailer';

export async function POST(req) {
  const body = await req.json();
  const {
    organizationName,
    domain,
    businessEmail,
    contactName,
    phone,
    companySize,
    industry,
    currentSecurityMeasures,
    primaryConcerns,
    timeline
  } = body;

  if (!organizationName || !domain || !businessEmail || !contactName) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailSubject = `🔍 New Attack Surface Discovery Request - ${organizationName}`;
  
  const mailText = `
🚀 NEW ATTACK SURFACE DISCOVERY REQUEST

📋 ORGANIZATION DETAILS:
Organization: ${organizationName}
Primary Domain: ${domain}
Contact Name: ${contactName}
Business Email: ${businessEmail}
Phone: ${phone || 'Not provided'}

🏢 COMPANY INFORMATION:
Company Size: ${companySize || 'Not specified'}
Industry: ${industry || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

🔒 CURRENT SECURITY SETUP:
${currentSecurityMeasures || 'No current security measures described'}

⚠️ PRIMARY CONCERNS:
${primaryConcerns || 'No specific concerns mentioned'}

---
This request was submitted through the Attack Surface Discovery form.
Please respond within 2 hours as promised.

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
            <h1>Attack Surface Discovery Request</h1>
            <p>Organization: ${organizationName}</p>
        </div>

        <div class="section">
            <h3>Organization Details</h3>
            <div class="field"><span class="label">Organization:</span><span class="value">${organizationName}</span></div>
            <div class="field"><span class="label">Primary Domain:</span><span class="value">${domain}</span></div>
            <div class="field"><span class="label">Contact Name:</span><span class="value">${contactName}</span></div>
            <div class="field"><span class="label">Business Email:</span><span class="value">${businessEmail}</span></div>
            <div class="field"><span class="label">Phone:</span><span class="value">${phone || 'Not provided'}</span></div>
        </div>

        <div class="section">
            <h3>Company Information</h3>
            <div class="field"><span class="label">Company Size:</span><span class="value">${companySize || 'Not specified'}</span></div>
            <div class="field"><span class="label">Industry:</span><span class="value">${industry || 'Not specified'}</span></div>
            <div class="field"><span class="label">Timeline:</span><span class="value">${timeline || 'Not specified'}</span></div>
        </div>

        <div class="section">
            <h3>Current Security Setup</h3>
            <div class="content-box">
                ${currentSecurityMeasures || 'No current security measures described'}
            </div>
        </div>

        <div class="section">
            <h3>Primary Security Concerns</h3>
            <div class="content-box urgent">
                ${primaryConcerns || 'No specific concerns mentioned'}
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
            <p>This request was submitted through the Attack Surface Discovery form.</p>
            <p><strong>Response Time:</strong> 2 hours</p>
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
    return new Response(JSON.stringify({ message: 'Attack surface discovery request sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email', details: error.message }), { status: 500 });
  }
} 