# boxcar-cli
boxcar api notification cli tool

## Install

`$ npm install boxcar-cli`

then, you can use `boxcar` command in your shell.

## Usage

First, prepare boxcar api token from [here](https://new.boxcar.io/account/edit)

```
$ boxcar --help

  Usage: boxcar [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -c --credential <token>  your api token credential.
    -t --title <title>       notification title.
    -m --message <body>      notification message body. HTML allowed.
    -s --sound <sound>       notification sound. see below.
    -f --from <source>       notification source name.
    -i --icon <url>          notification icon url.
    -q --quiet               no output unless error

  Sounds: [beep-crisp,beep-soft,bell-modern,bell-one-tone,bell-simple,bell-triple,bird-1,bird-2,boing,cash,clanging,detonator-charge,digital-alarm,done,echo,flourish,harp,light,magic-chime,magic-coin,notifier-1,notifier-2,notifier-3,orchestral-long,orchestral-short,score,success,up]
```

Also support `message` option from stdin. `$ cat message.txt | boxcar`

## `.boxcarrc`

if you put `.boxcarrc` file in currend directory or home directory, it loaded and uses for default option.

+ command line option
+ `./.boxcarrc`
+ `~/.boxcarrc`

those options were flattened into one configuration and earlier one overrides later ones.

example of `.boxcarrc`

```json
{
  "credential": "MY_API_TOKEN",
  "title": "Default title",
  "message": "Default message"
}
```
