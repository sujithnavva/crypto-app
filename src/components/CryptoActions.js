import React, { useState } from 'react';
import FileUpload from './FileUpload';
import HashFile from './HashFile';
import GenerateRSAKeys from './GenerateRSAKeys';
import SignFile from './SignFile';
import GenerateAESKey from './GenerateAESKey';
import EncryptAES from './EncryptAES';
import DecryptAES from './DecryptAES';

function CryptoActions() {
  const [file, setFile] = useState(null);
  const [aesKey, setAesKey] = useState(null);
  const [privateKey, setPrivateKey] = useState('');

  return (
    <div>
      <FileUpload onFileSelect={setFile} />
      {file && (
        <div>
          <HashFile file={file} />
          <GenerateRSAKeys />
          <SignFile file={file} privateKey={privateKey} />
          <GenerateAESKey onAesKeyGenerated={setAesKey} />
          <EncryptAES file={file} aesKey={aesKey} />
          <DecryptAES encryptedFile={file} aesKey={aesKey} />
        </div>
      )}
    </div>
  );
}

export default CryptoActions;
