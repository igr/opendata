const { Spig } = require('spignite');
const SpigConfig  = require('spignite/lib/spig-config');

Spig.hello();

// PAGES

Spig
  .on('/**/*.{md,njk}')

  ._('PREPARE')
  .pageMeta()
  .tags()
  .group('menu')
  .pageLinks()

  ._('RENDER')
  .summary()
  .render()
  .applyTemplate()
  .htmlMinify()
;

// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')

  ._('PREPARE')
  .assetLinks()
;

Spig.run();
