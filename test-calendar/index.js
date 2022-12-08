// Vue.prototype.$Moment = Moment;
Vue.prototype.$formatDateYMD = function(date) {
    let res = moment(date).format('YYYY-MM-DD')
    console.log(res)
    return res 
}
var myVm = new Vue({
        el: "#my_calender",
        data() {
          return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 2021,
            currentWeek: 1,
            days: [],
            newDate: this.$formatDateYMD(new Date().getTime()),
            newsss: this.$formatDateYMD(new Date().getTime()),
          };
        },
        created: function () {
          // 在vue初始化时调用
          this.initData(null);
        },
        methods: {
          initData: function (cur) {
              debugger
            // var leftcount = 0 // 存放剩余数量
            var date;
            if (cur) {
              date = new Date(cur);
            } else {
              var now = new Date();
              var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
              var aaaa = d.setDate(35);
              console.log(aaaa, new Date(aaaa))
              date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek === 0) {
              this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            // 初始化本周
            for (var i = this.currentWeek; i >= 0; i--) {
              var d2 = new Date(str);
              
              var bbbb = d2.setDate(d2.getDate() - i);
              console.log(bbbb)
              var dayobjectSelf = {}; // 用一个对象包装Date对象  以便为以后预定功能添加属性
              dayobjectSelf.day = d2;
              this.days.push(dayobjectSelf); // 将日期放入data 中的days数组 供页面渲染使用
            }
            // 其他周
            for (var j = 1; j <= 35 - this.currentWeek; j++) {
               
              var d3 = new Date(str);
              var cccc = d3.setDate(d3.getDate() + j);
              console.log(cccc)
              var dayobjectOther = {};
              dayobjectOther.day = d3;
              this.days.push(dayobjectOther);
            }
          },
          getDayTime(el, index) {
            this.newDate = el;
            console.log(el)
          },
          pickPre: function (year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
          },
          pickNext: function (year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
          },
          // 返回 类似 2022-05-17 格式的字符串
          formatDate: function (year, month, day) {
            var y = year;
            var m = month;
            if (m < 10) m = "0" + m;
            var d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
          },
        },
      })


      

