import React from 'react';
import CryptoJS from 'crypto-js';

function DecryptAES({ encryptedFile, aesKey }) {
  const handleDecryptFile = () => {
    if (!aesKey) {
      alert("AES key is required!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const encryptedContent = event.target.result;

      // Convert AES key from hex to WordArray
      const aesKeyWords = CryptoJS.enc.Hex.parse(aesKey);

      // Decode the Base64 encoded data
      const encryptedData = CryptoJS.enc.Base64.parse(encryptedContent);

      // Extract the IV (first 16 bytes)
      const iv = CryptoJS.lib.WordArray.create(encryptedData.words.slice(0, 4)); // First 16 bytes for IV
      const ciphertext = CryptoJS.lib.WordArray.create(encryptedData.words.slice(4)); // Remaining data

      // Decrypt the ciphertext
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, aesKeyWords, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8); // Convert to UTF-8

      // Create a Blob for download
      const blobDecrypted = new Blob([decryptedText], { type: 'text/plain' });
      const linkDecrypted = document.createElement('a');
      linkDecrypted.href = URL.createObjectURL(blobDecrypted);
      linkDecrypted.download = 'decrypted_file.txt'; // Change this to your desired file extension
      linkDecrypted.click();
    };

    // Read the encrypted file as text
    fileReader.readAsText(encryptedFile);
  };

  return (
    <button onClick={handleDecryptFile}>Decrypt File (AES)</button>
  );
}

export default DecryptAES;
