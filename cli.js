#!/usr/bin/env node

import program from 'commander';
import BoxcarNotification from 'boxcar-notification';
import pkg from './package';

program
    .version(pkg.version)
    .option('-c --credential <token>', 'your api token credential.')
    .option('-t --title <title>', 'notification title.')
    .option('-m --message <body>', 'notification message body. HTML allowed.')
    .option('-s --sound <sound>', 'notification sound. see below.', /^(beep-crisp|beep-soft|bell-modern|bell-one-tone|bell-simple|bell-triple|bird-1|bird-2|boing|cash|clanging|detonator-charge|digital-alarm|done|echo|flourish|harp|light|magic-chime|magic-coin|notifier-1|notifier-2|notifier-3|orchestral-long|orchestral-short|score|success|up)$/)
    .option('-f --from <source>', 'notification source name.')
    .option('-i --icon <url>', 'notification icon url.')
    .option('-q --quiet', 'no output unless error')
    .on('--help', function () {
        console.log('  Sounds: [%s]', BoxcarNotification.VALID_SOUNDS.join(','));
    })
    .parse(process.argv);

let notificationSettings = {
    userCredential: program.credential,
    title: program.title,
    longMessage: program.message,
    sound: program.sound,
    sourceName: program.from,
    iconUrl: program.icon
};

let bn = new BoxcarNotification(program.credential);
bn.send(notificationSettings).then((body) => {
    if (!program.quiet) console.log(body);
    process.exit(0)
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
