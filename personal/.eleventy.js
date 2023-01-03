module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./css');
  eleventyConfig.addWatchTarget('./js');
  eleventyConfig.addWatchTarget('./img');

  eleventyConfig.addPassthroughCopy('./ads.txt');
  eleventyConfig.addPassthroughCopy('./img');
  
  return {
    dir: {
      output: "../dist"
    }
  }
}