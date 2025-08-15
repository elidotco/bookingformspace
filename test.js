// test-email.js
// Run this script to test your email configuration

const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("📧 Testing email configuration...");
console.log("From:", process.env.EMAIL_USER);
console.log("To:", process.env.BOOKING_EMAIL);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,

  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const testEmail = async () => {
  try {
    console.log("🚀 Sending test email...");

    const info = await transporter.sendMail({
      from: `"Gospel Booking Test" <${process.env.EMAIL_USER}>`,
      to: process.env.BOOKING_EMAIL,
      subject: "🎵 Test Email - Gospel Booking Form Setup",
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d3748; text-align: center;">🎵 Email Test Successful!</h2>
          <div style="background: #f0fff4; border: 1px solid #38a169; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p><strong>✅ Your Gmail configuration is working correctly!</strong></p>
            <p>This test email confirms that:</p>
            <ul>
              <li>Nodemailer can connect to Gmail</li>
              <li>Your app password is valid</li>
              <li>Emails will be sent successfully</li>
            </ul>
          </div>
          <div style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">
            <p>Sent on ${new Date().toLocaleString()}</p>
            <p>From: ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      `,
      text: `
🎵 EMAIL TEST SUCCESSFUL!

Your Gmail configuration is working correctly!

This test email confirms that:
- Nodemailer can connect to Gmail
- Your app password is valid  
- Emails will be sent successfully

Sent on ${new Date().toLocaleString()}
From: ${process.env.EMAIL_USER}
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log("📬 Message ID:", info.messageId);
    console.log("📧 Check your inbox at:", process.env.BOOKING_EMAIL);
  } catch (error) {
    console.error("❌ Error sending test email:");
    console.error("Error message:", error.message);

    // Common error solutions
    if (error.message.includes("Invalid login")) {
      console.log(
        "\n💡 Solution: Make sure you're using the app password, not your Gmail password"
      );
    }
    if (error.message.includes("Username and Password not accepted")) {
      console.log(
        "\n💡 Solution: Check that 2FA is enabled and try generating a new app password"
      );
    }
  }
};

// Run the test
testEmail();
