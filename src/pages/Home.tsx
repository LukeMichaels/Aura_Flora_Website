// src/pages/Home.tsx
import type { FC } from "react";
import type { AuraPattern } from "../components/AuraBackground";
import FlowerIcon from "../assets/flower.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faHeartPulse,
  faBolt,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";

interface HomeProps {
  pattern: AuraPattern;
  onPatternChange: (pattern: AuraPattern) => void;
}

const ICONS: Record<AuraPattern, any> = {
  flow: faWater,
  pulse: faHeartPulse,
  spark: faBolt,
};

const Home: FC<HomeProps> = ({ pattern, onPatternChange }) => {
  return (
    <main className="aura-main" aria-labelledby="aura-title">
      <section className="aura-hero">
        <div className="aura-hero-inner">
          <div className="heading">
            <FlowerIcon className="flower-icon" />
            <h1 id="aura-title" className="aura-title">
              Aura Flora
            </h1>
          </div>
          <p className="aura-tagline">
            Bio-reactive light sculpture
          </p>
          <p className="aura-body">
            Aura Flora invites you to become part of its circuitry. Each flower listens to subtle variations in your skin’s conductivity and responds with evolving light patterns unique to your interaction. These bio-reactive blooms create a gentle dialogue between human presence and illuminated sculpture, turning invisible signals into a living display of motion and color.
          </p>
          <p className="aura-body">
            Between Feb 1 and 28th Aura Flora can be experienced at the Portland Visitors Center. Interactive from 9am - 5pm, viewable through the window all night.
          </p>
          <a 
            className="visit-button"
            href="https://maps.app.goo.gl/AhU7HT4i59fk32Lo8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google Maps directions to Aura Flora at the Portland Visitor Center"
          >
            Visit Aura Flora
          </a>
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

          <div className="aura-pattern-toggle" aria-label="Background patterns">
            <div className="pattern-buttons" role="radiogroup">
              {(["flow", "pulse", "spark"] as AuraPattern[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={
                    pattern === key
                      ? "pattern-button pattern-button--active"
                      : "pattern-button"
                  }
                  onClick={() => onPatternChange(key)}
                  role="radio"
                  aria-checked={pattern === key}
                  aria-label={key} >
                  <FontAwesomeIcon icon={ICONS[key]} />
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
