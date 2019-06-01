"use strict";

const Spig = require('./spig/spig');
require('require-dir')('./spig/tasks');

// PAGES

Spig
  .on('/**/*.{md,njk}')

  ._("PREPARE")
  .pageCommon()
  .collect('tags')
  .collectAttr('menu')

  ._("RENDER")
  .summary()
  .render()
  .applyTemplate()
  .htmlMinify()
;

// VIRTUAL PAGES

Spig
  .on()
  .with((spig, site) => {
    const scores = site.data.opendata_scores;
    for (const id in scores) {
      const fo = spig.addFile("/r/" + id, id);
      fo.attr['title'] = 'Resurs';
      fo.attr['layout'] = 'resource.njk';
    }
  })

  ._("PREPARE")
  .pageCommon()

  ._("RENDER")
  .render()
  .applyTemplate()
  .htmlMinify()
;

// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')

  ._("PREPARE")
  .assetCommon()

  ._("ASSETS")
  .imageMinify()
;
