import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { create_user, CreateUserType } from "../manifest/createUser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "User name must be at least 3 characters." })
    .max(50, { message: "User name must not exceed 50 characters." }),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters." }),
});

type FormDataUser = z.infer<typeof schema>;

const CreateUser = ({ isOpen, onClose }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileNotice, setShowFileNotice] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataUser>({ resolver: zodResolver(schema) });

  /*const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log("handleFileChange: ", event);
      setSelectedFile(event.target.files[0]);
      setShowFileNotice(false);
    } else {
      setShowFileNotice(true);
    }
  };
  */

  const onSubmit = async (data: FieldValues) => {
    /*if (selectedFile == null) {
      setShowFileNotice(true);
      return;
    }*/

    console.log("creating new user", data);

    const user: CreateUserType = {
      username: data.username,
      bio: data.bio2,
    };

    let succ = await create_user(user);

    if (succ) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <form id='create-user-form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Create user</FormLabel>
              <FormHelperText>Enter a user name.</FormHelperText>
              <Input
                mt={2}
                type='text'
                placeholder='User name'
                {...register("username")}
              />
              {errors.username && (
                <Text color='red.500'>{errors.username.message}</Text>
              )}
              <FormHelperText>Enter your bio.</FormHelperText>
              <Textarea mt={2} placeholder='Bio' {...register("bio")} />
              {errors.bio && <Text color='red.500'>{errors.bio.message}</Text>}
              <Box>
                {/* Hidden file input */}
                <Input
                  type='file'
                  // onChange={handleFileChange}
                  display='none'
                  id='file-upload'
                />

                {/* Styled button to trigger file input */}
                <Button
                  mt={5}
                  as='label'
                  htmlFor='file-upload'
                  colorScheme='teal'
                >
                  Select a file
                </Button>

                {/* Display the name of the selected file */}
                {selectedFile && (
                  <Box mt={2}>
                    Selected file: <strong>{selectedFile.name}</strong>
                  </Box>
                )}
                {showFileNotice && (
                  <Text color='red.500'>Please select an image file.</Text>
                )}
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type='submit'
            form='create-user-form'
            isDisabled={!isValid && false}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUser;
