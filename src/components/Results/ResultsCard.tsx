import { Spacer } from "../Layout/Layout";
import "./ResultsCard.css";

interface Cardprops {
  name: string;
  email: string;
  body: string;
}

export const ResultCard = ({ name, email, body }: Cardprops) => {
  return (
    <div className="result-card-wrapper d-flex">
      <div className="">
        <div>
          <span className="fw600">Article Name: </span>
          <span className="fw400 fontSize14">{name}</span>
        </div>
        <Spacer height={10} />
        <div>
          <span className="fw600">Email: </span>
          <span className="fw400 fontSize14">{email}</span>
        </div>
        <Spacer height={30} />
        <div className="">
          <span className="fw600">Details: </span>
          <span className="fw400 fontSize14">{body}</span>
        </div>
      </div>
    </div>
  );
};
