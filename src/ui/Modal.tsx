import type { Theme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles<{
  maxWidth?: number,
  borderRadius?: number,
  charges?: number,
  backgroundColor?: string,
}>()((_theme: Theme, { maxWidth, borderRadius, backgroundColor}) => ({
  dialogPaper: {
    marginTop: 0,
    marginBottom: 0,
    borderRadius: borderRadius ? borderRadius : 0,
    maxWidth: maxWidth ? maxWidth : 1008,
    backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ModalType = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  charges?: number,
}

const Modal: React.FC<ModalType> = ({
  open,
  handleClose,
  children,
  maxWidth,
  borderRadius,
  backgroundColor,
  charges,
}) => {
  const {classes} = useStyles({maxWidth, borderRadius, backgroundColor, charges});

  return (
    <div>
      <Dialog
        // fullScreen
        fullWidth
        maxWidth="md"
        scroll="body"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        classes={{paper: classes.dialogPaper}}
      >
       {children}
      </Dialog>
    </div>
  );
};

export default Modal;
