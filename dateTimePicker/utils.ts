import i18ns from 'edsp-vue-ui/i18ns';
class DateTimeUnits {
  // 通过时间步长计算获取到的时间单位
  handleTimeStep(timeUnitsValue: number): { step: number; timesUnits: any } {
    // timeUnitsValue时间单位值, timeValue时间值
    if (timeUnitsValue % 31536000000 === 0) {
      return {
        step: 31536000000,
        timesUnits: i18ns.t('dateTimePicker.years'),
      };
    } else if (timeUnitsValue % 2592000000 === 0) {
      return {
        step: 2592000000,
        timesUnits: i18ns.t('dateTimePicker.months'),
      };
    } else if (timeUnitsValue % 604800000 === 0) {
      return {
        step: 604800000,
        timesUnits: i18ns.t('dateTimePicker.weeks'),
      };
    } else if (timeUnitsValue % 86400000 === 0) {
      return {
        step: 86400000,
        timesUnits: i18ns.t('dateTimePicker.days'),
      };
    } else if (timeUnitsValue % 3600000 === 0) {
      return {
        step: 3600000,
        timesUnits: i18ns.t('dateTimePicker.hours'),
      };
    } else if (timeUnitsValue % 60000 === 0) {
      return {
        step: 60000,
        timesUnits: i18ns.t('dateTimePicker.minutes'),
      };
    } else {
      return {
        step: 1000,
        timesUnits: i18ns.t('dateTimePicker.seconds'),
      };
    }
  }

  // 根据毫秒数，计算出它是多少最大单位，比如3600000毫秒就是1h,1800000毫秒就是30min
  handleLengthAndUnit(
    timeUnitsValue: number
  ): { num: number; step: number; timesUnits: any } {
    // timeUnitsValue时间单位值, timeValue时间值, num是多少个时间单位
    if (Math.floor(timeUnitsValue / 31536000000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 31536000000),
        step: 31536000000,
        timesUnits: i18ns.t('dateTimePicker.years'),
      };
    } else if (Math.floor(timeUnitsValue / 2592000000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 2592000000),
        step: 2592000000,
        timesUnits: i18ns.t('dateTimePicker.months'),
      };
    } else if (Math.floor(timeUnitsValue / 604800000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 604800000),
        step: 604800000,
        timesUnits: i18ns.t('dateTimePicker.weeks'),
      };
    } else if (Math.floor(timeUnitsValue / 86400000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 86400000),
        step: 86400000,
        timesUnits: i18ns.t('dateTimePicker.days'),
      };
    } else if (Math.floor(timeUnitsValue / 3600000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 3600000),
        step: 3600000,
        timesUnits: i18ns.t('dateTimePicker.hours'),
      };
    } else if (Math.floor(timeUnitsValue / 60000) > 0) {
      return {
        num: Math.floor(timeUnitsValue / 60000),
        step: 60000,
        timesUnits: i18ns.t('dateTimePicker.minutes'),
      };
    } else {
      return {
        num: Math.floor(timeUnitsValue / 1000),
        step: 1000,
        timesUnits: i18ns.t('dateTimePicker.seconds'),
      };
    }
  }

  // 根据传入的时间与当前时间差值，计算出相对时间的值，单位，和类型
  handleRelativeTime(
    startTime: number
  ): { timesUnits: number; timeType: string; relativeTimeValue: number } {
    // timeUnitsValue时间单位值, timeValue时间值
    let timeType;
    let times = Math.abs(new Date().getTime() - startTime);
    if (new Date().getTime() - startTime > 0) {
      timeType = i18ns.t('dateTimePicker.ago');
    } else {
      timeType = i18ns.t('dateTimePicker.after');
    }
    if (times / 31536000000 >= 1) {
      return {
        timesUnits: 31536000000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 31536000000),
      };
    } else if (times / 2592000000 >= 1) {
      return {
        timesUnits: 2592000000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 2592000000),
      };
    } else if (times / 604800000 >= 1) {
      return {
        timesUnits: 604800000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 604800000),
      };
    } else if (times / 86400000 >= 1) {
      return {
        timesUnits: 86400000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 86400000),
      };
    } else if (times / 3600000 >= 1) {
      return {
        timesUnits: 3600000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 3600000),
      };
    } else if (times / 60000 >= 1) {
      return {
        timesUnits: 60000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 60000),
      };
    } else {
      return {
        timesUnits: 1000,
        timeType: timeType,
        relativeTimeValue: Math.floor(times / 1000),
      };
    }
  }

  // 将字面量时间单位转为单位时间戳
  handleTimestamp(timeUnits: string): number {
    let timestamp;
    switch (timeUnits) {
      case (timeUnits = 'seconds'):
        timestamp = 1000;
        break;
      case (timeUnits = 'minutes'):
        timestamp = 60000;
        break;
      case (timeUnits = 'hours'):
        timestamp = 3600000;
        break;
      case (timeUnits = 'days'):
        timestamp = 86400000;
        break;
      case (timeUnits = 'weeks'):
        timestamp = 604800000;
        break;
      case (timeUnits = 'months'):
        timestamp = 2592000000;
        break;
      case (timeUnits = 'years'):
        timestamp = 31536000000;
        break;
    }
    return timestamp;
  }

  // 一个公共纯函数，支持传入start和end, start和end可以是字面意义的时间
  // 相对时间格式：'1+hours+ago'、 绝对时间格式：1615792609101 、此刻时间格式：'now'
  handleTime = (time: number | string): number => {
    // 判断是否为绝对时间,将绝对时间转换为时间戳
    let newDate = new Date().getTime();
    if (typeof time === 'string' && time !== 'now') {
      let relativeTimeArr = time.split('+'); // ["1", "hours", "ago"]
      // 判断相对时间,将相对时间字面量转换为时间戳
      return relativeTimeArr[2] === 'ago'
        ? newDate -
            parseInt(relativeTimeArr[0]) *
              this.handleTimestamp(relativeTimeArr[1])
        : newDate +
            parseInt(relativeTimeArr[0]) *
              this.handleTimestamp(relativeTimeArr[1]);
    } else if (typeof time === 'string' && time === 'now') {
      return newDate;
    }
    return time;
  };

  // 判断字面意义时间类型是绝对时间、相对时间、此刻，返回ActiveName的值(提交给时间控件使用)
  handleTabType = (time: number | string): string => {
    if (typeof time === 'string' && time !== 'now') {
      return 'relative';
    } else if (typeof time === 'string' && time === 'now') {
      return 'now';
    }
    return 'absolute';
  };

  // 将单位时间戳字面量转换为时间单位
  handleTimesUnits(timestamp: number): string {
    let timeUnits;
    switch (timestamp) {
      case (timestamp = 1000):
        timeUnits = 'seconds';
        break;
      case (timestamp = 60000):
        timeUnits = 'minutes';
        break;
      case (timestamp = 3600000):
        timeUnits = 'hours';
        break;
      case (timestamp = 86400000):
        timeUnits = 'days';
        break;
      case (timestamp = 604800000):
        timeUnits = 'weeks';
        break;
      case (timestamp = 2592000000):
        timeUnits = 'months';
        break;
      case (timestamp = 31536000000):
        timeUnits = 'years';
        break;
    }
    return timeUnits;
  }
}

export default new DateTimeUnits();
