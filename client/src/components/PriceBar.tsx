import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PriceBar: React.FC = () => {
  const minPrice = 0;
  const maxPrice = 1000;
  let minp = 0;
  let maxp = 1000;
  const stepPrice = 10;
  const minDistance = 100;

  let [searchParams, setSearchParams] = useSearchParams();
  const [value, setvalue] = React.useState<number[]>([minp, maxp]);

  useEffect(() => {
    if (searchParams.get("minp")) {
      setvalue([Number(searchParams.get("minp")), value[1]]);
    }

    if (searchParams.get("maxp")) {
      setvalue([value[0], Number(searchParams.get("maxp"))]);
    }
  }, []);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setvalue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setvalue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleCommitted = () => {
    if (value[0] <= minPrice) {
      searchParams.delete("minp");
    } else {
      searchParams.set("minp", `${value[0]}`);
    }

    if (value[1] >= maxPrice) {
      searchParams.delete("maxp");
    } else {
      searchParams.set("maxp", `${value[1]}`);
    }
    setSearchParams(searchParams);
    //set page to 1
    searchParams.delete("page");
  };

  return (
    <Box
      sx={{
        marginLeft: 1,
        marginRight: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
      }}
    >
      <h3>Price:</h3>
      <Slider
        getAriaLabel={() => "Price slider"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommitted}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        step={stepPrice}
        disableSwap
      />
    </Box>
  );
};

export default PriceBar;
