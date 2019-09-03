module.exports = {
  name: 'shop',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/shop',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
