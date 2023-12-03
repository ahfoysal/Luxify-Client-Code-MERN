/* eslint-disable react/prop-types */

import { Tabs, Tab, Spinner } from "@nextui-org/react";
import RowCard from "../Shared/Card";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductsContainer({
  items,
  brands,
  brandName,
  refetch,
  isLoading,
}) {
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  const [selected, setSelected] = useState(brandName);
  const handleChange = (active) => {
    setSelected(active);
    if (active !== "All") {
      setSearchParams({ brand: active });
    } else {
      setSearchParams({ brand: "" });
    }
    refetch();
  };

  return (
    <div className="mt-12 flex w-full flex-col  justify-center items-center">
      <Tabs
        aria-label="Options"
        variant="underlined"
        selectedKey={selected}
        fullWidth
        onSelectionChange={handleChange}
        classNames={{
          tabList:
            "gap-10  w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#C3073F]",
          tab: "max-w-fit px-0 h-12  flex-1",
          tabContent:
            "w-full group-data-[selected=true]:font-bold group-data-[selected=true]:text-[#C3073F] flex-1 ",
          tabPanel: "w-full tabs",
        }}
      >
        <Tab key={"All"} title={"All"}>
          <div className="w-full   grid grid-cols-2 lg:grid-cols-5  mt-8 md:mt-10 gap-3 lg:gap-6 justify-start items-start content-start">
            {!isLoading ? (
              items?.map((item, index) => (
                <RowCard key={index} item={item} showButton={true} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </Tab>
        {brands?.map((brand) => (
          <Tab key={brand.name} title={brand.name}>
            <div className="w-full    grid lg:grid-cols-5 grid-cols-2 mt-8 md:mt-10 gap-6 justify-start items-start content-start">
              {!isLoading ? (
                items?.map((item, index) => (
                  <RowCard key={index} item={item} showButton={true} />
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
      {items?.length < 1 && (
        <div className="flex flex-col justify-center items-center">
          <img src="https://lynethhealthcare.in/images/no-product.png" alt="" />
          <p className="text-2xl font-inter"> No Products Available</p>
        </div>
      )}
    </div>
  );
}
