new Vue({
  el: '#app',
  data: {
    login: '',
    haslo: '',
    blad: '',
    zalogowany: false,
    czasy: {}
  },
  created() {
    // odśwież zegary co sekundę
    setInterval(this.aktualizujCzas, 1000);
  },
  methods: {
    zaloguj() {
      // prosta walidacja
      if (this.login === 'admin' && this.haslo === '1234') {
        this.zalogowany = true;
        this.blad = '';
      } else {
        this.blad = 'Niepoprawny login lub hasło';
      }
    },
    wyloguj() {
      this.zalogowany = false;
      this.login = '';
      this.haslo = '';
      this.czasy = {};
    },
    aktualizujCzas() {
      if (!this.zalogowany) return;

      var strefy = {
        'Warszawa': 'Europe/Warsaw',
        'Nowy Jork': 'America/New_York',
        'Tokio': 'Asia/Tokyo',
        'UTC': 'UTC'
      };

      var teraz = new Date();
      var nowaMapa = {};

      for (var miasto in strefy) {
        var fmt = new Intl.DateTimeFormat('pl-PL', {
          timeZone: strefy[miasto],
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        nowaMapa[miasto] = fmt.format(teraz);
      }

      this.czasy = nowaMapa;
    }
  }
});
