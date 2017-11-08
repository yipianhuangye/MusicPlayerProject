import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config.js'
import axios from 'axios'
export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		uin:0,
		platform : 'h5',
		needNewCode:1
	})
	return jsonp(url, data, options)
}


export function getDiscList() {
	const url = '/api/getDiscList'

	const data = Object.assign({}, commonParams, {
		picmid:1,
		loginUin:0,
		hostUin:0,
		platform:'yqq',
		needNewCode:0,
		categoryId:10000000,
		sortId:5,
		sin:0,
		ein:29
	})
	return axios.get(url,{
		params:data
	}).then(res=> {
		return Promise.resolve(res.data)
	})
}