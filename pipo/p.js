var app = new Vue({
  el: '#app',
  data: {
    age: 'calculando...'
  },
  methods: {
    calcDate: function(val) {
      function calcAge(from) {
        var born = new Date(2018, 5, 10);
        var diff = from.getTime() - born.getTime();
        var daysDiff = diff / (1000 * 3600 * 24);
        var years = parseInt(daysDiff / 365);
        var remainingDays = daysDiff % 365;
        var months = parseInt(remainingDays / 30);
        return { years: years, months: months };
      }

      var res = calcAge(new Date());
      if (res.months) {
        this.status = res.years + ' anos e ' + res.months + ' meses';
      } else {
        this.status = res.years + ' anos';
      }
    }
  },
  beforeMount: function() {
    // this.calcDate(this.lastMenstruationStr);
  }
});
