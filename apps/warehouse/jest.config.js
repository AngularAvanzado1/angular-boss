module.exports = {
  name: 'warehouse',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/warehouse',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
