import React from 'react';

import '../style.css';

export default () => (
  <div className="container max-w-2xl px-4 mx-auto text-gray-900 flex flex-col min-h-screen">
    <h1 className="my-4">Page not found.</h1>
    <p className="text-lg my-4">Sorry this page does not exist, or may have been lost.</p>
    <p className="text-lg m-0">
      Anyways, you can send me a{' '}
      <a href="https://twitter.com/messages/compose?recipient_id=622349802">direct message</a> on Twitter or an <a href="mailto:marti.samuel1@gmail.com">email</a>, and we can talk.
    </p>
    <br/>
    <p className="text-lg m-0">
      Return to {' '}
    <a href="/">homepage</a>.
    </p>
  </div>
);
