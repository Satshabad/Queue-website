if (window.location.hostname == "queuemusic.me"){

    angular.module('queueapp').constant('config', {
        "hostname": "queuemusic.me",
        "appId":   '580401268636769'
    });
} else {

  angular.module('queueapp').constant('config', {
        "hostname": "192.168.1.26:8000",
        "appId":   '1380227372202033'
    });
}
