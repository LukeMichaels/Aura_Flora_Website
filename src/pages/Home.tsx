// src/pages/Home.tsx
import type { FC } from "react";

const Home: FC = () => {
  return (
    <main className="aura-main" aria-labelledby="aura-title">
      <section className="aura-hero">
        <div className="aura-hero-inner">
          <h1 id="aura-title" className="aura-title">
            Aura Flora
          </h1>
          <p className="aura-tagline">
            Interactive, bio-reactive light sculpture
          </p>

          <p className="aura-body">
            Aura Flora invites you to become part of its circuitry. Each flower listens to subtle variations in your skin’s conductivity and responds with evolving light patterns unique to your interaction. These bio-reactive blooms create a gentle dialogue between human presence and illuminated sculpture, turning invisible signals into a living display of motion and color.
          </p>

          <div className="aura-meta">
            <div className="aura-meta-item">
              <span className="label">Artist</span>
              <span className="value">Luke Michaels</span>
            </div>
            <div className="aura-meta-item">
              <span className="label">Event</span>
              <span className="value">
                Portland Winter Light Festival 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
