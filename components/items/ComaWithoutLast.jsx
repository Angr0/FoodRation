const ComaWithoutLast = ({ index, length, endDecorator = "" }) => {
  if (index !== length - 1) return ", ";
  return endDecorator;
};

export default ComaWithoutLast;
