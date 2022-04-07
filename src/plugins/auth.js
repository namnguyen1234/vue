//viết hàm dùng chung
export default class Auth {
	constructor() {
		this.prefixToken = 'token';
	}

	get getToken() {
		return this.getLocalStorage(this.prefixToken);
	}

	setToken(value) {
		if (this.isUnset(value)) {
			return this.removeToken(this.prefixToken);
		}

		this.setLocalStorage(this.prefixToken, value);

		return value;
	}

	removeToken() {
		this.removeLocalStorage(this.prefixToken);
	}

	isUnset(o) {
		return typeof o === 'undefined' || o === null;
	}

	isSet(o) {
		return !this.isUnset(o);
	}

	isSameURL(a, b) {
		return a.split('?')[0] === b.split('?')[0];
	}

	encodeValue (val) {
		if (typeof val === 'string') {
			return val;
		}
		return JSON.stringify(val);
	}

	decodeValue(val) {
		// Try to parse as json
		if (typeof val === 'string') {
			return JSON.parse(val);
		}

		// Return as is
		return val;
	}

	setLocalStorage(_key, value) {
		// Unset null, undefined
		if (this.isUnset(value)) {
			return this.removeLocalStorage(_key);
		}

		if (typeof localStorage === 'undefined' || !_key) {
			return;
		}

		localStorage.setItem(_key, value);
		return value;
	}

	getLocalStorage(_key) {
		if (typeof localStorage === 'undefined' || !_key) {
			return;
		}

		const value = localStorage.getItem(_key);

		return value;
	}

	removeLocalStorage(_key) {
		if (typeof localStorage === 'undefined' || !_key) {
			return;
		}

		localStorage.removeItem(_key);
	}
}















