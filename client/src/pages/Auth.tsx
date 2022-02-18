import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const Title = styled.h2`
    font-size: 1.5em;
    //margin: auto;
    text-align: center;
    color: palevioletred;
  `;
  const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
  `;
  const Card = styled.div`
    padding: 1.5em;
    background: papayawhip;
  `;
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: papayawhip;
  `;
  const Input = styled.input`
    margin-top: 0.5em;
  `;
  const Label = styled.label`
    margin-top: 0.5em;
  `;

  return (
    <Wrapper>
      <Card>
        <Title>Autorization</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>e-mail</Label>
          <Input {...register("exampleRequired")} />
          <Label>password</Label>
          <Input {...register("exampleRequired", { required: true })} />

          {errors.exampleRequired && <p>Fill in all the fields</p>}

          <Input type="submit" />
        </Form>
      </Card>
    </Wrapper>
  );
};

export default Auth;
