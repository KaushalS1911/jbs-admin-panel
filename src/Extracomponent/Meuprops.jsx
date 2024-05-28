const Meuprops = ({ ITEM_HEIGHT, ITEM_PADDING_TOP }) => {
  return {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
};

export default Meuprops;
