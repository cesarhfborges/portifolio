process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      // require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('node:path').join(__dirname, './coverage'),
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'text-summary', subdir: '.' },
      ],
      fixWebpackSourcePaths: true,
      check: {
        emitWarning: false,
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
          excludes: [],
        },
      },
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'ChromeHeadlessNoSandbox', 'ChromiumHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
      ChromiumHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
