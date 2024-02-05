import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ dataPerPage, totalData, paginate, active }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="text" className="flex items-center gap-2 " onClick={() => paginate("prev")} disabled={active === 1}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Prece
      </Button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((number) => (
          <IconButton key={number} onClick={() => paginate(number)} className="bg-lycs">
            {number}
          </IconButton>
        ))}
      </div>
      <Button variant="text" className="flex items-center gap-2" onClick={() => paginate("next")} disabled={active === pageNumbers.length}>
        suiv <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
