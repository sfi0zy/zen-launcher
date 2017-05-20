module.exports = {
    base: 'build/',
    inline: true,
    minify: true,
    css: [
        'build/css/main.css',
        'build/css/muilessium.css'
    ],
    ignore: ['@font-face',/url\(/]
};

