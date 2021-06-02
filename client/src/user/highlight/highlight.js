import './highlight.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, {useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import { ImCross } from 'react-icons/im';

function Highlight(input) {

  const [highlightInput, setHighlightInput] = useState('');
  const audio = React.createRef();

  function setInput() {
    setHighlightInput(this.value);
  }

  const setHighlights = () => {
    const node = document.createElement('DIV');
    node.classList.add("highlight-box");
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
      input.highlights.forEach( item => {
        const highlightElement = document.createElement('DIV');
        highlightElement.classList.add("highlight-box");
        highlightElement.classList.add("highlight-saved");
        highlightElement.innerHTML = item.text + ReactDOMServer.renderToString(<ImCross className="highlight-remove" id={item.time} size={15} />);
        highlightElement.onclick = () => audioNative.currentTime = item.time;
        highlightElement.style.setProperty('margin-left', 'calc(' + (item.time/ audioNative.duration ) * 100 + '% - 82.5px)');
        audio.current.progressBar.current.children[0].appendChild( highlightElement );
        document.getElementById(item.time).onclick = () => removeHighlight(item.time);
      });
    }
    /*-------------------*/
    audio.current.progressBar.current.children[0].appendChild(node);
    audio.current.audio.current.ontimeupdate = () => {
      const percent = audioNative.currentTime === 0 ? 0 : ( audioNative.currentTime / audioNative.duration ) * 100;
      document.documentElement.style.setProperty('--play-time', `${percent}%`);
    }
  }

  const addHighlight = () => {
    const inputValue = document.getElementById('highlight-input'+input.index).value;
    const currentTime = audio.current.audio.current.currentTime;
    const newHighlight = { time: Math.round(currentTime), text:inputValue };
    input.addHighlight( newHighlight, input.index );  
  }

  const removeHighlight = (time) => {
    const highlight = input.highlights.forEach( item => item.time === time );
    input.removeHighlight( highlight, input.index );
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