import ApiInterface from "#ApiInterface";
import type Context from "#Context";
import type { DangerousExposedContext } from "#DangerousExposedContext";

/**
 * An object with direct access to the WebGL2 API that requires an existing
 * rendering context to instantiate.
 * @internal
 */
export default abstract class ContextDependent extends ApiInterface {
	/**
	 * Initializes the context-dependent API interface.
	 * @param context The rendering context.
	 * @internal
	 */
	protected constructor(context: Context) {
		super((context as DangerousExposedContext).gl);
		this.context = context;
	}

	/**
	 * The rendering context.
	 * @internal
	 */
	protected context: Context;
}
