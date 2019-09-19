/** Dependencies */
const emoji = require('node-emoji');

const baseUrl = 'https://your.domain/';

function r() {
  return emoji.random().emoji;
}

/** Exports */
module.exports = () => {
  return `${baseUrl}${r()}${r()}${r()}${r()}${r()}`;
};
