interface Theme
{
  name     : string,
  color_fg : string,
  color_bg : string
};

class ThemeManager
{
  static #prefer_dark_theme = window.matchMedia("(prefers-color-scheme: dark)");

  static current_theme : Theme = {
    name:     "dark",
    color_fg: "#ffffff",
    color_bg: "#000000"
  };

  static #update_colors() : void
  {
    const styles = window.getComputedStyle(document.documentElement);
    if (ThemeManager.current_theme.name == "dark")
    {
      ThemeManager.current_theme.color_fg = styles.getPropertyValue("--color-white");
      ThemeManager.current_theme.color_bg = styles.getPropertyValue("--color-black");
    }
    else
    {
      ThemeManager.current_theme.color_fg = styles.getPropertyValue("--color-black");
      ThemeManager.current_theme.color_bg = styles.getPropertyValue("--color-white");
    }
  }

  static #toggle_theme_auto() : void
  {
    ThemeManager.current_theme.name = ThemeManager.#prefer_dark_theme.matches ? "dark" : "light";
    ThemeManager.#update_colors();
  }

  static register() : void
  {
    ThemeManager.#toggle_theme_auto();
    ThemeManager.#prefer_dark_theme.addEventListener("change", ThemeManager.#toggle_theme_auto);
  }
}

export default ThemeManager;
