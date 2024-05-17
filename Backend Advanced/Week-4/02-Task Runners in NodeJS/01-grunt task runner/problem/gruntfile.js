// Debug this grunt file in order to minify the files from
// public/css and public/js directories and save the 'css' and 'js' files inside minified directory.
module.exports = function (grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'public/css',
            src: ['*.css', '!*.min.css'],
            dest: 'public/minified',
            ext: '.min.css',
          },
        ],
      },
    },
    uglify: {
      target: {
        files: {
          'public/minified/minified.js': ['public/js/*.js'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task: minify CSS and JavaScript
  grunt.registerTask('default', ['cssmin', 'uglify']);
};
