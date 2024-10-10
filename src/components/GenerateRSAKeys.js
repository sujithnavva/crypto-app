import React, { useState } from 'react';

function GenerateRSA() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRSA = () => {
    setIsGenerating(true);
    setError('');
    
    // Create a Web Worker for RSA key generation
    const rsaWorker = new Worker(new URL('../workers/rsaWorker.js', import.meta.url));

    rsaWorker.onmessage = (e) => {
      const { publicKey, privateKey, error } = e.data;
      if (error) {
        setError(error);
      } else {
        setPublicKey(publicKey);
        setPrivateKey(privateKey);

        // Download public key
        const blobPublic = new Blob([publicKey], { type: 'text/plain' });
        const linkPublic = document.createElement('a');
        linkPublic.href = URL.createObjectURL(blobPublic);
        linkPublic.download = 'RSA_public_key.pem';
        linkPublic.click();

        // Download private key
        const blobPrivate = new Blob([privateKey], { type: 'text/plain' });
        const linkPrivate = document.createElement('a');
        linkPrivate.href = URL.createObjectURL(blobPrivate);
        linkPrivate.download = 'RSA_private_key.pem';
        linkPrivate.click();
      }

      setIsGenerating(false);
      rsaWorker.terminate(); // Terminate the worker after the task is done
    };

    rsaWorker.postMessage({ bitLength: 4096 }); // Pass 4096-bit length to the worker
  };

  return (
    <div>
      <button onClick={handleGenerateRSA} disabled={isGenerating}>
        {isGenerating ? 'Generating RSA Keys...' : 'Generate RSA Keys'}
      </button>
      {privateKey && (
        <div>
          <h3>Private Key</h3>
          <pre>{privateKey}</pre>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default GenerateRSA;
