module.exports = function(grunt) {

  const sass         = require('node-sass'),
        css_tasks    = ["sass", "postcss", "cssmin"],
        js_tasks     = ["concat", "uglify"],
        all_tasks    = css_tasks.concat(js_tasks);
        loadNpmTasks = require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    cssmin: {
      sitecss: {
        files: {
          "assets/css/main.min.css": ["assets/css/main.css"],
        }
      }
    },
    
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          "node_modules/jquery-ui/external/jquery-1.12.4/jquery.js",
          "node_modules/jquery-ui/ui/scroll-parent.js",
          "node_modules/jquery-ui/ui/data.js",
          "node_modules/jquery-ui/ui/widget.js",
          "node_modules/jquery-ui/ui/disable-selection.js",
          "node_modules/jquery-ui/ui/widgets/mouse.js",
          "node_modules/jquery-ui/ui/widgets/sortable.js",
          "src/js/main.js",
        ],
        dest: 'assets/js/bundle.js',
      },
    },

    uglify: {
      options: {
        compress: true
      },
      dist: {
        files: {
          "assets/js/bundle.min.js": ["assets/js/bundle.js"]
        }
      }
    },

    postcss: {
      options: {
        map: {
          inline: false,
          annotation: "assets/css/"
        },
        processors: [
          require("pixrem")(), // add fallbacks for rem units
          require("autoprefixer")(), // add vendor prefixes
        ]
      },
      dist: {
        src: "assets/css/*.css"
      },
    },

    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'assets/css/main.css': 'src/sass/main.scss',
        }
      }
    },

    watch: {
      scripts: {
        files: ["src/js/**/*.js", "src/sass/**/*.scss"],
        tasks: all_tasks,
      },
      css: {
        files: ["src/sass/**/*.scss"],
        tasks: css_tasks,
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: js_tasks,
      }
    }

  });
  grunt.registerTask("default", all_tasks);
  grunt.registerTask("css", css_tasks);
  grunt.registerTask("js", js_tasks);
};
