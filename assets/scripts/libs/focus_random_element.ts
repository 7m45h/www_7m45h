class RandomElement
{
  static #elements : NodeListOf<HTMLElement>;

  static registor(selector : string) : void
  {
    RandomElement.#elements = document.querySelectorAll(selector);

    window.addEventListener("keypress", (event) => {
      if (event.key == 'r')
      {
        RandomElement.#elements[Math.floor(Math.random() * RandomElement.#elements.length)].focus();
      }
    });
  }
}

export default RandomElement;
