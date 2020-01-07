import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Button
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import { UserRegistration } from "../../../types";
import { userService } from "../../../lib";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    },
    input: {
      marginTop: 25,
      width: "80%"
    },
    Button: {
      marginTop: 25
    }
  })
);

interface Props {
  onSubmit: (value: UserRegistration) => void;
}

interface RegistrationForm extends UserRegistration {
  passwordConfirm: string;
}

export default function RegistrationForm(props: Props) {
  const { onSubmit } = props;
  const { register, handleSubmit, errors, getValues } = useForm<
    RegistrationForm
  >({
    mode: "onSubmit",
    validateCriteriaMode: "firstError",
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
      dateOfBirth: new Date()
    }
  });

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={classes.input}
        id="username"
        name="username"
        label="Username"
        error={!!errors.username}
        helperText={errors?.username?.message}
        inputRef={register({
          required: "Username is required",
          minLength: {
            value: 6,
            message: "Username's minimum length is 6 characters"
          },
          maxLength: {
            value: 64,
            message: "Username's maximum length is 64 characters"
          },
          validate: {
            isTaken: async value => {
              const {
                isErr,
                value: isUsernameTaken
              } = await userService.isUsernameTaken(value);
              if (isErr()) {
                return "We are having technical issues, please try again later";
              }
              if (isUsernameTaken) {
                return "This username is already taken";
              }
            }
          }
        })}
      />
      <TextField
        className={classes.input}
        id="email"
        name="email"
        label="Email"
        error={!!errors.email}
        helperText={errors?.email?.message}
        inputRef={register({
          required: "Please enter your email",
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email address"
          },
          validate: {
            isTaken: async value => {
              const {
                isErr,
                value: isEmailTaken
              } = await userService.isEmailTaken(value);
              if (isErr()) {
                return "We are having technical issues, please try again later";
              }
              if (isEmailTaken) {
                return "This email is already in use";
              }
            }
          }
        })}
      />
      <TextField
        className={classes.input}
        type="password"
        id="password"
        name="password"
        label="Password"
        error={!!errors.password}
        helperText={errors?.password?.message}
        inputRef={register({
          required: "Please choose a password",
          minLength: {
            value: 6,
            message:
              "please choose a password that is longer than 6 characters long"
          },
          maxLength: {
            value: 128,
            message: "Password's maximum length is 128 characters"
          }
        })}
      />
      <TextField
        className={classes.input}
        type="password"
        id="password-confirm"
        name="passwordConfirm"
        label="Confirm password"
        error={!!errors.passwordConfirm}
        helperText={errors?.passwordConfirm?.message}
        inputRef={register({
          required: "Please confirm your password",
          validate: value =>
            getValues().password === value || "Does not match with password"
        })}
      />
      <TextField
        className={classes.input}
        id="first-name"
        name="firstName"
        label="First name"
        error={!!errors.firstName}
        helperText={errors?.firstName?.message}
        inputRef={register({
          required: "First name is required",
          maxLength: {
            value: 128,
            message: "First name's maximum length is 128 characters"
          }
        })}
      />
      <TextField
        className={classes.input}
        id="last-name"
        name="lastName"
        label="Last name"
        error={!!errors.lastName}
        helperText={errors?.lastName?.message}
        inputRef={register({
          required: "Last name is required",
          maxLength: {
            value: 128,
            message: "Last name's maximum length is 128 characters"
          }
        })}
      />
      <TextField
        className={classes.input}
        id="date-of-birth"
        name="dateOfBirth"
        label="Date of birth"
        type="date"
        error={!!errors.dateOfBirth}
        helperText={errors?.dateOfBirth?.message}
        inputRef={register({
          required: "Date of birth is required"
        })}
        InputLabelProps={{
          shrink: true
        }}
      />

      <Button className={classes.Button} type="submit">
        Sign up
      </Button>
    </form>
  );
}
