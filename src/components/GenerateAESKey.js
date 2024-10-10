import CryptoJS from 'crypto-js';

function GenerateAESKey({ onAesKeyGenerated }) {
  const handleGenerateKey = () => {
    // Generate a 256-bit AES key and convert it to a hexadecimal string
    const aesKey = CryptoJS.lib.WordArray.random(256 / 8).toString(CryptoJS.enc.Hex);

    // Provide the AES key to the parent component
    onAesKeyGenerated(aesKey);

    // Download the AES key as aes_key.txt
    const blobKey = new Blob([aesKey], { type: 'text/plain' });
    const linkKey = document.createElement('a');
    linkKey.href = URL.createObjectURL(blobKey);
    linkKey.download = 'AES_key.txt';
    linkKey.click();
  };

  return (
    <button onClick={handleGenerateKey}>Generate AES Key</button>
  );
}

export default GenerateAESKey;
