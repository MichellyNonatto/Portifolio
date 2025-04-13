"use client";

import * as React from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormSubmission } from "@/app/lib/emailJS";

export const FormsPresentation = () => {
  const translation = useTranslations("Contact");
  const listFormData = ["from", "reply", "topic", "subject"];
  const { handleSubmit, error, success, fieldErrors, isSending } = useFormSubmission();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="flex flex-col gap-4 p-6 w-full mx-auto"
    >
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {listFormData.map((type, index) => (
        <div key={index}>
          <TextField
            label={translation(`${type}.title`)}
            name={type}
            fullWidth
            variant="outlined"
            placeholder={translation(`${type}.placeholder`)}
            multiline={type === "subject"}
            rows={type === "subject" ? 4 : 1}
            inputProps={{ maxLength: 500 }}
            type={translation(`${type}.type`)}
            error={!!fieldErrors[type as keyof typeof fieldErrors]} 
            helperText={fieldErrors[type as keyof typeof fieldErrors]} 
          />
        </div>
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSending}
        className="max-w-min rounded-lg"
      >
        {isSending ? translation("submit.load") : translation("submit.state")}
      </Button>
    </Box>
  );
};
