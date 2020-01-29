const { Spig } = require('spignite');
const SpigConfig  = require('spignite/lib/spig-config');

Spig.hello();

// PAGES

Spig
  .on('/**/*.{md,njk}')
  .watchSite()

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

// VIRTUAL PAGES

Spig
  .on()
  .with((spig) => {
    const scores = SpigConfig.site.data.opendata_scores;
    for (const id in scores) {
      const fo = spig.addFile("/r/" + id, id);
      fo.attr['title'] = 'Resurs';
      fo.attr['layout'] = 'resource.njk';
    }
  })

  ._("PREPARE")
  .pageMeta()
  .pageLinks()

  ._("RENDER")
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
