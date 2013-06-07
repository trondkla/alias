(function (Alias) {
    Alias.JBCountDown = Simple.View.extend({
        initialize: function(options) {

            this.glob = options;


            var glob = this.glob;

            glob.total   = Math.floor((glob.endDate - glob.startdate) / 86400);
            glob.days    = Math.floor((glob.endDate - glob.now) / 86400);
            glob.hours   = 24 - Math.floor((glob.endDate - glob.now) % 86400 / 3600);
            glob.minutes = 60 - Math.floor((glob.endDate - glob.now) % 86400 % 3600 / 60);
            glob.seconds = 60 - Math.floor((glob.endDate - glob.now) % 86400 % 3600 % 60);
            glob.secLeft = Math.floor(glob.endDate - glob.now);

            if (glob.now >= glob.endDate) {
                return;
            }


        },


        deg: function(deg) {
            return (Math.PI/180)*deg - (Math.PI/180)*90;
        },

        seconds: function(){
            var glob = this.glob;

            glob.secLeft--;
            var cSec = $("#canvas_seconds").get(0);
            var ctx = cSec.getContext("2d");
            ctx.clearRect(0, 0, cSec.width, cSec.height);
            ctx.beginPath();
            ctx.strokeStyle = glob.secondsColor;
            
            ctx.shadowBlur    = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            var degs = (360 / Math.floor(glob.endDate - glob.startDate)) * (Math.floor(glob.endDate - glob.startDate) - glob.secLeft)
            
            ctx.lineWidth = cSec.width * 0.04;//18;
            ctx.arc(cSec.width/2,cSec.height/2, cSec.width/2 - ctx.lineWidth/2, this.deg(0), this.deg(degs));
            ctx.stroke();
        },

        start: function(){
            var glob = this.glob;
            var view = this;

            if (this.cdown) {
                this.stop()
            }

            /* Seconds */
            Simple.Events.trigger("countdown:start");
            this.cdown = setInterval(function(){
                if ( glob.seconds > 59 ) {
                    if (60 - glob.minutes === 0 && 24 - glob.hours === 0 && glob.days === 0) {                        
                        view.stop();
                        /* Countdown is complete */
                        Simple.Events.trigger("countdown:finished");
                        return;
                    }
                    glob.seconds = 1;
                    
                    if (glob.minutes > 59) {
                        glob.minutes = 1;
                        
                        if (glob.hours > 23) {
                            glob.hours = 1;
                            if (glob.days > 0) {
                                glob.days--;
                            }
                        } else {
                            glob.hours++;
                        }
                    } else {
                        glob.minutes++;
                    }
                } else {
                    glob.seconds++;
                }
                view.seconds();
            },1000);
        },

        stop: function() {
            clearInterval(this.cdown);
        }
    });
})(window.Alias = window.Alias || {});