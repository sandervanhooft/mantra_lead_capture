import React from 'react';

const LeadList = ({leads}) => (
  <div className='lead_capture list'>
    <ul>
      {leads.map(lead => (
        <li key={lead._id}>
          <a href={`/lead/${lead._id}`}>{lead.eMail}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default LeadList;
