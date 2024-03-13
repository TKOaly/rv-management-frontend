"use const";

import Barcode from "@/components/Barcode";
import { Box } from "@/server/requests/boxRequests";

type OwnProps = {
  boxes: Box[];
};

const AttachedBoxesList = ({ boxes }: OwnProps) => {
  return (
    <div className="relative h-full max-h-32 overflow-y-auto overscroll-none rounded-lg border shadow-lg">
      <div>
        {boxes.map((box, idx) => (
          <div key={idx} className="flex gap-x-2 p-2">
            <Barcode
              barcode={box.boxBarcode}
              width={3}
              height={30}
              displayInvalid
            />
            <p>{box.itemsPerBox}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachedBoxesList;
