import JSEncrypt from 'jsencrypt';

// eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  const { bitLength } = e.data;

  try {
    const crypt = new JSEncrypt({ default_key_size: bitLength });
    crypt.getKey(); // Generate the key

    const publicKey = crypt.getPublicKey();
    const privateKey = crypt.getPrivateKey();

    // Send the keys back to the main thread
    // eslint-disable-next-line no-restricted-globals
    self.postMessage({ publicKey, privateKey });
  } catch (error) {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage({ error: error.message });
  }
};
