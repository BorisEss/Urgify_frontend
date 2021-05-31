import './App.scss';

function App() {
  return (
    <div className="container">
      <header>
        <img src="images/logo.svg" alt="URGIFY Logo" />
      </header>
      <div className="main">
        <div className="title">
          <div>Hey,</div>
          We make collecting medical bills easier for hospitals & less stressful for patients.
        </div>
        <div className="description">
          We believe that great ideas come from everywhere. So, if you'd like to get a seat at the table and help us to build a product that you’ll love and create an impact, please get in touch or submit your idea through the portal, and we'll make sure we build what matters most to you.
        </div>
        <div className="button">
          explore the idea
        </div>
      </div>
      <div className="pulse-block">
        <div className="pulse">
        </div>
        <img src="images/plus.svg" alt="Plus icon" />
      </div>
      <div className="socials">
        <div className="item">
          <img className="linkedin" src="images/linkedin.svg" alt="Linkedin logo" />
          <img className="linkedin-mobile" src="images/linkedin-mobile.svg" alt="Linkedin logo" />
          <div>Linkedin</div>
        </div>
        <div className="item">
          <img className="youtube" src="images/youtube.svg" alt="Youtube logo" />
          <img className="youtube-mobile" src="images/youtube-mobile.svg" alt="Youtube logo" />
          <div>Linkedin</div>
        </div>
      </div>
    </div>
  );
}

export default App;
