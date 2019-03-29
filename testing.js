const scribe = require('./dist/index').scribe;

scribe.fatal('Hello');
scribe.fatal({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});
scribe.error('Hello');
scribe.error({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});
scribe.warn('Hello');
scribe.warn({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});
scribe.info('Hello');
scribe.info({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});
scribe.debug('Hello');
scribe.debug({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});
scribe.fine('Hello');
scribe.fine({field1: 'value1', array: [{fielda1: 'valuea1'}, {fielda2: 'valuea2'}]});