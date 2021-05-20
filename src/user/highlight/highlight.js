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
    node.classList.add("highlight-box");
    node.ontouchstart = (e) => {
      console.log(e);
    }
    /*Highlight input*/
    const inputElement = document.createElement('INPUT');
    inputElement.setAttribute("placeholder", "Skriv en höjdpunkt");
    inputElement.setAttribute("id", "highlight-input" + input.index);
    inputElement.setAttribute("autoComplete","off");
    inputElement.onkeyup = setInput;
    node.appendChild(inputElement);
    /*---------------*/
    const audioNative = audio.current.audio.current;
    /*Existing highlights*/
    if(input.highlights) {
      input.highlights.map( item => {
        const highlightElement = document.createElement('DIV');
        highlightElement.classList.add("highlight-box");
        highlightElement.classList.add("highlight-saved");
        highlightElement.innerHTML = item.text;
        highlightElement.onclick = () => audioNative.currentTime = item.time;
        highlightElement.style.setProperty('margin-left', 'calc(' + (item.time/ audioNative.duration ) * 100 + '% - 100px)');
        audio.current.progressBar.current.children[0].appendChild( highlightElement );
      });
    }

    audio.current.progressBar.current.children[0].appendChild(node);
    audio.current.audio.current.ontimeupdate = () => {
      const percent = ( audioNative.currentTime / audioNative.duration ) * 100;
      document.documentElement.style.setProperty('--play-time', `${percent}%`);
    }
  }

  const addHighlight = () => {
    const inputValue = document.getElementById('highlight-input'+input.index).value;
    const currentTime = audio.current.audio.current.currentTime;
    const newHighlight = { time: Math.round(currentTime), text:inputValue };
    input.addHighlight( newHighlight, input.index );  
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