import Slider from "@mui/material/Slider";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PriceBar: React.FC = () => {
  const minPrice = 0;
  const maxPrice = 1000;
  let minp = 0;
  let maxp = 1000;
  const stepPrice = 10;
  const minDistance = 100;

  let [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState<number[]>([minp, maxp]);

  useEffect(() => {
    if (searchParams.get("minp") && searchParams.get("maxp")) {
      minp = Number(searchParams.get("minp"));
      maxp = Number(searchParams.get("maxp"));
      setValue([minp, maxp]);
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
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleCommitted = () => {
    if (value[0] === minPrice && value[1] === maxPrice) {
      searchParams.delete("minp");
      searchParams.delete("maxp");
    }
    searchParams.set("minp", `${value[0]}`);
    searchParams.set("maxp", `${value[1]}`);
    //set page to 1
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Div>
      <p>
        Price from {value[0]} to {value[1]}
      </p>
      <div>
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
      </div>
    </Div>
  );
};

export default PriceBar;

const Div = styled.div`
  p {
    margin-left: 5px;
  }
  div {
    margin: 0 15px;
  }
`;
