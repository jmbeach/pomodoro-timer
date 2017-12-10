var strIdTimer = '#timer'
var alertSound = new Audio('../sounds/alert.wav')

function Timer() {
  this.intervalCount = 1
  this.intervalCountNotRests = 1
  this.intervalsUntilBreak = 4
  this.mode = 0
  this.modes = {
    WORK: 0,
    REST: 1,
    LONG_REST: 2
  }

  // the jquery countdown timer object from the span in the HTML
  var $timer = $(strIdTimer)
  var notifier = new Notifier()
  
  // executes when any interval completes. 
  // sets up next interval.
  this.expire = function () {
    alertSound.play()
    notifier.alert('you\'re done')
    notifier.alterTitle()
    notifier.flashIcons()
    this.intervalCount++
    this.switchToNextMode()
    updateModeStatus()
    this.start()
  }

  this.expire = function () {
    alertSound.play()
    notifier.alert('Going back to last interval')
    notifier.alterTitle()
    notifier.flashIcons()
    this.intervalCount--
    this.switchToPreviousMode()
    updateModeStatus()
    this.start()
  }

  this.start = function () {
    var minutesWork = parseInt($('#minutesWork')[0].value)
    var secondsWork = parseInt($spinnerWorkSeconds[0].value)
    var minutesRest = parseInt($('#minutesRest')[0].value)
    var minutesLongRest = parseInt($('#minutesLongRest')[0].value)
    var minutesToUse = 0
    var secondsToUse = 0

    // pick which variable based on mode.
    switch (this.mode) {
    case this.modes.WORK:
      minutesToUse = minutesWork
      secondsToUse = secondsWork
      break
    case this.modes.REST:
      minutesToUse = minutesRest
      break
    case this.modes.LONG_REST:
      minutesToUse = minutesLongRest
      break
    }

    var currentDate = new Date()
    var minutesAdded = currentDate.getMinutes() + minutesToUse
    var secondsAdded = currentDate.getSeconds() + secondsToUse
    if (minutesToUse + secondsToUse == 0) { return }
    currentDate.setMinutes(minutesAdded)
    currentDate.setSeconds(secondsAdded)
    var timerCopy = this
    $timer.countdown('destroy')
    $timer.countdown({
      until: currentDate,
      onExpiry: function () {
        timerCopy.expire()
      }
    })
  }
  
  this.toggle = function () { $timer.countdown('toggle') }
  
  this.switchToPreviousMode = function () {
    switch (this.mode) {
    // if working before expiration
    case this.modes.WORK:
      if (this.intervalCountNotRests % this.intervalsUntilBreak == 1) {
        // take a long rest
        this.mode = this.modes.LONG_REST
      }
      else {
        // take a normal rest
        this.mode = this.modes.REST
      }

      // if the interval number spinner exists
      if (typeof ($spinnerInterval) != 'undefined') {
        // decrement the counter
        $spinnerInterval.spinner('stepDown', 1)
      }

      this.intervalCountNotRests--
      break
    case this.modes.REST:
      this.mode = this.modes.WORK
      break
    case this.modes.LONG_REST:
      this.mode = this.modes.WORK
      break
    }
  }

  this.switchToNextMode = function () {
    switch (this.mode) {
    // if working before expiration
    case this.modes.WORK:
      // and it's been x intervals
      if (this.intervalCountNotRests % this.intervalsUntilBreak == 0) {
        // take a long rest
        this.mode = this.modes.LONG_REST
      }
      else {
        // take a normal rest
        this.mode = this.modes.REST
      }

      // if the interval number spinner exists
      if (typeof ($spinnerInterval) != 'undefined') {
        // increment the counter
        $spinnerInterval.spinner('stepUp', 1)
      }

      this.intervalCountNotRests++
      break
    case this.modes.REST:
      this.mode = this.modes.WORK
      break
    case this.modes.LONG_REST:
      this.mode = this.modes.WORK
      break
    }
  }
}
