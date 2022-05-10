  export const getCardsMessages = async (idBairro) => {
    try {
      const response = await fetch(
        `https://the-news-back-end.herokuapp.com/getmensagembairro/${idBairro}`
      );
      const jsonObj = await response.json();
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };