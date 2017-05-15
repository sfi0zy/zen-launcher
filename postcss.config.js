var supportedBrowsers = [
    'last 2 versions',
    'ie >= 11' // sorry...
];

module.exports = {
    maps: false,
    plugins: [
        require('postcss-import')(),
        require('lost')(),
        require('postcss-nested')(),
        require('postcss-simple-vars')(),
        require('postcss-cssnext')({
            warnForDuplicates: false,
            browsers: supportedBrowsers
        }),
        require('postcss-animation')(),
        require('postcss-fixes')({
            preset: 'safe'
        }),
        require('doiuse')({
            browsers: supportedBrowsers,
            ignore: [
                'rem',
                'viewport-units'
            ]
        })
    ]
};
