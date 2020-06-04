import React, { useState, useContext, useEffect } from "react";

// Context
import { ReducerContext } from "../../../types";
import { UserContext } from "../../../context/Context";
import { editUserDetails } from "../../../context/Actions";
import { CLEAR_LOADING } from "../../../context/ReducerTypes";

// Terms and Conditions Text
import TermsAndConditions from "../../../TermsAndConditions";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Prop Type
interface Props {
    openedTerms: boolean;
    setOpenedTerms: React.Dispatch<React.SetStateAction<boolean>>;
    setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TermsAndConditionsDialog: React.FC<Props> = ({openedTerms, setOpenedTerms, setAgreed}) => {
  // Handles Terms Dialog Close
  const handleTermsClose = () => {
    setOpenedTerms(false);
  };

  // Handles Submit
  const handleTermsAgreed = (event: any) => {
    event.preventDefault();
    
    // Sets Agreed
    setAgreed(true);

    // Closes
    handleTermsClose();
  };

  return (
    <Dialog open={openedTerms} onClose={handleTermsClose}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <p className = 'wrapped'>{TermsAndConditions}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTermsClose} color="secondary">
          Decline
        </Button>
        <Button onClick={handleTermsAgreed} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
