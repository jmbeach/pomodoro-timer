var strIconId = '#icon'
var strTimerIconPath = 'images/timer.ico'
var strCheckIconPath = 'images/check.ico'

function Notifier() {
    var notification = window.Notification || window.mozNotification || window.webkitNotification
    var isNotifications = typeof (notification) != 'undefined'
    var $icon = $(strIconId)
    var flashIconsCount = 3
    if (isNotifications) {
        notification.requestPermission()
    }

    this.alert = function (message) {
        if (isNotifications) {
            new notification(
                message, {
                    body: message,
                    dir: 'auto',
                    lang: 'EN',
                    tag: 'notificationPopup',
                    icon: strTimerIconPath
                }
            )
        }
    }

    this.flashIcons = function () {
        $icon.attr('href', strCheckIconPath)
        for (var i = 0; i < flashIconsCount; i++) {
            setTimeout(function () {
                $icon.attr('href', strCheckIconPath)
            }, 1500 * (i + 1))
            setTimeout(function () {
                $icon.attr('href', strTimerIconPath)
            }, 2000 * (i + 1))
        }
    }

    this.alterTitle = function () {
        var currentTitle = document.title
        var newTitle = 'Finished!'
        document.title = newTitle
        for (var i = 0; i < flashIconsCount; i++) {
            setTimeout(function () {
                document.title = newTitle
            }, 1500 * (i + 1))
            setTimeout(function () {
                document.title = currentTitle
            }, 2000 * (i + 1))
        }
    }
}
