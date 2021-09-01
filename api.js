export const api = {
  movieInfo: async (actor) => {
    const response = await fetch(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=CWGQ3H8EY1182U11F665&actor=${actor}&listCount=500`
    );
    return response.json();
  },
};
