#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import jsonfile from 'jsonfile';
import pathExt from 'path-extra';
import assign from 'lodash.assign';
import getStdin from 'get-stdin';
import BoxcarNotification from 'boxcar-notification';
import pkg from '../package.json';

const CONFNAME = '.boxcarrc';

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

getStdin().then((fromStdin) => {

    let argvConf = {};
    if (program.credential) argvConf['credential'] = program.credential;
    if (program.title) argvConf['title'] = program.title;
    if (program.message) argvConf['message'] = program.message;
    if (program.sound) argvConf['sound'] = program.sound;
    if (program.from) argvConf['from'] = program.from;
    if (program.icon) argvConf['icon'] = program.icon;
    if (program.quiet) argvConf['quiet'] = program.quiet;

    let homeConf, currentConf;
    try {
        homeConf = jsonfile.readFileSync(path.join(pathExt.homedir(), CONFNAME));
    } catch (e) {
        homeConf = {};
    }
    try {
        currentConf = jsonfile.readFileSync(path.join(process.cwd(), CONFNAME));
    } catch (e) {
        currentConf = {};
    }

    // merge all configures
    let conf = assign(homeConf, currentConf, argvConf);

    let bn = new BoxcarNotification(conf.credential);
    let notificationSettings = {
        title: conf.title,
        longMessage: fromStdin || conf.message,
        sound: conf.sound,
        sourceName: conf.from,
        iconUrl: conf.icon
    };
    bn.send(notificationSettings).then((body) => {
        if (!conf.quiet) console.log(body);
        process.exit(0)
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    });

});
