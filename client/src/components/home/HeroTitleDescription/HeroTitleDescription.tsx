import styles from "./HeroTitleDescription.module.scss";

// type HeroTitleDescriptionProps = {};

export const HeroTitleDescription = () =>
  // {}: HeroTitleDescriptionProps
  {
    return (
      <div className={styles.heroTitleDescription}>
        <h2>
          Find Home <span>Service/Repair</span>
          <br /> Near You
        </h2>

        <h4>Explore Best Home Service & Repair near you</h4>
      </div>
    );
  };
