import React from 'react';
import CryptoJS from 'crypto-js';

function EncryptAES({ file, aesKey }) {
  const handleEncryptFile = async () => {
    try {
      // Validate the AES key
      if (!aesKey || typeof aesKey !== 'string') {
        alert("AES key is not available or invalid");
        return;
      }

      // Read the content of the uploaded file as an ArrayBuffer for binary files
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        // Get file content as ArrayBuffer
        const fileContent = event.target.result;

        // Convert the AES key to a WordArray (CryptoJS specific format)
        const aesKeyWords = CryptoJS.enc.Hex.parse(aesKey);

        // Generate a random Initialization Vector (IV)
        const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes for AES

        // Encrypt the file content using AES in CBC mode
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileContent), aesKeyWords, {
          iv: iv,
          mode: CryptoJS.mode.CBC, // Use CBC mode
          padding: CryptoJS.pad.Pkcs7, // Use appropriate padding
        });

        // Combine IV and encrypted data
        const combined = iv.concat(encrypted.ciphertext);
        const encryptedString = combined.toString(CryptoJS.enc.Base64); // Convert to Base64 for easier handling

        // Create a Blob for download
        const blobEncrypted = new Blob([encryptedString], { type: 'text/plain' });
        const linkEncrypted = document.createElement('a');
        linkEncrypted.href = URL.createObjectURL(blobEncrypted);
        linkEncrypted.download = 'ciphertext_file.txt';
        linkEncrypted.click();
      };

      // Read the file as an ArrayBuffer
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error during encryption:', error);
      alert(`Error during encryption: ${error.message}`);
    }
  };

  return (
    <button onClick={handleEncryptFile}>Encrypt File (AES)</button>
  );
}

export default EncryptAES;
