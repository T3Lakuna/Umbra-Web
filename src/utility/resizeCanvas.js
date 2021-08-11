/**
 * Automatically resizes a canvas to ensure that the draw buffer matches its physical size.
 * @param {HTMLCanvasElement} canvas - The canvas to resize.
 * @example
 * window.onresize = () => resizeCanvas(canvas);
 */
export const resizeCanvas = (canvas) => {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
};