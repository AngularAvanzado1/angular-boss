module.exports = {
  name: 'external-currency',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/external-currency',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
