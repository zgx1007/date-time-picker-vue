<template>
  <div style="display:flex" class="picker-content">
    <div class="picker-data-block">
      <!--快速选择时间模块-->
      <div class="quick-data-block">
        <el-popover
          v-model="isShowPopover"
          placement="bottom-start"
          width="387"
          trigger="click"
          class="quick-select-popover"
        >
          <div class="quick-select-block">
            <div class="quick-select">
              <p>{{$t("dateTimePicker.quickSelect")}}</p>
              <ul>
                <!--                <li>-->
                <!--                  <el-select v-model="dateTimeObject['startRelativeTimeType']" placeholder="last"-->
                <!--                             @change="handleQuickTimeType">-->
                <!--                    <el-option-->
                <!--                      v-for="(item,index) in LastOptions"-->
                <!--                      :key="index"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value"/>-->
                <!--                  </el-select>-->
                <!--                </li>-->
                <li>
                  <el-select
                    id="timepicker-quicktimetype-select"
                    v-model="quickTimeType"
                    placeholder="last"
                    name="timepicker-quicktimetype-select"
                    @change="handleQuickTimeType"
                  >
                    <el-option
                      v-for="(item,index) in LastOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li>
                  <el-input-number
                    id="timepicker-quicktime-input"
                    v-model="quickTimeNum"
                    controls-position="right"
                    :min="0"
                    name="timepicker-quicktime-input"
                    @change="handleQuickTimeValue"
                  />
                </li>

                <li>
                  <el-select
                    id="timepicker-quicktimeunits-select"
                    v-model="quickTimeUnitsValue"
                    placeholder="minutes"
                    name="timepicker-quicktimeunits-select"
                    @change="handleQuickTimeUnitsValue"
                  >
                    <el-option
                      v-for="(item,index) in quickOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li>
                  <button
                    id="timepicker-quicktime-apply"
                    size="small"
                    name="timepicker-quicktime-apply"
                    @click="apply"
                  >{{$t('dateTimePicker.confirm')}}</button>
                </li>
              </ul>
            </div>
            <div class="commonly-used">
              <p>{{$t("dateTimePicker.commonlyUsed")}}</p>
              <ul>
                <li
                  @click="handelCommonTime(10,60000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 10 ${$t('dateTimePicker.minutes')}`}}</li>
                <li
                  @click="handelCommonTime(30,60000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 30 ${$t('dateTimePicker.minutes')}`}}</li>
                <li
                  @click="handelCommonTime(1,3600000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 1 ${$t('dateTimePicker.hours')}`}}</li>
                <li
                  @click="handelCommonTime(2,3600000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 2 ${$t('dateTimePicker.hours')}`}}</li>
                <li
                  @click="handelCommonTime(24,3600000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 24 ${$t('dateTimePicker.hours')}`}}</li>
                <li
                  @click="handelCommonTime(7,86400000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 7 ${$t('dateTimePicker.days')}`}}</li>
                <li
                  @click="handelCommonTime(30,86400000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 30 ${$t('dateTimePicker.days')}`}}</li>
                <li
                  @click="handelCommonTime(1,31536000000,$t('dateTimePicker.ago'))"
                >{{`${$t('dateTimePicker.last')} 1 ${$t('dateTimePicker.years')}`}}</li>
              </ul>
            </div>
            <!--            <div class="refresh-every">-->
            <!--              <p>刷新间隔</p>-->
            <!--              <ul class="is-start">-->
            <!--                <li>-->
            <!--                  <el-input-number v-model="refreshNum" controls-position="right" :min="1"-->
            <!--                                   @change="handleChangeRefresh" />-->
            <!--                </li>-->
            <!--                <li>-->
            <!--                  <el-select v-model="refreshTimeUnits" placeholder="seconds">-->
            <!--                    <el-option-->
            <!--                      v-for="(item,index) in refreshOptions"-->
            <!--                      :key="index"-->
            <!--                      :label="item.label"-->
            <!--                      :value="item.value" />-->
            <!--                  </el-select>-->
            <!--                </li>-->
            <!--                <li>-->
            <!--                    <button v-if="ifStop" size="small" @click="start">-->
            <!--                    Start-->
            <!--                    </button>-->
            <!--                    <button v-else size="small" @click="stop">-->
            <!--                    Stop-->
            <!--                    </button>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </div>-->
          </div>
          <div slot="reference" class="time-icon">
            <i class="iconfont icon-calendar-alt" />
          </div>
        </el-popover>
      </div>
      <!--日历选择时间模块-->
      <div class="calendar-content">
        <ul class="calendar-block">
          <el-popover
            placement="bottom-start"
            width="340"
            trigger="click"
            @show="controlDatePopover('show','Start')"
            @hide="controlDatePopover('hide','Start')"
          >
            <date-popover
              v-if="DatePoppverShowStart"
              ref="refDateTime"
              :isStart="isStart"
              :dateTimeObject="dateTimeObject"
              @listenTabs="handelTabs"
              @listenChildDateTime="handelListenChildDateTime"
            />
            <li
              v-if="startActiveName==='relative'||startActiveName==='absolute'||startActiveName==='now'"
              slot="reference"
              class="start-date"
              :class="{ active: dateTimeObject['isActiveRed']}"
              @click="handelIsStart(true)"
            >
              <div
                v-if="startActiveName==='absolute'&&!dateTimeObject['startIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{ timeHandle.absoluteDateformat(dateTimeObject.startTime) }}</div>
              <div
                v-else-if="startActiveName==='relative'&&!dateTimeObject['startIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{ timeHandle.startRelativeDateformat(dateTimeObject) }}</div>
              <div
                v-else-if="dateTimeObject['startIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{$t('dateTimePicker.now')}}</div>
            </li>
          </el-popover>
          <li class="date-range-icon">→</li>
          <el-popover
            placement="bottom-start"
            width="340"
            trigger="click"
            @show="controlDatePopover('show','End')"
            @hide="controlDatePopover('hide','End')"
          >
            <date-popover
              v-if="DatePoppverShowEnd"
              ref="refDateTime"
              :isStart="isStart"
              :dateTimeObject="dateTimeObject"
              @listenTabs="handelTabs"
              @listenChildDateTime="handelListenChildDateTime"
            />
            <li
              v-if="endActiveName==='relative'||endActiveName==='absolute'||endActiveName==='now'"
              slot="reference"
              class="start-date"
              :class="{ active: dateTimeObject['isActiveRed']}"
              @click="handelIsStart(false)"
            >
              <div
                v-if="endActiveName==='relative'&&!dateTimeObject['endIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{ timeHandle.endRelativeDateformat(dateTimeObject) }}</div>
              <div
                v-else-if="endActiveName==='absolute'&&!dateTimeObject['endIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{ timeHandle.absoluteDateformat(dateTimeObject.endTime) }}</div>
              <div
                v-else-if="dateTimeObject['endIsNow']"
                :class="{ active: dateTimeObject['isActiveRed']}"
              >{{$t('dateTimePicker.now')}}</div>
            </li>
          </el-popover>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, PropSync } from 'vue-property-decorator';
import Calendar from 'vue-calendar-component';
import DatePopover from '@/components/dateTimePicker/datePopover.vue';
import DateTimeUnits from '@/components/dateTimePicker/utils';
import TimeHandle from './timeHandle';


interface DateTimeObject {
  startTime: number;
  endTime: number;
  startRelativeTimeValue: number;
  startRelativeTimeUnitsValue: number;
  startRelativeTimeType: string;
  endRelativeTimeValue: number;
  endRelativeTimeUnitsValue: number;
  endRelativeTimeType: string;
  startIsNow: boolean;
  endIsNow: boolean;
  isActiveRed: boolean;
  quickTimeType: string;
  start: string | number;
  end: string | number;
}
  timeHandle = TimeHandle;

@Component({
  components: {
    Calendar,
    DatePopover,
  },
})
export default class DateTimePicker extends Vue {
  @PropSync('dateTime', {
    type: Object,
    default: {
      start: '',
      end: '',
    },
  })
  dateTimeSync;

  isShowPopover: boolean = false;

  // 定义一个全局时间变量对象,last表示时间类型为ago,next表示为after
  dateTimeObject: DateTimeObject = {
    startTime: new Date().getTime() - 60000, // 开始时间戳
    endTime: new Date().getTime(), // 结束时间戳
    startRelativeTimeValue: 10, // 相对时间number值
    startRelativeTimeUnitsValue: 60000, // 时间单位值
    startRelativeTimeType: this.$t('dateTimePicker.ago') as string,
    endRelativeTimeValue: 0, // 相对时间number值
    endRelativeTimeUnitsValue: 60000, // 时间单位值
    endRelativeTimeType: this.$t('dateTimePicker.ago') as string,
    startIsNow: false, // 开始时间是否为now
    endIsNow: false, // 结束时间是否为now
    isActiveRed: false, // 校验时间大小，start大于end时红色表示
    quickTimeType: this.$t('dateTimePicker.ago') as string,
    // F5.0.18-M1 新增的两个字段,可以传字面意义的时间
    start: '',
    end: '',
  };
  value: string = '';
  ifStop: boolean = true;
  timeStep: number = 0;
  refreshNum: number = 2;
  refreshOptions: any[] = [
    {
      value: 'seconds',
      label: 'seconds',
    },
    {
      value: 'minutes',
      label: 'minutes',
    },
    {
      value: 'hours',
      label: 'hours',
    },
  ];
  quickOptions: any[] = [
    {
      value: 1000,
      label: this.$t('dateTimePicker.seconds'),
    },
    {
      value: 60000,
      label: this.$t('dateTimePicker.minutes'),
    },
    {
      value: 3600000,
      label: this.$t('dateTimePicker.hours'),
    },
    {
      value: 86400000,
      label: this.$t('dateTimePicker.days'),
    },
    {
      value: 604800000,
      label: this.$t('dateTimePicker.weeks'),
    },
    {
      value: 2592000000,
      label: this.$t('dateTimePicker.months'),
    },
    {
      value: 31536000000,
      label: this.$t('dateTimePicker.years'),
    },
  ];
  LastOptions: any[] = [
    {
      value: this.$t('dateTimePicker.ago'),
      label: this.$t('dateTimePicker.last'),
    },
    {
      value: this.$t('dateTimePicker.after'),
      label: this.$t('dateTimePicker.next'),
    },
  ];
  DatePoppverShowStart: boolean = false;
  DatePoppverShowEnd: boolean = false;
  quickTimeType: string = this.$t('dateTimePicker.ago') as string;
  quickTimeNum: number = 10;
  quickTimeUnitsValue: number = 60000;

  refreshTimeUnits: string = 'seconds';
  refreshTimesNum: number = 2;
  setIntervalTime: number = 10000;
  lastTimeText: string = '';
  lastTimeTextArr: any[] = [];
  newLastTimeTextArr: any = [];
  lastTimeRange: number = 10000;
  isStart: boolean = true;
  startActiveName: string = 'relative';
  endActiveName: string = 'relative';

  mounted() {
    this.handeDateTime();
  }

  // 第一次时间控件展示，使用此时间控件必须传start，end，根据传入字面量时间时间控件展示对应时间类型(absolute,relative,now三种模式)
  handeDateTime() {
    // 通过调公用方法handleTabType()判断字面量时间属于这三种哪一种类型（absolute,relative,now）
    let startActiveName = DateTimeUnits.handleTabType(this.dateTimeSync.start);
    let endActiveName = DateTimeUnits.handleTabType(this.dateTimeSync.end);
    this.startActiveName = startActiveName;
    this.endActiveName = endActiveName;
    // 分别缓存开始和结束的Tab页的值,通过缓存方式可以减少一个Tabs组件
    localStorage.setItem('startTab', startActiveName);
    localStorage.setItem('endTab', endActiveName);
    // 调用公用方法handleTime(),将字面量时间转换为时间戳
    let startTimestamp = DateTimeUnits.handleTime(this.dateTimeSync.start);
    let endTimestamp = DateTimeUnits.handleTime(this.dateTimeSync.end);
    // 将dateTimeSync字面量时间赋值给全局对象dateTimeObject
    this.dateTimeObject['start'] = this.dateTimeSync['start'];
    this.dateTimeObject['end'] = this.dateTimeSync['end'];
    this.dateTimeObject['startTime'] = startTimestamp;
    if (startActiveName === 'relative') {
      let relativeTimeArr = this.dateTimeSync['start'].split('+');
      // 通过时间差计算出相对时间，'数值'+'单位'+'类型'（1 小时 以前）
      this.dateTimeObject['startRelativeTimeValue'] = parseInt(relativeTimeArr[0]);
      this.dateTimeObject['startRelativeTimeUnitsValue'] = DateTimeUnits.handleTimestamp(relativeTimeArr[1]);
      relativeTimeArr[2] === 'ago'
        ? (this.dateTimeObject['startRelativeTimeType'] = `${this.$t('dateTimePicker.ago')}`)
        : (this.dateTimeObject['startRelativeTimeType'] = `${this.$t('dateTimePicker.after')}`);
      this.dateTimeObject['endIsNow'] = false;
    } else if (startActiveName === 'absolute') {
      this.dateTimeObject['startTime'] = startTimestamp;
      this.dateTimeObject['endIsNow'] = false;
    } else {
      this.dateTimeObject['startIsNow'] = true;
      this.dateTimeObject['endIsNow'] = false;
    }
    // 结束时间
    this.dateTimeObject['endTime'] = endTimestamp;
    if (endActiveName === 'relative') {
      let relativeTimeArr = this.dateTimeSync['end'].split('+');
      // 通过时间差计算出相对时间，'数值'+'单位'+'类型'（1 小时 以前）
      this.dateTimeObject['endRelativeTimeValue'] = parseInt(relativeTimeArr[0]);
      this.dateTimeObject['endRelativeTimeUnitsValue'] = DateTimeUnits.handleTimestamp(relativeTimeArr[1]);
      relativeTimeArr[2] === 'ago'
        ? (this.dateTimeObject['endRelativeTimeType'] = `${this.$t('dateTimePicker.ago')}`)
        : (this.dateTimeObject['endRelativeTimeType'] = `${this.$t('dateTimePicker.after')}`);
      this.dateTimeObject['endIsNow'] = false;
    } else if (endActiveName === 'absolute') {
      this.dateTimeObject['endTime'] = endTimestamp;
      this.dateTimeObject['endIsNow'] = false;
    } else {
      this.dateTimeObject['endIsNow'] = true;
      this.dateTimeObject['startIsNow'] = false;
    }
  }

  @Watch('dateTimeObject', { deep: true })
  public dateTimeObjectChange(newVal) {
    //  判断开始时间不能大于结束时间
    let startTimestamp = DateTimeUnits.handleTime(this.dateTimeObject.start);
    let endTimestamp = DateTimeUnits.handleTime(this.dateTimeObject.end);
    if (startTimestamp - endTimestamp >= 0) {
      this.dateTimeObject['isActiveRed'] = true;
    } else {
      this.dateTimeObject['isActiveRed'] = false;
      this.dateTimeSync.start = newVal.start;
      this.dateTimeSync.end = newVal.end;
    }
  }

  // 监听双向绑定对象dateTimeSync
  @Watch('dateTimeSync', { deep: true })
  public dateTimeSyncChange() {
    this.handeDateTime();
  }

  // 控制DatePopover显示隐藏
  controlDatePopover(val: string, lacal: string) {
    this[`DatePoppverShow${lacal}`] = val === 'show';
  }

  // 快速时间提交 Apply方法
  apply() {
    if (this.quickTimeType === this.$t('dateTimePicker.ago')) {
      // 当为now时,触发改变其他值时,重新获取当前时间
      let newDate = new Date().getTime();
      this.dateTimeObject['endTime'] = newDate;
      this.startActiveName = 'relative';
      this.dateTimeObject['endIsNow'] = true;
      this.dateTimeObject['startIsNow'] = false;
      // 提交跟新时间面板数据
      this.dateTimeObject['startTime'] = newDate - this.quickTimeNum * this.quickTimeUnitsValue;
      this.dateTimeObject['startRelativeTimeValue'] = this.quickTimeNum;
      this.dateTimeObject['startRelativeTimeUnitsValue'] = this.quickTimeUnitsValue;
      this.dateTimeObject['startRelativeTimeType'] = this.quickTimeType;
      // 当end为now时，将endRelativeTimeValue的值置为0
      this.dateTimeObject['endRelativeTimeValue'] = 0;
      // 新增字面量时间
      let TimesUnits = DateTimeUnits.handleTimesUnits(this.quickTimeUnitsValue);
      this.dateTimeObject['start'] = `${this.quickTimeNum + '+' + TimesUnits + '+' + 'ago'}`;
      this.dateTimeObject['end'] = 'now';
      this.isShowPopover = false;
    } else if (this.quickTimeType === this.$t('dateTimePicker.after')) {
      // 当为now时,触发改变其他值时,重新获取当前时间
      let newDate = new Date().getTime();
      this.dateTimeObject['startTime'] = newDate;
      this.endActiveName = 'relative';
      this.dateTimeObject['endIsNow'] = false;
      this.dateTimeObject['startIsNow'] = true;
      // 提交更新时间面板数据
      this.dateTimeObject['endTime'] = new Date().getTime() + this.quickTimeNum * this.quickTimeUnitsValue;
      this.dateTimeObject['endRelativeTimeValue'] = this.quickTimeNum;
      this.dateTimeObject['endRelativeTimeUnitsValue'] = this.quickTimeUnitsValue;
      this.dateTimeObject['endRelativeTimeType'] = this.quickTimeType;
      // 当start为now时，将 startRelativeTimeValue的值置为0
      this.dateTimeObject['startRelativeTimeValue'] = 0;
      // 新增字面量时间
      let TimesUnits = DateTimeUnits.handleTimesUnits(this.quickTimeUnitsValue);
      this.dateTimeObject['end'] = `${this.quickTimeNum + '+' + TimesUnits + '+' + 'after'}`;
      this.dateTimeObject['start'] = 'now';
      this.isShowPopover = false;
    }
  }

  // 常用时间选择，将快速时间同步给快速时间,然后调用apply方法
  handelCommonTime(commonTimeValue, commonTimeUnitsValue, commonTimeType) {
    if (commonTimeType === this.$t('dateTimePicker.ago')) {
      this.quickTimeNum = commonTimeValue;
      this.quickTimeUnitsValue = commonTimeUnitsValue;
      this.quickTimeType = commonTimeType;
      this.apply();
      this.isShowPopover = false;
    } else {
      this.quickTimeNum = commonTimeValue;
      this.quickTimeUnitsValue = commonTimeUnitsValue;
      this.quickTimeType = commonTimeType;
      this.apply();
      this.isShowPopover = false;
    }
  }

  // 通过参数判断是star还是end的时间,star为true, end 为 false
  handelIsStart(param) {
    this.isStart = param;
  }

  // 获取tabsName
  handelTabs(tabsName) {
    if (tabsName === 'now') {
      return;
    }
    if (this.isStart) {
      this.startActiveName = tabsName;
    } else {
      this.endActiveName = tabsName;
    }
  }
}
</script>

<style scoped lang="less">
.picker-content {
  display: flex;
  position: relative;

  .picker-data-block {
    display: flex;
    width: 399px;
    height: 32px;
    border: 1px solid #4e4c4c;
    background: #242635;

    .quick-select-popover {
      text-align: center;
      /*line-height: 39px;*/

      .time-icon {
        color: #24c1ab;
        font-size: 19px;
      }

      .time-icon:hover {
        cursor: pointer;
      }
    }

    .quick-data-block {
      width: 30px;
      border-right: 1px solid #4e4c4c;
    }

    .calendar-content {
      width: 100%;

      .calendar-block {
        display: flex;
        width: 100%;
        justify-content: center;
        line-height: 32px;

        .date-range-icon {
          margin: 0px 4px;
        }
      }
    }
  }

  .submit {
    margin: 3px 0px 0px 16px;
  }
}

/deep/ .quick-select {
  border-bottom: 1px solid #545456;
  margin-bottom: 24px;

  p {
    color: white;
    font-size: 12px;
    margin: 6px;
  }

  ul {
    display: flex;
    justify-content: space-around;
    margin-bottom: 18px;

    li {
      margin: 5px;

      button {
        width: 65px;
        height: 34px;
        background: transparent;
        border: 1px solid;
        color: #24c1ab;
        border-radius: 5px;
        font-size: 13px;
      }

      button:hover {
        text-decoration: underline;
        cursor: pointer;
        -ms-: translate(0px, -1px);
        -webkit-transform: translate(0px, -1px); /* Safari and Chrome */
      }
    }
  }
}

/deep/ .commonly-used {
  border-bottom: 1px solid #545456;
  margin-bottom: 24px;

  p {
    color: white;
    font-size: 12px;
    margin: 6px;
  }

  ul {
    display: flex;
    flex-flow: wrap;
    margin-bottom: 18px;

    li {
      width: 50%;
      color: #24c1ab;
      font-size: 14px;
      margin-top: 7px;
    }

    li:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

/deep/ .recently-used {
  border-bottom: 1px solid #4a4c50;
  margin-bottom: 24px;

  p {
    color: white;
    font-size: 12px;
    margin: 6px;
  }

  ul {
    margin-bottom: 18px;

    li {
      color: #24c1ab;
      font-size: 14px;
      margin-top: 7px;
    }
  }
}

/deep/ .refresh-every {
  p {
    color: white;
    font-size: 12px;
    margin: 6px;
  }

  ul {
    display: flex;
    justify-content: space-around;

    li {
      margin: 5px;

      button {
        width: 78px;
        height: 34px;
        background: transparent;
        border: 1px solid;
        color: #24c1ab;
        border-radius: 5px;
        font-size: 17px;
      }

      button:hover {
        text-decoration: underline;
        cursor: pointer;
        -ms-: translate(0px, -1px);
        -webkit-transform: translate(0px, -1px); /* Safari and Chrome */
      }
    }
  }
}
</style>
<style lang="less">
.quick-data-block .el-range-editor--medium .el-range-input {
  font-size: 14px;
  background: #313446;
}

.quick-data-block .el-date-editor .el-range-input {
  color: white !important;
}

.quick-select-block .quick-select .el-input--medium .el-input__inner {
  width: 93px;
  background: #242635;
}

.quick-select-block .refresh-every .el-input--medium .el-input__inner {
  background: #242635;
}

.custom-dark .el-popper[x-placement^='bottom'] {
  background: #333646;
  border: 0;
}

.custom-dark .el-popper[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: #333646;
}

.custom-dark .el-popper[x-placement^='bottom'] .popper__arrow {
  border-top-color: #333646 !important;
  border-bottom-color: #333646 !important;
}

.custom-dark .el-select-dropdown {
  z-index: 9999 !important;
}

.start-date {
  color: white;

  .active {
    background: #5f2e2e;
    color: #ea2121;
  }
}

.start-date:hover {
  cursor: pointer;
}
</style>


