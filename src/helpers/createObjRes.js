const jsonRes = {
  description: "OK"
};

export function createObjRes(schema) {
  return { ...jsonRes, schema };
}
