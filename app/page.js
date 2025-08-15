"use client";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  User,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import Image from "next/image";

export default function GospelBookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    eventType: "",
    expectedAttendance: "",
    performanceDuration: "",
    specialRequests: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert(
        "Please read and agree to the performance agreement terms before submitting."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your booking request! We will contact you within 24 hours to confirm availability and discuss next steps."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          eventDate: "",
          eventTime: "",
          venue: "",
          eventType: "",
          expectedAttendance: "",
          performanceDuration: "",
          specialRequests: "",
          agreeTerms: false,
        });
      } else {
        throw new Error("Failed to send booking request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage(
        "Sorry, there was an error sending your booking request. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        fontFamily: '"Georgia", serif',
        backgroundImage: 'url("/bg.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white  text-center">
          {/* <h1 className="text-4xl md:text-5xl font-light mb-3">
            Daughters Of Glorious Jesus
          </h1>
          <p className="text-lg text-purple-100">
            Book your spiritual musical experience
          </p> */}
          <Image
            src="/hearder.png"
            alt="header"
            width={1900}
            height={1080}
            className="w-full h-full"
          />
        </div>

        {/* Form */}
        <div className="px-8 py-10 text-black">
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  First Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  Last Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-purple-600" />
                  Email Address <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Building className="w-4 h-4 mr-2 text-purple-600" />
                Church/Organization Name{" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
              />
            </div>

            {/* Event Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  Event Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  Event Time <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Venue */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                Venue/Location <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Include full address"
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
              />
            </div>

            {/* Event Type & Attendance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Event Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                >
                  <option value="">Select Event Type</option>
                  <option value="church-service">Church Service</option>
                  <option value="revival">Revival/Crusade</option>
                  <option value="concert">Concert</option>
                  <option value="conference">Conference</option>
                  <option value="wedding">Wedding</option>
                  <option value="funeral">Funeral/Memorial</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Expected Attendance
                </label>
                <input
                  type="number"
                  name="expectedAttendance"
                  value={formData.expectedAttendance}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Performance Duration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Requested Performance Duration
              </label>
              <select
                name="performanceDuration"
                value={formData.performanceDuration}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
              >
                <option value="">Select Duration</option>
                <option value="15-30min">15-30 minutes</option>
                <option value="30-45min">30-45 minutes</option>
                <option value="45-60min">45-60 minutes</option>
                <option value="60-90min">60-90 minutes</option>
                <option value="full-concert">Full Concert (90+ minutes)</option>
              </select>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Special Requests/Song Preferences
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                placeholder="Please describe any specific songs, themes, or special requirements for your event"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none resize-y"
              />
            </div>

            {/* Contract Section */}
            <div className="bg-slate-50 rounded-2xl p-8 border-l-4 border-purple-500">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Performance Agreement Terms
              </h2>

              <div className="bg-white rounded-xl p-6 max-h-80 overflow-y-auto border border-slate-200 text-sm leading-relaxed">
                <h3 className="font-semibold text-slate-700 mb-3">
                  1. Invoice & Compensation
                </h3>
                <p className="mb-4 text-slate-600">
                  That the artist’s manager shall communicate to the client with
                  invoice an aggregate sum of amount for compensation after
                  taking into consideration all the details provided.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  2. Payment Schedule
                </h3>
                <p className="mb-4 text-slate-600">
                  That the client shall pay at least half of the agreed amount,
                  then they be provided with the artist’s image to be used; and
                  the remaining half of the total amount preferably before the
                  performance.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  3. Performance in Accordance with Agreement
                </h3>
                <p className="mb-4 text-slate-600">
                  That the Artists shall provide the performance in accordance
                  with the terms of this agreement and any addendums or riders
                  hereto.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  4. Recording/Transmission Restrictions
                </h3>
                <p className="mb-4 text-slate-600">
                  That the client shall use its best efforts to prevent the
                  recording, reproduction or transmission of the performance
                  without the written permission of the Artists or their
                  representative.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  5. Excuse from Obligations (Force Majeure)
                </h3>
                <p className="mb-4 text-slate-600">
                  That the client and artists shall be excused from their
                  obligations hereunder in the event of proven sickness,
                  accident, riot, strike, epidemic, force majeure and or any
                  legitimate condition or occurrence beyond their respective
                  control.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  6. Security
                </h3>
                <p className="mb-4 text-slate-600">
                  That the client shall use everything in its power to provide
                  adequate security for the artists, their band and crew as long
                  as they remain at the event grounds.
                </p>

                <h3 className="font-semibold text-slate-700 mb-3">
                  7. Authority to Bind the Artist
                </h3>
                <p className="mb-4 text-slate-600">
                  That the manager who is executing this agreement on behalf of
                  the Artists hereby warrants and represents that he has the
                  full power and authority to bind the artist on whose behalf he
                  is executing this agreement and acknowledges that he is making
                  this representation and warranty with the understanding that
                  the client is relying thereon.
                </p>
              </div>

              <div className="flex items-start space-x-3 mt-6 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  I have read and agree to the performance agreement terms above{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-xl border-l-4 ${
                  submitMessage.includes("Thank you")
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-red-50 border-red-500 text-red-700"
                }`}
              >
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!formData.agreeTerms || isSubmitting}
              className={`w-full py-4 px-8 rounded-full text-lg font-semibold transition-all duration-300 ${
                formData.agreeTerms && !isSubmitting
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
