
import "./FloatingBookingButton.css";

const CALENDLY_URL =
  "https://calendly.com/adarshk17021947/30min?month=2026-10";

export default function FloatingBookingButton() {
  return (
    <a
      href="https://calendly.com/adarshk17021947/30min?month=2026-10"   
      className="floating-booking"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a call with Abnoxious Edits"
    >
      <span className="floating-booking-arrow">↗</span>
      <span className="floating-booking-label">BOOK NOW</span>
    </a>
  );
}

