import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NotificationModal = ({ message, openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={style} className="rounded-md shadow-md text-center">
          <h1 className="text-2xl font-medium uppercase">Thông báo</h1>
          <div className="flex items-center justify-center py-1">
            {/* Icon Success với Animation */}
            <CheckCircleIcon
              sx={{ fontSize: 60 }}
              className=" text-green-500"
            />
          </div>
          <p className="text-xl pt-2 pb-5">{message}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(false)}
          >
            Đóng
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NotificationModal;
