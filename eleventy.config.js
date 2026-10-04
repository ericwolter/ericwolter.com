export default function (config) {
  config.addPassthroughCopy({ public: '.' });
  config.addWatchTarget('public');
  config.addWatchTarget('src/css');
  return { dir: { input: 'src', output: 'dist' }, templateFormats: ['njk', 'md'] };
}
