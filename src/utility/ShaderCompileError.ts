/** An error that occurs when attempting to compile a shader. */
export default class ShaderCompileError extends Error {
	/**
	 * Creates a shader compile error.
	 * @param message The message of the error.
	 */
	public constructor(message = "Failed to compile the shader.") {
		super(message);
		this.name = "ShaderCompileError";
	}
}
