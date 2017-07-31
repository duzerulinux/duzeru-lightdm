
var img_user = {};
var name_user = {};
var name_session = {};
var _session;


$(document).ready(function () {
    //getSession();

//  getUser();
    login.getSession();
    login.getUser();

    $('select').material_select();

    beginClock();

    particle();

    keyboard();

    
    $(this).bind("contextmenu", function (e) {
        e.preventDefault();
    });

    //ctrl+A
    $(this).keydown(function (e) {
        if (e.keyCode === 65 && e.ctrlKey) {
            e.preventDefault();
        }
    })


    var dt = new Date();
    $('#pnClock .clock_date span:nth-child(1)').html(lang.week[dt.getDay()]);
    $('#pnClock .clock_date span:nth-child(2)').html(("0" + dt.getDate()).substr(-2));
    $('#pnClock .clock_date span:nth-child(3)').html(lang.month[dt.getMonth()]);
    $('#pnClock .clock_date span:nth-child(4)').html(dt.getFullYear());

    getConfig();


    if (localStorage.getItem('login')) {
        var loginJson = $.parseJSON(localStorage.getItem('login'));

        $('#pnUser').val(loginJson.user).change();
        $('.select-dropdown').val(loginJson.user);

        start_authentication(loginJson.user);

        $('.artist__image').attr('src', img_user[loginJson.user]);
        $('.name_session').html(loginJson.nameSession);
        _session = loginJson.session;

        //var storage = {user: lightdm.authentication_user, session: _session};
    } else {
        start_authentication(name_user[0]);
        $('.artist__image').attr('src', img_user[name_user[0]]);
        $('.name_session').html(name_session[0]);
    }


    $(document).on('change', '#pnUser', function () {
        var user = $(this).val();

        $('.artist__image').attr('src', img_user[user]);
        start_authentication(user);

        var storage = {user: user, session: _session, nameSession: $('.name_session').html()};
        localStorage.setItem('login', JSON.stringify(storage));

    });


    $('#btnLogin').click(function () {
        var pass = $('#password').val();
        login.setLogin(pass);
    });


    $('.pnSession').click(function () {
        var sess = $(this).attr('session');
        _session = sess;

        var storage = {user: $('#pnUser').val(), session: _session, nameSession: $(this).html()};
        localStorage.setItem('login', JSON.stringify(storage))

        $('.name_session').html($(this).html());
        $('#pnSelectSesscion').html(_session);
    });


    $('#password').keydown(function (e) {
        if (e.keyCode == 13) {
            var pass = $(this).val();

            login.setLogin(pass);

            if (e.preventDefault)
                e.preventDefault();
            if (e.stopPropagation)
                e.stopPropagation();
        }

    });


    $(document).on('click', '#btnDropMenu', function () {
        setTimeout(function () {
            $('#btnDropMenu').dropdown('open');
        }, 50);
    });

    $(document).on('click', '#dropMenu li', function () {
        setTimeout(function () {
            $('#btnDropMenu').dropdown('close');
        }, 50);
    });

    $('#cbDate').click(function () {
        if ($(this).prop('checked'))
            $('#pnClock .clock_date').hide();
        else
            $('#pnClock .clock_date').show();

        setConfig();
    });

    $('#cbClockAna').click(function () {
        if ($(this).prop('checked'))
            $('#clock').hide();
        else
            $('#clock').show();
        setConfig();
    });

    $('#cbClockDig').click(function () {
        if ($(this).prop('checked'))
            $('#pnClock .digital').hide();
        else
            $('#pnClock .digital').show();
        setConfig();
    });

    $('#cbSmallPar').click(function () {
        if ($(this).prop('checked'))
            $('#particles-background').hide();
        else
            $('#particles-background').show();
        setConfig();
    });

    $('#cbMediumPar').click(function () {
        if ($(this).prop('checked'))
            $('#particles-foreground').hide();
        else
            $('#particles-foreground').show();
        setConfig();
    });

    $('.prevBb').click(function () {
        $('body, .artist__blur_').removeClass();
        $('body, .artist__blur_').addClass($(this).attr('bg'));
        setConfig();
    });



});


var login = (function () {

    function getUser() {
        var option = '';

        for (i in lightdm.users) {
            user = lightdm.users[i];
            if (user.image.length > 0)
                image = user.image
            else
                image = 'user-icon.png';

            img_user[user.name] = image;

            option += '<option value="' + user.name + '" data-icon="' + image + '" class="left circle text-darken-4 ">' + user.name + '</option>';

            name_user[i] = user.name;

        }
        $('#pnUser').append(option);

    }

    function getSession() {
        var htmlSess = '';

        for (var i in lightdm.sessions) {
            var session = lightdm.sessions[i];
            name_session[i] = session.name;

            htmlSess += '<li><a href="#!" class="pnSession" session="' + session.key + '">' + session.name + '</a></li>';

        }

        $('#dropMenu').append(htmlSess);

    }

    function setLogin(pass) {
        if (pass !== '') {
            $('#btnLogin').attr('disabled', true);
            $('#btnLogin').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only"></span>');
            lightdm.provide_secret(pass);
        } else {
            swal(lightdm.authentication_user, lang.msgPassword, 'error');
        }
    }

    return{
        getUser: getUser,
        getSession: getSession,
        setLogin: setLogin
    };

})();

function opacityClock(value) {
    value = '0.' + ('0' + value).substr(-2);
    $('#pnClock').css('opacity', value);
    setConfig();
}

function menuRight() {
    $('#pnMenuRight').toggleClass('grande');
    $('#pnClock').toggleClass('newPositPnClock');
    $('#login').toggleClass('loginHide');
}

function setConfig() {
    var config = {
        date: $('#cbDate').prop('checked'),
        clockAna: $('#cbClockAna').prop('checked'),
        clockDig: $('#cbClockDig').prop('checked'),
        sPart: $('#cbSmallPar').prop('checked'),
        mPart: $('#cbMediumPar').prop('checked'),
        bg: $('body').attr('class'),
        clockOpacity: $('#rgClock').val()
    };
    localStorage.setItem('config', JSON.stringify(config));
}

function getConfig() {
    if (localStorage.getItem('config')) {
        var config = $.parseJSON(localStorage.getItem('config'));
        $('#cbDate').prop('checked', config.date);
        $('#cbClockAna').prop('checked', config.clockAna);
        $('#cbClockDig').prop('checked', config.clockDig);
        $('#cbSmallPar').prop('checked', config.sPart);
        $('#cbMediumPar').prop('checked', config.mPart);
        $('#rgClock').val(config.clockOpacity);
        $('#pnClock').css('opacity', '0.' + config.clockOpacity);

        if (config.date)
            $('#pnClock .clock_date').hide();

        if (config.clockAna)
            $('#clock').hide();

        if (config.clockDig)
            $('#pnClock .digital').hide();

        if (config.sPart)
            $('#particles-background').hide();

        if (config.mPart)
            $('#particles-foreground').hide();

        if (config.bg) {
            $('body, .artist__blur_').removeClass();
            $('body, .artist__blur_').addClass(config.bg);
        }

    }
}

function hibernate() {
    swal({
        title: lang.hibernate,
        text: lang.msgHibernate,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: lang.yes,
        closeOnConfirm: false
    }, function () {
        lightdm.hibernate();
    });
}

function suspend() {
    swal({
        title: lang.suspend,
        text: lang.msgSuspend,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: lang.yes,
        closeOnConfirm: false
    }, function () {
        lightdm.suspend();
    });
}

function restart() {
    swal({
        title: lang.restart,
        text: lang.msgRestart,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: lang.yes,
        closeOnConfirm: false
    }, function () {
        lightdm.restart();
    });
}

function shutdown() {
    swal({
        title: lang.shutdown,
        text: lang.msgShutdown,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: lang.yes,
        closeOnConfirm: false
    }, function () {
        lightdm.shutdown();
    });
}

function particle() {
    particleground(document.getElementById('particles-foreground'), {
        dotColor: 'rgba(255, 255, 255, 1)',
        lineColor: 'rgba(255, 255, 255, 0.05)',
        minSpeedX: 0.3,
        maxSpeedX: 0.6,
        minSpeedY: 0.3,
        maxSpeedY: 0.6,
        density: 40000, // One particle every n pixels
        curvedLines: false,
        proximity: 250, // How close two dots need to be before they join
        parallaxMultiplier: 20, // Lower the number is more extreme parallax
        particleRadius: 3 // Dot size
    });
    particleground(document.getElementById('particles-background'), {
        dotColor: 'rgba(255, 255, 255, 0.5)',
        lineColor: 'rgba(255, 255, 255, 0.05)',
        minSpeedX: 0.075,
        maxSpeedX: 0.15,
        minSpeedY: 0.075,
        maxSpeedY: 0.15,
        density: 10000, // One particle every n pixels
        curvedLines: false,
        proximity: 15, // How close two dots need to be before they join
        parallaxMultiplier: 40, // Lower the number is more extreme parallax
        particleRadius: 2 // Dot size
    });
}

function authentication_complete() {
    if (lightdm.is_authenticated) {
        if (_session != "null" && _session != null)
            lightdm.login(lightdm.authentication_user, _session);
        else
            lightdm.login(lightdm.authentication_user, lightdm.default_session);

    } else {

        swal({
            title: lightdm.authentication_user.substr(0, 1).toUpperCase() + lightdm.authentication_user.substr(1).toLowerCase(),
            text: lang.msgPasswordErro,
            type: 'error',
            timer: 6000
        });
        $('#btnLogin').attr('disabled', false);
        $('#btnLogin').html('<i class="fa fa-sign-in"></i> Login');
        $('#password').focus().select();
        start_authentication(lightdm.authentication_user);

    }
}

function start_authentication(username) {
    lightdm.start_authentication(username);
}

function keyboardToggle() {
    $('#container').toggle('fast');
}

function keyboard() {

    var $write = $('#password'),
            shift = false,
            capslock = false;

    $('#keyboard li').click(function () {
        var $this = $(this),
                character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.val();

            $write.val(html.substr(0, html.length - 1));
            return false;
        }

        // Special characters
        if ($this.hasClass('symbol'))
            character = $('span:visible', $this).html();
        if ($this.hasClass('space'))
            character = ' ';
        if ($this.hasClass('tab'))
            character = "\t";
        if ($this.hasClass('return'))
            character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase'))
            character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false)
                $('.letter').toggleClass('uppercase');

            shift = false;
        }

        // Add the character
        $write.val($write.val() + character);
    });
}


//****************clock***************************
function setClock() {
    var time = new Date(),
            minutes = time.getMinutes() * 6,
            hours = time.getHours() % 12 / 12 * 360 + (minutes / 12),
            seconds = time.getSeconds() * 6;

    $('#pnClock .digital').html(time.getHours() + ':' + ('0' + time.getMinutes()).substr(-2) + ':' + ('0' + time.getSeconds()).substr(-2));
    $("#clock .hours").css("-webkit-transform", "rotate(" + hours + "deg)");
    $("#clock .seconds").css("-webkit-transform", "rotate(" + seconds + "deg)");
    $("#clock .minutes").css("-webkit-transform", "rotate(" + minutes + "deg)");
}

function beginClock() {
    setClock();
    setTimeout(beginClock, 1000);
}

