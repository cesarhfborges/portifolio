process.env.CHROME_BIN = process.env.CHROME_BIN || require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcovonly', subdir: 'report-lcov'},
        {type: 'text'},
      ],
      fixWebpackSourcePaths: true,
      check: {
        emitWarning: false,
        global: {
          statements: 75,
          branches: 75,
          functions: 75,
          lines: 75,
          excludes: [],
        },
      },
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
      ChromeLiveTest: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
    browserDisconnectTimeout: 120000,
    browserDisconnectTolerance: 2,
  });
};
