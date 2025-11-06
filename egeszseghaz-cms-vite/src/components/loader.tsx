/* eslint-disable prettier/prettier */
import { Spinner } from '@heroui/spinner';

export default function CustomLoader() {
  return (
    <div className="w-full flex justify-center items-center h-[100vh] pt-[50vh] pb-[50vh]">
      <div className="">
        <Spinner
          color="primary"
          size="lg"
          label="Adatok betöltése..."
          labelColor="primary"
        />
      </div>
    </div>
  );
}