const parseInput = (data) => {
  const bList = [];
  const qList = [];
  const oList = {};
  let qIndex = 1;
  let oIndex = 1;
  for (let key of Object.keys(data).sort()) {
    switch (key[0]) {
      // header case
      // A == option // B == option score // C == benchmark // D == bench output
      // QC == q choice // QE == q essay
      case "A":
        const [qName, oId] = key.split("-");
        const qId = qName.slice(1);
        const option = {
          order: oIndex,
          context: data[key],
          weight: data[key.replace("A", "B")],
        };
        if (oList[qId]) {
          oList[qId].push(option);
        } else {
          oList[qId] = [option];
        }

        oIndex++;
        break;
      case "C":
        bList.push({
          benchmark: data[key],
          output_text: data[key.replace("C", "D")],
        });
        break;
      case "Q":
        const question = {
          order: qIndex,
          context: data[key],
        };
        if (key.slice(-1) === "E") {
          qList.push({
            ...question,
            type: "1",
          });
        } else {
          qList.push({
            ...question,
            type: "0",
            option: oList[key.slice(1)],
          });
        }
        qIndex++;
        break;
      default:
        break;
    }
  }

  return { qList, bList };
};

export default parseInput;
