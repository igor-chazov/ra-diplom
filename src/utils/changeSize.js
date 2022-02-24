const changeSize = ({ target }) => {
  const { width, height } = target;
  const cardWidth = target.parentElement.clientWidth;
  if (width / height > 1) {
    target.style.paddingTop = `${(cardWidth - height) / 2}px`;
    target.style.paddingBottom = `${(cardWidth - height) / 2}px`;
  }
  else {
    target.style.height = `${cardWidth}px`;
    target.style.width = `${width * cardWidth / height}px`;
    target.style.margin = '0 auto';
  }
}

export default changeSize;
