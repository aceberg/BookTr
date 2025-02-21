
function DownButton() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollUp = () => {
    window.scrollBy({
      top: -window.innerHeight, // Scroll by one screen height
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight, // Scroll by one screen height
      behavior: "smooth",
    });
  };

  return (
    <div className="opacity-50" style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
    }}>
      <i className="bi bi-chevron-bar-up shade-hover fs-3" title="Top" 
        onClick={scrollTop}
      >
      </i>
      <br></br>
      <i className="bi bi-chevron-up shade-hover fs-3" title="Up" 
        onClick={scrollUp}
      >
      </i>
      <br></br>
      <i className="bi bi-chevron-down shade-hover fs-3" title="Down" 
        onClick={scrollDown}
      >
      </i>
      <br></br>
      <i className="bi bi-chevron-bar-down shade-hover fs-3" title="Bottom" 
        onClick={scrollBottom}
      >
      </i>
    </div>
  );
}

export default DownButton;
