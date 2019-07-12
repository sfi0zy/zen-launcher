# Zen-launcher

Apps launcher for Google Chrome.

![](https://habrastorage.org/webt/m8/53/x7/m853x7dbcctncw_bhr94250xjlw.png)


## Installation

 1. Clone this repository or download zip version and unpack it
 2. Go to chrome://extensions/
 3. Enable "Developer mode"
 4. Click "Load unpacked extension" and load it from the directory where you clone this repository


## Configuration
Click the 'Edit' button in the popup menu. You'll see the form. Copy and paste your urls and titles in it and click the 'Save' button. Extension allows to use up to 12 items.

![](https://habrastorage.org/webt/sr/3c/x0/sr3cx0iqfovo2twciyg0rn9k4l0.png)

Config example:
```
google https://google.com
youtube https://youtube.com
github https://github.com
codepen https://codepen.io
sfi0zy https://sfi0zy.github.io
habr https://habr.com
toster https://toster.ru
vk https://vk.com
twitter https://twitter.com
drive https://drive.google.com
2gis https://2gis.ru
metro https://yandex.ru/metro/moscow
```

## Development
```sh
git clone https://github.com/sfi0zy/zen-launcher.git
cd zen-launcher
npm ci
npm run dev
npm run prod
```

## License
MIT License

Copyright (c) 2019 Ivan Bogachev <sfi0zy@gmail.com>

