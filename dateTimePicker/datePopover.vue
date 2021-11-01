<template>
  <div>
    <el-tabs v-model="activeName" class="start-tabs" @tab-click="handleClick">
      <el-tab-pane :label="$t('dateTimePicker.absolute')" name="absolute">
        <div id="calendar" style="display: flex">
          <calendar
            ref="Calendar"
            v-model="value"
            :textTop="textTop"
            show-date-only
            :disabled-days-of-week="disabled"
            :format="format"
            :placeholder="placeholder"
            :position="position"
            @choseDay="clickDay"
            @changeMonth="changeDate"
          />
          <ul class="time-picker">
            <li
              v-for="(item,index) in timesPickerArr"
              :key="item"
              :class="index===selected?selected:''"
              @click="clickTime(index*1800000,index)"
            >{{ item }}</li>
          </ul>
        </div>
        <div class="absolute-date-input">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="82px">
            <el-form-item
              v-show="isStart"
              :label="$t('dateTimePicker.startDate')"
              prop="startAbsoluteDateTimeInput"
            >
              <el-input
                id="datepop-absolu-time-input"
                v-model="ruleForm.startAbsoluteDateTimeInput"
                name="datepop-absolu-time-input"
                @change="changeAbsoluteDate('ruleForm')"
              />
            </el-form-item>
            <el-form-item
              v-show="!isStart"
              :label="$t('dateTimePicker.endDate')"
              prop="endAbsoluteDateTimeInput"
            >
              <el-input
                id="datepop-endabsolu-time-input"
                v-model="ruleForm.endAbsoluteDateTimeInput"
                name="datepop-endabsolu-time-input"
                @change="changeAbsoluteDate('ruleForm')"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('dateTimePicker.relative')" name="relative">
        <ul class="relative-time-select">
          <li>
            <el-input-number
              v-show="isStart"
              id="datepop-startrelat-num-input"
              v-model="startRelativeNum"
              :min="0"
              controls-position="right"
              name="datepop-startrelat-num-input"
              @change="handleRelativeTimeNum"
            />
            <el-input-number
              v-show="!isStart"
              v-model="endRelativeNum"
              :min="0"
              controls-position="right"
              @change="handleRelativeTimeNum"
            />
          </li>
          <li>
            <el-select
              v-show="isStart"
              id="datepop-startrelat-time-select"
              v-model="startRelativeTimeUnits"
              name="datepop-startrelat-time-select"
              @change="handleRelativeTimeUnits"
            >
              <el-option
                v-for="(item,index) in relativeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-show="!isStart"
              id="datepop-endrelat-timeunits-input"
              v-model="endRelativeTimeUnits"
              name="datepop-endrelat-timeunits-input"
              @change="handleRelativeTimeUnits"
            >
              <el-option
                v-for="(item,index) in relativeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </li>
        </ul>
        <!-- 时间取整功能注释 -->
        <!-- <div class="relative-round">
          <el-switch
            v-model="switchValue"
            disabled
            active-color="#24c1ab "
            inactive-color="#ff4949"
            id="datepop-relat-switch"
            name="datepop-relat-switch"
            @change="changeSwitchStatus"/>
          <span>{{$t('dateTimePicker.roundDate')}}</span>
        </div>-->
        <div class="relative-time-show">
          <div v-show="isStart" class="relative-date-input">
            <div class="relative-date-text">
              {{$t('dateTimePicker.startDate')}}
            </div>
            <input
              id="datepop-startrelat-time-input"
              v-model="startRelativeDateTimeInput"
              name="datepop-startrelat-time-input"
              type="text"
              disabled
              class="absolute-date-value"
            >
          </div>
          <div v-show="!isStart" class="relative-date-input">
            <div class="relative-date-text">
              {{$t('dateTimePicker.endDate')}}
            </div>
            <input
              id="datepop-endrelat-time-input"
              v-model="endRelativeDateTimeInput"
              name="datepop-endrelat-time-input"
              type="text"
              disabled
              class="absolute-date-value"
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('dateTimePicker.now')" name="now">
        <p class="now-text">
          {{$t('dateTimePicker.setDateMsg')}}
        </p>
        <button
          v-show="isStart"
          id="datepop-startNow"
          class="now-button"
          name="datepop-startNow"
          @click="setTimeToNow()"
        >{{$t("dateTimePicker.setStartDate")}}</button>
        <button
          v-show="!isStart"
          id="datepop-endNow"
          class="now-button"
          name="datepop-endNow"
          @click="setTimeToNow()"
        >{{$t("dateTimePicker.setEndDate")}}</button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Calendar from 'vue-calendar-component';
import DateTimeUnits from '@/components/dateTimePicker/utils';

@Component({
  components: {
    Calendar,
  },
})
export default class datePopover extends Vue {
  @Prop({ type: Object }) isStart;
  @Prop({ type: Object }) dateTimeObject;

  activeName: string = 'relative';
   timesPickerArr: any[] = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
  timesPicker: number = 12 * 1800000;
  datesPicker: number = new Date(new Date().toLocaleDateString()).getTime();
  selected: number = -1;
  startTime: number = 0;
  endTime: number = 0;
  switchValue: boolean = true;
  textTop: any[] = [
    this.$t('dateTimePicker.Mon'),
    this.$t('dateTimePicker.Tue'),
    this.$t('dateTimePicker.Wed'),
    this.$t('dateTimePicker.Thu'),
    this.$t('dateTimePicker.Fir'),
    this.$t('dateTimePicker.Sat'),
    this.$t('dateTimePicker.Sun'),
  ];
  relativeOptions: any[] = [
    {
      value: JSON.stringify({
        unitsValue: 1000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.seconds')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 60000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.minutes')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 3600000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.hours')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 86400000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.days')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 604800000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.weeks')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 2592000000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.months')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 31536000000,
        timeType: this.$t('dateTimePicker.ago'),
      }),
      label: `${this.$t('dateTimePicker.years')}${this.$t('dateTimePicker.ago')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 1000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.seconds')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 60000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.minutes')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 3600000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.hours')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 86400000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.days')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 604800000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.weeks')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 2592000000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.months')}${this.$t('dateTimePicker.after')}`,
    },
    {
      value: JSON.stringify({
        unitsValue: 31536000000,
        timeType: this.$t('dateTimePicker.after'),
      }),
      label: `${this.$t('dateTimePicker.years')}${this.$t('dateTimePicker.after')}`,
    },
  ];
  endIsNow: boolean;
  ruleForm: object = {
    startAbsoluteDateTimeInput: moment(new Date().getTime() - 3600000).format('YYYY-MM-DD HH:mm:ss.SSS'),
    endAbsoluteDateTimeInput: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS'),
  };

  // 新修改
  relativeTimeNum: number = 0;
  startRelativeNum: number = 1;
  endRelativeNum: number = 0;
  startRelativeTimeUnits: any = JSON.stringify({
    unitsValue: 60000,
    timeType: this.$t('dateTimePicker.ago'),
  });
  endRelativeTimeUnits: any = JSON.stringify({
    unitsValue: 60000,
    timeType: this.$t('dateTimePicker.ago'),
  });
  startRelativeDateTimeInput: string = moment(new Date().getTime() - 3600000).format('YYYY-MM-DD HH:mm:ss.SSS');
  endRelativeDateTimeInput: string = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
  rules: any = {
    startAbsoluteDateTimeInput: [
      {
        pattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d.[0-9]\d{2}$/,
        // message: '格式为YYYY-MM-DD HH:mm:ss.SSS',
        message: `${this.$t('dateTimePicker.format')}YYYY-MM-DD HH:mm:ss.SSS`,
        trigger: 'change',
      },
    ],
    endAbsoluteDateTimeInput: [
      {
        pattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d.[0-9]\d{2}$/,
        message: `${this.$t('dateTimePicker.format')}YYYY-MM-DD HH:mm:ss.SSS`,
        trigger: 'change',
      },
    ],
  };

  @Watch('dateTimeObject', { immediate: true, deep: true })
  public dateTimeObjectChange(newval) {
    // 给相对时间赋初始值
    let relativeTimeUnitsObj = JSON.parse(this.startRelativeTimeUnits);
    relativeTimeUnitsObj['unitsValue'] = this.dateTimeObject.startRelativeTimeUnitsValue;
    relativeTimeUnitsObj['timeType'] = this.dateTimeObject.startRelativeTimeType;
    this.startRelativeTimeUnits = JSON.stringify(relativeTimeUnitsObj);
    this.startRelativeNum = this.dateTimeObject.startRelativeTimeValue;
    let endRelativeTimeUnitsObj = JSON.parse(this.endRelativeTimeUnits);
    endRelativeTimeUnitsObj['unitsValue'] = this.dateTimeObject.endRelativeTimeUnitsValue;
    endRelativeTimeUnitsObj['timeType'] = this.dateTimeObject.endRelativeTimeType;
    this.endRelativeTimeUnits = JSON.stringify(endRelativeTimeUnitsObj);
    this.endRelativeNum = this.dateTimeObject.endRelativeTimeValue;
    this.startRelativeDateTimeInput = moment(newval['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    this.ruleForm['startAbsoluteDateTimeInput'] = moment(newval['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    this.endRelativeDateTimeInput = moment(newval['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    this.ruleForm['endAbsoluteDateTimeInput'] = moment(newval['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    // 绝对时间切换为相对时间计算
    this.dateTimeObject['startRelativeTimeValue'] = DateTimeUnits.handleRelativeTime(newval['startTime']).relativeTimeValue;
    this.dateTimeObject['startRelativeTimeUnitsValue'] = DateTimeUnits.handleRelativeTime(newval['startTime']).timesUnits;
    this.dateTimeObject['startRelativeTimeType'] = DateTimeUnits.handleRelativeTime(newval['startTime']).timeType;
    // this.isStart ? this.timesPicker = newval['startTime'] - this.datesPicker : this.timesPicker = newval['endTime'] - this.datesPicker;
  }

  mounted() {
    // 获取对应的Tab的值(也就是activeName的值，'absolute','relative','now'三种值)
    this.isStart ? (this.activeName = localStorage.getItem('startTab') || '') : (this.activeName = localStorage.getItem('endTab') || '');
    // 切换改变字面量时间
    if (this.activeName === 'absolute' && this.isStart) {
      this.dateTimeObject['start'] = this.dateTimeObject['startTime'];
      this.dateTimeObject['startIsNow'] = false;
    } else if (this.activeName === 'relative' && this.isStart) {
      this.handleTimeType();
    }
    if (this.activeName === 'absolute' && !this.isStart) {
      this.dateTimeObject['end'] = this.dateTimeObject['endTime'];
      this.dateTimeObject['endIsNow'] = false;
    } else if (this.activeName === 'relative' && !this.isStart) {
      this.handleTimeType();
    }
  }


  // 封装日历选择和时间选择的公用方法
  handelDateTime() {
    if (this.isStart) {
      // 开始绝对时间展示
      this.dateTimeObject['startTime'] = this.datesPicker + this.timesPicker;
      this.ruleForm['startAbsoluteDateTimeInput'] = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 开始相对时间的展示
      this.dateTimeObject['startRelativeTimeValue'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['startTime']).relativeTimeValue;
      this.dateTimeObject['startRelativeTimeUnitsValue'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['startTime']).timesUnits;
      this.dateTimeObject['startRelativeTimeType'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['startTime']).timeType;
      this.startRelativeDateTimeInput = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 新增字面量时间
      this.dateTimeObject['start'] = this.datesPicker + this.timesPicker;
      // 和快速时间选择，next和last相关连起来
      this.dateTimeObject['quickTimeType'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['startTime']).timeType;
    } else {
      // 结束绝对时间展示
      this.dateTimeObject['endTime'] = this.datesPicker + this.timesPicker;
      this.ruleForm['endAbsoluteDateTimeInput'] = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 结束相对时间的展示
      this.dateTimeObject['endRelativeTimeValue'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['endTime']).relativeTimeValue;
      this.dateTimeObject['endRelativeTimeUnitsValue'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['endTime']).timesUnits;
      this.dateTimeObject['endRelativeTimeType'] = DateTimeUnits.handleRelativeTime(this.dateTimeObject['endTime']).timeType;
      this.endRelativeDateTimeInput = moment(this.dateTimeObject['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 新增字面量时间
      this.dateTimeObject['end'] = this.datesPicker + this.timesPicker;
    }
  }

  // 切换月时国际化
  changeDate(data) {
    if (localStorage.getItem('LANGUAGE_STYLE') === 'en') {
      let year = data.split('/')[0];
      let index = parseInt(data.split('/')[1]);
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      document.getElementsByClassName('wh_content_li')[0]['innerText'] = `${months[index - 1] + ' ' + year}`;
    }
  }

  // 点击选择日历 年/月/日
  clickDay(date) {
    this.datesPicker = new Date(date).getTime(); // 转为时间戳,参数date默认格式为2019/2/3
    this.handelDateTime();
  }

  // 点击时间选择,tiems为时间选择是时间戳
  clickTime(times, index) {
    this.selected = index;
    this.timesPicker = times;
    this.handelDateTime();
  }

  // Absolute时间 input输入时间改变时间
  changeAbsoluteDate(ruleForm) {
    this.$refs[ruleForm].validate((valid) => {
      if (valid) {
        if (this.isStart) {
          let changeDateTime = new Date(this.ruleForm['startAbsoluteDateTimeInput']).getTime();
          this.dateTimeObject['startTime'] = changeDateTime;
          this.ruleForm['startAbsoluteDateTimeInput'] = moment(changeDateTime).format('YYYY-MM-DD HH:mm:ss.SSS');
          // 通过绝对时间转换为相对时间显示
          this.dateTimeObject['startRelativeTimeValue'] = DateTimeUnits.handleRelativeTime(changeDateTime).relativeTimeValue;
          this.dateTimeObject['startRelativeTimeUnitsValue'] = DateTimeUnits.handleRelativeTime(changeDateTime).timesUnits;
          this.dateTimeObject['startRelativeTimeType'] = DateTimeUnits.handleRelativeTime(changeDateTime).timeType;
          this.startRelativeDateTimeInput = moment(changeDateTime).format('YYYY-MM-DD HH:mm:ss.SSS');
          // 新增字面量时间
          this.dateTimeObject['start'] = changeDateTime;
          // 日历跳转到对应年月日
          this.handleCalendarDate(this.dateTimeObject['startTime']);
        } else {
          let changeDateTime = new Date(this.ruleForm['endAbsoluteDateTimeInput']).getTime();
          this.dateTimeObject['endTime'] = changeDateTime;
          this.ruleForm['endAbsoluteDateTimeInput'] = moment(changeDateTime).format('YYYY-MM-DD HH:mm:ss.SSS');
          // 通过绝对时间转换为相对时间显示
          this.dateTimeObject['endRelativeTimeValue'] = DateTimeUnits.handleRelativeTime(changeDateTime).relativeTimeValue;
          this.dateTimeObject['endRelativeTimeUnitsValue'] = DateTimeUnits.handleRelativeTime(changeDateTime).timesUnits;
          this.dateTimeObject['endRelativeTimeType'] = DateTimeUnits.handleRelativeTime(changeDateTime).timeType;
          this.endRelativeDateTimeInput = moment(changeDateTime).format('YYYY-MM-DD HH:mm:ss.SSS');
          // 新增字面量时间
          this.dateTimeObject['end'] = changeDateTime;
          // 日历跳转到对应年月日
          this.handleCalendarDate(this.dateTimeObject['endTime']);
        }
      } else {
        return false;
      }
    });
  }

  // 判断相对时间单位类型为ago还是after的公用方法
  handleTimeType() {
    // 当为now时,触发改变其他值时,重新获取当前时间
    let newDate = new Date().getTime();
    // 将json字符串转js对象
    let relativeTimeUnitsObj;
    this.isStart ? (relativeTimeUnitsObj = JSON.parse(this.startRelativeTimeUnits)) : (relativeTimeUnitsObj = JSON.parse(this.endRelativeTimeUnits));
    let TimesUnits = DateTimeUnits.handleTimesUnits(relativeTimeUnitsObj['unitsValue']);
    // 判断相对时间单位类型为ago还是after
    if (relativeTimeUnitsObj['timeType'] === this.$t('dateTimePicker.ago')) {
      if (this.isStart) {
        this.dateTimeObject['startTime'] = newDate - this.startRelativeNum * relativeTimeUnitsObj['unitsValue'];
        // 新增字面量时间
        this.dateTimeObject['start'] = `${this.startRelativeNum + '+' + TimesUnits + '+' + 'ago'}`;
      } else {
        this.dateTimeObject['endTime'] = newDate - this.endRelativeNum * relativeTimeUnitsObj['unitsValue'];
        // 新增字面量时间
        this.dateTimeObject['end'] = `${this.endRelativeNum + '+' + TimesUnits + '+' + 'ago'}`;
      }
    } else {
      if (this.isStart) {
        this.dateTimeObject['startTime'] = newDate + this.startRelativeNum * relativeTimeUnitsObj['unitsValue'];
        // 新增字面量时间
        this.dateTimeObject['start'] = `${this.startRelativeNum + '+' + TimesUnits + '+' + 'after'}`;
      } else {
        this.dateTimeObject['endTime'] = newDate + this.endRelativeNum * relativeTimeUnitsObj['unitsValue'];
        // 新增字面量时间
        this.dateTimeObject['end'] = `${this.endRelativeNum + '+' + TimesUnits + '+' + 'after'}`;
      }
    }
  }

  //  相对时间两个输入框公用方法
  handelPublicRelativeTime() {
    if (this.isStart) {
      this.dateTimeObject['startIsNow'] = false;
      // 判断相对时间单位类型为ago还是after的公用方法
      this.handleTimeType();
      this.ruleForm['startAbsoluteDateTimeInput'] = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 相对时间
      let relativeTimeUnitsObj = JSON.parse(this.startRelativeTimeUnits);
      this.dateTimeObject['quickTimeType'] = relativeTimeUnitsObj['timeType'];
      this.dateTimeObject['startRelativeTimeValue'] = this.startRelativeNum;
      this.dateTimeObject['startRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.dateTimeObject['startRelativeTimeType'] = relativeTimeUnitsObj['timeType'];
      this.startRelativeDateTimeInput = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    } else {
      this.dateTimeObject['endIsNow'] = false;
      this.handleTimeType();
      let relativeTimeUnitsObj = JSON.parse(this.endRelativeTimeUnits);
      this.dateTimeObject['endRelativeTimeValue'] = this.endRelativeNum;
      this.dateTimeObject['endRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.dateTimeObject['endRelativeTimeType'] = relativeTimeUnitsObj['timeType'];
      this.ruleForm['endAbsoluteDateTimeInput'] = moment(this.dateTimeObject['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      this.endRelativeDateTimeInput = moment(this.dateTimeObject['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
    }
  }

  // 点击相对时间number输入框
  handleRelativeTimeNum() {
    this.handelPublicRelativeTime();
  }

  // 点击相对时间单位值
  handleRelativeTimeUnits() {
    this.handelPublicRelativeTime();
  }

   // 相对时间到绝对时间，日历跳转到对应年月日的方法
  handleCalendarDate(time){
      let CalendarDate = moment(time).format('YYYY-MM-DD');
      this.$refs.Calendar.ChoseMonth(CalendarDate, true);
   }

  // Tabs页切换的方法
  handleClick(tab) {
    // 切换改变字面量时间
    if (tab.name === 'absolute' && this.isStart) {
      this.dateTimeObject['start'] = this.dateTimeObject['startTime'];
      this.dateTimeObject['startIsNow'] = false;
      // 日历跳转到对应年月日
      this.handleCalendarDate(this.dateTimeObject['startTime']);
    } else if (tab.name === 'relative' && this.isStart) {
      this.dateTimeObject['startIsNow'] = false;
      this.handleTimeType();
       let relativeTimeUnitsObj = JSON.parse(this.startRelativeTimeUnits);
      this.dateTimeObject['startRelativeTimeValue'] = this.startRelativeNum;
      this.dateTimeObject['startRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.dateTimeObject['startRelativeTimeType'] = relativeTimeUnitsObj['timeType'];
    }
    if (tab.name === 'absolute' && !this.isStart) {
      this.dateTimeObject['end'] = this.dateTimeObject['endTime'];
      this.dateTimeObject['endIsNow'] = false;
      // 日历跳转到对应年月日
      this.handleCalendarDate(this.dateTimeObject['endTime']);
    } else if (tab.name === 'relative' && !this.isStart) {
      this.dateTimeObject['startIsNow'] = false;
      this.handleTimeType();
      let relativeTimeUnitsObj = JSON.parse(this.endRelativeTimeUnits);
      this.dateTimeObject['endRelativeTimeValue'] = this.endRelativeNum;
      this.dateTimeObject['endRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.dateTimeObject['endRelativeTimeType'] = relativeTimeUnitsObj['timeType'];
    }
    if (this.isStart) {
      // 切换Tab页面时修改缓存数据
      localStorage.setItem('startTab', tab.name);
      this.$emit('listenTabs', tab.name);
    } else {
      // 切换Tab页面时修改缓存数据
      localStorage.setItem('endTab', tab.name);
      this.$emit('listenTabs', tab.name);
    }
    // 日历的国际
    let date;
    this.isStart ? (date = moment(this.dateTimeObject['startTime']).format('YYYY/MM/DD')) : (date = moment(this.dateTimeObject['endTime']).format('YYYY/MM/DD'));
    if (localStorage.getItem('LANGUAGE_STYLE') === 'en') {
      let year = date.split('/')[0];
      let index = parseInt(date.split('/')[1]);
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      document.getElementsByClassName('wh_content_li')[0]['innerText'] = `${months[index - 1] + ' ' + year}`;
    }
  }

  // 点击获取当前时间
  setTimeToNow() {
    if (this.isStart) {
      let relativeTimeUnitsObj = JSON.parse(this.startRelativeTimeUnits);
      this.dateTimeObject['startIsNow'] = true;
      this.dateTimeObject['startTime'] = new Date().getTime();
      this.dateTimeObject['startRelativeTimeValue'] = 0;
      this.dateTimeObject['startRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.dateTimeObject['startRelativeTimeType'] = this.$t('dateTimePicker.ago');
      this.ruleForm['startAbsoluteDateTimeInput'] = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      this.startRelativeDateTimeInput = moment(this.dateTimeObject['startTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 新增字面量时间
      this.dateTimeObject['start'] = 'now';
    } else {
      let relativeTimeUnitsObj = JSON.parse(this.endRelativeTimeUnits);
      this.dateTimeObject['endIsNow'] = true;
      this.dateTimeObject['endTime'] = new Date().getTime();
      this.dateTimeObject['endRelativeTimeValue'] = 0;
      this.dateTimeObject['endRelativeTimeType'] = this.$t('dateTimePicker.ago');
      this.dateTimeObject['endRelativeTimeUnitsValue'] = relativeTimeUnitsObj['unitsValue'];
      this.ruleForm['endAbsoluteDateTimeInput'] = moment(this.dateTimeObject['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      this.endRelativeDateTimeInput = moment(this.dateTimeObject['endTime']).format('YYYY-MM-DD HH:mm:ss.SSS');
      // 新增字面量时间
      this.dateTimeObject['end'] = 'now';
    }
  }
}
</script>
<style lang="less">
/*起始时间*/
.start-tabs .el-tabs__nav {
  width: 100%;
  margin-left: 9%;
}

.start-tabs .time-picker {
  min-width: 55px;
  margin-top: 25px;
  max-height: 256px;
  overflow: auto;

  li {
    color: #d6d8de;
    font-size: 14px;
    margin-bottom: 7px;
    text-align: center;
    border-radius: 4px;
  }

  .selected {
    background: #24c1ab;
  }

  li:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.start-tabs {
  .absolute-date-input {
    height: 75px;

    .el-input--medium .el-input__inner {
      background: #2a2b3c;
    }

    .absolute-date-text {
      line-height: 34px;
      background: #313446;
    }

    .absolute-date-value {
      border: 1px;
      width: 100%;
      height: 41px;
      background: #242635;
      color: white;
    }
  }

  .relative-time-select {
    display: flex;
    margin-top: 6px;

    .el-input--medium .el-input__inner {
      background: #242635;
    }

    li {
      margin: 5px;
    }
  }

  .relative-round {
    margin: 7px 0px 0px 8px;

    span {
      font-weight: bold;
      color: #9c9ca5;
    }
  }

  .relative-time-show {
    margin-top: 10px;
    margin-left: 5px;

    .relative-date-input {
      display: flex;

      .relative-date-text {
        width: 94px;
        line-height: 33px;
        background: #313446;
        color: #c0c4cc;
      }

      .absolute-date-value {
        border: 1px;
        width: 100%;
        height: 35px;
        background: #242635;
        color: white;
      }
    }

    span {
      line-height: 35px;
      margin: 3px;
      color: white;
    }
  }
}

/*当前时间的选择*/
.now-text {
  color: #878b95;
}

.now-button {
  background: #24c1ab;
  width: 100%;
  height: 34px;
  border: 1px solid #24c1ab;
  color: white;
  border-radius: 5px;
  font-size: 17px;
  margin-top: 14px;
  height: 41px;
}

.now-button:hover {
  text-decoration: underline;
  cursor: pointer;
  -ms-: translate(0px, -1px);
  -webkit-transform: translate(0px, -1px);
}

.start-tabs .custom-dark .el-tabs__nav-wrap {
  width: 100%;
}

.start-tabs .custom-dark .el-tabs__item {
  font-weight: bold;
}

#calendar {
  /*日历的背景颜色 */

  .wh_content_all[data-v-2ebcbc83] {
    background: #333646;
  }

  /*日历宽和高*/

  .wh_container[data-v-2ebcbc83] {
    max-width: 250px;
    max-height: 290px;
    margin: auto;
  }

  .wh_content_item[data-v-2ebcbc83] {
    height: 35px;
  }

  /*日历点击*/

  .wh_content_item .wh_chose_day[data-v-2ebcbc83] {
    background: #24c1ab;
    border-radius: 5px;
  }

  /*今天*/

  .wh_content_item .wh_isToday[data-v-2ebcbc83] {
    color: #24c1ab;
    background-color: transparent;
  }

  /*今天hover 效果*/

  .wh_content_item .wh_isToday[data-v-2ebcbc83]:hover {
    background-color: transparent;
  }

  /*日历划过*/

  .wh_item_date[data-v-2ebcbc83]:hover {
    transform: scale(1.2, 1.2);
    text-decoration: underline;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
    border-radius: 5px;
  }
}
</style>
