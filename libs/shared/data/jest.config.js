module.exports = {
  name: 'shared-data',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/data',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
