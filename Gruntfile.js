module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        paths: {
            scss: "assets/scss",
            css : "assets/css"
        },
        repository: {
            type: "git",
            url: "https://github.com/enlosnervios/enlosnervios-website.git"
        },
        sass: {
            server: {
                files: {
                "<%= paths.css %>/screen.css": "<%= paths.scss %>/screen.scss"
                }
            },
            dist: {
                options: {
                    outputStyle: "compressed",
                    sourceComments: "normal"
                }
            },
            files: {
                "<%= paths.css %>/screen.css": "<%= paths.scss %>/screen.scss"
            }
        },
        concurrent: {
            serve: ["sass:server"]
        },
        watch: {
            sass: {
                files: ["<%= paths.scss %>/{,*/}*.scss"],
                tasks: ["sass:server"]
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask("serve", ["concurrent:serve", "watch"]);
}
