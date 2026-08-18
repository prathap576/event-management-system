import {
  useEffect,
  useState,
} from "react";


const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "",
  capacity: "",
  image: "",
  status: "Published",
};


function EventForm({
  initialData,
  onSubmit,
  submitText,
  loading,
}) {

  const [form, setForm] =
    useState(emptyForm);

  const [errors, setErrors] =
    useState({});


  useEffect(() => {

    if (initialData) {

      setForm({
        ...emptyForm,
        ...initialData,
        capacity:
          initialData.capacity ||
          "",
      });

    }

  }, [initialData]);


  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );


    setErrors(
      (previous) => ({
        ...previous,
        [name]: "",
      })
    );

  };


  const validate = () => {

    const newErrors = {};


    if (!form.title.trim()) {

      newErrors.title =
        "Event title is required.";

    } else if (
      form.title.trim()
        .length < 5
    ) {

      newErrors.title =
        "Title must contain at least 5 characters.";

    }


    if (
      !form.description.trim()
    ) {

      newErrors.description =
        "Description is required.";

    }


    if (!form.date) {

      newErrors.date =
        "Event date is required.";

    }


    if (!form.time) {

      newErrors.time =
        "Event time is required.";

    }


    if (
      !form.location.trim()
    ) {

      newErrors.location =
        "Location is required.";

    }


    if (!form.category) {

      newErrors.category =
        "Please select a category.";

    }


    if (
      !form.capacity ||
      Number(form.capacity) <= 0
    ) {

      newErrors.capacity =
        "Capacity must be greater than 0.";

    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(
        newErrors
      ).length === 0
    );

  };


  const handleSubmit = (
    event
  ) => {

    event.preventDefault();


    if (!validate()) {
      return;
    }


    onSubmit({

      ...form,

      title:
        form.title.trim(),

      description:
        form.description.trim(),

      location:
        form.location.trim(),

      capacity:
        Number(form.capacity),

    });

  };


  return (

    <form
      className="event-form"
      onSubmit={handleSubmit}
    >

      {/* BASIC INFORMATION */}

      <div className="form-section">

        <div className="form-section-heading">

          <span>
            01
          </span>

          <div>

            <h2>
              Basic Information
            </h2>

            <p>
              Enter the main information
              about your event.
            </p>

          </div>

        </div>


        <div className="form-grid">


          <div className="form-field full">

            <label>
              Event Title *
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Annual Tech Fest 2026"
            />

            {errors.title && (

              <small className="field-error">
                {errors.title}
              </small>

            )}

          </div>


          <div className="form-field full">

            <label>
              Description *
            </label>

            <textarea
              name="description"
              rows="5"
              value={
                form.description
              }
              onChange={handleChange}
              placeholder="Describe your event..."
            />

            {errors.description && (

              <small className="field-error">
                {
                  errors.description
                }
              </small>

            )}

          </div>

        </div>

      </div>


      {/* EVENT DETAILS */}

      <div className="form-section">

        <div className="form-section-heading">

          <span>
            02
          </span>

          <div>

            <h2>
              Event Details
            </h2>

            <p>
              Set the date, location,
              category and capacity.
            </p>

          </div>

        </div>


        <div className="form-grid">


          <div className="form-field">

            <label>
              Date *
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            {errors.date && (

              <small className="field-error">
                {errors.date}
              </small>

            )}

          </div>


          <div className="form-field">

            <label>
              Time *
            </label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />

            {errors.time && (

              <small className="field-error">
                {errors.time}
              </small>

            )}

          </div>


          <div className="form-field">

            <label>
              Location *
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Main Auditorium"
            />

            {errors.location && (

              <small className="field-error">
                {errors.location}
              </small>

            )}

          </div>


          <div className="form-field">

            <label>
              Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >

              <option value="">
                Select category
              </option>

              <option value="Technical">
                Technical
              </option>

              <option value="Coding">
                Coding
              </option>

              <option value="Workshop">
                Workshop
              </option>

              <option value="Seminar">
                Seminar
              </option>

              <option value="Cultural">
                Cultural
              </option>

              <option value="Sports">
                Sports
              </option>

            </select>

            {errors.category && (

              <small className="field-error">
                {errors.category}
              </small>

            )}

          </div>


          <div className="form-field">

            <label>
              Capacity *
            </label>

            <input
              type="number"
              min="1"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="100"
            />

            {errors.capacity && (

              <small className="field-error">
                {errors.capacity}
              </small>

            )}

          </div>


          <div className="form-field">

            <label>
              Publishing Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >

              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>

            </select>

          </div>


          <div className="form-field full">

            <label>
              Event Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/event-image.jpg"
            />

          </div>

        </div>

      </div>


      {/* ACTIONS */}

      <div className="form-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            window.history.back()
          }
        >
          Cancel
        </button>


        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : submitText}
        </button>

      </div>

    </form>
  );
}

export default EventForm;