import apiClient from './client'

export const templateApi = {
	list: async () => {
		const { data } = await apiClient.get('/templates')
		return data
	},

	get: async (id) => {
		const { data } = await apiClient.get(`/templates/${id}`)
		return data
	},

	create: async (payload, file) => {
		const formData = new FormData()
		formData.append('metadata', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
		formData.append('file', file)
		const { data } = await apiClient.post('/templates', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		return data
	},

	update: async (id, payload) => {
		const { data } = await apiClient.put(`/templates/${id}`, payload)
		return data
	},

	remove: (id) => apiClient.delete(`/templates/${id}`),

	detect: async (id) => (await apiClient.post(`/templates/${id}/detect`)).data,
	verify: async (id, payload) => (await apiClient.put(`/templates/${id}/verify`, payload)).data,
	ready: async (id) => (await apiClient.post(`/templates/${id}/ready`)).data,
}

