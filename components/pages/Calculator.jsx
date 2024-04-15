import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Card,
  Input,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

const Calculator = () => {
  const username = useSelector((state) => state.user.username);
  const { register, handleSubmit, setValue } = useForm();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:8000/bio-calc/${username}/`)
      .then(({ data: { height, weight, age, is_male } }) => {
        setValue("height", height);
        setValue("weight", weight);
        setValue("age", age);
        setValue("gender", is_male ? "male" : "female");
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [username, setValue]);

  const calculateBmi = ({ height, weight }) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      let message;

      if (bmi < 18.5) {
        message = "You are underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        message = "You are normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        message = "You are overweight";
      } else {
        message = "You are Obese";
      }

      setMessage(`Your BMI: ${Math.round(parseFloat(bmi))}, ${message}`);
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
    setMessage(`Your BMR: ${Math.round(bmr)} kcal`);
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
      <Card
        color="neutral"
        variant="solid"
        sx={{ maxWidth: 600, width: "100%", paddingX: { xs: 2, sm: 10 } }}
      >
        <Stack color={"black"} alignItems="center" fontSize={25}>
          Check your BMI/BMR
        </Stack>

        <form onSubmit={handleSubmit(calculateBmi)}>
          <Stack gap={1.5}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup name="gender" color="primary"></RadioGroup>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
            >
              <Radio
                value={"male"}
                label={"Male"}
                color={"danger"}
                {...register("gender")}
              />
              <Radio
                value={"female"}
                label={"Female"}
                color={"danger"}
                {...register("gender")}
              />
            </RadioGroup>

            <FormLabel>Height (cm)</FormLabel>
            <Input
              placeholder="0"
              type={"number"}
              slotProps={{ input: { min: 0 } }}
              {...register("height")}
              color="danger"
              variant="soft"
            />

            <FormLabel>Weight (kg)</FormLabel>
            <Input
              placeholder="0"
              type={"number"}
              slotProps={{ input: { min: 0 } }}
              {...register("weight")}
              color="danger"
              variant="soft"
            />

            <FormLabel>Age</FormLabel>
            <Input
              placeholder="0"
              type={"number"}
              slotProps={{ input: { min: 0 } }}
              {...register("age")}
              color="danger"
              variant="soft"
            />

            <Stack direction="row" gap={2}>
              <Button
                type="submit"
                variant="solid"
                size="md"
                color="danger"
                sx={{ ml: "auto", fontWeight: 600 }}
                fullWidth={true}
              >
                BMI
              </Button>

              <Button
                variant="solid"
                size="md"
                color="danger"
                sx={{ ml: "auto", fontWeight: 600 }}
                fullWidth={true}
                onClick={handleSubmit(calculateBmr)}
              >
                BMR
              </Button>
            </Stack>
          </Stack>
        </form>
        <Stack fontSize={20} alignItems="center">
          {message}
        </Stack>
      </Card>
    </Stack>
  );
};

export default Calculator;
