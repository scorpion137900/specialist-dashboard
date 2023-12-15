import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import Feature from "./Feature";
import BouquetUsers from "./BouquetUsers";
import { Delete } from "@mui/icons-material";
import { useDeleteBouquetMutation } from "../../store/features/bouquet/bouquet";
import { notifyError, notifySucess } from "../../utils/helper";
import IsLoadingMessage from "../IsLoadingMessage";
import { useNavigate } from "react-router-dom";
const BouquetCard = ({ item }) => {
  const navigate = useNavigate();
  const [deleteBouquet, resultsOfDeleteBouquet] = useDeleteBouquetMutation();
  const deleteFunc = () => {
    deleteBouquet(item?.id)
      .unwrap()
      .then((payload) => {
        notifySucess("deleted Successfully");
      })
      .catch((err) => notifyError(err?.message));
  };
  return (
    <>
      <Card sx={{ minWidth: 350, textAlign: "center", position: "relative" }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{
            position: "absolute",
            left: "10px",
            top: "10px",
            width: "30px",
            minWidth: "30px",
            height: "30px",
          }}
          onClick={deleteFunc}
        >
          <Delete />
        </Button>
        <CardContent sx={{ display: "grid" }}>
          <Typography
            variant="h5"
            sx={{
              //   backgroundColor: "primary.main",
              // color: "primary.contrastText",
              color: "primary.main",
              padding: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            {item?.name}
          </Typography>
          <Feature value={item?.canAddBouquetAdds} text={"canAddBouquetAdds"} />
          <Feature value={item?.canAddChild} text={"canAddChild"} />
          <Feature value={item?.canReadArticles} text={"canReadArticles"} />
          <Feature value={item?.canAttendLectures} text={"canAttendLectures"} />
          <Feature value={item?.canWatchVideo} text={"canWatchVideo"} />
          <Feature number={item?.numberOfChildren} text={"numberOfChildren"} />
          <Feature number={item?.numberOfComments} text={"numberOfComments"} />
          <Feature number={item?.reports} text={"reports"} />
          <Feature
            number={item?.numberOfConsultations}
            text={"numberOfConsultations"}
          />
          <Feature number={item?.numberOfSessions} text={"numberOfSessions"} />
          <Feature number={item?.sessionDuration} text={"sessionDuration"} />

          <Typography
            variant="h4"
            sx={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              paddingTop: "10px",
              borderTop: " 1px solid #eee",
            }}
          >
            {item?.price} $ / {item?.bouquetType}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: 0 }}
          >
            {item?.hours} hours
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "1.2rem",
              marginY: 1,
              textAlign: "center",
            }}
          >
            {item?.description}
          </Typography>
          {/* <ul sx={{ marginTop: 2, marginBottom: 2 }}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul> */}
          <BouquetUsers id={item?.id} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              marginTop: 2,
              display: "block",
              margin: "8px auto",
            }}
            onClick={() => {
              navigate("/bouquets/edit", {
                state: item,
              });
            }}
          >
            Edit
          </Button>
        </CardContent>
      </Card>
      {resultsOfDeleteBouquet?.isLoading && (
        <IsLoadingMessage
          isLoading={resultsOfDeleteBouquet?.isLoading}
          msg={"Please Waiting While Delete Bouquet"}
        />
      )}
    </>
  );
};

export default BouquetCard;
