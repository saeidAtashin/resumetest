import React, { useEffect, useState } from "react";

import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const Test1 = () => {
  const [arrInputs, setArrInputs] = useState([]);
  const [separator, setSeparator] = useState(", ");
  const [allCombinations, setAllCombinations] = useState([]);
  const [optionName, setOptionName] = useState([]);

  const handleAddArray = () => {
    if (optionName === "") {
      alert("please enter name of option");
    } else {
      setArrInputs([...arrInputs, { id: uuidv4(), arr: [], name: optionName }]);

      setOptionName("");
    }
  };

  const handleOptionName = (event) => {
    setOptionName(event.target.value);
  };

  const handleRemoveArray = (id) => {
    setArrInputs(arrInputs.filter((input) => input.id !== id));
  };

  const handleUpdateArray = (id, newArray) => {
    setArrInputs(
      arrInputs.map((input) => {
        if (input.id === id) {
          return { id, arr: newArray };
        }
        return input;
      })
    );
  };

  const handleAddOption = (id) => {
    setArrInputs(
      arrInputs.map((input) => {
        if (input.id === id) {
          return { id, arr: [...input.arr, ""] };
        }
        return input;
      })
    );
  };

  const handleOptionChange = (id, optionIndex, optionValue, optionName) => {
    setArrInputs(
      arrInputs.map((input) => {
        if (input.id === id) {
          const newArr = [...input.arr];
          newArr[optionIndex] = optionValue;
          return { id, arr: newArr, optionName };
        }
        return input;
      })
    );
  };

//   const handleSeparatorChange = (event) => {
//     setSeparator(event.target.value);
//   };

  useEffect(() => {
    const combinations = new Set();

    function generateCombinationsHelper(index, current) {
      if (index === arrInputs.length) {
        combinations.add(current.join(separator));
      } else {
        const arr = arrInputs[index].arr;
        for (let i = 0; i < arr.length; i++) {
          generateCombinationsHelper(index + 1, [...current, arr[i]]);
        }
      }
    }

    generateCombinationsHelper(0, []);

    setAllCombinations(combinations);
  }, [arrInputs, separator]);

  return (
    <div>
      {
        <>
          <div className="i021">
            <input type="text" value={optionName} onChange={handleOptionName} />
            <button onClick={handleAddArray}>Add Array</button>
            <h1>{optionName}</h1>
          </div>

          {arrInputs.map((input) => (
            <div key={input.id}>
              <h1>{input.name}</h1>
              {input.arr.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    placeholder="Add another value"
                    onChange={(e) =>
                      handleOptionChange(
                        input.id,
                        index,
                        e.target.value,
                        input.name
                      )
                    }
                  />
                </div>
              ))}
              <button className="222" onClick={() => handleAddOption(input.id)}>
                Add Option
              </button>
              <button onClick={() => handleRemoveArray(input.id)}>
                Remove Array
              </button>
            </div>
          ))}
        </>
      }
      <div>
        {Array.from(allCombinations).map((combination, index) => (
          <div key={index}>{combination}</div>
        ))}
      </div>
    </div>
  );
};

export default Test1;
