import './tutorial.css';

function Tutorial() {

  return (
    <div className="tutorial-container grid center-content">
      <h2 className="center-text">Så funkar det</h2>

      <div className="grid center-content instruction-connect">
        <div className="tutorial-circle"><p>1</p></div>
      </div>
      <div className="grid center-content instruction-connect">
        <div className="tutorial-instruction">
          <p>Skapa först ett konto för ditt företag här. Fyll namnet på företaget och era kontaktuppgifter.</p>
        </div>
      </div>

    </div>
  )
}

export default Tutorial;
