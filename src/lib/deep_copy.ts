export function deepCopy(obj: any): any {
	if (typeof obj !== "object" || !obj)
		return obj;
	var copy: any;
	if (Array.isArray(obj)) {
		copy = [];
		for (let key = 0; key < obj.length; key++) {
			copy[key] = deepCopy(obj[key]);
		}
		return copy;
	}
	if (Object.prototype.toString.call(obj) !== "[object Object]")
		return obj;

	copy = {};
	for (let key in obj)
		copy[key] = deepCopy(obj[key]);
	return copy;
};
