import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Form submission endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, role, timestamp, source } = req.body;

    console.log(`[${new Date().toISOString()}] New registration:`, { name, email, phone, role });

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ ok: false, error: 'Name and email are required' });
    }

    // Send confirmation email to user
    await sendUserConfirmationEmail(name, email);
    console.log('User email sent to:', email);

    // Send notification to admin
    await sendAdminNotification(name, email, phone, role);
    console.log('Admin email sent');

    res.json({ ok: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Send confirmation email to user
async function sendUserConfirmationEmail(name, email) {
  const msg = {
    to: email,
    from: 'info@upskillaura.com',
    subject: 'Seat Confirmed — ML Interview Prep Masterclass · 16 May',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D1F5C;">Thank You for Registering!</h2>

        <p>Dear <strong>${name}</strong>,</p>

        <p>Thank you for registering for the <strong>ML Interview Prep Masterclass</strong>.</p>

        <h3 style="color: #7022AA;">Session Details:</h3>
        <ul style="font-size: 16px; line-height: 1.8;">
          <li>📅 <strong>Date:</strong> Saturday, 16 May 2026</li>
          <li>🕖 <strong>Time:</strong> 7:00 – 9:00 PM IST</li>
          <li>📱 <strong>Platform:</strong> Zoom (Link will be sent 24 hours before)</li>
        </ul>

        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <strong>Note:</strong> This is a live-only session. All registered attendees will receive the <strong>ML Interview Prep cheat-sheet pack</strong> within 24 hours of the session.
        </p>

        <h3 style="color: #7022AA;">Join Our Community:</h3>
        <p>
          <a href="https://chat.whatsapp.com/GsDV0SmB3NjAS4KV5gVKng" style="color: #8508E0; text-decoration: none; font-weight: bold;">
            👉 Join WhatsApp Community for Session Reminders & Resources
          </a>
        </p>

        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
          See you on <strong>16 May</strong>!<br/>
          <strong>Team UpskillAura</strong>
        </p>

        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          This is an automated email. Please don't reply to this message.
        </p>
      </div>
    `,
  };

  return sgMail.send(msg);
}

// Send admin notification
async function sendAdminNotification(name, email, phone, role) {
  const msg = {
    to: 'info@upskillaura.com',
    from: 'info@upskillaura.com',
    subject: `New Registration: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2D1F5C;">New Registration</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Role</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${role}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Registered At</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toISOString()}</td>
          </tr>
        </table>
      </div>
    `,
  };

  return sgMail.send(msg);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📧 Emails will be sent from: info@upskillaura.com`);
});
