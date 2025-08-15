// app/api/booking/route.js
// App Router API endpoint for sending booking emails

import nodemailer from "nodemailer";

// Configure your email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      eventDate,
      eventTime,
      venue,
      eventType,
      expectedAttendance,
      performanceDuration,
      specialRequests,
      agreeTerms,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !organization ||
      !eventDate ||
      !eventTime ||
      !venue ||
      !eventType
    ) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!agreeTerms) {
      return Response.json(
        { message: "Terms agreement is required" },
        { status: 400 }
      );
    }

    // Format the event date for better readability
    const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format the event time
    const formattedTime = new Date(
      `2000-01-01 ${eventTime}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Create email content
    const htmlContent = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #4a5568, #2d3748); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300;">🎵 New Gospel Artist Booking Request</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #2d3748; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; margin-bottom: 25px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Name:</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td><td><a href="mailto:${email}" style="color: #667eea;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Phone:</td><td><a href="tel:${phone}" style="color: #667eea;">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Organization:</td><td>${organization}</td></tr>
          </table>

          <h2 style="color: #2d3748; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Event Details</h2>
          <table style="width: 100%; margin-bottom: 25px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Date:</td><td>${formattedDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Time:</td><td>${formattedTime}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Venue:</td><td>${venue}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Event Type:</td><td>${
              eventType.charAt(0).toUpperCase() +
              eventType.slice(1).replace("-", " ")
            }</td></tr>
            ${
              expectedAttendance
                ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Expected Attendance:</td><td>${expectedAttendance}</td></tr>`
                : ""
            }
            ${
              performanceDuration
                ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Duration:</td><td>${performanceDuration}</td></tr>`
                : ""
            }
          </table>

          ${
            specialRequests
              ? `
          <h2 style="color: #2d3748; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Special Requests</h2>
          <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
            <p style="margin: 0; line-height: 1.6;">${specialRequests}</p>
          </div>
          `
              : ""
          }

          <div style="background: #e6fffa; padding: 15px; border-radius: 8px; border-left: 4px solid #38a169;">
            <p style="margin: 0; color: #2d3748;"><strong>✓ Terms Agreement:</strong> Client has read and agreed to the performance agreement terms.</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; margin: 0;">This booking request was submitted on ${new Date().toLocaleDateString(
              "en-US"
            )} at ${new Date().toLocaleTimeString("en-US")}</p>
          </div>
        </div>
      </div>
    `;

    // Plain text version
    const textContent = `
NEW GOSPEL ARTIST BOOKING REQUEST

Contact Information:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Organization: ${organization}

Event Details:
Date: ${formattedDate}
Time: ${formattedTime}
Venue: ${venue}
Event Type: ${
      eventType.charAt(0).toUpperCase() + eventType.slice(1).replace("-", " ")
    }
${expectedAttendance ? `Expected Attendance: ${expectedAttendance}` : ""}
${performanceDuration ? `Duration: ${performanceDuration}` : ""}

${specialRequests ? `Special Requests:\n${specialRequests}` : ""}

Terms Agreement: Client has read and agreed to the performance agreement terms.

Submitted: ${new Date().toLocaleString("en-US")}
    `;

    // Email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.BOOKING_EMAIL || "your-booking-email@example.com",
      replyTo: email,
      subject: `🎵 New Booking Request: ${organization} - ${formattedDate}`,
      text: textContent,
      html: htmlContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    // Send confirmation email to the client
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Request Received - Gospel Artist",
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d3748;">Thank You for Your Booking Request!</h2>
          <p>Dear ${firstName},</p>
          <p>We have received your booking request for <strong>${organization}</strong> on <strong>${formattedDate}</strong>.</p>
          <p>We will review your request and contact you within 24 hours to confirm availability and discuss next steps.</p>
          <p>If you have any urgent questions, please feel free to reply to this email.</p>
          <p>Blessings,<br>Daughters Of Glorious Jesus Team</p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return Response.json({
      message: "Booking request sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      {
        message: "Failed to send booking request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
