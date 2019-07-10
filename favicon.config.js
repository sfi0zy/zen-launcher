module.exports = {
    masterPicture: 'src/images/favicon.png',
    dest: 'dist/images/favicon',
    iconsPath: '/images/favicon/',
    design: {
        ios: {
            pictureAspect: 'noChange',
            assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true
            }
        },
        desktopBrowser: {},
        windows: {
            pictureAspect: 'noChange',
            backgroundColor: '#ffffff',
            onConflict: 'override',
            assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                    small: false,
                    medium: true,
                    big: false,
                    rectangle: false
                }
            }
        },
        androidChrome: {
            pictureAspect: 'noChange',
            themeColor: '#ffffff',
            manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
            },
            assets: {
                legacyIcon: false,
                lowResolutionIcons: false
            }
        },
        safariPinnedTab: {
            pictureAspect: 'blackAndWhite',
            threshold: 71.09375,
            themeColor: '#ffffff'
        }
    },
    settings: {
        compression: 5,
        scalingAlgorithm: 'Spline',
        errorOnImageTooSmall: false
    },
    markupFile: 'faviconData.json'
};

