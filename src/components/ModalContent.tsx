import Dashboard from "./Dashboard";
import type { CyberEvent } from "@/model/CyberEvent";


type ModalContentProps = {
  closeModal: () => void;
  data: CyberEvent[];
};

export function ModalContent({ closeModal, data }: ModalContentProps) {
  return (
    <div className="SideMenu">
        <div className="overlay"></div>
        <div className="modal-content">
            <h2></h2>
      <Dashboard data={data} />
      </div>
      <button className="closeButton" onClick={closeModal}>
        X
      </button>
    </div>
  );
}
