import React from 'react';

const Recorder = (props) => {
  const { setSource } = props;
  let recorder;
  let recordedChunks = [];

  const record = () => {
    const source = document.getElementById('source');
    const stream = source.captureStream();
    recordedChunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = handleAvailableData;
    recorder.onstop = prepareData;
    recorder.start();
    console.log('started');
  };

  const prepareData = () => {
    const blob = new Blob(recordedChunks, {
      type: 'audio/mpeg',
    });
    const url = URL.createObjectURL(blob);
    setSource(url);
  };

  const handleAvailableData = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  const stop = () => {
    recorder.stop();
  };

  return (
    <div>
      <button onClick={record}>Record</button>

      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default Recorder;
