import Canvas from "assets/scripts/libs/canvas";
import ThemeManager from "assets/scripts/libs/theme_manager";

interface Vector2D
{
  x : number,
  y : number
};

class Grid
{
  static cell_size         : number;
  static #cell_size_double : number;
  static row_count         : number;
  static col_count         : number;
  static #row_count        : number;
  static #col_count        : number;
  static width             : number;
  static height            : number;
  static start             : Vector2D = { x: 0, y: 0};
  static end               : Vector2D = { x: 0, y: 0};
  static #width            : number;
  static #height           : number;
  static #start            : Vector2D = { x: 0, y: 0 };
  static offset            : Vector2D = { x: 0, y: 0 };

  static init(cell_size : number) : void
  {
    Grid.cell_size         = cell_size;
    Grid.#cell_size_double = Grid.cell_size * 2;
    Grid.row_count         = Math.floor(Canvas.canvas.height / Grid.#cell_size_double) - 2;
    Grid.col_count         = Math.floor(Canvas.canvas.width / Grid.#cell_size_double) - 2;
    Grid.#row_count        = Math.floor(Canvas.canvas.height / Grid.#cell_size_double);
    Grid.#col_count        = Math.floor(Canvas.canvas.width / Grid.#cell_size_double);
    Grid.align();
  }

  static align() : void
  {
    let old_start : Vector2D = { x: Grid.#start.x, y: Grid.#start.y };

    Grid.width   = Grid.col_count * Grid.cell_size;
    Grid.height  = Grid.row_count * Grid.cell_size;
    Grid.start.x = (Canvas.canvas.width - Grid.width) / 2;
    Grid.start.y = (Canvas.canvas.height - Grid.height) / 2;
    Grid.end.x   = Grid.start.x + Grid.width;
    Grid.end.y   = Grid.start.y + Grid.height;

    Grid.#width   = Grid.#col_count * Grid.cell_size;
    Grid.#height  = Grid.#row_count * Grid.cell_size;
    Grid.#start.x = (Canvas.canvas.width - Grid.#width) / 2;
    Grid.#start.y = (Canvas.canvas.height - Grid.#height) / 2;

    Grid.offset.x = Grid.#start.x - old_start.x;
    Grid.offset.y = Grid.#start.y - old_start.y;
  }

  static render()
  {
    Canvas.ctx.fillStyle = ThemeManager.current_theme.color_fg;
    Canvas.ctx.fillRect(Grid.#start.x, Grid.#start.y, Grid.#width, Grid.#height);
    Canvas.ctx.fillStyle = ThemeManager.current_theme.color_bg;
    Canvas.ctx.fillRect(Grid.start.x, Grid.start.y, Grid.width, Grid.height);
  }
};

class Nake
{
  static #crnt_position : Vector2D = { x: 0, y: 0 };
  static #prev_position : Vector2D = { x: 0, y: 0 };

  #position  : Vector2D = { x: 0, y: 0 };
  #direction : string;
  #tail      : Array<Vector2D>;
  score      : number;

  constructor()
  {
    this.#position.x = Math.floor(Math.random() * Grid.col_count) * Grid.cell_size + Grid.start.x;
    this.#position.y = Math.floor(Math.random() * Grid.row_count) * Grid.cell_size + Grid.start.y;
    this.#direction  = 'a';
    this.#tail       = new Array(0);
    this.score       = 0;

    window.addEventListener("keypress", (event) => {
      switch (event.key)
      {
        case 'w':
        if (this.#direction != 's') this.#direction = 'w';
        break;

        case 'a':
        if (this.#direction != 'd') this.#direction = 'a';
        break;

        case 's':
        if (this.#direction != 'w') this.#direction = 's';
        break;

        case 'd':
        if (this.#direction != 'a') this.#direction = 'd';
        break;
      }
    });
  }

  update() : void
  {
    Nake.#prev_position.x = this.#position.x;
    Nake.#prev_position.y = this.#position.y;

    switch (this.#direction)
    {
      case 'w':
      this.#position.y -= Grid.cell_size;
      break;

      case 'a':
      this.#position.x -= Grid.cell_size;
      break;

      case 's':
      this.#position.y += Grid.cell_size;
      break;

      case 'd':
      this.#position.x += Grid.cell_size;
      break;
    }

    for (let i = 0, l = this.#tail.length; i < l; i++)
    {
      Nake.#crnt_position.x = this.#tail[i].x;
      Nake.#crnt_position.y = this.#tail[i].y;

      this.#tail[i].x = Nake.#prev_position.x;
      this.#tail[i].y = Nake.#prev_position.y;

      Nake.#prev_position.x = Nake.#crnt_position.x;
      Nake.#prev_position.y = Nake.#crnt_position.y;
    }

    if (this.#position.x < Grid.start.x)
    {
      this.#position.x = Grid.end.x - Grid.cell_size;
    }
    else if (this.#position.x + Grid.cell_size > Grid.end.x)
    {
      this.#position.x = Grid.start.x;
    }

    if (this.#position.y < Grid.start.y)
    {
      this.#position.y = Grid.end.y - Grid.cell_size;
    }
    else if (this.#position.y + Grid.cell_size > Grid.end.y)
    {
      this.#position.y = Grid.start.y;
    }
  }

  align() : void
  {
    this.#position.x += Grid.offset.x;
    this.#position.y += Grid.offset.y;

    for (let i = 0, l = this.#tail.length; i < l; i++)
    {
      this.#tail[i].x += Grid.offset.x;
      this.#tail[i].y += Grid.offset.y;
    }
  }

  eat_apple(apple : Vector2D) : boolean
  {
    if (apple.x == this.#position.x && apple.y == this.#position.y)
    {
      this.#tail.push({ x: Nake.#prev_position.x , y: Nake.#prev_position.y });
      this.score++;
      return true;
    }

    return false;
  }

  render() : void
  {
    Canvas.ctx.fillStyle = ThemeManager.current_theme.color_fg;
    Canvas.ctx.beginPath();
    Canvas.ctx.rect(this.#position.x, this.#position.y, Grid.cell_size, Grid.cell_size);
    for (let i = 0, l = this.#tail.length; i < l; i++)
    {
      Canvas.ctx.rect(this.#tail[i].x, this.#tail[i].y, Grid.cell_size, Grid.cell_size);
    }
    Canvas.ctx.closePath();
    Canvas.ctx.fill();
  }
}

class Apple
{
  position : Vector2D = { x: 0, y: 0 };

  #set_random_position() : void
  {
    this.position.x = Math.floor(Math.random() * Grid.col_count) * Grid.cell_size + Grid.start.x;
    this.position.y = Math.floor(Math.random() * Grid.row_count) * Grid.cell_size + Grid.start.y;
  }

  constructor()
  {
    this.#set_random_position();
  }

  respawn() : void
  {
    this.#set_random_position();
  }

  align() : void
  {
    this.position.x += Grid.offset.x;
    this.position.y += Grid.offset.y;
  }

  render() : void
  {
    Canvas.ctx.fillStyle = ThemeManager.current_theme.color_fg;
    Canvas.ctx.fillRect(this.position.x, this.position.y, Grid.cell_size, Grid.cell_size);
  }
}

class NakeScene
{
  static #fps_human    = 24
  static #fps          = 1000 / NakeScene.#fps_human;
  static #delta_time   = 0;
  static #prev_time    = 0;
  static #time_counter = 0;

  static #nake  : Nake;
  static #apple : Apple;

  static #loop(crnt_time : number) : void
  {
    NakeScene.#delta_time = crnt_time - NakeScene.#prev_time;
    NakeScene.#prev_time = crnt_time;

    if (NakeScene.#time_counter > NakeScene.#fps)
    {
      NakeScene.#nake.update();
      if (NakeScene.#nake.eat_apple(NakeScene.#apple.position)) NakeScene.#apple.respawn();
      Canvas.clear();
      Grid.render();
      NakeScene.#apple.render();
      NakeScene.#nake.render();
      Canvas.ctx.fillStyle = ThemeManager.current_theme.color_fg;
      Canvas.ctx.fillText(`fps:   ${NakeScene.#fps_human.toString().padStart(2, '0')}`, Canvas.canvas.width - 150, Canvas.canvas.height - 64);
      Canvas.ctx.fillText(`score: ${NakeScene.#nake.score.toString().padStart(2, '0')}`, Canvas.canvas.width - 150, Canvas.canvas.height - 32);

      NakeScene.#time_counter = 0;
    }
    else
    {
      NakeScene.#time_counter += NakeScene.#delta_time;
    }
    window.requestAnimationFrame(NakeScene.#loop);
  }

  static start() : void
  {
    Canvas.registor(() => { 
      Grid.align();
      if (NakeScene.#apple) NakeScene.#apple.align();
      if (NakeScene.#nake) NakeScene.#nake.align();
      Canvas.ctx.font = "bold 20px monospace";
    });
    Grid.init(16);
    NakeScene.#nake  = new Nake();
    NakeScene.#apple = new Apple();
    window.addEventListener("keypress", (event) => {
      switch (event.key)
      {
        case '+':
        if (NakeScene.#fps_human < 30)
        {
          NakeScene.#fps_human++;
          NakeScene.#fps       = 1000 / NakeScene.#fps_human;
        }
        break;

        case '-':
        if (NakeScene.#fps_human > 1)
        {
          NakeScene.#fps_human--;
          NakeScene.#fps       = 1000 / NakeScene.#fps_human;
        }
        break;
      }
    });
    window.requestAnimationFrame(NakeScene.#loop);
  }
}

export default NakeScene;
