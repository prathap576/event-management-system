import "./About.css";

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <span>ABOUT US</span>

        <h1>
          Bringing People Together
          <br />
          Through Events
        </h1>

        <p>
          Discover, explore, and register for events
          that create memorable experiences.
        </p>
      </section>


      <section className="about-content">

        <div className="about-text">

          <span className="about-label">
            WHO WE ARE
          </span>

          <h2>
            Your Event Discovery Platform
          </h2>

          <p>
            EventHub is an event management platform
            designed to make discovering and registering
            for events simple and convenient.
          </p>

          <p>
            From technical events and coding contests
            to other exciting activities, EventHub helps
            users find events that match their interests
            and register for them easily.
          </p>

        </div>


        <div className="about-features">

          <div className="about-feature-card">

            <div className="about-feature-icon">
              🔎
            </div>

            <h3>
              Discover Events
            </h3>

            <p>
              Explore upcoming events and find something
              interesting to participate in.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              🎟️
            </div>

            <h3>
              Easy Registration
            </h3>

            <p>
              Register for your favourite events quickly
              and keep track of your registrations.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              📅
            </div>

            <h3>
              Stay Organized
            </h3>

            <p>
              View your upcoming registered events
              from your dashboard.
            </p>

          </div>

        </div>

      </section>


      <section className="about-mission">

        <span>
          OUR MISSION
        </span>

        <h2>
          Making Event Participation Simple
        </h2>

        <p>
          Our goal is to provide a simple and user-friendly
          platform where people can discover events,
          register easily, and manage their event
          participation in one place.
        </p>

      </section>

    </main>
  );
}

export default About;