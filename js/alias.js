(function (Alias) {
    Alias.Nedtelling = Simple.View.extend({
        initialize: function(options) {
            this.setupCanvas();

            Simple.Events.on("reset", this.reset, this);
            Simple.Events.on("korrekt", this.korrekt, this);
            Simple.Events.on("feil", this.feil, this);
        },

        reset: function(event) {
            this.nedtelling();


            this.nyttOrd();
        },

        korrekt: function() {

            this.nyttOrd();
        },

        feil: function() {

            this.nyttOrd();
        },

        nyttOrd: function() {

            this.$(".val").html(Alias.Ordliste[Math.floor(Math.random()*Alias.Ordliste.length)]);
        },

        nedtelling: function(sekunder) {
            sekunder = sekunder || 60;

            var time = function() {
                    return Math.round(new Date().getTime() / 1000);
                }

            JBCountDown({
                secondsColor : "#fff",
                secondsGlow  : "none",
                
                startDate   : time(),
                endDate     : time()+sekunder,
                now         : time()
            });
        },

        setupCanvas: function() {
            $(".wrapper").width("100%").height(window.innerHeight-45);

            var canvas = this.$("#canvas_seconds");

            var min_value = this.el.height();

            if (min_value > this.el.width() ) {
                min_value = this.el.width();
            }

            canvas.height(min_value);
            canvas.get(0).height = min_value;
            canvas.width(min_value);
            canvas.get(0).width = min_value;

            var val = this.$(".val");

            var fontSize =  min_value / 20;

            val.css({
                "font-size": fontSize,
                "width": min_value * (2/3),
                "bottom": min_value / 2 + fontSize / 2
                });

        }
    });

    Alias.Poeng = Simple.View.extend({
        initialize: function(options) {

            this.poeng = 0;

            Simple.Events.on("korrekt", this.pluss, this);
            Simple.Events.on("feil", this.minus, this);
            Simple.Events.on("reset", this.reset, this);
            Simple.Events.on("countdown:finished", this.ferdig, this);

            this.ferdig = false;
        },

        pluss: function() {
            if (this.ferdig) return;
 
            this.poeng++;
            this.render();
        },

        minus: function() {
            if (this.ferdig) return;

            this.poeng--;
            this.render();
        },

        reset: function() {
            this.ferdig = false;
            this.poeng = 0;
            this.render();
        },

        render: function() {
            this.el.html(this.poeng);

            return this;
        },

        ferdig: function() {
            this.ferdig = true;
        }
    });
})(window.Alias = window.Alias || {});
