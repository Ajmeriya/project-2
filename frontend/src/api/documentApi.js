import apiClient from './client'

export const documentApi = {
	list: async () => {
		const { data } = await apiClient.get('/documents')
		return data
	},

	get: async (id) => {
		const { data } = await apiClient.get(`/documents/${id}`)
		return data
	},

	file: async (id) => {
		const { data } = await apiClient.get(`/documents/${id}/file`, { responseType: 'blob' })
		return data
	},

	upload: async (metadata, file) => {
		const formData = new FormData()
		formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
		formData.append('file', file)
		const { data } = await apiClient.post('/documents', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		return data
	},

	remove: (id) => apiClient.delete(`/documents/${id}`),

	align: async (id) => (await apiClient.post(`/documents/${id}/align`)).data,
	extract: async (id) => (await apiClient.post(`/documents/${id}/extract`)).data,
	verify: async (id) => (await apiClient.post(`/documents/${id}/verify`)).data,
	finalize: async (id) => (await apiClient.post(`/documents/${id}/finalize`)).data,
}

