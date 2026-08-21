import { useState } from "react";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };


  return (
    <main className="contact-page">

      <section className="contact-hero">

        <span>
          CONTACT US
        </span>

        <h1>
          We'd Love to Hear From You
        </h1>

        <p>
          Have a question or need help?
          Get in touch with the EventHub team.
        </p>

      </section>


      <section className="contact-content">

        <div className="contact-info">

          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h2>
            Let's Talk
          </h2>

          <p>
            If you have any questions, suggestions,
            or feedback about EventHub, feel free
            to contact us.
          </p>


          <div className="contact-info-card">

            <div className="contact-icon">
              📧
            </div>

            <div>
              <h3>
                Email
              </h3>

              <p>
                eventhub@example.com
              </p>
            </div>

          </div>


          <div className="contact-info-card">

            <div className="contact-icon">
              📞
            </div>

            <div>
              <h3>
                Phone
              </h3>

              <p>
                +91 98765 43210
              </p>
            </div>

          </div>


          <div className="contact-info-card">

            <div className="contact-icon">
              📍
            </div>

            <div>
              <h3>
                Location
              </h3>

              <p>
                KSRM College of Engineering
              </p>
            </div>

          </div>

        </div>


        <div className="contact-form-card">

          <h2>
            Send Us a Message
          </h2>

          {submitted && (

            <div className="contact-success">
              Your message has been submitted successfully.
            </div>

          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Contact;