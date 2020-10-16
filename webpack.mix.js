const mix = require("laravel-mix");
const moment = require("moment");

mix.react("resources/js/app.js", "public/js/admin")
    .sass("resources/sass/app.scss", "public/css")
    .webpackConfig({
        output: {
            publicPath: "/",
            chunkFilename: "js/admin/[name].[chunkhash].js?v=" + moment().unix()
        }
    });

mix.version();
if (mix.inProduction()) {
    mix.version();
}
