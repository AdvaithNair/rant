import React from "react";

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
    setAgreed(false);
    setOpenedTerms(false);
  };

  // Handles Submit
  const handleTermsAgreed = (event: any) => {
    event.preventDefault();
    
    // Sets Agreed
    setAgreed(true);

    // Closes
    setOpenedTerms(false);
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
