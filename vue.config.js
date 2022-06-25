const path = require('path');
function resolve(dir) {
	return path.resolve(__dirname, dir);
}
module.exports = {
	devServer: {
		open: false,
        proxy: {
            '/api': {
                target: 'http://1.116.64.64:5004/api2',
                changeOrigin:true,
                pathRewrite:{"^/api":""}
            },
        },
	},
	
	lintOnSave: false, //关闭ESlint语法检测
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'assets': resolve('src/assets'),
				'components': resolve('src/components'),
			},
		},
	},
};
