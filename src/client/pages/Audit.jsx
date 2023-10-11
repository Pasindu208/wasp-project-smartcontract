import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getAudit from '@wasp/queries/getAudit';
import updateAudit from '@wasp/actions/updateAudit';

export function Audit() {
  const { auditId } = useParams();
  const { data: audit, isLoading, error } = useQuery(getAudit, { id: auditId });
  const updateAuditFn = useAction(updateAudit);
  const [newFile, setNewFile] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateAudit = () => {
    updateAuditFn({ id: auditId, file: newFile });
    setNewFile('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Audit Results</h1>
      <div className='mb-4'>
        <p>File: {audit.file}</p>
        <p>Results: {audit.results}</p>
      </div>
      <div className='flex gap-x-4'>
        <input
          type='text'
          placeholder='New File'
          className='px-1 py-2 border rounded text-lg'
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
        />
        <button
          onClick={handleUpdateAudit}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Update File
        </button>
      </div>
      <div>
        <Link to={`/audits`} className='text-blue-500'>Back to Audits</Link>
      </div>
    </div>
  );
}