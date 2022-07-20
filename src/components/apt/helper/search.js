export const matchArrays = (val, data) => {
    let tempSuggestion = [];
  
    if (val.length > 0) {
      //const regex = new RegExp(`^${val}`, "i");
      // tempSuggestion = data.sort().filter((v) => regex.test(v.value));
      tempSuggestion = data.filter((v) =>
        v.value?.toLowerCase().includes(val?.toLowerCase())
      );
    }
  
    return tempSuggestion;
  };
  