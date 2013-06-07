(function (Alias) {
    Alias.Nedtelling = Simple.View.extend({
        initialize: function(options) {

            Simple.Events.on("reset", this.reset, this);
            Simple.Events.on("korrekt", this.korrekt, this);
            Simple.Events.on("feil", this.feil, this);

        },

        reset: function(event) {
            if (this.counter) this.counter.stop();
            
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

        nedtelling: function() {
            this.el.html("<canvas id=\"canvas_seconds\"> </canvas><p class=\"val\">Velkommen til BEKK Alias</p>");

            this.setupCanvas();


            var time = function() {
                    return Math.round(new Date().getTime() / 1000);
                }

            this.counter = new Alias.JBCountDown ({
                secondsColor : "#fff",
                secondsGlow  : "none",
                
                startDate   : time(),
                endDate     : time()+60,
                now         : time()
            });

            this.counter.start();
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

            var fontSize =  min_value / 10;

            val.css({
                "font-size": fontSize,
                "width": min_value * (2/3),
                "bottom": min_value / 2 + fontSize
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
