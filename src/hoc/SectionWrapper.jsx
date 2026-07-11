import { styles } from "../styles";
import { useScrollReveal } from "../hooks/useScrollReveal";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.25 });

    return (
      <section
        ref={ref}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 reveal reveal-up ${
          isVisible ? "reveal-visible" : ""
        }`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </section>
    );
  };

export default StarWrapper;
