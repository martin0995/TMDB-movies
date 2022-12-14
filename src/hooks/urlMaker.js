function urlMaker(str) {
  const url = str.replace(/ /g, "_").toLowerCase();
  return url;
}

export default urlMaker;
