
module.exports={
    entry:'./main.js',
    output:{
        path:'./build',
        filename:'bundle.js'
    },

    devServer: {
        inline: true,
        port: 3000
    },

    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                exclude:/node_module/,
                loader:'babel',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.css$/,
                exclude:/node_module/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.scss$/,
                exclude:/node_module/,
                loader:'style-loader!css-loader!sass-loader'
            }
        ]
    }
};