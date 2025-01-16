class ListNavigator {
  static #elements: NodeListOf<HTMLElement>;
  static #curnt_element_index: number = 0;

  static #pick_random(): void {
    ListNavigator.#curnt_element_index = Math.floor(
      Math.random() * ListNavigator.#elements.length,
    );
  }

  static #next_element(): void {
    ListNavigator.#curnt_element_index =
      (ListNavigator.#curnt_element_index +
        1 +
        ListNavigator.#elements.length) %
      ListNavigator.#elements.length;
  }

  static #prev_element(): void {
    ListNavigator.#curnt_element_index =
      (ListNavigator.#curnt_element_index -
        1 +
        ListNavigator.#elements.length) %
      ListNavigator.#elements.length;
  }

  static #focus(): void {
    ListNavigator.#elements[ListNavigator.#curnt_element_index].focus();
  }

  static registor(selector: string): void {
    ListNavigator.#elements = document.querySelectorAll(selector);

    window.addEventListener("keypress", (event: KeyboardEvent): void => {
      if (event.key == "r") ListNavigator.#pick_random();
      else if (event.key == "h") ListNavigator.#prev_element();
      else if (event.key == "l") ListNavigator.#next_element();

      ListNavigator.#focus();
    });
  }
}

export default ListNavigator;
