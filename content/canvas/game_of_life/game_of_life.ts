import Canvas from "assets/scripts/libs/canvas";
import ThemeManager from "assets/scripts/libs/theme_manager";

interface CellInfo
{
  size      : number,
  gap       : number,
  gap_half  : number,
  size_full : number,
  count     : number
};

interface Vector2D
{
  x : number,
  y : number
};

interface Neighbor
{
  top_left      : number,
  top_middle    : number,
  top_right     : number,
  mid_left      : number,
  mid_right     : number,
  bottom_left   : number,
  bottom_middle : number,
  bottom_right  : number
};

interface Cell
{
  position : Vector2D,
  alive    : number,
  neighbor : Neighbor
};

class Grid
{
  #cell_info : CellInfo = {
    size: 0,
    gap: 0,
    gap_half: 0,
    size_full: 0,
    count: 0
  };

  #next      : Array<number>;
  #crnt      : Array<Cell>;
  #row_count : number;
  #col_count : number;
  #start     : Vector2D = {
    x: 0,
    y: 0
  };

  constructor(cell_size : number)
  {
    this.#cell_info.size      = cell_size;
    this.#cell_info.gap       = 4;
    this.#cell_info.gap_half  = this.#cell_info.gap / 2;
    this.#cell_info.size_full = this.#cell_info.size + this.#cell_info.gap;

    this.#row_count = Math.floor(Canvas.canvas.height / this.#cell_info.size_full);
    this.#col_count = Math.floor(Canvas.canvas.width / this.#cell_info.size_full);

    this.#cell_info.count = this.#row_count * this.#col_count;

    this.#start.x = (Canvas.canvas.width % this.#cell_info.size_full) / 2 + this.#cell_info.gap_half;
    this.#start.y = (Canvas.canvas.height % this.#cell_info.size_full) / 2 + this.#cell_info.gap_half;

    this.#next = new Array(this.#cell_info.count);
    this.#crnt = new Array(this.#cell_info.count);

    let index    : number;
    let row_next : number;
    let row_prev : number;
    for (let r = 0; r < this.#row_count; r++)
    {
      for (let c = 0; c < this.#col_count; c++)
      {
        index    = (this.#col_count * r) + c;
        row_next = index + this.#col_count;
        row_prev = index - this.#col_count;

        this.#crnt[index] = {
          position: {
            x: 0,
            y: 0
          },
          alive: 0,
          neighbor: {
            top_left: 0,
            top_middle: 0,
            top_right: 0,
            mid_left: 0,
            mid_right: 0,
            bottom_left: 0,
            bottom_middle: 0,
            bottom_right: 0
          }
        };

        this.#crnt[index].position.x = this.#cell_info.size_full * c + this.#start.x;
        this.#crnt[index].position.y = this.#cell_info.size_full * r + this.#start.y;

        this.#crnt[index].alive = Math.round(Math.random());

        this.#crnt[index].neighbor.top_left      = ((row_prev - 1) + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.top_middle    = ((row_prev)     + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.top_right     = ((row_prev + 1) + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.mid_left      = ((index - 1)    + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.mid_right     = ((index + 1)    + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.bottom_left   = ((row_next - 1) + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.bottom_middle = ((row_next)     + this.#cell_info.count) % this.#cell_info.count;
        this.#crnt[index].neighbor.bottom_right  = ((row_next + 1) + this.#cell_info.count) % this.#cell_info.count;
      }
    }
  }

  update() : void
  {
    let alive_neighbor_count = 0;
    for (let i = 0; i < this.#cell_info.count; i++)
    {
      alive_neighbor_count  = 0;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.top_left     ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.top_middle   ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.top_right    ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.mid_left     ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.mid_right    ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.bottom_left  ].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.bottom_middle].alive;
      alive_neighbor_count += this.#crnt[this.#crnt[i].neighbor.bottom_right ].alive;

      if (this.#crnt[i].alive)
      {
        if (alive_neighbor_count == 2 || alive_neighbor_count == 3)
        {
          this.#next[i] = 1;
        }
        else
        {
          this.#next[i] = 0;
        }
      }
      else
      {
        if (alive_neighbor_count == 3)
        {
          this.#next[i] = 1;
        }
        else
        {
          this.#next[i] = 0;
        }
      }
    }

    for (let i = 0; i < this.#cell_info.count; i++)
    {
      this.#crnt[i].alive = this.#next[i];
    }
  }

  render() : void
  {
    Canvas.ctx.fillStyle = ThemeManager.current_theme.color_fg;
    Canvas.ctx.beginPath();
    for (let i = 0; i < this.#cell_info.count; i++)
    {
      if (this.#crnt[i].alive)
      {
        Canvas.ctx.rect(this.#crnt[i].position.x, this.#crnt[i].position.y, this.#cell_info.size, this.#cell_info.size);
      }
    }
    Canvas.ctx.closePath();
    Canvas.ctx.fill();
  }
}

class GameOfLife
{
  static #fps          = 1000 / 4;
  static #delta_time   = 0;
  static #prev_time    = 0;
  static #time_counter = 0;

  static #grid : Grid;
  static #cell_size : number           = 16;
  static #cell_size_increment : number = 2;

  static #loop(crnt_time : number) : void
  {
    GameOfLife.#delta_time = crnt_time - GameOfLife.#prev_time;
    GameOfLife.#prev_time = crnt_time;

    if (GameOfLife.#time_counter > GameOfLife.#fps)
    {
      GameOfLife.#grid.update();

      Canvas.clear();
      GameOfLife.#grid.render();

      GameOfLife.#time_counter = 0;
    }
    else
    {
      GameOfLife.#time_counter += GameOfLife.#delta_time;
    }

    window.requestAnimationFrame(GameOfLife.#loop);
  }

  static #handle_keyboard(event : KeyboardEvent) : void
  {
    switch (event.key)
    {
      case '+':
      GameOfLife.#cell_size += GameOfLife.#cell_size_increment;
      GameOfLife.#grid = new Grid(GameOfLife.#cell_size);
      break;

      case '-':
      GameOfLife.#cell_size -= GameOfLife.#cell_size_increment;
      GameOfLife.#grid = new Grid(GameOfLife.#cell_size);
      break;

      case 'r':
      GameOfLife.#grid = new Grid(GameOfLife.#cell_size);
      break;
    }
  }

  static start() : void
  {
    Canvas.registor(() => { GameOfLife.#grid = new Grid(GameOfLife.#cell_size) });
    GameOfLife.#grid = new Grid(GameOfLife.#cell_size);
    window.addEventListener("keypress", GameOfLife.#handle_keyboard);
    window.requestAnimationFrame(GameOfLife.#loop);
  }
}

export default GameOfLife;
