import { useEffect, useState } from "react";
import "./EventForm.css";

const initialForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "",
  image: "",
  capacity: "",
};

function EventForm({
  initialData = initialForm,
  onSubmit,
  submitText = "Create Event",
  loading = false,
}) {

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm({
      ...initialForm,
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      capacity: Number(form.capacity),
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>

      <div className="form-section">
        <h3>Basic Information</h3>

        <div className="form-grid">

          <div className="form-group full">
            <label>Event Title *</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group full">
            <label>Description *</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              rows="5"
              required
            />
          </div>

        </div>
      </div>

      <div className="form-section">
        <h3>Event Details</h3>

        <div className="form-grid">

          <div className="form-group">
            <label>Date *</label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Event location"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Technical">Technical</option>
              <option value="Workshop">Workshop</option>
              <option value="Coding">Coding</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Seminar">Seminar</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Capacity *</label>

            <input
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              placeholder="100"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

        </div>
      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-button"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Saving..." : submitText}
        </button>

      </div>

    </form>
  );
}

export default EventForm;