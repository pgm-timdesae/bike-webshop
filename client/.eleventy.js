const pluginNavigation = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy({ 'site/_static/css': 'static/css' });
  eleventyConfig.addPassthroughCopy({ 'site/_static/images': 'static/images' });
  eleventyConfig.addPassthroughCopy({ 'site/_static/js': 'static/js' });
  eleventyConfig.addPassthroughCopy({ 'site/humans.txt': 'humans.txt' });

  return {
    dir: {
      input: "site",
      output: "docs",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["html", "liquid", "md", "njk"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
}