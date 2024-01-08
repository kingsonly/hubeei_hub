import { Button } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

function EngagementDisplay({
  data,
  handleSelection,
  type = "default",
  background,
  color,
}) {
  const renderChecks = (index, data, optionId = null) => {
    switch (type) {
      case "default":
        if (data.selected) {
          if (data.selected[index] > 0) {
            return <CheckIcon className="text-[green]" />;
          }
        }
        break;
      case "yours":
        let found = "";
        data.user_answer.map((item) => {
          if (item.option_id == optionId) {
            found = <CheckIcon className="text-[green]" />;
          }
        });
        return found;
      case "general":
        return (
          <div className="sm:w-[100%] border-l-2 border-dotted border-[#000]">
            {convertStats(optionId)}%
          </div>
        );
    }
  };
  const border = (value) => {
    if (type != "default") {
      if (value == 1) {
        return "border-2 border-solid border-[green]";
      }
      return "border-2 border-solid border-[red]";
    }
  };

  const convertStats = (index) => {
    let statsValues = Object.values(data.stats);
    let totalResponse = statsValues.reduce((total, item) => total + item);
    return (data.stats[index] * 100) / totalResponse;
  };
  return (
    <div className="pl-2 pt-2 relative z-[60]">
      <div
        className="font-roboto text-[22px] mb-2 capitalize"
        style={{ color: background }}
      >
        {data.question}
      </div>

      <div className="options grid-cols-1 sm:grid sm:grid-cols-2 gap-4">
        {data.options.map((item, index) => (
          <div
            onClick={
              type == "default" ? () => handleSelection(item.id, index) : null
            }
            className={`bg-gray-300 mt-4 sm:mt-0 shadow-inner rounded-lg flex items-center h-[40px] ${border(
              item.answer_rank
            )}`}
            style={{ color: color }}
          >
            <li className="option-li block flex justify-between w-[100%] font-roboto text-[16px]">
              <div className="w-[60%] capitalize">{item.answer}</div>
              <div className="w-[30%] flex sm:justify-end sm:pr-4">
                {type == "default"
                  ? renderChecks(index, data)
                  : renderChecks(index, data, item.id)}
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EngagementDisplay;
