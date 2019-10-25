module.exports = {
  name: 'external-currency-elements',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/external/currency-elements',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
