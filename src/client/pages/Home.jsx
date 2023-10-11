import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createAudit from '@wasp/actions/createAudit';

export function HomePage() {
  const createAuditFn = useAction(createAudit);
  const [file, setFile] = useState('');

  const handleSubmit = () => {
    createAuditFn({ file });
    setFile('');
  };

  return (
    <div className='p-4'>
      <input
        type='file'
        onChange={(e) => setFile(e.target.value)}
        className='p-2 border rounded'
      />
      <button
        onClick={handleSubmit}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
      >
        Submit
      </button>
      <Link to='/audits' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
        View Audits
      </Link>
    </div>
  );
}