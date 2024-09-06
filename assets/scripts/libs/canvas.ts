class Canvas
{
  static canvas : HTMLCanvasElement | null     = document.querySelector("canvas");
  static #parent : HTMLElement                 = Canvas.canvas.parentElement;
  static ctx : CanvasRenderingContext2D | null = Canvas.canvas ? Canvas.canvas.getContext("2d") : null;

  static #fill_parent() : void
  {
    if (Canvas.canvas)
    {
      Canvas.canvas.width  = Canvas.#parent.clientWidth;
      Canvas.canvas.height = Canvas.#parent.clientHeight;
    }
  }

  static clear() : void
  {
    Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  }

  static registor(onresize? : Function) : void
  {
    Canvas.#fill_parent();
    if (onresize) onresize();
    window.addEventListener("resize", () => {
      Canvas.#fill_parent();
      if (onresize) onresize();
    });
  }
}

export default Canvas;
