const ACCESS_TOKEN_KEY = 'accessToken'
const USER_KEY = 'currentUser'

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAuthSession(authResponse) {
	localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.token)
	localStorage.setItem(
		USER_KEY,
		JSON.stringify({
			userId: authResponse.userId,
			email: authResponse.email,
			fullName: authResponse.fullName,
		}),
	)
}

export function getCurrentUser() {
	const user = localStorage.getItem(USER_KEY)
	return user ? JSON.parse(user) : null
}

export function clearAuthSession() {
	localStorage.removeItem(ACCESS_TOKEN_KEY)
	localStorage.removeItem(USER_KEY)
}

