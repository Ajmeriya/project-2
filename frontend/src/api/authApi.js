import apiClient from './client'

export const authApi = {
	register: async (payload) => {
		const { data } = await apiClient.post('/auth/register', payload)
		return data
	},

	login: async (payload) => {
		const { data } = await apiClient.post('/auth/login', payload)
		return data
	},
}

