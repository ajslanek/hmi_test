new Vue({
  el: '#app',
  data: {
    loading: true,
    dane: []
  },
  created() {
    this.pobierzDane();
  },
  methods: {
    pobierzDane() {
      var xhr = new XMLHttpRequest();
      var self = this;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText);
            self.dane = response.map(function(item) {
              return {
                name: self.sanitize(item.name),
                value: self.sanitize(item.value)
              };
            });
            self.loading = false;
          } catch (e) {
            console.error('Błąd parsowania JSON:', e);
          }
        }
      };

      xhr.open('GET', '/api/dane', true);
      xhr.send();
    },
    sanitize(str) {
      // Prosta sanityzacja (można rozszerzyć)
      return String(str).replace(/[<>&"']/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#39;'
        }[c];
      });
    }
  }
});