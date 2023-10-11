import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getAudits from '@wasp/queries/getAudits';

export function Audits() {
  const { data: audits, isLoading, error } = useQuery(getAudits);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {audits.map((audit) => (
        <div
          key={audit.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{audit.file}</div>
          <div>{audit.results}</div>
          <div>
            <Link
              to={`/audit/${audit.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}