//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, initializeDb } = require('./src/db.js');

// Syncing all the models at once.

const initServer = () => {
	server.listen(process.env.PORT || 3001, () => {
	    console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
}

const force = false;
conn.sync({ force }).then(() => {
    if (force){
    	initializeDb().then(() => {
    		console.log('DB initialized!');
    		initServer();
    	}).catch((err) => {
    		console.log("Could not init DB")
    		console.error(err);
    	})
	} else {
		initServer();
	}
});
