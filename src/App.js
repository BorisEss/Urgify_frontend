import './App.scss';

function App() {
  return (
    <div className="container">
      <header>
        <img src="images/logo.svg" alt="URGIFY Logo" />
        <div className="powered-by">
          <div>Powered by:</div>
          <a href="https://community.ibm.com/community/user/ibmz-and-linuxone/groups/group-home?CommunityKey=378eb0a9-b968-4c46-ad72-2e1670c4ee92" target="_blank" className="powered-by-image ibm" rel="noreferrer">
            <img src="images/ibm.svg" alt="IBM logo" />
          </a>
          <div className="powered-by-image village-capital">
            <img src="images/village-capital.svg" alt="Village capital logo" />
          </div>
        </div>
      </header>
      <div className="main">
        <div>
          <div className="title">
            <div>Hey,</div>
            We make collecting medical bills easier for hospitals & less stressful for patients.
          </div>
          <div className="description">
            We believe that great ideas come from everywhere. So, if you'd like to get a seat at the table and help us to build a product that you’ll love and create an impact, please get in touch or submit your idea through the portal, and we'll make sure we build what matters most to you.
          </div>
          <div className="actions">
            <a href="https://urgify.ideas.aha.io/" target="_blank" className="button" rel="noreferrer">
              explore the idea
            </a>
            <a href="mailto:boris@urgify.io/" title="mailto:boris@urgify.io" className="outlined-button">
              contact us
            </a>
          </div>
        </div>
        <div className="part-of">
          <img src="images/ideaction-logo.svg" alt="Ideaction logo" />
          <div className="info">
            Urgify is part of the <br /> <a href="https://ideaction.io" target="_blank" rel="noreferrer">IDEACTION Startup Studio family</a>
          </div>
        </div>
      </div>
      <div className="pulse-block">
        <div className="pulse">
        </div>
        <img src="images/plus.svg" alt="Plus icon" />
      </div>
      <div className="socials">
        <a className="item" href="https://www.linkedin.com/company/urgify" target="_blank" rel="noreferrer">
          <img className="linkedin" src="images/linkedin.svg" alt="Linkedin logo" />
          <img className="linkedin-mobile" src="images/linkedin-mobile.svg" alt="Linkedin logo" />
          <div>Linkedin</div>
        </a>
        <div className="item">
          <img className="youtube" src="images/youtube.svg" alt="Youtube logo" />
          <img className="youtube-mobile" src="images/youtube-mobile.svg" alt="Youtube logo" />
          <div>Youtube</div>
        </div>
      </div>
    </div>
  );
}

export default App;
