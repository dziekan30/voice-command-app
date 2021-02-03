import React from 'react'
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Voice() {
  // SpeechRecognition.startListening({ continuous: true })

  const { resetTranscript } = useSpeechRecognition()
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    // {
    //   command: 'My top sports are * and *',
    //   callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    // },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: ['Hello Jarvis', 'Hi Jarvis'],
      callback: ({ command }) => setMessage(`Welcome Back! Master Kamil `),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    // {
    //   command: ['*'],
    //   callback: ({ command }) => setMessage(`Not compute `),
    //   // matchInterim: true
    // },
  ]


  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Ups, your browser is not supported!");
    }
  }, []);

  const { transcript } = useSpeechRecognition({ commands })
  return (
    <div>
      {/* <h3>Hello World!</h3> */}
      <h2>{message}</h2>
      <h2>{transcript}</h2>
      {/* <p>{transcript ? transcript : 'Start listening for transcript'}</p> */}

      <button onClick={SpeechRecognition.startListening}>Start listening</button>
    &nbsp;
      <button onClick={SpeechRecognition.stopListening}>Stop listening</button>
    </div>
  )
}