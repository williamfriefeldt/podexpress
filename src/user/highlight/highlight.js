import './highlight.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React from 'react';
import { VscDebugConsole } from 'react-icons/vsc';

function Highlight(input) {

  const audio = React.createRef();

  const setHighlights = () => {
    const node = document.createElement('DIV');
    node.innerHTML ='hej';
    node.classList.add("highlight-box")
    audio.current.progressBar.current.children[0].appendChild(node);
  }

  const showCurrent = () => {
   // console.log(audio.current.audio.current.currentTime);

  }

	return (
    <div className="highlight-component">

    	<AudioPlayer src={input.url} ref={audio} onLoadedData={setHighlights} />

       <button onClick={showCurrent}>hej</button>
    </div>
	)
	
}

export default Highlight;