import ContextDependent from "#ContextDependent";
import type Context from "#Context";
import UnsupportedOperationError from "#UnsupportedOperationError";
import type BufferTarget from "#BufferTarget";
import type { DangerousExposedContext } from "#DangerousExposedContext";
import getParameterForBufferTarget from "#getParameterForBufferTarget";
import BufferUsage from "#BufferUsage";
import type { TypedArray } from "#TypedArray";

/**
 * An array of binary data.
 * @see [`WebGLBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer)
 */
export default class Buffer extends ContextDependent {
	/**
	 * The currently-bound buffer cache.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @internal
	 */
	private static boundBuffersCache?: Map<
		Context,
		Map<BufferTarget, WebGLBuffer | null>
	>;

	/**
	 * Gets the currently-bound buffer for a binding point.
	 * @param context The rendering context.
	 * @param target The binding point.
	 * @returns The buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @internal
	 */
	protected static getBound(
		context: Context,
		target: BufferTarget
	): WebGLBuffer | null {
		if (typeof this.boundBuffersCache == "undefined") {
			this.boundBuffersCache = new Map();
		}
		if (!this.boundBuffersCache.has(context)) {
			this.boundBuffersCache.set(context, new Map());
		}
		const contextMap: Map<BufferTarget, WebGLBuffer | null> =
			this.boundBuffersCache.get(context)!;
		if (!contextMap.has(target)) {
			contextMap.set(
				target,
				(context as DangerousExposedContext).gl.getParameter(
					getParameterForBufferTarget(target)
				)
			);
		}
		return contextMap.get(target)!;
	}

	/**
	 * Binds a buffer to a binding point.
	 * @param context The rendering context.
	 * @param target The binding point.
	 * @param buffer The buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @throws {@link WebglError}
	 * @internal
	 */
	protected static override bind(
		context: Context,
		target: BufferTarget,
		buffer: WebGLBuffer | null
	): void {
		if (Buffer.getBound(context, target) == buffer) {
			return;
		}
		(context as DangerousExposedContext).gl.bindBuffer(target, buffer);
		context.throwIfError();
		Buffer.boundBuffersCache!.get(context)!.set(target, buffer);
	}

	/**
	 * Unbinds the buffer that is bound to the given binding point.
	 * @param context The rendering context.
	 * @param target The binding point.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @throws {@link WebglError}
	 * @internal
	 */
	protected static unbind(context: Context, target: BufferTarget): void;

	/**
	 * Unbinds the given buffer from the given binding point.
	 * @param context The rendering context.
	 * @param target The binding point.
	 * @param buffer The buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @throws {@link WebglError}
	 * @internal
	 */
	protected static unbind(
		context: Context,
		target: BufferTarget,
		buffer: WebGLBuffer
	): void;

	protected static unbind(
		context: Context,
		target: BufferTarget,
		buffer?: WebGLBuffer
	): void {
		if (
			typeof buffer != "undefined" &&
			Buffer.getBound(context, target) != buffer
		) {
			return;
		}
		Buffer.bind(context, target, null);
	}

	/**
	 * Creates a buffer.
	 * @param context The rendering context.
	 * @param target The target binding point of the buffer.
	 * @param usage The intended usage of the buffer.
	 * @see [`createBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer)
	 */
	public constructor(
		context: Context,
		target: BufferTarget,
		usage: BufferUsage
	);

	/**
	 * Creates a buffer.
	 * @param context The rendering context.
	 * @param target The target binding point of the buffer.
	 * @param usage The intended usage of the buffer.
	 * @param data The initial data in the buffer.
	 * @param offset The index of the element to start reading the buffer at.
	 * @see [`createBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer)
	 */
	public constructor(
		context: Context,
		target: BufferTarget,
		usage: BufferUsage,
		data: TypedArray | null,
		offset?: number
	);

	/**
	 * Creates a buffer.
	 * @param context The rendering context.
	 * @param target The target binding point of the buffer.
	 * @param usage The intended usage of the buffer.
	 * @param size The initial size of the buffer in bytes.
	 * @see [`createBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer)
	 */
	public constructor(
		context: Context,
		target: BufferTarget,
		usage: BufferUsage,
		size: number
	);

	public constructor(
		context: Context,
		target: BufferTarget,
		usage: BufferUsage,
		data: TypedArray | number | null = null,
		offset = 0
	) {
		super(context);

		const buffer: WebGLBuffer | null = this.gl.createBuffer();
		if (buffer == null) {
			throw new UnsupportedOperationError();
		}
		this.internal = buffer;
		this.targetCache = target;
		this.usageCache = usage;
		this.dataCache = data;
		this.offsetCache = offset;
	}

	/**
	 * The API interface of this buffer.
	 * @internal
	 * @see [`WebGLBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer)
	 */
	protected readonly internal: WebGLBuffer;

	/**
	 * The binding point of this buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @internal
	 */
	private targetCache: BufferTarget;

	/**
	 * The binding point of this buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 */
	public get target(): BufferTarget {
		return this.targetCache;
	}

	/**
	 * The binding point of this buffer.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 */
	public set target(value: BufferTarget) {
		this.unbind();
		this.targetCache = value;
	}

	/**
	 * The intended usage of this buffer.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 * @internal
	 */
	private usageCache: BufferUsage;

	/**
	 * The intended usage of this buffer.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 */
	public get usage(): BufferUsage {
		return this.usageCache;
	}

	/**
	 * The data contained in this buffer or the size of this buffer's data
	 * store in bytes.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 * @internal
	 */
	private dataCache: TypedArray | number | null;

	/**
	 * The data contained in this buffer or the size of this buffer's data
	 * store in bytes.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 */
	public get data(): Readonly<TypedArray> | number | null {
		return this.dataCache;
	}

	/**
	 * The element index offset at which to start reading this buffer.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 * @internal
	 */
	private offsetCache: number;

	/**
	 * The element index offset at which to start reading this buffer.
	 * @see [`bufferData`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
	 */
	public get offset(): number {
		return this.offsetCache;
	}

	/**
	 * Binds this buffer to its binding point.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @throws {@link WebglError}
	 */
	public bind(): void {
		Buffer.bind(this.context, this.target, this.internal);
	}

	/**
	 * Unbinds this buffer from its binding point.
	 * @see [`bindBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
	 * @throws {@link WebglError}
	 */
	public unbind(): void {
		Buffer.unbind(this.context, this.target, this.internal);
	}

	/**
	 * Executes the given function with this buffer bound, then re-binds the
	 * previously-bound buffer.
	 * @param funktion The function to execute.
	 * @returns The return value of the executed function.
	 */
	public with<T>(funktion: (buffer: this) => T): T {
		const previousBinding: WebGLBuffer | null = Buffer.getBound(
			this.context,
			this.target
		);
		this.bind();
		const out: T = funktion(this);
		Buffer.bind(this.context, this.target, previousBinding);
		return out;
	}
}
