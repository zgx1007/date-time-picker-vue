# 时间控件的说明

## 时间控件公用函数

     时间控件公用函数在文件src/components/dateTimePicker/utils.ts目录下，具体方法作用看每个方法的注释

## 如何使用时间控件

1. // 引用时间组件

```html
    <date-time-picker :dateTime.sync="datePickerTime" />
```

```js
    interface DateTime {
      start: number | string;
      end: number | string;
    }
```

2. // 传递给时间控件的时间对象,start 和 end 值是必填

```js
    datePickerTime: DateTime = {
      start: '1+hours+ago',
      end: 'now',
    }
```

## 时间控件参数具体格式（'绝对'，'相对'，'此刻'）

三种格式如下：

        '1616480747648',
        '1+hours+ago',
        'now'

例如：

```js
{
  start:1616480747648,
  end:'1+hours+ago'
}
```

## 相对时间所有单位格式必须按照下面所写
```js

    'seconds','minutes','hours','days','weeks','months','years',
```
## now值的说明
```
   无论以何种方式置为'now'时,当时间为'此刻',切换tab页为相对时间时,固定显示为'0 分钟以前 ' 
```
## Attributes

| 参数 | 说明 | 类型 | 必填值 | 默认值 |
| :---:| :---: | :----: | :---:| :---:|
| dateTime.sync | 绑定的值 | Object | dateTime对象中start、end的值必填|-|