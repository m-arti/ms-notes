import React from 'react';
import { Helmet } from 'react-helmet';
import '../style.css';

export default () => (
  <div class="bg-white">

    <br/>

    <div class="container max-w-2xl px-4 mx-auto flex flex-col min-h-screen border-t border-black text-black bg-white">

      <Helmet>
        <script
          dangerouslySetInnerHTML={{
            __html:` getImg()`,
          }}
          type="text/javascript"
        />

        <script
          dangerouslySetInnerHTML={{
            __html:` nightwind.init()`,
          }}
          type="text/javascript"
        />
        <script>
        {`
          function checkDarkMode() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          }

          function watchDarkMode() {
            if (!window.matchMedia) return;
            window.matchMedia('(prefers-color-scheme: dark)').addListener(addDarkModeSelector);
          }

          function addDarkModeSelector() {
            if (checkDarkMode()) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }

          addDarkModeSelector();
          watchDarkMode();
        `}
        </script>
      </Helmet>

      <h1 class="my-4">L O S T &ensp; I N &ensp; S P A C E &ensp; ✈︎</h1>

      <p class="text-lg my-4">Sorry, that page does not exist. It may have been lost.</p>

      <br/>

      <p class="text-lg m-0">
        {' '} <a href="/">← <span role="img" aria-label="earth emoji">🌍</span> Homepage</a>
      </p>

    </div>
  </div>
);
