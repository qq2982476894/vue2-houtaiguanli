import axios from 'axios';
import URL from './URLS.js';
import { getToken } from '@/utils/token';
import { Message, MessageBox } from 'element-ui';
import qs from 'qs';
const request = axios.create({
	baseURL: URL.base,
});
request.interceptors.request.use(
	(config) => {
		config.headers['token'] = getToken('token');
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
request.interceptors.response.use(
	(response) => {
		const { status, statusText } = response;
		console.log(response.data);
		if (status !== 200) {
			Message({
				message: statusText || 'error',
				type: 'warning',
			});
		} else {
            
			return response.data;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);
const login = async (form) => {
	return await request.post(URL.login, { ...form });
};
/**
 * 获取学生列表
 * @param {*} params 通过姓名查询
 * @returns
 */
const getStudentsList = async (params) => {
	return await request.get(URL.students, { params });
};
/**
 * 删除接口
 * @param {*} url 请求地址
 * @param {*} id  通过id删除
 */
const deleteStudent = async (url, id) => {
	const confirm = await MessageBox.confirm(
		'此操作将删除该条信息, 是否继续?',
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}
	).catch(() => {
		Message({
			type: 'info',
			message: '已取消删除',
		});
	});
	if (confirm) {
		const { status, message } = await request.delete(`${url}/${id}`);
		if (status === 200) {
			Message({
				type: 'success',
				message: message,
			});
		}
	}
};
const getInfoList = async () => {
	return await request.get(URL.info);
};
const addInfoList = async (form) => {
	form = qs.stringify(form);
	return await request.post(URL.info, form);
};
const updateInfo = async (form) => {
	form = qs.stringify(form);
	return await request.put(URL.info, form);
};
const deleteInfo = async (id) => {
	return await request.delete(`info/${id}`);
};

const getWorksList = async (params) => {
	return await request.get(URL.works,{params});
};
const getDataview = async()=>{
    return await request.get(URL.dataview);
}
export default {
	login,
	getStudentsList,
	deleteStudent,
	getInfoList,
	addInfoList,
	updateInfo,
	deleteInfo,
	getWorksList,
    getDataview
};
