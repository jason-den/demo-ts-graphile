export function errorHandler(err, req, res, next) {
	/** If you call next() with an error after you have started writing the
	 * response (for example, if you encounter an error while streaming the
	 * response to the client) the Express default error handler closes the
	 * connection and fails the request.
	 * So when you add a custom error handler, you must delegate to the default
	 * Express error handler, when the headers have already been sent to the
	 * client
	 */
	if (res.headersSent) {
		return next(err);
	}
	res.status(err.statusCode || 500);
	if (process.env.NODE_ENV === "development") {
		res.json({ error: err });
	}
	res.send();
}
