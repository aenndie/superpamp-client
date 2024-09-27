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
import apiClient from "../services/apiClient";
import { uploadFile } from "../hooks/useTokens";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Token } from "../hooks/useTokens";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  symbol: z
    .string()
    .min(2, { message: "Symbol must be at least 2 characters." })
    .max(5, { message: "Symbol must not exceed 5 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(200, { message: "Description must not exceed 200 characters." }),
});

type FormData = z.infer<typeof schema>;

/*interface FormData {
  name: string;
  symbol: string;
  description: string;
}*/

const CreateToken = ({ isOpen, onClose }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileNotice, setShowFileNotice] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log("handleFileChange: ", event);
      setSelectedFile(event.target.files[0]);
      setShowFileNotice(false);
    } else {
      setShowFileNotice(true);
    }
  };

  const onSubmit = (data: FieldValues) => {
    if (selectedFile == null) {
      setShowFileNotice(true);
      return;
    }

    console.log("creating new token", data);

    apiClient
      .post<Token>("tokens", data)
      .then((token) => {
        console.log("creation success - data = ", token.data.id);
        uploadFile(token.data.id, selectedFile);
      })
      .catch()
      .finally();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <form id='create-token-form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Create token</FormLabel>
              <FormHelperText>Enter the name of your token.</FormHelperText>
              <Input
                mt={2}
                type='text'
                placeholder='Name'
                {...register("name")}
              />
              {errors.name && (
                <Text color='red.500'>{errors.name.message}</Text>
              )}
              <FormHelperText>Enter the symbol of your token.</FormHelperText>
              <Input
                mt={2}
                type='text'
                placeholder='Symbol'
                {...register("symbol")}
              />
              {errors.symbol && (
                <Text color='red.500'>{errors.symbol.message}</Text>
              )}
              <FormHelperText>
                Enter the description of your token.
              </FormHelperText>
              <Textarea
                mt={2}
                placeholder='Description'
                {...register("description")}
              />
              {errors.description && (
                <Text color='red.500'>{errors.description.message}</Text>
              )}
              <Box>
                {/* Hidden file input */}
                <Input
                  type='file'
                  onChange={handleFileChange}
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
            form='create-token-form'
            isDisabled={!isValid && false}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateToken;
