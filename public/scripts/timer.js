/// <reference path="notify.js"/>
//#region GLOBALS
var strIdTimer = "#timer";
var alertSound = new Audio('../sounds/alert.wav');
//#endregion

function Timer() {
    //#region PROPERTIES
    this.intervalCount = 1;
    this.intervalCountNotRests = 1;
    this.intervalsUntilBreak = 4;
    this.mode = 0;
    this.modes = {
        WORK: 0,
        REST: 1,
        LONG_REST: 2
    };
    //#endregion
    //#region PRIVATE_PROPERTIES
    // the jquery countdown timer object from the span in the HTML
    var $timer = $(strIdTimer);
    var notifier = new Notifier();
    //#endregion
    //#region #PUBLIC_METHODS
    
    // executes when any interval completes. 
    // sets up next interval.
    this.expire = function () {
        alertSound.play();
        notifier.alert("you're done");
        notifier.alterTitle();
        notifier.flashIcons();
        this.intervalCount++;
        this.switchToNextMode();
        updateModeStatus();
        this.start();
    };
    this.start = function () {
        var minutesWork = parseInt($("#minutesWork")[0].value);
        console.log("minutes work", minutesWork);
        var secondsWork = parseInt($spinnerWorkSeconds[0].value);
        var minutesRest = parseInt($("#minutesRest")[0].value);
        var minutesLongRest = parseInt($("#minutesLongRest")[0].value);
        var timerText = "";
        var minutesToUse = 0;
        var secondsToUse = 0;
        // pick which variable based on mode.
        switch (this.mode) {
            case this.modes.WORK:
                minutesToUse = minutesWork;
                secondsToUse = secondsWork;
                break;
            case this.modes.REST:
                minutesToUse = minutesRest;
                break;
            case this.modes.LONG_REST:
                minutesToUse = minutesLongRest;
                break;
        }
        var currentDate = new Date();
        console.log("current date", currentDate);
        console.log("current minutes", currentDate.getMinutes());
        console.log("minutes to use", minutesToUse);
        var minutesAdded = currentDate.getMinutes() + minutesToUse;
        var secondsAdded = currentDate.getSeconds() + secondsToUse;
        if (minutesToUse + secondsToUse == 0) { return; }
        console.log("minutes added", minutesAdded);
        currentDate.setMinutes(minutesAdded);
        currentDate.setSeconds(secondsAdded);
        console.log("current date", currentDate);
        var timerCopy = this;
        $timer.countdown('destroy');
        $timer.countdown({
            until: currentDate,
            onExpiry: function () {
                timerCopy.expire();
            }
        });
    };
    
    this.toggle = function () { $timer.countdown('toggle'); };
    
    this.switchToNextMode = function () {
        switch (this.mode) {
            // if working before expiration
            case this.modes.WORK:
                // and it's been x intervals
                if (this.intervalCountNotRests % this.intervalsUntilBreak == 0) {
                    // take a long rest
                    this.mode = this.modes.LONG_REST;
                }
                else {
                    // take a normal rest
                    this.mode = this.modes.REST;
                } timer
                var strNotification = "Interval " + this.intervalCountNotRests + " is complete! Enjoy your break!";
                //alert(strNotification);
                // if the interval number spinner exists
                if (typeof ($spinnerInterval) != "undefined") {
                    // increment the counter
                    try {
                        $spinnerInterval.spinner("stepUp", 1);
                    }
                    catch (ex) {
                        console.log("Couldn't increment spinner", ex);
                    }
                }
                this.intervalCountNotRests++;
                break;
            case this.modes.REST:
                this.mode = this.modes.WORK;
                //alert("Break's over!");
                break;
            case this.modes.LONG_REST:
                this.mode = this.modes.WORK;
                //alert("Get back to twerk!");
                break;
        }

    }
    //#endregion
    //#region PRIVATE_METHODS
    //#endregion
}