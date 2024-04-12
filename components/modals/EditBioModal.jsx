import React from "react";
import { Button, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import BioChangeInput from "../Items/BioChangeInput.jsx";

const EditBioModal = ({ open, setOpen, userBio, setUserBio }) => {
  const username = useSelector((state) => state.user.username);
  const { register, handleSubmit } = useForm();
  const save = (newBioData) => {
    axios
      .put(`http://localhost:8000/bio-calc/${username}/`, newBioData)
      .then((r) => {
        console.log(r);

        axios
          .get(`http://localhost:8000/bio-calc/${username}/`)
          .then(({ data }) => {
            setUserBio(data);
          });
        setOpen(false);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(save)}>
        <ModalDialog>
          <ModalClose />
          <Stack justifyContent={"space-between"} gap={1}>
            <BioChangeInput
              defaultValue={userBio?.height}
              label={"Height"}
              register={register}
            />
            <BioChangeInput
              defaultValue={userBio?.weight}
              label={"Weight"}
              register={register}
            />
            <BioChangeInput
              defaultValue={userBio?.age}
              label={"Age"}
              register={register}
            />
            <Button color={"primary"} type={"submit"}>
              Save
            </Button>
          </Stack>
        </ModalDialog>
      </form>
    </Modal>
  );
};

export default EditBioModal;
