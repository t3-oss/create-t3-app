/**
 * Allows us to animate the details element
 * for it to work make sure the details element contains a summary element
 * and a div element with the class of content
 * @param {*} element the details element which we wish to animate
 */
const AnimateDetails = (element) => {
  const summary = element.querySelector("summary");
  const content = element.querySelector(".content");
  let props = { animation: null, isClosing: false, isExpanding: false };

  /**
   * onClick event handler for the summary element
   * @param {*} event the event object
   */
  const onClick = (event) => {
    event.preventDefault();

    element.style.overflow = "hidden";

    if (props.isClosing || !element.open) open();
    else if (props.isExpanded || element.open) close();
  };

  /**
   * Closes the details element
   * This function is in charge of animating the closing of the
   * details element
   */
  const close = () => {
    props.isClosing = true;

    const startHeight = `${element.offsetHeight}px`;
    const endHeight = `${summary.offsetHeight}px`;

    if (props.animation) props.animation.cancel();

    props.animation = element.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: "ease-in-out",
      },
    );

    props.animation.onfinish = () => onAnimationFinish(false);
    props.animation.oncancel = () => (props.isClosing = false);
  };

  /**
   * Opens the details element
   * requests the animation frame to animate the opening of the details element
   */
  const open = () => {
    element.style.height = `${summary.offsetHeight}px`;
    element.open = true;
    window.requestAnimationFrame(() => expand());
  };

  /**
   * Expands the details element
   * This function is in charge of animating the expansion of the
   * details element
   */
  const expand = () => {
    props.isExpanding = true;

    const startHeight = `${element.offsetHeight}px`;
    const endHeight = `${content.offsetHeight + summary.offsetHeight}px`;

    if (props.animation) props.animation.cancel();

    props.animation = element.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: "ease-in-out",
      },
    );

    props.animation.onfinish = () => onAnimationFinish(true);
    props.animation.oncancel = () => (props.isExpanding = false);
  };

  /**
   * Called when the animation is finished
   * @param {*} open whether the details element is open or not
   */
  const onAnimationFinish = (open) => {
    element.open = open;
    props.animation = null;
    props.isClosing = false;
    props.isExpanding = false;

    element.style.height = element.style.overflow = "";
  };

  /**
   * Adds our new event listener to the summary element
   */
  summary.addEventListener("click", (event) => onClick(event));
};

/**
 * Allows us to animate all the details elements on the page
 * Will check if the details element contains a div element with the class of content
 */
const viableDetails = document.querySelectorAll("details");
viableDetails.forEach((element) => {
  if (element.querySelector(".content")) {
    AnimateDetails(element);
  }
});
