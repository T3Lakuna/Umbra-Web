import BadValueError from "../../utility/BadValueError.js";
import Buffer from "./Buffer.js";
import BufferTarget from "../../constants/BufferTarget.js";
import BufferUsage from "../../constants/BufferUsage.js";
import Context from "../Context.js";
import { ELEMENT_ARRAY_BUFFER_BINDING } from "../../constants/constants.js";
import VertexArray from "../VertexArray.js";

/**
 * An array of binary data to be used as an element buffer object. Must contain unsigned integers.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer | WebGLBuffer}
 * @public
 */
export default class ElementBuffer extends Buffer<
	Uint8Array | Uint16Array | Uint32Array
> {
	/**
	 * The currently-bound element array buffer cache.
	 * @internal
	 */
	private static bindingsCache?: Map<
		WebGLVertexArrayObject | null,
		WebGLBuffer | null
	>;

	/**
	 * Get the element array buffer bindings cache.
	 * @returns The buffer bindings cache.
	 * @internal
	 */
	private static getBindingsCache() {
		return (ElementBuffer.bindingsCache ??= new Map());
	}

	/**
	 * Get the currently-bound buffer for a VAO.
	 * @param context - The rendering context.
	 * @param vao - The VAO.
	 * @returns The buffer.
	 * @internal
	 */
	public static getBound(context: Context, vao: WebGLVertexArrayObject | null) {
		// Get the buffer bindings cache.
		const bindingsCache = ElementBuffer.getBindingsCache();

		// Get the bound buffer.
		let boundBuffer = bindingsCache.get(vao);
		if (typeof boundBuffer === "undefined") {
			VertexArray.bindGl(context, vao);
			boundBuffer = context.doPrefillCache
				? null
				: (context.gl.getParameter(
						ELEMENT_ARRAY_BUFFER_BINDING
					) as WebGLBuffer | null);
			bindingsCache.set(vao, boundBuffer);
		}

		return boundBuffer;
	}

	/**
	 * Bind an element array buffer to a VAO.
	 * @param context - The rendering context.
	 * @param vao - The VAO.
	 * @param buffer - The buffer.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer | bindBuffer}
	 * @internal
	 */
	public static bindGl(
		context: Context,
		vao: WebGLVertexArrayObject | null,
		buffer: WebGLBuffer | null
	) {
		// Do nothing if the binding is already correct.
		if (ElementBuffer.getBound(context, vao) === buffer) {
			return;
		}

		// Bind the VAO.
		VertexArray.bindGl(context, vao);

		// Bind the buffer to the target.
		context.gl.bindBuffer(BufferTarget.ELEMENT_ARRAY_BUFFER, buffer);
		ElementBuffer.getBindingsCache().set(vao, buffer);
	}

	/**
	 * Unbind the buffer that is bound to the given VAO.
	 * @param context - The rendering context.
	 * @param vao - The VAO.
	 * @param buffer - The buffer to unbind, or `undefined` for any buffer.
	 * @internal
	 */
	public static unbindGl(
		context: Context,
		vao: WebGLVertexArrayObject | null,
		buffer?: WebGLBuffer
	) {
		// Do nothing if the buffer is already unbound.
		if (buffer && ElementBuffer.getBound(context, vao) !== buffer) {
			return;
		}

		// Unbind the buffer.
		ElementBuffer.bindGl(context, vao, null);
	}

	/**
	 * Create a buffer to be used as an element array buffer.
	 * @param context - The rendering context.
	 * @param data - The initial data contained in this buffer or the size of this buffer's data store in bytes.
	 * @param usage - The intended usage of the buffer.
	 * @param offset - The index of the element to start reading the buffer at.
	 * @throws {@link UnsupportedOperationError} if a buffer cannot be created.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer | createBuffer}
	 */
	public constructor(
		context: Context,
		data: Uint8Array | Uint16Array | Uint32Array | number,
		usage: BufferUsage = BufferUsage.STATIC_DRAW,
		offset = 0
	) {
		// Ensure that the indices for a VAO aren't overwritten. Overwriting the indices of the default VAO is fine since μGL doesn't support using the default VAO anyway.
		VertexArray.unbindGl(context);

		super(
			context,
			data,
			usage,
			offset,
			false,
			BufferTarget.ELEMENT_ARRAY_BUFFER
		);
	}

	/**
	 * The binding point of this buffer.
	 * @internal
	 */
	public override get target(): BufferTarget.ELEMENT_ARRAY_BUFFER {
		if (super.target !== BufferTarget.ELEMENT_ARRAY_BUFFER) {
			throw new BadValueError(
				"The target binding point of an element buffer object can only be `ELEMENT_ARRAY_BUFFER`."
			);
		}

		return super.target;
	}

	/** @internal */
	public override set target(_) {
		void this;

		throw new BadValueError(
			"The target binding point of an element buffer object can only be `ELEMENT_ARRAY_BUFFER`."
		);
	}

	/**
	 * Bind this buffer to a VAO.
	 * @param vao - The new VAO to bind to, or `undefined` to bind to the default VAO.
	 * @internal
	 */
	public override bind(vao?: VertexArray) {
		ElementBuffer.bindGl(this.context, vao?.internal ?? null, this.internal);
	}

	/**
	 * Unbind this buffer from a VAO.
	 * @param vao - The VAO to unbind from, or `undefined` to unbind from the currently-bound VAO.
	 * @internal
	 */
	public override unbind(vao?: VertexArray) {
		ElementBuffer.unbindGl(
			this.context,
			vao?.internal ?? VertexArray.getBound(this.context),
			this.internal
		);
	}
}