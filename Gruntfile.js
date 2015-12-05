module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
 
    connect: {
      livereload: {
        options: {
          hostname: '*',
          port: 9001,
          base: 'dist/',// set root
          open: true
        }
      }
    },
    assemble: {
      site: {
        options: {
          layoutdir: 'dev/assemble-layouts', // 各ページのYFMで指定するレイアウトファイル（layout:）設置場所のパス
          data: ['dev/assemble-datas/**/*.{json,yml}'], // 各hbsファイルから変数として呼び出すファイル群の指定
          partials: ['dev/assemble-includes/**/*.hbs'], // 各hbsファイルから呼び出すテンプレートhtml（.hbs）ファイルを指定
          flatten:  false, // true にすると、生成するファイル群からディレクトリパスを削除
          helpers: [
            'index.js'
          ]
          // data: 'assemble-datas/general.json'
        },
        expand: true,
        dest: 'dist/', // 生成するファイルの保存先
        cwd: 'dev/assemble', // ここで指定したディレクトリ配下は、生成後にディレクトリ構造が保持される。expand: true にする必要がある
        src: ['**/*.hbs'] // 監視対象ファイル
      },
      component: {
        options: {
          data: 'assemble-datas/general.json'
        }
      }
    },
    // ファイル監視
    watch: {
      options: {
        livereload: true
      },
      assemble: {
        files: ['dev/**/*.hbs'],
        tasks: ['assemble']
      },
      livereload: {
        files: ['dev/index.html']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.registerTask('default', ['connect', 'watch']);

// npm install grunt-contrib-watch grunt-contrib-connect grunt-assemble

};