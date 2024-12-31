import pugPlugin from "@11ty/eleventy-plugin-pug";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pugPlugin);

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