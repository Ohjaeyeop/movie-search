export const api = {
  movieInfo: async (actors) => {
    const response = await fetch(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.API_KEY}&actor=${actors}&listCount=200`
    );
    return response.json();
  },
};
