import './highlight.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, {useState} from 'react';

function Highlight(input) {

  const [highlightInput, setHighlightInput] = useState('');
  const audio = React.createRef();

  function setInput() {
    setHighlightInput(this.value);
  }

  const setHighlights = () => {
    const node = document.createElement('DIV');
    const inputElement = document.createElement('INPUT');
    inputElement.setAttribute("placeholder", "Skriv en höjdpunkt");
    inputElement.setAttribute("id", "highlight-input" + input.index);
    inputElement.onkeyup = setInput;
    node.appendChild(inputElement);
    node.classList.add("highlight-box");
    audio.current.progressBar.current.children[0].appendChild(node);
    const audioNative = audio.current.audio.current;
    audio.current.audio.current.ontimeupdate = () => {
      const percent = ( audioNative.currentTime / audioNative.duration ) * 100;
      document.documentElement.style.setProperty('--play-time', `${percent}%`);
    }
  }

  const addHighlight = () => {
    //console.log(inputElement && inputElement.value === '')
  }

	return (
    <div className="highlight-component">

    	<AudioPlayer 
        src={input.url}
        ref={audio} 
        onLoadedData={setHighlights} 
      />

      <button
        onClick={addHighlight}
        className="highlight-add-btn"
        disabled={highlightInput === ''}
      >
        Lägg till höjdpunkt
      </button>

    </div>
	)
	
}

export default Highlight;