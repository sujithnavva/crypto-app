import React from 'react';

function FileUpload({ onFileSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
