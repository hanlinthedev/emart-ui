export const getErrors = (error: any) => {
	if (!error.message) {
		return "Unknown error occurred!";
	}
	const newErrObj: any = {};
	if (Array.isArray(error.message)) {
		error.message.forEach((e: string) => {
			const errorArr = e.split(" ");
			newErrObj[errorArr[0]] = e;
		});
	}
	return newErrObj;
};
