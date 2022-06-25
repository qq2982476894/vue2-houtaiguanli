// 用户名匹配校验
export function checkUsername(rule, value, callback) {
	const reg = /^[a-zA-Z0-9]{4,10}$/;
	if (value === '') {
		return callback(new Error('请输入用户名'));
	} else if (!reg.test(value)) {
		return callback(new Error('请输入4-10位用户名'));
	} else {
		return callback();
	}
}
// 密码匹配校验
export function checkPassword(rule, value, callback) {
	const reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Za-z])\S*$/;
	if (value === '') {
		return callback(new Error('请输入密码'));
	} else if (!reg.test(value)) {
		return callback(new Error('请输入6-12位密码,至少包含字母和数字'));
	} else {
		return callback();
	}
}
