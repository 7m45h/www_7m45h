class Mouse
{
  static x           = window.innerWidth / 2;
  static y           = window.innerHeight / 2;
  static button_down = false;

  static registor() : void
  {
    window.addEventListener("mousemove", (event) => {
      Mouse.x = event.clientX;
      Mouse.y = event.clientY;
    });

    window.addEventListener("mousedown", () => { Mouse.button_down = true });
    window.addEventListener("mouseup", () => { Mouse.button_down = false });
  }
}

export default Mouse;
