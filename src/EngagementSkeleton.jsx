import React from "react";
import { Skeleton } from "@mui/material";

function EngagementSkeleton() {
  return (
    <div className="relative z-50">
      <Skeleton
        variant="text"
        sx={{ fontSize: "30px", bgcolor: "#fff" }}
        className="sm:w-[70%] w-[60%]"
      />
      <div className="grid-rows-96 gap-8 grid-flow-col sm:grid-flow-row sm:grid sm:grid-cols-2 sm:gap-4 mt-2">
        <Skeleton
          variant="rectangular"
          height={40}
          className={`my-4 sm:my-0`}
          sx={{ bgcolor: "#fff" }}
        />
        <Skeleton
          className={`my-4 sm:my-0`}
          variant="rectangular"
          height={40}
          sx={{ bgcolor: "#fff" }}
        />
        <Skeleton
          className={`my-4 sm:my-0`}
          variant="rectangular"
          height={40}
          sx={{ bgcolor: "#fff" }}
        />
        <Skeleton
          className={`my-4 sm:my-0`}
          variant="rectangular"
          height={40}
          sx={{ bgcolor: "#fff" }}
        />
      </div>
      <div className="flex justify-end pr-2 mt-4 mb-4">
        <Skeleton
          variant="rectangular"
          width={70}
          height={40}
          sx={{ bgcolor: "#fff" }}
        />
      </div>
    </div>
  );
}

export default EngagementSkeleton;
