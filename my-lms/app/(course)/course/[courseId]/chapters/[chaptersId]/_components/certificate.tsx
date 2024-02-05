import React from 'react';


type CertificateProps={
    username:string,
    courseName:string
}
const Certificate = ({ username, courseName }:CertificateProps) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Certificate of Completion</h2>
      <p>This is to certify that</p>
      <h3>{username}</h3>
      <p>has successfully completed the course</p>
      <h3>{courseName}</h3>

      <div style={{ marginTop: '20px' }}>
        <img
          src="https://your-logo-url.com/logo.png" // Replace with your logo URL http://www.w3.org/2000/svg
          alt="Logo"
          style={{ maxWidth: '150px', maxHeight: '100px' }}
        />
      </div>
    </div>
  );
};

export default Certificate;