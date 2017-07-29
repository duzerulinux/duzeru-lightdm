//http://www.metamodpro.com/browser-language-codes

var lang = {};
lang['en'] = {
    singIn: 'Singin',
    shutdown: 'Shutdown',
    msgShutdown: 'Would you like to turn off your computer?',
    restart: 'Restart',
    msgRestart: 'Would you like to restart your computer?',
    suspend: 'Suspend',
    msgSuspend: 'Would you like to suspend your computer?',
    hibernate: 'Hibernate',
    msgHibernate: 'Would you like to hibernate your computer?',
    placeholder: 'Password',
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'],
    week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    yes: 'Yes',
    msgPassword: 'Enter a password to continue',
    msgPasswordErro: 'Password does not match! Verify',
    user: 'User',
    password: 'Password',
    login: '<i class="fa fa-sign-in"></i> Login',
    date: 'Date',
    clockAnalog: 'Clock Analog',
    clockDigital: 'Clock Digital',
    smallParticles: 'Small Particles',
    mediumParticles: 'Medium Particles',
    optyClock: 'Opacity Clock'
};

lang['pt-br'] = {
    singIn: 'Login',
    shutdown: 'Desligar',
    msgShutdown: 'Você gostaria de desligar o computador?',
    restart: 'Reiniciar',
    msgRestart: 'Você gostaria de reiniciar o computador?',
    suspend: 'Suspender',
    msgSuspend: 'Você gostaria de suspender o computador?',
    hibernate: 'Hibernar',
    msgHibernate: 'Você gostaria de hibernar o computador?',
    placeholder: 'Senha',
    month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    week: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    yes: 'Sim',
    msgPassword: 'Informe uma senha para continuar',
    msgPasswordErro: 'Senha não confere! Verifique',
    user: 'Usuário',
    password: 'Senha',
    login: '<i class="fa fa-sign-in"></i> Entrar',
    date: 'Data',
    clockAnalog: 'Relógio Analógico',
    clockDigital: 'Relógio Digital',
    smallParticles: 'Pequeno Partículas',
    mediumParticles: 'Médio Partículas' ,
    optyClock: 'Opacidade Relógio'
};



///////////*****************************************************////////////////

var idioma = (navigator.browserLanguage != undefined) ? navigator.browserLanguage : navigator.language;
idioma = idioma.toLowerCase();


if (lang[idioma] == undefined)
    idioma = 'en';

//atender todos os idiomas Inglês 
var split = idioma.split('-');


if (split[0] == 'en')
    idioma = split[0].toLowerCase();


$("[idiom]").each(function () {
    var strTr = lang[idioma][$(this).attr('idiom')];
    $(this).html(strTr);
});

lang = lang[idioma];
