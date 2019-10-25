module.exports = {
  name: 'currency',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/currency',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
