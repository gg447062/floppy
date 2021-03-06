import React, { useEffect, useState } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
});

const Recorder = ({ setSource }) => {
  const [recorder, setRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const gdmOpts = {
    video: true,
    audio: true,
  };

  const record = async () => {
    const stream = await startCapture(gdmOpts);
    const button = document.getElementById('start');
    button.style.borderColor = 'red';
    button.style.color = 'red';
    // const source = document.getElementById('source');
    // const stream = sourceCanvas.canvas.captureStream();
    setSource('');
    setRecordedChunks([]);
    const _recorder = new MediaRecorder(stream);
    _recorder.ondataavailable = handleAvailableData;
    _recorder.onstop = handleData;
    _recorder.start();
    setRecorder(_recorder);
  };

  const startCapture = async (options) => {
    let captureStream = null;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (error) {
      console.error('Error:', error);
    }

    return captureStream;
  };

  const handleAvailableData = (event) => {
    if (event.data) {
      recordedChunks.push(event.data);
    }
  };

  const handleData = async () => {
    const blob = new Blob(recordedChunks);
    const buffer = await blob.arrayBuffer();
    const audioURL = await extractAudio(buffer);
    setSource(audioURL);
  };

  const extractAudio = async (inputBuffer) => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    const inputName = 'input.mp4';
    const outputName = 'output.mp3';

    ffmpeg.FS(
      'writeFile',
      inputName,
      new Uint8Array(inputBuffer, 0, inputBuffer.byteLength)
    );

    await ffmpeg.run('-i', inputName, '-q:a', '0', '-map', 'a', outputName);

    const output = ffmpeg.FS('readFile', outputName);

    ffmpeg.FS('unlink', inputName);
    ffmpeg.FS('unlink', outputName);

    const _blob = new Blob([output.buffer]);
    const _audioURL = URL.createObjectURL(_blob);
    return _audioURL;
  };

  const stop = () => {
    const button = document.getElementById('start');
    button.style.borderColor = 'green';
    button.style.color = 'green';
    recorder.stop();
  };

  return (
    <div>
      <button id="start" onClick={record}>
        Record
      </button>

      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default Recorder;
