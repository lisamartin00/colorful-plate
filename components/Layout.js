import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'

const Layout = ({pageTitle, children}) => {
  return (
    <>
     <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png" />
      <title>{`Colorful Plate - ${pageTitle}`}</title>
    </Head>
      <nav className="bg-gray-800 p-4">
        <div className="text-white text-3xl font-semibold tracking-wide">
          <span className="text-red-400">c</span>
          <span className="text-yellow-300">o</span>
          <span className="text-yellow-200">l</span>
          <span className="text-green-200">o</span>
          <span className="text-blue-300">r</span>
          <span className="text-blue-200">f</span>
          <span className="text-purple-200">u</span>
          <span className="text-pink-300">l</span>
          plate
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;