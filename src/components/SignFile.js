import React, { useState } from 'react';
import { KJUR, KEYUTIL } from 'jsrsasign';

function SignFile({ file, privateKey }) {
  const [signature, setSignature] = useState('');
  const [verified, setVerified] = useState(null); // For verification result

  const handleSignFile = () => {
    if (!privateKey) {
      alert('Private key is required for signing!');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileContent = event.target.result;

      // Sign the content
      const sig = new KJUR.crypto.Signature({ alg: 'SHA512withRSA' });
      sig.init(privateKey);
      sig.updateString(fileContent);

      const signedData = sig.sign();
      setSignature(signedData);

      // Optionally: Create a Blob for download
      const blob = new Blob([signedData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'signed_file.sig';
      link.click();
    };

    fileReader.readAsText(file);
  };

  const handleVerifySignature = () => {
    const sig = new KJUR.crypto.Signature({ alg: 'SHA512withRSA' });
    // eslint-disable-next-line no-undef
    sig.init(KEYUTIL.getKey(publicKey)); // Assume publicKey is stored
    // eslint-disable-next-line no-undef
    sig.updateString(fileContent); // Use the same content that was signed

    // Verify the signature
    const isVerified = sig.verify(signature);
    setVerified(isVerified);
    
    // Show a popup with the verification result
    alert(isVerified ? 'Signature is verified!' : 'Signature verification failed!');
  };

  return (
    <div>
      <button onClick={handleSignFile}>Sign File</button>
      <button onClick={handleVerifySignature} disabled={!signature}>
        Verify Signature
      </button>
      {verified !== null && <p>Verification Status: {verified ? 'Verified' : 'Not Verified'}</p>}
    </div>
  );
}

export default SignFile;
