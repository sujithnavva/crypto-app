import React from 'react';
import CryptoJS from 'crypto-js';

function HashFile({ file }) {
  const handleHashFile = async () => {
    const fileContent = await file.text();
    const hash = CryptoJS.SHA512(fileContent).toString(CryptoJS.enc.Hex);

    // Create and download the digest file
    const blob = new Blob([hash], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'digest_file.hex';
    link.click();
  };

  return (
    <button onClick={handleHashFile}>Hash File (SHA-512)</button>
  );
}

export default HashFile;
