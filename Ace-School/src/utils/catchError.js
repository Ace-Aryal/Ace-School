export const catchError = async (asyncAction) => {
  try {
    const response = await asyncAction();
    console.log(response, "res");
    return { error: false, response };
  } catch (error) {
    console.error(error);
    return { error: error, response: false };
  }
};
