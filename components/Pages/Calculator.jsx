import React, { useRef, useState } from "react";
import {
  Stack,
  Button,
  Card,
  FormControl,
  Input,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { CardContent } from "@mui/material";
import { useForm } from "react-hook-form";

const Calculator = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState();

  const calculateBmi = ({ height, weight }) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      let message = "";

      if (bmi < 18.5) {
        message = "You are underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        message = "You are normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        message = "You are overweight";
      } else {
        message = "You are Obese";
      }

      setMessage(`Your BMI: ${Math.round(bmi)} ${message}`);
    } else {
      setMessage("");
    }
  };
  const calculateBmr = ({ height, weight, gender, age }) => {
    let bmr;

    if (gender === "male") {
      bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    }
    if (gender === "female") {
      bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
    }
    setMessage(`Your BMR: ${Math.round(bmr)}`);
  };

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="center"
      gap={4}
      mt={2}
      mb={4}
    >
      <Card sx={{ maxWidth: 600, width: "100%", paddingX: { xs: 2, sm: 10 } }}>
        <Stack alignItems="center" fontSize={25}>
          Check your BMI/BMR
        </Stack>

        <form onSubmit={handleSubmit(calculateBmi)}>
          <Stack gap={1.5}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              defaultValue={"male"}
              name="radio-buttons-group"
              color="primary"
            >
              <Radio
                value="male"
                label="Male"
                variant="solid"
                {...register("gender")}
              />
              <Radio
                value="female"
                label="Female"
                variant="solid"
                {...register("gender")}
              />
            </RadioGroup>

            <FormLabel>Height (cm)</FormLabel>
            <Input placeholder="0" type={"number"} {...register("height")} />

            <FormLabel>Weight (kg)</FormLabel>
            <Input placeholder="0" type={"number"} {...register("weight")} />

            <FormLabel>Age</FormLabel>
            <Input placeholder="0" type={"number"} {...register("age")} />

            <Stack direction="row" gap={2}>
              <Button
                type="submit"
                variant="solid"
                size="md"
                color="primary"
                sx={{ ml: "auto", fontWeight: 600 }}
                fullWidth={true}
              >
                BMI
              </Button>

              <Button
                variant="solid"
                size="md"
                color="primary"
                sx={{ ml: "auto", fontWeight: 600 }}
                fullWidth={true}
                onClick={handleSubmit(calculateBmr)}
              >
                BMR
              </Button>
            </Stack>
          </Stack>
        </form>
        {
          <Stack fontSize={20} alignItems="center">
            {message}
          </Stack>
        }
      </Card>
    </Stack>
  );
};

export default Calculator;
