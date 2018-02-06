
var app = new Vue({
  el: '#app',
  data: {
    status: defaultStatus,
    lastMenstruationStr: '',
    statusMsg: {
      areYouSure: 'você tem certeza que tá grávida?',
      alreadyBorn: 'parabéns! seu baby já nasceu!',
      bornDate: 'baby previsto pra ',
      shouldBeBorn: 'já era pra seu baby ter nascido!',
      invalidDate: 'ops... isso não parece uma data válida',
      onlyNumbers: 'apenas números e barra (/)',
      typeRight: 'no formato dd/mm/yyyy',
      defaultStatus: 'digite a data da sua última menstruação'
    }
  },
  watch: {
    lastMenstruationStr: function(val) {
      this.calcDate(val);
    }
  },
  methods: {
    calcDate: function(val) {

      this.status = '';

      if (!val || val.length === 0) {
        this.status = this.statusMsg.defaultStatus;
        return;
      }
      else if (/[^\d\/]/g.test(val)) {
        this.status = this.statusMsg.onlyNumbers;
        return;
      }

      var parts = val.split('/');
      if (parts.length !== 3 || parts.some(function(v, i) { return v.length < 2; }) || parts[2].length < 4) {
        this.status = this.statusMsg.typeRight;
        return;
      }

      var d = parts[0];
      var m = parts[1];
      var y = parts[2];

      var dateMenstruation = Date.parse(y + '-' + m + '-' + d);
      if (isNaN(dateMenstruation)) {
        this.status = this.statusMsg.invalidDate;
        return;
      }

      var now = new Date();
      var toWeeks = 7 * 24 * 60 * 60 * 1000;
      if (now.getTime() - dateMenstruation > (42 * toWeeks)) {
        this.status = this.statusMsg.alreadyBorn;
        return;
      }
      else if (now.getTime() - dateMenstruation > (40 * toWeeks)) {
        this.status = this.statusMsg.shouldBeBorn;
        return;
      }

      var ud = now.getUTCDate();
      var um = now.getUTCMonth() + 1;
      var uy = now.getUTCFullYear();

      var unow = Date.parse(uy + '-' + um + '-' + ud);

      var born = dateMenstruation + (40 * 7 * 24 * 60 * 60 * 1000);
      var bornDate = new Date(born);

      var bd = bornDate.getDate();
      var bm = bornDate.getMonth();
      var by = bornDate.getFullYear();

      if (bd < 10) bd = '0' + bd;

      var months = [
        'janeiro', 'fevereiro', 'março',
        'abril', 'maio', 'junho', 'julho',
        'agosto', 'setembro', 'outubro',
        'novembro', 'dezembro'
      ];

      var diff = born - now.getTime();


      var daysTo = diff / 1000 / 60 / 60 / 24;
      var daysFrom = (unow - dateMenstruation) / 1000 / 60 / 60 / 24;

      if (daysFrom < 2) {
        this.status = this.statusMsg.areYouSure;
        return;
      }

      this.status =
        'você está de ' + Math.floor(daysFrom / 7) + ' semanas e ' + Math.floor(daysFrom % 7) + ' dias' +
        '\n' + this.statusMsg.bornDate + bd + ' de ' + months[bm] + ' de ' + by + '!' +
        '\nfaltam apenas ' + Math.floor(daysTo) + ' dias' +
        '\nou ' + Math.floor(daysTo / 7) + ' semanas e ' + Math.floor(daysTo % 7) + ' dias';
    }
  },
  beforeMount: function() {
    this.calcDate(this.lastMenstruationStr);
  }
});
