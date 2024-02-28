import { useParams } from 'react-router-dom';

import './Details.css';

export default function Details() {
  const { pageID } = useParams();

  return (
    <div className="details-div">
      <h1>I am the Details Page Div: {pageID}</h1>
    </div>
  );
}
