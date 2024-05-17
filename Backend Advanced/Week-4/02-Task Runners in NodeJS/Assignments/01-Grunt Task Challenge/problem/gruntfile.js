module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Configuration for the 'replace' task.
    replace: {
      // Task target configuration.
      index: {
        // Specify the source file.
        src: 'src/index.html',
        // Define replacement patterns.
        options: {
          patterns: [
            {
              // Regular expression pattern to match 'ninjacoding.com'.
              match: /ninjacoding\.com/g,
              // Replacement text.
              replacement: 'codingninjas.com',
            },
          ],
        },
        // Specify the destination directory.
        dest: 'build/index.html',
      },
    },
  });

  // Load the necessary Grunt plugins.
  grunt.loadNpmTasks('grunt-replace');

  // Default task(s).
  grunt.registerTask('default', ['replace']);
};
