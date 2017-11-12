module.exports = {
    base: 'dist/',
    inline: true,
    minify: true,
    css: [
        'dist/css/main.min.css',
        'dist/css/muilessium.min.css'
    ],
    ignore: ['@font-face',/url\(/]
};

