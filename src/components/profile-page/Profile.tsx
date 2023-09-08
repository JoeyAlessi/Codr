import { useState } from "react";
import LogoText from "../../assets/Logo/LogoText.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Profile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-gradient">
      <div className="glass-box sm:w-9/12 md:w-11/12 h-5/6 lg:w-11/12 relative flex flex-col">
        <img
          onClick={() => {navigate("/feed")}}
          src={LogoText}
          alt="Logo"
          className="cursor-pointer logo-top-left m-2 h-8 lg:h-[7vh]"
        />
        <div className="text-center mt-8 underline text-3xl">Edit Profile</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          {/* Left side */}
          <div className="flex flex-col items-center">
            {/* For user pfp */}
            <div className="profile-picture m-16">
              {/* Replace the background color with your profile picture */}
            </div>
            <button className="join-button text-white font-300 py-2 px-6 rounded-xl disabled:opacity-50">
              Update
            </button>
          </div>

          {/* Right Side */}
          <div className="flex my-16 flex-col items-center">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "40vw" },
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Outline border color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Outline border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray", // Outline border color on focus
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "white", // Set the color of the icon to white
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <div className="text-xl">Profile:</div>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  defaultValue=""
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Bio"
                  multiline
                  rows={4}
                  defaultValue=""
                />

                <TextField id="outlined-basic" label="Email" defaultValue="" />
                <div className="text-xl mt-2">Update Password:</div>
                <FormControl sx={{ m: 1, width: "40vw" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "40vw" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    inputProps={{
                      style: { color: "white" },
                    }}
                  />
                </FormControl>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

