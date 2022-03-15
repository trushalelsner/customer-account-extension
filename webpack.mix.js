let mix = require('laravel-mix');

mix.js('src/app.js', './Customer_Account/assets/app.js')
    .vue()
    .postCss('src/app.css','./Customer_Account/assets/app.css',[
        require('tailwindcss')
    ]);