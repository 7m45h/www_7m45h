import Canvas from "assets/scripts/libs/canvas";
import ThemeManager from "assets/scripts/libs/theme_manager";

const two_pi = Math.PI * 2;

interface BitInfo
{
  radius        : number,
  gap           : number,
  gap_half      : number,
  diameter_full : number
};

interface Vector2D
{
  x : number,
  y : number
};

interface Bit
{
  state    : boolean,
  position : Vector2D
};

class BinaryClock
{
  #bit_info : BitInfo = {
    radius: 0,
    gap: 0,
    gap_half: 0,
    diameter_full: 0
  };

  #row_count : number;
  #col_count : number;
  #bit_count : number;
  #width  : number;
  #height : number;

  #offset : Vector2D = {
    x: 0,
    y: 0
  };

  #time_in_bunary : string;
  #bits : Array<Bit>;

  static #int_to_binary(int : number) : string
  {
    return int.toString(2).padStart(6, '0');
  }

  static update_position(bc : BinaryClock) : void
  {
    bc.#offset.x = Canvas.canvas.width / 2 - bc.#width / 2 + bc.#bit_info.radius + bc.#bit_info.gap_half;
    bc.#offset.y = Canvas.canvas.height / 2 - bc.#height / 2 + bc.#bit_info.radius + bc.#bit_info.gap_half;

    let index : number;
    for (let r = 0; r < bc.#row_count; r++)
    {
      for (let c = 0; c < bc.#col_count; c++)
      {
        index = bc.#col_count * r + c;
        bc.#bits[index].position.x = c * bc.#bit_info.diameter_full + bc.#offset.x;
        bc.#bits[index].position.y = r * bc.#bit_info.diameter_full + bc.#offset.y;
      }
    }
  }

  constructor()
  {
    this.#bit_info.radius        = 32;
    this.#bit_info.gap           = 8;
    this.#bit_info.gap_half      = this.#bit_info.gap / 2;
    this.#bit_info.diameter_full = this.#bit_info.radius * 2 + this.#bit_info.gap;

    this.#row_count = 3;
    this.#col_count = 6;
    this.#bit_count = this.#col_count * this.#row_count;
    this.#width     = this.#col_count * this.#bit_info.diameter_full;
    this.#height    = this.#row_count * this.#bit_info.diameter_full;

    this.#time_in_bunary = "";
    this.#bits           = new Array(this.#bit_count);

    for (let i = 0; i < this.#bit_count; i++)
    {
      this.#bits[i] = {
        state: false,
        position: { x: 0, y: 0 }
      };
    }
  }

  update() : void
  {
    const current_time    = new Date();
    this.#time_in_bunary  = BinaryClock.#int_to_binary(current_time.getHours());
    this.#time_in_bunary += BinaryClock.#int_to_binary(current_time.getMinutes());
    this.#time_in_bunary += BinaryClock.#int_to_binary(current_time.getSeconds());

    for (let i = 0; i < this.#bit_count; i++)
    {
      this.#bits[i].state = Boolean(Number(this.#time_in_bunary[i]));
    }
  }

  render() : void
  {
    Canvas.ctx.fillStyle   = ThemeManager.current_theme.color_fg;
    Canvas.ctx.strokeStyle = ThemeManager.current_theme.color_fg;
    Canvas.ctx.lineWidth   = 2;
    for (let i = 0; i < this.#bit_count; i++)
    {
      Canvas.ctx.beginPath();
      Canvas.ctx.arc(this.#bits[i].position.x, this.#bits[i].position.y, this.#bit_info.radius, 0, two_pi);
      Canvas.ctx.closePath();
      this.#bits[i].state ? Canvas.ctx.fill() : Canvas.ctx.stroke();
    }
  }
};

class BCScene
{
  static #binary_clock : BinaryClock = new BinaryClock();

  static #tick() : void
  {
    BCScene.#binary_clock.update();
    Canvas.clear();
    BCScene.#binary_clock.render();
    window.requestAnimationFrame(BCScene.#tick);
  }

  static start() : void
  {
    Canvas.registor(() => { BinaryClock.update_position(BCScene.#binary_clock) });
    window.requestAnimationFrame(BCScene.#tick);
  }
};

export default BCScene;
