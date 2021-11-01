/***
 **时间处理
 */
 'use strict';
 import _ from 'lodash';
 import moment from 'moment';
 import DateTimeUnits from './utils';
 
 class TimeHandle {
   dateformat(time) {
     if (!time) {
       return;
     }
     return moment(time).format('YYYY-MM-DD HH:mm:ss');
   }
   absoluteDateformat(time) {
     if (!time) {
       return;
     }
     return moment(time).format('YYYY-MM-DD HH:mm:ss.SSS');
   }
   startRelativeDateformat(dateTimeObject) {
     if (!dateTimeObject) {
       return;
     }
     return '~' +
     dateTimeObject.startRelativeTimeValue +
     ' ' +
     DateTimeUnits.handleTimeStep(dateTimeObject.startRelativeTimeUnitsValue)[
       'timesUnits'
     ] +
     '' +
     dateTimeObject.startRelativeTimeType;
   }
   endRelativeDateformat(dateTimeObject) {
     if (!dateTimeObject) {
       return;
     }
     return '~' +
     dateTimeObject.endRelativeTimeValue +
     ' ' +
     DateTimeUnits.handleTimeStep(dateTimeObject.endRelativeTimeUnitsValue)[
       'timesUnits'
     ] +
     '' +
     dateTimeObject.endRelativeTimeType;
   }
 }
 
 export default new TimeHandle();
 